export enum SQLiteType {
    NULL = 'NULL',
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    REAL = 'REAL',
    TEXT = 'TEXT',
    BLOB = 'BLOB',
    NUMERIC = 'NUMERIC',
    BOOLEAN = 'BOOLEAN',
    DATE = 'DATE',
    DATETIME = 'DATETIME'
}

export enum Constraints {
    // PRIMARY_KEY = "PRIMARY KEY",
    PRIMARY_KEY_AUTO_INCREMENT = "NOT NULL PRIMARY KEY AUTOINCREMENT",
    UNIQUE = "UNIQUE",
    NOT_NULL = "NOT NULL"
}

type ForeignKeyConstraint = [tableName: string, foreignKey: string];
/**
 * Type T here will be the type of the Typescript interface (ex: string, number, boolean)
 */
interface SchemaDefinition {
    type: SQLiteType;
    default?: string;
    constraints?: Constraints[];
    foreignKeyConstraint?: ForeignKeyConstraint;
}

export type Schema<T> = {
    [K in keyof T]: SchemaDefinition
}

function parseForeignKeys(foreignKey: string, constraint: ForeignKeyConstraint): string {
    return `FOREIGN KEY (${foreignKey}) REFERENCES ${constraint[0]}(${constraint[1]})`
}

function parseConstraints(constraints: Constraints[] | undefined): string {
    return constraints === undefined ? '' : ' ' + constraints?.join(' ');
}

function parseSchema<T>(schema: Schema<T>): string {
    const parts: string[] = [];
    const fks: string[] = [];
    for (const [column, options] of Object.entries<SchemaDefinition>(schema)) {
        let sql = `${column} ${options.type}${parseConstraints(options.constraints)}`;
        if (options.default !== undefined) sql +=  ` DEFAULT ${options.default}`;
        parts.push(sql);
        if (options.foreignKeyConstraint !== undefined) {
            fks.push(parseForeignKeys(column, options.foreignKeyConstraint));
        }
    }
    if (fks.length > 0) parts.push(fks.join(', '));
    return parts.join(', ');
}

function createTable<T>(tableName: string, schema: Schema<T>): string{
    return `CREATE TABLE IF NOT EXISTS ${tableName} (${parseSchema(schema)});`
}

function dropTable(tableName: string): string {
    return `DROP TABLE IF EXISTS ${tableName};`
}

export default { createTable, dropTable }