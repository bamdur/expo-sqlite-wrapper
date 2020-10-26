import { Constraints, Schema, SQLiteType } from "../dao/schema";

export const TEST_DATE = Date.now();
export const TEST_DATABASE = 'test_database';

export interface TestRow {
    id?: number;
    test: number;
    description: string;
    valid: boolean;
    update_timestamp?: number;
}


export interface TestRowFK {
    id?: number;
    parent_id: number;
    grandparent_id: number;
}

export const testSchema: Schema<TestRow> = {
    id: {
        type: SQLiteType.INTEGER,
        constraints: [Constraints.PRIMARY_KEY_AUTO_INCREMENT]
    },
    test: {
        type: SQLiteType.FLOAT,
    },
    description: {
        type: SQLiteType.TEXT,
        default: 'description',
        constraints: [Constraints.NOT_NULL]
    },
    valid: {
        type: SQLiteType.BOOLEAN,
        constraints: [Constraints.NOT_NULL]
    },
    update_timestamp: {
        type: SQLiteType.INTEGER,
        default: `${TEST_DATE}`
    }
};

export const testSchemaFK: Schema<TestRowFK> = {
    id: {
        type: SQLiteType.INTEGER,
        constraints: [Constraints.PRIMARY_KEY_AUTO_INCREMENT]
    },
    parent_id: {
        type: SQLiteType.INTEGER,
        foreignKeyConstraint: ['parent', 'id']
    },
    grandparent_id: {
        type: SQLiteType.INTEGER,
        foreignKeyConstraint: ['grandparent', 'id']
    }
}
