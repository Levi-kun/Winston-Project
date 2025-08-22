import { default as winston, transports, createLogger, Logger } from "winston";

class MyLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.simple()
      ),
      transports: [new transports.Console()],
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
logger.warn("Warning message test");
logger.debug("Debug message test");
logger.verbose("Verbose message test");
logger.silly("Silly message test");
logger.log("This is a log message with a custom type/level", {
  customType: "custom",
});

throw new Error("This is a test error to check error logging");
