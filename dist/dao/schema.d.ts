export declare enum SQLiteType {
    NULL = "NULL",
    INTEGER = "INTEGER",
    FLOAT = "FLOAT",
    REAL = "REAL",
    TEXT = "TEXT",
    BLOB = "BLOB",
    NUMERIC = "NUMERIC",
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
    DATETIME = "DATETIME"
}
export declare enum Constraints {
    PRIMARY_KEY_AUTO_INCREMENT = "NOT NULL PRIMARY KEY AUTOINCREMENT",
    UNIQUE = "UNIQUE",
    NOT_NULL = "NOT NULL"
}
declare type ForeignKeyConstraint = [tableName: string, foreignKey: string];
/**
 * Type T here will be the type of the Typescript interface (ex: string, number, boolean)
 */
interface SchemaDefinition {
    type: SQLiteType;
    default?: string;
    constraints?: Constraints[];
    foreignKeyConstraint?: ForeignKeyConstraint;
}
export declare type Schema<T> = {
    [K in keyof T]: SchemaDefinition;
};
declare function createTable<T>(tableName: string, schema: Schema<T>): string;
declare function dropTable(tableName: string): string;
declare const _default: {
    createTable: typeof createTable;
    dropTable: typeof dropTable;
};
export default _default;
