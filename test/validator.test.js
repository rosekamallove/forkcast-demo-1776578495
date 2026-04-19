import { test } from "node:test";
import assert from "node:assert/strict";
import { validate } from "../src/validator.js";
import { ValidationError } from "../src/errors.js";

const SCHEMA = {
  NAME: { type: "string", required: true },
  PORT: { type: "number", default: 8080 },
  DEBUG: { type: "boolean", default: false },
};

test("validate: applies defaults for missing optional keys", () => {
  const out = validate({ NAME: "demo" }, SCHEMA);
  assert.deepEqual(out, { NAME: "demo", PORT: 8080, DEBUG: false });
});

test("validate: throws when required key is missing", () => {
  assert.throws(() => validate({}, SCHEMA), ValidationError);
});

test("validate: coerces number strings", () => {
  const out = validate({ NAME: "x", PORT: "3000" }, SCHEMA);
  assert.equal(out.PORT, 3000);
});

test("validate: coerces boolean strings", () => {
  assert.equal(validate({ NAME: "x", DEBUG: "true" }, SCHEMA).DEBUG, true);
  assert.equal(validate({ NAME: "x", DEBUG: "0" }, SCHEMA).DEBUG, false);
});

test("validate: rejects non-numeric strings for number type", () => {
  assert.throws(() => validate({ NAME: "x", PORT: "abc" }, SCHEMA), ValidationError);
});

test("validate: rejects unrecognised boolean strings", () => {
  assert.throws(() => validate({ NAME: "x", DEBUG: "maybe" }, SCHEMA), ValidationError);
});
