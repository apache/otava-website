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

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// Check https://docusaurus.io/docs/sidebar/ for more information.
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "doc",
      id: "overview",
      label: "About",
    },
    {
      type: "category",
      label: "Getting Started",
      items: ["install", "getting-started", "contribute", "basics"],
      collapsed: false,
    },
    {
      type: "category",
      label: "Data Sources",
      items: [
        {
          type: "doc",
          id: "graphite",
          label: "Graphite",
        },
        {
          type: "doc",
          id: "postgresql",
          label: "PostgreSQL",
        },
        {
          type: "doc",
          id: "big-query",
          label: "BigQuery",
        },
        {
          type: "doc",
          id: "csv",
          label: "CSV",
        },
        {
          type: "doc",
          id: "grafana",
          label: "Grafana",
        },
      ],
      collapsed: false,
    },
  ],
};

export default sidebars;
