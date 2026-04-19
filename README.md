# rangecfg

A tiny Node utility that loads a KEY=VALUE config file, validates it against a schema, and renders paginated numeric reports. Used as the reference harness for the ForkCast hackathon demo.

## Install

```
npm install
```

## Usage

```
rangecfg path/to/app.conf  3 5 2
```

Reads `app.conf`, validates it against the built-in schema, and prints a JSON report for the provided page sizes.

### Example config

```
# app.conf
APP_NAME="My App"
PAGE_SIZE=10
VERBOSE=true
```

## Modules

- `src/utils.js` — numeric helpers (`sumRange`, `clamp`, `parseInt10`).
- `src/config.js` — KEY=VALUE parser with comment + blank-line handling (`parseConfig`, `mergeConfig`).
- `src/validator.js` — minimal schema validator with type coercion.
- `src/pager.js` — page-size arithmetic that depends on `sumRange`.
- `src/cli.js` — the executable entrypoint.

## Running the tests

```
npm test
```

The suite uses Node's built-in `node:test` runner — no dependencies.
