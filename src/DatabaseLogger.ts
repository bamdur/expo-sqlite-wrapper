type Logger = {
    log: (prefix: string, message: string) => void;
    warn: (prefix: string, message: string) => void;
    error: (prefix: string, message: string) => void;
}

export default abstract class DatabaseLogger {
    private static loggingEnabled = false;
    private static logger: Logger = {
        log: (prefix, message) => DatabaseLogger.loggingEnabled && console.log(`[${prefix}]: ${message}`),
        warn: (prefix, message) => DatabaseLogger.loggingEnabled && console.warn(`[${prefix}]: ${message}`),
        error: (prefix, message) => DatabaseLogger.loggingEnabled && console.error(`[${prefix}]: ${message}`),
    }

    static enableLogging() {
        this.loggingEnabled = true;
    }

    static disableLogging() {
        this.loggingEnabled = false;
    }

    static setLogger(logger: Logger) {
        DatabaseLogger.logger = logger;
    }

    static getLogger(): Logger {
        return DatabaseLogger.logger;

    }
}