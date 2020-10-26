import type Connection from './Connection';
import { Constraints, Schema, SQLiteType } from './dao/schema';
import type { QueryOptions } from './dao/read';

interface VersionRow {
  id?: number;
  version: number;
  update_timestamp?: number;
}

const tableName = 'version';
const schema: Schema<VersionRow> = {
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

async function createVersionTable(connection: Connection) {
  return connection.repository.createTable<VersionRow>(tableName, schema);
}

async function dropVersionTable(connection: Connection) {
  return connection.repository.dropTable(tableName);
}

async function updateVersion(newVersion: number, connection: Connection): Promise<void> {
  const version: VersionRow = { id: 1, version: newVersion }
  await connection.repository.insertOrReplace<VersionRow>(version, tableName);
}

async function getLatestVersion(connection: Connection): Promise<number> {
  const queryOptions: QueryOptions = {options: 'ORDER BY version DESC LIMIT 1'}
  const version: VersionRow[] = await connection.repository.query<VersionRow>(queryOptions, tableName);
  return version.length === 0 ? 0 : version[0].version;
}

export default { createVersionTable, dropVersionTable, updateVersion, getLatestVersion }