import { ConfigError } from "./errors.js";

/**
 * Parse a KEY=VALUE config string into a plain object.
 * - Lines starting with `#` are treated as comments.
 * - Blank lines are ignored.
 * - Values may be wrapped in double quotes (which will be stripped).
 * - An empty or nullish input produces an empty config `{}`.
 *
 * @param {string | null | undefined} text
 * @returns {Record<string, string>}
 */
export function parseConfig(text) {
  const out = {};
  if (text == null || text === "") return out;
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) {
      throw new ConfigError(`missing '=' on config line`, { line: i + 1 });
    }

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (!/^[A-Z_][A-Z0-9_]*$/i.test(key)) {
      throw new ConfigError(`invalid key "${key}"`, { line: i + 1, key });
    }

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    out[key] = value;
  }
  return out;
}

/** Merge two config objects; values in `b` override `a`. */
export function mergeConfig(a, b) {
  return { ...a, ...b };
}
