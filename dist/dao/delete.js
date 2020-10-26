export function destroy(tableName) {
    return `DELETE FROM ${tableName} WHERE id = ?;`;
}
export function destroyAll(tableName) {
    return `DELETE FROM ${tableName};`;
}
export default { destroy, destroyAll };
