import Connection from "./Connection";
export default class DatabaseManager {
    private static connections;
    static openConnection(databaseName: string, updateSchema: (databaseVersion: number) => Promise<number>): Promise<void>;
    static getConnection(databaseName: string): Connection;
    static enableLogging(): void;
    static disableLogging(): void;
}
