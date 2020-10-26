import type Connection from './Connection'
import type { QueryOptions } from './dao/read'
import type { Schema } from './dao/schema'

export default abstract class BaseRecord {
  static get connection(): Connection {
    throw new Error('database() method needs to be overriden in subclass')
  }

  static get tableName(): string {
    throw new Error('tableName() method needs to be overriden in subclass')
  }

  static getSchema(): Schema<any>{
    throw new Error('getSchema() method needs to be overriden in subclass')
  }

  static async createTable() {
    return this.connection.repository.createTable(this.tableName, this.getSchema());
  }

  static async dropTable() {
    return this.connection.repository.dropTable(this.tableName);
  }

  static async create<T>(record: T) {
    return this.connection.repository.insert(record, this.tableName);
  }

  static async update<T>(record: T) {
    return this.connection.repository.update<T>(record, this.tableName)
  }

  static async delete<T>(id: number) {
    return this.connection.repository.delete<T>(id, this.tableName)
  }

  static async deleteAll() {
    return this.connection.repository.deleteAll(this.tableName)
  }

  static async find<T>(id: number) {
    return this.connection.repository.find<T>(id, this.tableName);
  }

  static async findAll<T>() {
    return this.connection.repository.query<T>({}, this.tableName);
  }

  static async query<T>(queryOptions: QueryOptions) {
    return this.connection.repository.query<T>(queryOptions, this.tableName);
  }

  static async customSQL(sql: string, params: any[]) {
    return this.connection.repository.customSQL(sql, params, this.tableName);
  }
}
