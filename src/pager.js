import { sumRange, clamp } from "./utils.js";

/**
 * Compute stats for a list of page sizes.
 *
 * Given an array of page sizes like [3, 5, 2], return an object describing
 * the total number of items and a "cumulative index sum" which is defined as
 * the sum of all 1-indexed item positions (1 + 2 + ... + total).
 *
 * Used by the reporting layer to produce ordinal-weighted summaries.
 *
 * @param {number[]} pageSizes - non-negative integers
 * @returns {{ pages: number, total: number, cumulativeIndexSum: number }}
 */
export function pageStats(pageSizes) {
  if (!Array.isArray(pageSizes)) {
    throw new TypeError("pageStats: expected an array of page sizes");
  }
  const pages = pageSizes.length;
  const total = pageSizes.reduce((a, b) => a + b, 0);
  const cumulativeIndexSum = sumRange(1, total);
  return { pages, total, cumulativeIndexSum };
}

/**
 * Select a single page window [start, end] (1-indexed, inclusive) given a
 * page number and a page size, clamped to `total`.
 *
 * @param {number} pageNumber   - 1-indexed
 * @param {number} pageSize
 * @param {number} total
 * @returns {{ start: number, end: number }}
 */
export function pageWindow(pageNumber, pageSize, total) {
  const start = (pageNumber - 1) * pageSize + 1;
  const end = clamp(start + pageSize - 1, 1, total);
  return { start, end };
}
