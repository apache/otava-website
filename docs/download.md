<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

# Download Apache Otava (Incubating)

Apache Otava is released as source code tarballs with corresponding binary convenience artifacts. The latest release is available below.

All releases are available under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Verify Releases

You can verify releases using the provided signatures and checksums. The [KEYS](https://downloads.apache.org/incubator/otava/KEYS) file contains the public PGP keys for signature verification. See [How to Verify](https://www.apache.org/info/verification.html) for details.

## Latest Release

### 0.7.0 (Latest)

Released: January 2025

| Package | Download | Signature | Checksum |
|---------|----------|-----------|----------|
| Source | [apache-otava-0.7.0-incubating-src.tar.gz](https://dist.apache.org/repos/dist/dev/incubator/otava/0.7.0-incubating/apache-otava-0.7.0-incubating-src.tar.gz) | [asc](https://dist.apache.org/repos/dist/dev/incubator/otava/0.7.0-incubating/apache-otava-0.7.0-incubating-src.tar.gz.asc) | [sha512](https://dist.apache.org/repos/dist/dev/incubator/otava/0.7.0-incubating/apache-otava-0.7.0-incubating-src.tar.gz.sha512) |

**Other ways to install:**

- **PyPI**: `pip install apache-otava==0.7.0`
- **Docker**: `docker pull apache/otava:0.7.0`

[Release Notes](https://github.com/apache/otava/releases/tag/0.7.0-incubating) | [Documentation](/docs/getting-started)

## All Releases

All Apache Otava releases are available from the [Apache Download Archive](https://archive.apache.org/dist/incubator/otava/).

| Version | Release Date  | Download | Release Notes |
|---------|---------------|----------|---------------|
| 0.7.0 | December 2025 | [Source](https://dist.apache.org/repos/dist/dev/incubator/otava/0.7.0-incubating/apache-otava-0.7.0-incubating-src.tar.gz) ([asc](https://dist.apache.org/repos/dist/dev/incubator/otava/0.7.0-incubating/apache-otava-0.7.0-incubating-src.tar.gz.asc), [sha512](https://dist.apache.org/repos/dist/dev/incubator/otava/0.7.0-incubating/apache-otava-0.7.0-incubating-src.tar.gz.sha512)) | [Notes](https://github.com/apache/otava/releases/tag/0.7.0-incubating) |
| 0.6.1 | July 2025     | [Source](https://dist.apache.org/repos/dist/dev/incubator/otava/0.6.1-incubating/apache-otava-incubating-0.6.1-rc1-src.tar.gz) ([asc](https://dist.apache.org/repos/dist/dev/incubator/otava/0.6.1-incubating/apache-otava-incubating-0.6.1-rc1-src.tar.gz.asc), [sha512](https://dist.apache.org/repos/dist/dev/incubator/otava/0.6.1-incubating/apache-otava-incubating-0.6.1-rc1-src.tar.gz.sha512)) |  |
| 0.6.0 | June 2025     | [Source](https://dist.apache.org/repos/dist/dev/incubator/otava/0.6.0-incubating/apache-otava-incubating-0.6.0-rc5-src.tar.gz) ([asc](https://dist.apache.org/repos/dist/dev/incubator/otava/0.6.0-incubating/apache-otava-incubating-0.6.0-rc5-src.tar.gz.asc), [sha512](https://dist.apache.org/repos/dist/dev/incubator/otava/0.6.0-incubating/apache-otava-incubating-0.6.0-rc5-src.tar.gz.sha512)) |  |

## Install from PyPI

The recommended way to install Apache Otava for most users is via PyPI:

```bash
pip install apache-otava
```

For a specific version:

```bash
pip install apache-otava==0.7.0
```

## Install from Docker

Pull the official Docker image from Docker Hub:

```bash
docker pull apache/otava
```

For a specific version:

```bash
docker pull apache/otava:0.7.0
```

## Build from Source

To build Apache Otava from source, clone the repository and install:

```bash
git clone https://github.com/apache/otava.git
cd otava
pip install -e .
```

For more details, see the [Installation Guide](/docs/install) and [Getting Started](/docs/getting-started) documentation.
