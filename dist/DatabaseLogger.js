export default class DatabaseLogger {
    static enableLogging() {
        this.loggingEnabled = true;
    }
    static disableLogging() {
        this.loggingEnabled = false;
    }
    static setLogger(logger) {
        DatabaseLogger.logger = logger;
    }
    static getLogger() {
        return DatabaseLogger.logger;
    }
}
DatabaseLogger.loggingEnabled = false;
DatabaseLogger.logger = {
    log: (prefix, message) => DatabaseLogger.loggingEnabled && console.log(`[${prefix}]: ${message}`),
    warn: (prefix, message) => DatabaseLogger.loggingEnabled && console.warn(`[${prefix}]: ${message}`),
    error: (prefix, message) => DatabaseLogger.loggingEnabled && console.error(`[${prefix}]: ${message}`),
};
