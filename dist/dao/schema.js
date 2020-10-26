export var SQLiteType;
(function (SQLiteType) {
    SQLiteType["NULL"] = "NULL";
    SQLiteType["INTEGER"] = "INTEGER";
    SQLiteType["FLOAT"] = "FLOAT";
    SQLiteType["REAL"] = "REAL";
    SQLiteType["TEXT"] = "TEXT";
    SQLiteType["BLOB"] = "BLOB";
    SQLiteType["NUMERIC"] = "NUMERIC";
    SQLiteType["BOOLEAN"] = "BOOLEAN";
    SQLiteType["DATE"] = "DATE";
    SQLiteType["DATETIME"] = "DATETIME";
})(SQLiteType || (SQLiteType = {}));
export var Constraints;
(function (Constraints) {
    // PRIMARY_KEY = "PRIMARY KEY",
    Constraints["PRIMARY_KEY_AUTO_INCREMENT"] = "NOT NULL PRIMARY KEY AUTOINCREMENT";
    Constraints["UNIQUE"] = "UNIQUE";
    Constraints["NOT_NULL"] = "NOT NULL";
})(Constraints || (Constraints = {}));
function parseForeignKeys(foreignKey, constraint) {
    return `FOREIGN KEY (${foreignKey}) REFERENCES ${constraint[0]}(${constraint[1]})`;
}
function parseConstraints(constraints) {
    return constraints === undefined ? '' : ' ' + constraints?.join(' ');
}
function parseSchema(schema) {
    const parts = [];
    const fks = [];
    for (const [column, options] of Object.entries(schema)) {
        let sql = `${column} ${options.type}${parseConstraints(options.constraints)}`;
        if (options.default !== undefined)
            sql += ` DEFAULT ${options.default}`;
        parts.push(sql);
        if (options.foreignKeyConstraint !== undefined) {
            fks.push(parseForeignKeys(column, options.foreignKeyConstraint));
        }
    }
    if (fks.length > 0)
        parts.push(fks.join(', '));
    return parts.join(', ');
}
function createTable(tableName, schema) {
    return `CREATE TABLE IF NOT EXISTS ${tableName} (${parseSchema(schema)});`;
}
function dropTable(tableName) {
    return `DROP TABLE IF EXISTS ${tableName};`;
}
export default { createTable, dropTable };
