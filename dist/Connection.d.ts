import Repository from './Repository';
export interface ResultSet<T> {
    rows: T[];
    insertId: number;
    rowsAffected: number;
}
export default class Connection {
    private _databaseName;
    private _database;
    private _repository;
    private static logger;
    constructor(databaseName: string);
    openDatabase(): Promise<void>;
    executeBulkSql<T>(sqls: string[], params?: any[]): Promise<ResultSet<T>[]>;
    executeSql<T>(sql: string, params?: any[]): Promise<ResultSet<T>>;
    get repository(): Repository;
    private static getFinalSql;
}
