import type Connection from './Connection';
import type { QueryOptions } from './dao/read';
import type { Schema } from './dao/schema';
export default abstract class BaseRecord {
    static get connection(): Connection;
    static get tableName(): string;
    static getSchema(): Schema<any>;
    static createTable(): Promise<void>;
    static dropTable(): Promise<void>;
    static create<T>(record: T): Promise<T | undefined>;
    static update<T>(record: T): Promise<T | undefined>;
    static delete<T>(id: number): Promise<T | undefined>;
    static deleteAll(): Promise<unknown[]>;
    static find<T>(id: number): Promise<T | undefined>;
    static findAll<T>(): Promise<T[]>;
    static query<T>(queryOptions: QueryOptions): Promise<T[]>;
    static customSQL(sql: string, params: any[]): Promise<import("./Connection").ResultSet<unknown>>;
}
