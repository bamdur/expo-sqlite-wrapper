import { TestRow, TestRowFK, testSchema, testSchemaFK, TEST_DATE } from "db/orm/__mocks__/TestTypes";
import SchemaDao from "../schema";

describe('Test create table SQL builder', () => {
    it('Correctly parses a simple schema', () => {
        const result = `CREATE TABLE IF NOT EXISTS test_schema ` +
            `(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ` +
            `test FLOAT, ` +
            `description TEXT NOT NULL DEFAULT description, ` +
            `valid BOOLEAN NOT NULL, ` +
            `update_timestamp INTEGER DEFAULT ${TEST_DATE});`
        expect(SchemaDao.createTable<TestRow>('test_schema', testSchema)).toStrictEqual(result);
    });


    it('Correctly parses a simple schema with multiple foreign keys', () => {
        const result = `CREATE TABLE IF NOT EXISTS test_schema_fk ` +
            `(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ` +
            `parent_id INTEGER, ` +
            `grandparent_id INTEGER, ` +
            `FOREIGN KEY (parent_id) REFERENCES parent(id), ` +
            `FOREIGN KEY (grandparent_id) REFERENCES grandparent(id));`;
        expect(SchemaDao.createTable<TestRowFK>('test_schema_fk', testSchemaFK)).toStrictEqual(result);
    });
})