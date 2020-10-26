import type Connection from './Connection';
import type { ResultSet } from './Connection'
import Dao from './dao'
import type { QueryOptions } from './dao/read';
import type { Schema } from './dao/schema';
import DatabaseLogger from './DatabaseLogger';

export default class Repository {
    private _connection: Connection;
    private static logger = DatabaseLogger.getLogger();

    constructor(connection: Connection) {
        this._connection = connection;
    }

    async createTable<T>(tableName: string, schema: Schema<T>) {
        const sql = Dao.createTable(tableName, schema);
        await this._connection.executeSql<T>(sql);
        Repository.logger.log(tableName, `Created table ${tableName}\n`);
    }

    async dropTable(tableName: string) {
        const sql = Dao.dropTable(tableName);
        await this._connection.executeSql(sql);
        Repository.logger.log(tableName, `Dropped table ${tableName}\n`);
    }

    async insert<T>(record: T, tableName: string): Promise<T | undefined> {
        const sql = Dao.insert(record, tableName);
        let result: T | undefined;
        try {
            const res = await this._connection.executeSql<T>(sql, Object.values(record));
            Repository.logger.log(tableName, `Inserted row id: ${res.insertId}\n`);
            result = await this.find<T>(res.insertId, tableName);
        } catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result
    }

    async insertOrReplace<T>(record: T, tableName: string): Promise<T | undefined> {
        const sql = Dao.insertOrReplace(record, tableName)
        let result: T | undefined;
        try {
            const res = await this._connection.executeSql<T>(sql, Object.values(record));
            Repository.logger.log(tableName, `Inserted or replaced row id: ${res.insertId}\n`);
            result = await this.find<T>(res.insertId, tableName);
        } catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }

    async update<T>(record: T, tableName: string): Promise<T | undefined> {
        const sql = Dao.update(record, tableName);
        let result: T | undefined;
        try {
            const res = await this._connection.executeSql<T>(sql, Object.values(record));
            Repository.logger.log(tableName, `Updated row id: ${res.insertId}\n`);
            result = await this.find<T>(res.insertId, tableName);
        } catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result
    }


    async delete<T>(id: number, tableName: string): Promise<T | undefined> {
        const sql = Dao.destroy(tableName);
        let result: T | undefined;
        try {
            const res = await this._connection.executeSql<T>(sql, [id]);
            result = res.rows[0];
            Repository.logger.log(tableName, `Deleted row id: ${res.insertId}\n`);
        } catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result
    }

    async deleteAll<T>(tableName: string): Promise<T[]> {
        const sql = Dao.destroy(tableName);
        let result: T[] = [];
        try {
            const res = await this._connection.executeSql<T>(sql);
            result = res.rows;
            Repository.logger.log(tableName, `Deleted all records from ${tableName}`);
        } catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result
    }

    async find<T>(id: number, tableName: string): Promise<T | undefined> {
        const sql = Dao.find(tableName);
        let result: T | undefined;
        try {
            const resultSet = await this._connection.executeSql<T>(sql, [id]);
            Repository.logger.log(tableName, `Find ${tableName}(${id}): ${JSON.stringify(resultSet.rows[0], null, 2)}\n`);
            result = resultSet.rows[0];
        } catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }

    async query<T>(queryOptions: QueryOptions, tableName: string): Promise<T[]> {
        const sql = Dao.query(tableName, queryOptions);
        let result: T[] = [];
        try {
            const resultSet = await this._connection.executeSql<T>(sql, queryOptions.where?.params ?? []);
            Repository.logger.log(tableName, `Find where in ${tableName}: ${JSON.stringify(resultSet.rows[0] ?? [], null, 2)}\n`);
            result = resultSet.rows;
        } catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }

    async customSQL<T>(sql: string, params: any[], tableName: string): Promise<ResultSet<T>> {
        const result = await this._connection.executeSql<T>(sql, params);
        Repository.logger.log(tableName, `Executed custom SQL\n`);
        return result;
    }
}