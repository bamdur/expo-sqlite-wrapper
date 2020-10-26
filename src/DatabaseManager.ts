import Connection from "./Connection";
import DatabaseLogger from "./DatabaseLogger";
import Version from "./Version";

export default class DatabaseManager {
    private static connections: { [K: string]: Connection } = {};

    static async openConnection(databaseName: string, updateSchema: (databaseVersion: number) => Promise<number>): Promise<void> {
        const connection: Connection = new Connection(databaseName);
        DatabaseManager.connections[databaseName] = connection;

        // Update schema if necessary
        await connection.openDatabase();
        await Version.createVersionTable(connection);
        const latestVersion = await Version.getLatestVersion(connection);
        const updatedVersion = await updateSchema(latestVersion);
        await Version.updateVersion(updatedVersion, connection)
    }

    static getConnection(databaseName: string): Connection {
        const connection = this.connections[databaseName];
        if (connection === undefined) {
            throw new Error(`Could not get connection. No connection was opened for database: ${databaseName}`);
        }
        return connection;
    }

    static enableLogging() { DatabaseLogger.enableLogging() }
    static disableLogging() { DatabaseLogger.disableLogging() }
}

