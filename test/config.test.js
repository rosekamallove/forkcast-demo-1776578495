import { test } from "node:test";
import assert from "node:assert/strict";
import { parseConfig, mergeConfig } from "../src/config.js";
import { ConfigError } from "../src/errors.js";

test("parseConfig: basic KEY=VALUE pairs", () => {
  const cfg = parseConfig("APP_NAME=demo\nPORT=8080\n");
  assert.deepEqual(cfg, { APP_NAME: "demo", PORT: "8080" });
});

test("parseConfig: strips surrounding double quotes", () => {
  const cfg = parseConfig(`GREETING="hello world"\n`);
  assert.equal(cfg.GREETING, "hello world");
});

test("parseConfig: ignores blank lines and comments", () => {
  const text = `
# this is a comment
APP_NAME=demo

# another
DEBUG=true
`;
  const cfg = parseConfig(text);
  assert.deepEqual(cfg, { APP_NAME: "demo", DEBUG: "true" });
});

test("parseConfig: throws ConfigError on malformed line", () => {
  assert.throws(() => parseConfig("NOEQUALS\n"), ConfigError);
});

test("parseConfig: throws ConfigError on invalid key", () => {
  assert.throws(() => parseConfig("1BAD=x\n"), ConfigError);
});

test("parseConfig: nullish input returns empty object", () => {
  assert.deepEqual(parseConfig(null), {});
  assert.deepEqual(parseConfig(undefined), {});
  assert.deepEqual(parseConfig(""), {});
});

// Regression test for issue #2: parseConfig crashed with TypeError when
// passed null/undefined (e.g. from cli.js when no config path is supplied).
test("parseConfig: nullish input does not throw (regression #2)", () => {
  assert.doesNotThrow(() => parseConfig(null));
  assert.doesNotThrow(() => parseConfig(undefined));
});

test("mergeConfig: right-hand wins on conflict", () => {
  const merged = mergeConfig({ A: "1", B: "2" }, { B: "3", C: "4" });
  assert.deepEqual(merged, { A: "1", B: "3", C: "4" });
});
