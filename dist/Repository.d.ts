import type Connection from './Connection';
import type { ResultSet } from './Connection';
import type { QueryOptions } from './dao/read';
import type { Schema } from './dao/schema';
export default class Repository {
    private _connection;
    private static logger;
    constructor(connection: Connection);
    createTable<T>(tableName: string, schema: Schema<T>): Promise<void>;
    dropTable(tableName: string): Promise<void>;
    insert<T>(record: T, tableName: string): Promise<T | undefined>;
    insertOrReplace<T>(record: T, tableName: string): Promise<T | undefined>;
    update<T>(record: T, tableName: string): Promise<T | undefined>;
    delete<T>(id: number, tableName: string): Promise<T | undefined>;
    deleteAll<T>(tableName: string): Promise<T[]>;
    find<T>(id: number, tableName: string): Promise<T | undefined>;
    query<T>(queryOptions: QueryOptions, tableName: string): Promise<T[]>;
    customSQL<T>(sql: string, params: any[], tableName: string): Promise<ResultSet<T>>;
}
