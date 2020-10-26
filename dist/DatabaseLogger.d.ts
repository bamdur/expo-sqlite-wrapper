declare type Logger = {
    log: (prefix: string, message: string) => void;
    warn: (prefix: string, message: string) => void;
    error: (prefix: string, message: string) => void;
};
export default abstract class DatabaseLogger {
    private static loggingEnabled;
    private static logger;
    static enableLogging(): void;
    static disableLogging(): void;
    static setLogger(logger: Logger): void;
    static getLogger(): Logger;
}
export {};
