import Dao from './dao';
import DatabaseLogger from './DatabaseLogger';
export default class Repository {
    constructor(connection) {
        this._connection = connection;
    }
    async createTable(tableName, schema) {
        const sql = Dao.createTable(tableName, schema);
        await this._connection.executeSql(sql);
        Repository.logger.log(tableName, `Created table ${tableName}\n`);
    }
    async dropTable(tableName) {
        const sql = Dao.dropTable(tableName);
        await this._connection.executeSql(sql);
        Repository.logger.log(tableName, `Dropped table ${tableName}\n`);
    }
    async insert(record, tableName) {
        const sql = Dao.insert(record, tableName);
        let result;
        try {
            const res = await this._connection.executeSql(sql, Object.values(record));
            Repository.logger.log(tableName, `Inserted row id: ${res.insertId}\n`);
            result = await this.find(res.insertId, tableName);
        }
        catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }
    async insertOrReplace(record, tableName) {
        const sql = Dao.insertOrReplace(record, tableName);
        let result;
        try {
            const res = await this._connection.executeSql(sql, Object.values(record));
            Repository.logger.log(tableName, `Inserted or replaced row id: ${res.insertId}\n`);
            result = await this.find(res.insertId, tableName);
        }
        catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }
    async update(record, tableName) {
        const sql = Dao.update(record, tableName);
        let result;
        try {
            const res = await this._connection.executeSql(sql, Object.values(record));
            Repository.logger.log(tableName, `Updated row id: ${res.insertId}\n`);
            result = await this.find(res.insertId, tableName);
        }
        catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }
    async delete(id, tableName) {
        const sql = Dao.destroy(tableName);
        let result;
        try {
            const res = await this._connection.executeSql(sql, [id]);
            result = res.rows[0];
            Repository.logger.log(tableName, `Deleted row id: ${res.insertId}\n`);
        }
        catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }
    async deleteAll(tableName) {
        const sql = Dao.destroy(tableName);
        let result = [];
        try {
            const res = await this._connection.executeSql(sql);
            result = res.rows;
            Repository.logger.log(tableName, `Deleted all records from ${tableName}`);
        }
        catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }
    async find(id, tableName) {
        const sql = Dao.find(tableName);
        let result;
        try {
            const resultSet = await this._connection.executeSql(sql, [id]);
            Repository.logger.log(tableName, `Find ${tableName}(${id}): ${JSON.stringify(resultSet.rows[0], null, 2)}\n`);
            result = resultSet.rows[0];
        }
        catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }
    async query(queryOptions, tableName) {
        const sql = Dao.query(tableName, queryOptions);
        let result = [];
        try {
            const resultSet = await this._connection.executeSql(sql, queryOptions.where?.params ?? []);
            Repository.logger.log(tableName, `Find where in ${tableName}: ${JSON.stringify(resultSet.rows[0] ?? [], null, 2)}\n`);
            result = resultSet.rows;
        }
        catch (e) {
            Repository.logger.warn(tableName, e);
        }
        return result;
    }
    async customSQL(sql, params, tableName) {
        const result = await this._connection.executeSql(sql, params);
        Repository.logger.log(tableName, `Executed custom SQL\n`);
        return result;
    }
}
Repository.logger = DatabaseLogger.getLogger();
