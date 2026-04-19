import { ValidationError } from "./errors.js";

/**
 * Very small schema validator. A schema is a map of key -> descriptor:
 *   { type: "string" | "number" | "boolean", required?: boolean, default?: any }
 *
 * Returns a coerced copy of the config. Throws ValidationError on any problem.
 *
 * @param {Record<string, string>} cfg
 * @param {Record<string, {type: string, required?: boolean, default?: any}>} schema
 */
export function validate(cfg, schema) {
  const out = {};
  for (const [key, descriptor] of Object.entries(schema)) {
    const raw = cfg[key];
    if (raw === undefined) {
      if (descriptor.required) {
        throw new ValidationError(`missing required key "${key}"`, { key, expected: descriptor.type });
      }
      if ("default" in descriptor) {
        out[key] = descriptor.default;
      }
      continue;
    }
    out[key] = coerce(raw, descriptor.type, key);
  }
  return out;
}

function coerce(raw, type, key) {
  switch (type) {
    case "string":
      return String(raw);
    case "number": {
      const n = Number(raw);
      if (Number.isNaN(n)) {
        throw new ValidationError(`key "${key}" is not a number`, { key, expected: "number", got: raw });
      }
      return n;
    }
    case "boolean":
      if (raw === "true" || raw === "1") return true;
      if (raw === "false" || raw === "0") return false;
      throw new ValidationError(`key "${key}" is not a boolean`, { key, expected: "boolean", got: raw });
    default:
      throw new ValidationError(`unknown schema type "${type}" for key "${key}"`, { key, expected: type });
  }
}
