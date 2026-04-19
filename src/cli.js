#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { parseConfig } from "./config.js";
import { validate } from "./validator.js";
import { pageStats } from "./pager.js";

const SCHEMA = {
  APP_NAME: { type: "string", required: true },
  PAGE_SIZE: { type: "number", default: 10 },
  VERBOSE: { type: "boolean", default: false },
};

function main(argv) {
  const [, , configPath, ...rest] = argv;
  const raw = configPath ? readFileSync(configPath, "utf8") : null;
  const parsed = parseConfig(raw);
  const cfg = validate(parsed, SCHEMA);

  const sizes = rest.map((n) => Number.parseInt(n, 10)).filter((n) => Number.isInteger(n));
  const stats = sizes.length ? pageStats(sizes) : { pages: 0, total: 0, cumulativeIndexSum: 0 };

  const report = {
    app: cfg.APP_NAME,
    pageSize: cfg.PAGE_SIZE,
    verbose: cfg.VERBOSE,
    stats,
  };

  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
}

main(process.argv);
