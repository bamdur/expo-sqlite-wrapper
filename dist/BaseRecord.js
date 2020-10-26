export default class BaseRecord {
    static get connection() {
        throw new Error('database() method needs to be overriden in subclass');
    }
    static get tableName() {
        throw new Error('tableName() method needs to be overriden in subclass');
    }
    static getSchema() {
        throw new Error('getSchema() method needs to be overriden in subclass');
    }
    static async createTable() {
        return this.connection.repository.createTable(this.tableName, this.getSchema());
    }
    static async dropTable() {
        return this.connection.repository.dropTable(this.tableName);
    }
    static async create(record) {
        return this.connection.repository.insert(record, this.tableName);
    }
    static async update(record) {
        return this.connection.repository.update(record, this.tableName);
    }
    static async delete(id) {
        return this.connection.repository.delete(id, this.tableName);
    }
    static async deleteAll() {
        return this.connection.repository.deleteAll(this.tableName);
    }
    static async find(id) {
        return this.connection.repository.find(id, this.tableName);
    }
    static async findAll() {
        return this.connection.repository.query({}, this.tableName);
    }
    static async query(queryOptions) {
        return this.connection.repository.query(queryOptions, this.tableName);
    }
    static async customSQL(sql, params) {
        return this.connection.repository.customSQL(sql, params, this.tableName);
    }
}
