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

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTime,
  useTransform,
} from "motion/react";
import styles from "./FlowAnimation.module.css";

/**
 * Banner animation telling the operational story:
 *   - data is recorded *continuously* from every source into Otava
 *   - most of the time nothing happens — Otava just records & analyzes
 *   - only when a real change-point is detected does Otava raise an ALERT
 *     (to Slack) and surface an action: revert the offending commit
 */

// SVG geometry
const W = 880;
const H = 248;

// New Performance Test Node on the left
const TEST_X = 24;
const TEST_W = 140;
const NODE_H = 34;

// Data Sources shifted to the right
const SRC_X = 236;
const SRC_W = 96;

// Otava box shifted to the right
const BOX_X = 486;
const BOX_W = 120;
const BOX_Y = 92;
const BOX_H = 64;
const CX = BOX_X + BOX_W / 2;
const CY = BOX_Y + BOX_H / 2;

// Output nodes on the far right
const OUT_X = W - 24 - 120; // 880 - 24 - 120 = 736
const OUT_W = 120;

const SOURCES = ["CSV", "PostgreSQL", "BigQuery", "Graphite"];

const srcY = (i: number) => 40 + i * 56; // 40, 96, 152, 208
const ALERT_Y = 104;
const ACTION_Y = 168;

const testFrom = { x: TEST_X + TEST_W, y: CY };
const testTo = (i: number) => ({ x: SRC_X, y: srcY(i) });
const inFrom = (i: number) => ({ x: SRC_X + SRC_W, y: srcY(i) });
const inTo = { x: BOX_X, y: CY };
const outFrom = { x: BOX_X + BOX_W, y: CY };
const alertTo = { x: OUT_X, y: ALERT_Y };

const CYCLE = 1.6; // seconds for an in-packet to traverse a lane
const PACKETS_PER_LANE = 2;

const LOOP_MS = 9000;

// A continuously-streaming data packet (always flowing = constant recording).
function InPacket({
  from,
  to,
  delay,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
}) {
  return (
    <motion.circle
      r={4}
      className={styles.packetIn}
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: [from.x, to.x],
        cy: [from.y, to.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration: CYCLE, ease: "linear", repeat: Infinity, delay }}
    />
  );
}

export default function FlowAnimation(): JSX.Element {
  const reduce = useReducedMotion();

  const time = useTime();
  const progress = useTransform(time, (t) =>
    reduce ? 0.75 : (t % LOOP_MS) / LOOP_MS,
  );
  const [p, setP] = useState(reduce ? 0.75 : 0);
  useMotionValueEvent(progress, "change", setP);

  // Most of the loop = quietly recording. A change is "detected" late in the
  // loop, which fires the alert + action.
  const alerting = p >= 0.55 && p < 0.92;
  const status = alerting ? "change detected" : "recording…";

  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.svg}
        role="img"
        aria-label="Performance tests run and publish metrics like CPU and throughput to CSV, PostgreSQL, BigQuery, or Graphite. Otava continuously ingests and monitors these sources, alerting Slack only when a real regression is detected."
      >
        {/* test-to-source lanes */}
        {SOURCES.map((_, i) => {
          const t = testTo(i);
          return (
            <line
              key={`tl${i}`}
              x1={testFrom.x}
              y1={testFrom.y}
              x2={t.x}
              y2={t.y}
              className={styles.lane}
            />
          );
        })}

        {/* source-to-otava lanes */}
        {SOURCES.map((_, i) => {
          const f = inFrom(i);
          return (
            <line
              key={`il${i}`}
              x1={f.x}
              y1={f.y}
              x2={inTo.x}
              y2={inTo.y}
              className={styles.lane}
            />
          );
        })}
        {/* alert lane — only appears once Otava turns red (a change is detected) */}
        {alerting && (
          <line
            x1={outFrom.x}
            y1={outFrom.y}
            x2={alertTo.x}
            y2={alertTo.y}
            className={styles.laneAlert}
          />
        )}

        {/* continuous inbound data packets */}
        {!reduce &&
          SOURCES.map((_, i) =>
            Array.from({ length: PACKETS_PER_LANE }).map((__, k) => (
              <g key={`packets-${i}-${k}`}>
                {/* 1. from performance tests to data source */}
                <InPacket
                  from={testFrom}
                  to={testTo(i)}
                  delay={i * 0.16 + (k * CYCLE) / PACKETS_PER_LANE}
                />
                {/* 2. from data source to Otava (offset by half a cycle for smooth continuity) */}
                <InPacket
                  from={inFrom(i)}
                  to={inTo}
                  delay={i * 0.16 + (k * CYCLE) / PACKETS_PER_LANE + CYCLE / 2}
                />
              </g>
            )),
          )}

        {/* alert packet — only emitted while alerting */}
        <AnimatePresence>
          {alerting && !reduce && (
            <motion.circle
              r={5}
              className={styles.packetAlert}
              initial={{ cx: outFrom.x, cy: outFrom.y, opacity: 0 }}
              animate={{
                cx: [outFrom.x, alertTo.x],
                cy: [outFrom.y, alertTo.y],
                opacity: [0, 1, 1, 1],
              }}
              transition={{ duration: 0.9, ease: "easeOut", repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        {/* performance tests node */}
        <g>
          <rect
            x={TEST_X}
            y={CY - NODE_H / 2}
            width={TEST_W}
            height={NODE_H}
            rx={7}
            className={styles.testNode}
          />
          <text x={TEST_X + TEST_W / 2} y={CY + 4} className={styles.nodeLabel}>
            Performance Tests
          </text>
        </g>

        {/* source nodes */}
        {SOURCES.map((name, i) => (
          <g key={name}>
            <rect
              x={SRC_X}
              y={srcY(i) - NODE_H / 2}
              width={SRC_W}
              height={NODE_H}
              rx={7}
              className={styles.srcNode}
            />
            <text x={SRC_X + SRC_W / 2} y={srcY(i) + 4} className={styles.nodeLabel}>
              {name}
            </text>
          </g>
        ))}

        {/* Otava engine — flashes on detection */}
        <motion.rect
          x={BOX_X}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx={12}
          className={alerting ? styles.engineAlert : styles.engine}
          animate={alerting ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 0.6, repeat: alerting ? Infinity : 0 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <text x={CX} y={CY - 6} className={styles.engineName}>
          Otava
        </text>
        <AnimatePresence mode="wait">
          <motion.text
            key={status}
            x={CX}
            y={CY + 13}
            className={alerting ? styles.engineSubAlert : styles.engineSub}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {status}
          </motion.text>
        </AnimatePresence>

        {/* alert + action nodes (appear on detection) */}
        <AnimatePresence>
          {alerting && (
            <motion.g
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
            >
              {/* Slack alert */}
              <rect
                x={OUT_X}
                y={ALERT_Y - NODE_H / 2}
                width={OUT_W}
                height={NODE_H}
                rx={7}
                className={styles.alertNode}
              />
              <text x={OUT_X + OUT_W / 2} y={ALERT_Y + 4} className={styles.alertLabel}>
                ⚠ Slack alert
              </text>

              {/* recommended action */}
              <rect
                x={OUT_X}
                y={ACTION_Y - NODE_H / 2}
                width={OUT_W}
                height={NODE_H}
                rx={7}
                className={styles.actionNode}
              />
              <text x={OUT_X + OUT_W / 2} y={ACTION_Y + 4} className={styles.actionLabel}>
                ↩ Revert PR
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      <p className={styles.caption}>
        {alerting
          ? "Persistent regression detected in metrics (e.g., CPU or throughput) → Otava alerts Slack and pinpoints the bad commit."
          : "Performance tests run continuously, publishing metrics (like CPU and throughput) to data sources. Otava pulls and analyzes them."}
      </p>
    </motion.div>
  );
}

