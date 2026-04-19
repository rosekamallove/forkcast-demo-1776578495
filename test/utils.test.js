import { test } from "node:test";
import assert from "node:assert/strict";
import { sumRange, clamp, parseInt10 } from "../src/utils.js";

test("sumRange: 1..3 equals 6", () => {
  assert.equal(sumRange(1, 3), 6);
});

test("sumRange: 1..10 equals 55", () => {
  assert.equal(sumRange(1, 10), 55);
});

test("sumRange: single-element range [5..5] equals 5", () => {
  assert.equal(sumRange(5, 5), 5);
});

test("sumRange: empty range when end < start is 0", () => {
  assert.equal(sumRange(7, 3), 0);
});

test("sumRange: includes `end` (regression: off-by-one)", () => {
  // Previously the loop used `i < end`, which excluded the upper bound.
  // 2..4 must include 4: 2 + 3 + 4 === 9.
  assert.equal(sumRange(2, 4), 9);
  // Negative ranges should also include both endpoints.
  assert.equal(sumRange(-2, 2), 0); // -2 + -1 + 0 + 1 + 2
  assert.equal(sumRange(-3, -1), -6); // -3 + -2 + -1
});

test("sumRange: rejects non-integer bounds", () => {
  assert.throws(() => sumRange(1.5, 3), TypeError);
});

test("clamp: basic bounds", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
});

test("clamp: rejects inverted bounds", () => {
  assert.throws(() => clamp(1, 10, 0), RangeError);
});

test("parseInt10: happy path", () => {
  assert.equal(parseInt10("42"), 42);
  assert.equal(parseInt10("-7"), -7);
});

test("parseInt10: rejects garbage", () => {
  assert.throws(() => parseInt10("not a number"), TypeError);
});
