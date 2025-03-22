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

import clsx from "clsx";
import styles from "./styles.module.css";

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx("text--center", "padding-horiz--md")}>
          <h2>
            Otava - Change Detection for Continuous Performance Engineering
          </h2>
          <p className={styles.description}>
            Otava performs statistical analysis of performance test results
            stored in CSV files, PostgreSQL, BigQuery, or Graphite database. It
            finds change-points and notifies about possible performance
            regressions.
          </p>
          <div className={styles.buttons}>
            <a
              href="/docs/getting-started"
              className="button button--primary button--lg"
            >
              Get Started
            </a>
            <a
              href="https://github.com/apache/otava"
              className="button button--secondary button--lg"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
