import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test("README.md: no typo 'teh' (should be 'the')", () => {
  const readmePath = join(process.cwd(), "README.md");
  const content = readFileSync(readmePath, "utf-8");
  assert.ok(!content.includes("teh"), "README.md should not contain the typo 'teh'");
});
