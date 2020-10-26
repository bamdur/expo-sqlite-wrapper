export function insert(record, tableName) {
    const keys = Object.keys(record);
    const columns = keys.join(', ');
    const values = keys.map(() => '?').join(', ');
    return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
}
export function insertOrReplace(record, tableName) {
    return insert(record, tableName).replace('INSERT INTO', 'INSERT OR REPLACE INTO');
}
export function update(record, tableName) {
    const { id, ...columns } = record;
    const values = Object.keys(columns).map(key => `${key} = ?`).join(', ');
    return `UPDATE ${tableName} SET ${values} WHERE id = ?;`;
}
export default { insert, insertOrReplace, update };
