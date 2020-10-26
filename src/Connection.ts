import * as SQLite from 'expo-sqlite';
import type { SQLResultSet as _SQLResultSet, SQLResultSetRowList, WebSQLDatabase } from 'expo-sqlite';
import DatabaseLogger from './DatabaseLogger';
import Repository from './Repository';


interface ResultSetRowList<T> extends Exclude<SQLResultSetRowList, "length" | "item"> {
  _array?: T[];
}

interface SQLResultSet<T> extends _SQLResultSet {
  rows: ResultSetRowList<T>;
}

export interface ResultSet<T> {
  rows: T[];
  insertId: number;
  rowsAffected: number;
}

export default class Connection {
    private _databaseName: string;
    private _database: WebSQLDatabase | undefined;
    private _repository: Repository;

    private static logger = DatabaseLogger.getLogger();

    constructor(databaseName: string) {
      this._databaseName = databaseName;
      this._repository = new Repository(this);
    }


    async openDatabase(): Promise<void> {
      return new Promise((resolve, _reject) => {
        this._database = SQLite.openDatabase(this._databaseName, undefined, undefined, undefined, (db) => {
          Connection.logger.log(this._databaseName, `Opened database: ${this._databaseName}`)
          this._database = db;
          return resolve();
        });
      })
    }

    async executeBulkSql<T>(sqls: string[], params: any[] = []): Promise<ResultSet<T>[]> {
      return new Promise((txResolve, txReject) => {
        if (this._database) {
          this._database.transaction(tx => {
            Promise.all<ResultSet<T>>(sqls.map((sql, index) => {
              return new Promise<ResultSet<T>>((sqlResolve, sqlReject) => {
                tx.executeSql(
                  sql,
                  params[index],
                  (_, { rows, insertId, rowsAffected }: SQLResultSet<T>) => {
                    // @ts-ignore
                    // sqlResolve({ rows: rows._array ?? [], insertId, rowsAffected })
                    sqlResolve({ rows: rows._array ?? [], insertId, rowsAffected })
                  },
                  (_, error) => { sqlReject(error); return true; }
                )
              })
            })).then(txResolve).catch(txReject)
          })
        } else {
          Connection.logger.error(this._databaseName, "Attempted to execute transaction on an unopened database");
          throw new Error();
        }
      })
    }

    async executeSql<T>(sql: string, params: any[] = []): Promise<ResultSet<T>> {
      Connection.logger.log(this._databaseName, `Executing SQL: ${Connection.getFinalSql(sql, params)}`)
      return this.executeBulkSql<T>([sql], params)
        .then(res => res[0])
        .catch(error => { throw error })
    }

    get repository(): Repository {
      return this._repository;
    }

    private static getFinalSql(sql: string, params: any[]) {
      let replacedSql = sql;
      params.map(param => replacedSql = replacedSql.replace('?', param));
      return replacedSql;
  }
}