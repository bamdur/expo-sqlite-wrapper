declare const _default: {
    destroy: typeof import("./delete").destroy;
    destroyAll: typeof import("./delete").destroyAll;
    insert: typeof import("./update").insert;
    insertOrReplace: typeof import("./update").insertOrReplace;
    update: typeof import("./update").update;
    find: (tableName: string) => string;
    query: (tableName: string, queryOptions?: import("./read").QueryOptions) => string;
    createTable: <T>(tableName: string, schema: import("./schema").Schema<T>) => string;
    dropTable: (tableName: string) => string;
};
export default _default;
