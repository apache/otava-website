/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import styles from "./ChangePointDemo.module.css";

/**
 * A config-driven SVG animation (powered by Framer Motion) that illustrates
 * how Otava analyzes a single metric's time series:
 *
 *   1. draw the series
 *   2. sweep across every candidate split, scoring divergence (Q̂)
 *   3. either LOCK onto a significant split (regression) ...
 *      ... or REJECT every split as noise (stable)
 *   4. report the verdict — alert on a real change, stay quiet otherwise
 *
 * The numbers are illustrative but follow the real per-metric pipeline.
 */

export type DemoConfig = {
  title: string;
  metric: string;
  values: number[];
  commits: string[];
  /** index where the regime shifts, or null if the series is just noisy */
  changeIndex: number | null;
  domain: [number, number];
  /** shared Q̂ normalization so both demos use the same heat scale */
  qScale: number;
  captions: { until: number; text: string }[];
};

// SVG geometry
const W = 640;
const H = 340;
const PAD_L = 48;
const PAD_R = 28;
const PAD_T = 36;
const PAD_B = 96;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;

// Illustrative Q-hat for a split starting at `idx`.
function qhatOf(values: number[], idx: number): number {
  const left = values.slice(0, idx);
  const right = values.slice(idx);
  if (left.length === 0 || right.length === 0) return 0;
  const sep = Math.abs(mean(left) - mean(right));
  const balance = (left.length * right.length) / values.length;
  return sep * balance;
}

function bestSplit(values: number[]): number {
  let best = 1;
  let bestQ = -Infinity;
  for (let i = 1; i < values.length; i++) {
    const q = qhatOf(values, i);
    if (q > bestQ) {
      bestQ = q;
      best = i;
    }
  }
  return best;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const phase = (p: number, from: number, to: number) => {
  const t = clamp01((p - from) / (to - from));
  return t * t * (3 - 2 * t);
};

const LOOP_MS = 15000;
const LINE_LEN = 900;

// ── the two demos ──────────────────────────────────────────────
const REGRESSION: DemoConfig = {
  title: "A real regression — Otava alerts",
  metric: "throughput",
  values: [120, 118, 121, 119, 95, 97, 94, 96],
  commits: ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"],
  changeIndex: 4,
  domain: [80, 130],
  qScale: 1,
  captions: [
    { until: 0.12, text: "A single metric's history — one point per commit." },
    {
      until: 0.44,
      text: "Score every possible before/after split by divergence (Q̂).",
    },
    { until: 0.54, text: "Lock onto the split with the highest divergence." },
    {
      until: 0.7,
      text: "Confirm it with a significance test — whole segments, not single points.",
    },
    {
      until: 1.01,
      text: "Persistent shift → alert, and isolate the offending commit.",
    },
  ],
};

const STABLE: DemoConfig = {
  title: "Just noise — Otava stays quiet",
  metric: "throughput",
  values: [104, 117, 96, 112, 99, 119, 94, 110],
  commits: ["d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7"],
  changeIndex: null,
  domain: [80, 130],
  qScale: 1,
  captions: [
    { until: 0.12, text: "Same metric, but the data is just noisy this time." },
    {
      until: 0.44,
      text: "Score every possible before/after split by divergence (Q̂).",
    },
    {
      until: 0.7,
      text: "Even the best split fails the significance test (high p-value).",
    },
    {
      until: 1.01,
      text: "No persistent shift → no false alarm. Nothing is sent.",
    },
  ],
};

// Share one heat scale across both so "loud" vs "quiet" reads honestly.
const Q_SCALE = Math.max(
  ...REGRESSION.values.map((_, i) => qhatOf(REGRESSION.values, i)),
);
REGRESSION.qScale = Q_SCALE;
STABLE.qScale = Q_SCALE;

export const DEMOS = { REGRESSION, STABLE };

function captionIndex(cfg: DemoConfig, p: number) {
  return cfg.captions.findIndex((c) => p < c.until);
}

export default function ChangePointDemo({
  config,
}: {
  config: DemoConfig;
}): JSX.Element {
  const reduce = useReducedMotion();
  const { values, commits, changeIndex, domain } = config;
  const n = values.length;

  const x = (i: number) => PAD_L + (i * PLOT_W) / (n - 1);
  const y = (v: number) =>
    PAD_T + (1 - (v - domain[0]) / (domain[1] - domain[0])) * PLOT_H;
  const splitX = (idx: number) => (x(idx - 1) + x(idx)) / 2;

  const isRegression = changeIndex !== null;
  const markIdx = isRegression ? (changeIndex as number) : bestSplit(values);
  const meanBefore = mean(values.slice(0, markIdx));
  const meanAfter = mean(values.slice(markIdx));
  const pctChange = (meanAfter / meanBefore - 1) * 100;

  const SPLIT_INDICES = values.map((_, i) => i).filter((i) => i >= 1);

  // managed clock triggered by viewport entry
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.35 });
  const [p, setP] = useState(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) {
      setP(1);
      return;
    }
    if (!isInView) {
      setP(0);
      return;
    }

    let startTime = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = (elapsed % LOOP_MS) / LOOP_MS;
      setP(progress);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, reduce]);

  // phase timeline
  const drawT = phase(p, 0.0, 0.1);
  const sweepT = phase(p, 0.12, 0.44);
  const lockT = phase(p, 0.44, 0.52);
  const testT = phase(p, 0.54, 0.68);
  const reportShown = p >= 0.7;

  const sweepIdx = lerp(1, n - 1, sweepT);
  const sweepPx = lerp(splitX(1), splitX(n - 1), sweepT);
  const barX = lockT > 0 ? lerp(sweepPx, splitX(markIdx), lockT) : sweepPx;
  const locked = lockT >= 1;

  const linePath = values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`)
    .join(" ");

  return (
    <motion.figure
      ref={ref}
      className={styles.demo}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <figcaption className={styles.title}>
        <span
          className={isRegression ? styles.tagBad : styles.tagGood}
          style={{ opacity: reportShown ? 1 : 0.35 }}
        >
          {isRegression ? "● regression" : "● stable"}
        </span>
        {config.title}
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.svg}
        role="img"
        aria-label={config.title}
      >
        <line
          x1={PAD_L}
          y1={PAD_T + PLOT_H}
          x2={W - PAD_R}
          y2={PAD_T + PLOT_H}
          className={styles.axis}
        />

        {/* segments + means (only when a real change-point locks) */}
        {isRegression && locked && (
          <g style={{ opacity: testT }}>
            <rect
              x={PAD_L}
              y={PAD_T}
              width={splitX(markIdx) - PAD_L}
              height={PLOT_H}
              className={styles.segBefore}
            />
            <rect
              x={splitX(markIdx)}
              y={PAD_T}
              width={W - PAD_R - splitX(markIdx)}
              height={PLOT_H}
              className={styles.segAfter}
            />
            <line
              x1={PAD_L}
              y1={y(meanBefore)}
              x2={splitX(markIdx)}
              y2={y(meanBefore)}
              className={styles.meanBefore}
            />
            <line
              x1={splitX(markIdx)}
              y1={y(meanAfter)}
              x2={W - PAD_R}
              y2={y(meanAfter)}
              className={styles.meanAfter}
            />
          </g>
        )}

        {/* sweeping split bar */}
        {sweepT > 0 && !locked && (
          <line
            x1={barX}
            y1={PAD_T - 6}
            x2={barX}
            y2={PAD_T + PLOT_H + 6}
            className={styles.splitSweep}
          />
        )}

        {/* verdict bar: locked (regression) or rejected (stable) */}
        <AnimatePresence>
          {isRegression && locked && (
            <motion.line
              x1={splitX(markIdx)}
              y1={PAD_T - 6}
              x2={splitX(markIdx)}
              y2={PAD_T + PLOT_H + 6}
              className={styles.splitLocked}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            />
          )}
        </AnimatePresence>
        {!isRegression && p >= 0.5 && (
          <line
            x1={splitX(markIdx)}
            y1={PAD_T - 6}
            x2={splitX(markIdx)}
            y2={PAD_T + PLOT_H + 6}
            className={styles.splitRejected}
            style={{ opacity: phase(p, 0.5, 0.62) * (reportShown ? 0.5 : 1) }}
          />
        )}

        {/* metric line */}
        <path
          d={linePath}
          className={styles.line}
          style={{
            strokeDasharray: LINE_LEN,
            strokeDashoffset: LINE_LEN * (1 - drawT),
          }}
        />

        {/* points */}
        {values.map((v, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(v)}
            r={4.5}
            className={
              isRegression && locked && i >= markIdx
                ? `${styles.dot} ${styles.dotAfter}`
                : styles.dot
            }
            style={{ opacity: drawT }}
          />
        ))}

        {/* commit labels */}
        {commits.map((c, i) => (
          <text
            key={c}
            x={x(i)}
            y={PAD_T + PLOT_H + 18}
            className={styles.commit}
            style={{ opacity: drawT }}
          >
            {c}
          </text>
        ))}

        {/* Q̂ divergence strip */}
        {SPLIT_INDICES.map((idx) => {
          const cx = splitX(idx);
          const cellW = PLOT_W / n;
          const revealed = sweepIdx >= idx - 0.05 || p >= 0.46;
          const intensity = revealed ? qhatOf(values, idx) / config.qScale : 0;
          return (
            <rect
              key={idx}
              x={cx - cellW / 2}
              y={PAD_T + PLOT_H + 32}
              width={cellW - 3}
              height={14}
              rx={2}
              className={styles.qcell}
              style={{ opacity: revealed ? 0.18 + 0.8 * intensity : 0.08 }}
            />
          );
        })}
        <text
          x={PAD_L}
          y={PAD_T + PLOT_H + 60}
          className={styles.qlabel}
          style={{ opacity: phase(p, 0.16, 0.26) }}
        >
          Q̂ divergence per candidate split
        </text>

        {/* report badge (regression only) */}
        <AnimatePresence>
          {isRegression && reportShown && (
            <motion.g
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ transformBox: "fill-box", transformOrigin: "left top" }}
            >
              <rect
                x={splitX(markIdx) + 8}
                y={PAD_T + 6}
                width={132}
                height={42}
                rx={6}
                className={styles.badge}
              />
              <text
                x={splitX(markIdx) + 18}
                y={PAD_T + 24}
                className={styles.badgePct}
              >
                {pctChange.toFixed(1)}%
              </text>
              <text
                x={splitX(markIdx) + 18}
                y={PAD_T + 39}
                className={styles.badgeMeta}
              >
                p &lt; 0.001 · {commits[markIdx]}
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* report card */}
      <div className={styles.reportWrap}>
        <AnimatePresence>
          {reportShown && (
            <motion.div
              className={styles.report}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {(isRegression
                ? regressionReport(config, meanBefore, meanAfter, pctChange)
                : stableReport(config)
              ).map((line, i) => (
                <motion.div
                  key={line.key}
                  className={styles.reportLine}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.18, duration: 0.25 }}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <figcaption className={styles.caption}>
        <AnimatePresence mode="wait">
          <motion.span
            key={captionIndex(config, p)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {config.captions[Math.max(0, captionIndex(config, p))].text}
          </motion.span>
        </AnimatePresence>
      </figcaption>
    </motion.figure>
  );
}

function regressionReport(
  cfg: DemoConfig,
  before: number,
  after: number,
  pct: number,
): JSX.Element[] {
  const c = cfg.commits;
  const i = cfg.changeIndex as number;
  return [
    <span key="cmd" className={styles.reportCmd}>
      $ otava analyze {cfg.metric} --format regressions_only
    </span>,
    <span key="hdr" className={styles.reportHdr}>
      Regressions in {cfg.metric}:
    </span>,
    <span key="metric">
      {"  "}
      {cfg.metric} : <b>{before.toFixed(1)}</b>
      {"  ⟶  "}
      <b className={styles.reportBad}>{after.toFixed(1)}</b>
      {"   ("}
      <b className={styles.reportBad}>{pct.toFixed(1)}%</b>
      {")   p < 0.001"}
    </span>,
    <span key="iso" className={styles.reportIso}>
      {"  ▸ isolated to commit "}
      <span className={styles.commitBad}>{c[i]}</span>
      {"   (last good "}
      <span className={styles.commitGood}>{c[i - 1]}</span>
      {" ⟶ first bad "}
      <span className={styles.commitBad}>{c[i]}</span>
      {")"}
    </span>,
    <span key="act" className={styles.reportAct}>
      {"  → alert sent to Slack · suggested action: revert "}
      <span className={styles.commitBad}>{c[i]}</span>
    </span>,
  ];
}

function stableReport(cfg: DemoConfig): JSX.Element[] {
  return [
    <span key="cmd" className={styles.reportCmd}>
      $ otava analyze {cfg.metric} --format regressions_only
    </span>,
    <span key="ok" className={styles.reportOk}>
      ✓ No regressions found in {cfg.metric}.
    </span>,
    <span key="why" className={styles.reportIso}>
      {"  best split rejected — p = 0.58 > 0.01 threshold"}
    </span>,
    <span key="quiet" className={styles.reportIso}>
      {"  8 data points recorded · 0 alerts sent"}
    </span>,
  ];
}
