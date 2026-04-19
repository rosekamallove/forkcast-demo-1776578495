import { test } from "node:test";
import assert from "node:assert/strict";
import { pageStats, pageWindow } from "../src/pager.js";

test("pageStats: [3, 5, 2] totals 10 items across 3 pages", () => {
  const s = pageStats([3, 5, 2]);
  assert.equal(s.pages, 3);
  assert.equal(s.total, 10);
});

test("pageStats: cumulativeIndexSum for 10 items is 55 (1+2+...+10)", () => {
  const s = pageStats([3, 5, 2]);
  assert.equal(s.cumulativeIndexSum, 55);
});

test("pageStats: cumulativeIndexSum for a single 5-item page is 15", () => {
  const s = pageStats([5]);
  assert.equal(s.cumulativeIndexSum, 15);
});

test("pageStats: empty array yields zeros", () => {
  const s = pageStats([]);
  assert.deepEqual(s, { pages: 0, total: 0, cumulativeIndexSum: 0 });
});

test("pageStats: rejects non-array input", () => {
  assert.throws(() => pageStats("nope"), TypeError);
});

test("pageWindow: page 1 of size 10 over total 25 is [1..10]", () => {
  assert.deepEqual(pageWindow(1, 10, 25), { start: 1, end: 10 });
});

test("pageWindow: last page is clamped to total", () => {
  assert.deepEqual(pageWindow(3, 10, 25), { start: 21, end: 25 });
});
