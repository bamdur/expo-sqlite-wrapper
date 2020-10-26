import { TestRow, TEST_DATE } from "./TestTypes";

export const TEST_ROW_1: TestRow = {
    id: 1,
    description: 'test description 1',
    test: 3.14,
    valid: true,
}

export const TEST_ROW_2: TestRow = {
    id: 2,
    description: 'test description 2',
    test: 2,
    valid: false,
    update_timestamp: TEST_DATE
}