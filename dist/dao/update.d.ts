export declare function insert(record: any, tableName: string): string;
export declare function insertOrReplace(record: any, tableName: string): string;
export declare function update(record: any, tableName: string): string;
declare const _default: {
    insert: typeof insert;
    insertOrReplace: typeof insertOrReplace;
    update: typeof update;
};
export default _default;
