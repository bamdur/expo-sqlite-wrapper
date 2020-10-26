function find(tableName) {
    return `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1;`;
}
// export function findBy(tableName: string, matchers: {[column: string]: string}) {
//     let sql = `SELECT * FROM ${tableName} WHERE [matchers] LIMIT 1;`
//     let matcherSql = Object.keys(matchers).reduce((_sql, matcherKey) => {
//         return _sql.concat(`${matcherKey} = ${matchers[matcherKey]}`)
//     }, '')
//     return `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1;`
// }
function query(tableName, queryOptions = {}) {
    let sql = `SELECT * FROM ${tableName}`;
    if (queryOptions.where)
        sql += ` WHERE ${queryOptions.where.sql}`;
    if (queryOptions.options)
        sql += ` ${queryOptions.options}`;
    return sql.concat(';');
}
export default { find, query };
