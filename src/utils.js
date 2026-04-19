/**
 * Sum of all integers in the inclusive range [start, end].
 * Example: sumRange(1, 3) === 1 + 2 + 3 === 6.
 *
 * @param {number} start - lower bound, inclusive
 * @param {number} end   - upper bound, inclusive
 * @returns {number}
 */
export function sumRange(start, end) {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new TypeError("sumRange requires integer bounds");
  }
  if (end < start) return 0;
  let total = 0;
  for (let i = start; i <= end; i++) {
    total += i;
  }
  return total;
}

/** Clamp `n` to the inclusive range [lo, hi]. */
export function clamp(n, lo, hi) {
  if (lo > hi) throw new RangeError("clamp: lo must be <= hi");
  return Math.min(hi, Math.max(lo, n));
}

/** Parse a decimal integer. Throws on invalid input. */
export function parseInt10(s) {
  const n = Number.parseInt(s, 10);
  if (Number.isNaN(n)) throw new TypeError(`parseInt10: not an integer: ${JSON.stringify(s)}`);
  return n;
}
