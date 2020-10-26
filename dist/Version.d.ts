import type Connection from './Connection';
declare function createVersionTable(connection: Connection): Promise<void>;
declare function dropVersionTable(connection: Connection): Promise<void>;
declare function updateVersion(newVersion: number, connection: Connection): Promise<void>;
declare function getLatestVersion(connection: Connection): Promise<number>;
declare const _default: {
    createVersionTable: typeof createVersionTable;
    dropVersionTable: typeof dropVersionTable;
    updateVersion: typeof updateVersion;
    getLatestVersion: typeof getLatestVersion;
};
export default _default;
