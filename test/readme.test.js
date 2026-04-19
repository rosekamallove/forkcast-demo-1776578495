import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const readmePath = join(__dirname, "..", "README.md");
const readme = readFileSync(readmePath, "utf8");

test("README.md: does not contain the 'teh' typo", () => {
  // Match 'teh' as a whole word (case-insensitive), which is a common typo for 'the'.
  const typoRegex = /\bteh\b/i;
  assert.ok(
    !typoRegex.test(readme),
    "README.md should not contain the word 'teh' (likely a typo for 'the')",
  );
});
