import {
  default as winston,
  transports,
  createLogger,
  format,
  Logger,
} from "winston";

class MyLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp({ format: "MM-YY - HH:MM:SS" }),
            format.errors({ stack: true }),
            format.printf(({ timestamp, level, message }) => {
              return `${timestamp} ${level}: ${message}`;
            }),
            format.colorize({ all: true })
          ),
        }),
        new transports.File({
          filename: "error.log",
          level: "error",
          format: format.combine(
            format.timestamp({ format: "MM-DD-YY - HH:MM:SS" }),
            format.errors({ stack: true }),
            format.printf(({ timestamp, level, message, stack }) => {
              return `${timestamp} ${level}: ${message}\n${stack ? stack : ""}`;
            }),
            format.colorize()
          ),
        }),
        new transports.File({
          filename: "warn.log",
          level: "warn",
          format: format.combine(
            format.timestamp({ format: "MM-DD-YY - HH:MM:SS" }),
            format.errors({ stack: true }),
            format.printf(({ timestamp, level, message, stack }) => {
              return `${timestamp} ${level}: ${message}\n${stack ? stack : ""}`;
            }),
            format.colorize()
          ),
        }),
        new transports.File({
          filename: "combine.log",
          format: format.combine(
            format.timestamp({ format: "MM-DD-YY - HH:MM:SS" }),
            format.errors({ stack: true }),
            format.printf(({ timestamp, level, message, stack }) => {
              return `${timestamp} ${level}: ${message}\n${stack ? stack : ""}`;
            }),
            format.colorize({ all: true })
          ),
        }),
      ],
    });
  }

  private logThis(level: string, ...args: any[]) {
    return (this.logger as any)[level](...args);
  }

  info = (...args: any[]) => this.logThis("info", ...args);
  error = (...args: any[]) => this.logThis("error", ...args);
  warn = (...args: any[]) => this.logThis("warn", ...args);
  debug = (...args: any[]) => this.logThis("debug", ...args);
  verbose = (...args: any[]) => this.logThis("verbose", ...args);
  silly = (...args: any[]) => this.logThis("silly", ...args);
  log = (message: string, meta?: Record<string, any>) => {
    if (meta) {
      return this.logger.log("info", message, meta);
    } else {
      return this.logger.log("info", message);
    }
  };
}

const logger: MyLogger = new MyLogger();

logger.info("Log message test");
logger.error("Error message test");
logger.warn("Warning message tet");
logger.debug("Debug message test");
logger.verbose("Verbose message test");
logger.silly("Silly message test", { Code: 2 });
logger.log("This is a log message with a custom type/level", {
  Code: 1,
});

for (const formatOption of Object.keys(winston.format)) {
  logger.info(formatOption);
}
