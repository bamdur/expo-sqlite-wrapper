import * as SQLite from 'expo-sqlite';
import DatabaseLogger from './DatabaseLogger';
import Repository from './Repository';
export default class Connection {
    constructor(databaseName) {
        this._databaseName = databaseName;
        this._repository = new Repository(this);
    }
    async openDatabase() {
        return new Promise((resolve, _reject) => {
            this._database = SQLite.openDatabase(this._databaseName, undefined, undefined, undefined, (db) => {
                Connection.logger.log(this._databaseName, `Opened database: ${this._databaseName}`);
                this._database = db;
                return resolve();
            });
        });
    }
    async executeBulkSql(sqls, params = []) {
        return new Promise((txResolve, txReject) => {
            if (this._database) {
                this._database.transaction(tx => {
                    Promise.all(sqls.map((sql, index) => {
                        return new Promise((sqlResolve, sqlReject) => {
                            tx.executeSql(sql, params[index], (_, { rows, insertId, rowsAffected }) => {
                                // @ts-ignore
                                // sqlResolve({ rows: rows._array ?? [], insertId, rowsAffected })
                                sqlResolve({ rows: rows._array ?? [], insertId, rowsAffected });
                            }, (_, error) => { sqlReject(error); return true; });
                        });
                    })).then(txResolve).catch(txReject);
                });
            }
            else {
                Connection.logger.error(this._databaseName, "Attempted to execute transaction on an unopened database");
                throw new Error();
            }
        });
    }
    async executeSql(sql, params = []) {
        Connection.logger.log(this._databaseName, `Executing SQL: ${Connection.getFinalSql(sql, params)}`);
        return this.executeBulkSql([sql], params)
            .then(res => res[0])
            .catch(error => { throw error; });
    }
    get repository() {
        return this._repository;
    }
    static getFinalSql(sql, params) {
        let replacedSql = sql;
        params.map(param => replacedSql = replacedSql.replace('?', param));
        return replacedSql;
    }
}
Connection.logger = DatabaseLogger.getLogger();
