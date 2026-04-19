export class ConfigError extends Error {
  constructor(message, { line, key } = {}) {
    super(message);
    this.name = "ConfigError";
    this.line = line;
    this.key = key;
  }
}

export class ValidationError extends Error {
  constructor(message, { key, expected, got } = {}) {
    super(message);
    this.name = "ValidationError";
    this.key = key;
    this.expected = expected;
    this.got = got;
  }
}
