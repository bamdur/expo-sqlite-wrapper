import { Constraints, SQLiteType } from './dao/schema';
const tableName = 'version';
const schema = {
    id: {
        type: SQLiteType.INTEGER,
        constraints: [Constraints.PRIMARY_KEY_AUTO_INCREMENT]
    },
    version: {
        type: SQLiteType.INTEGER,
        constraints: [Constraints.NOT_NULL]
    },
    update_timestamp: {
        type: SQLiteType.INTEGER,
        default: `${Date.now()}`
    }
};
async function createVersionTable(connection) {
    return connection.repository.createTable(tableName, schema);
}
async function dropVersionTable(connection) {
    return connection.repository.dropTable(tableName);
}
async function updateVersion(newVersion, connection) {
    const version = { id: 1, version: newVersion };
    await connection.repository.insert(version, tableName);
}
async function getLatestVersion(connection) {
    const queryOptions = { options: 'ORDER BY version DESC LIMIT 1' };
    const version = await connection.repository.query(queryOptions, tableName);
    return version.length === 0 ? 0 : version[0].version;
}
export default { createVersionTable, dropVersionTable, updateVersion, getLatestVersion };
