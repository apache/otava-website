# Importing results from BigQuery

## Schema

See [schema.sql](https://github.com/apache/otava/tree/master/examples/bigquery/schema.sql) for the example schema.

## Usage

Define BigQuery connection details via environment variables:

```bash
export BIGQUERY_PROJECT_ID=...
export BIGQUERY_DATASET=...
export BIGQUERY_VAULT_SECRET=...
```
or in `otava.yaml`.

Also configure the credentials. See [config_credentials.sh](https://github.com/apache/otava/tree/master/examples/bigquery/config_credentials.sh) for an example.

The following command shows results for a single test `aggregate_mem` and updates the database with newly found change points:

```bash
$ BRANCH=trunk OTAVA_CONFIG=otava.yaml otava analyze aggregate_mem --update-bigquery
```
