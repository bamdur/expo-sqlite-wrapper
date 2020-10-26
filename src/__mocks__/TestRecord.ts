import BaseRecord from "../BaseRecord";
import DatabaseManager from "../DatabaseManager";
import { testSchema, TEST_DATABASE } from "./TestTypes";

export default class TestRecord extends BaseRecord {
    static get connection() {
        return DatabaseManager.getConnection(TEST_DATABASE)
    }

    static get tableName() {
        return 'test_table'
    }

    static getSchema(){
        return testSchema;
    }
}

