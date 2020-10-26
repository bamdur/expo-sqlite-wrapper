export declare type QueryOptions = {
    where?: {
        sql: string;
        params: any[];
    };
    options?: string;
};
declare function find(tableName: string): string;
declare function query(tableName: string, queryOptions?: QueryOptions): string;
declare const _default: {
    find: typeof find;
    query: typeof query;
};
export default _default;
