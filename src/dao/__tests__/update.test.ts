import { TEST_ROW_1 } from "db/orm/__mocks__/TestData";
import UpdateDao from "../update";

const columns = 'id, description, test, valid'
describe('test update and insert SQL builders', () => {
    it('Returns expected string for insert', () => {
        expect(UpdateDao.insert(TEST_ROW_1, 'test'))
            .toStrictEqual('INSERT INTO test (id, description, test, valid) VALUES (?, ?, ?, ?);')
    });

    it('Returns expected string for insertOrReplace', () => {
        expect(UpdateDao.insertOrReplace(TEST_ROW_1, 'test'))
            .toStrictEqual('INSERT OR REPLACE INTO test (id, description, test, valid) VALUES (?, ?, ?, ?);');
    });

    it('Returns expected string for update', () => {
        expect(UpdateDao.update(TEST_ROW_1, 'test'))
        .toStrictEqual('UPDATE test SET description = ?, test = ?, valid = ? WHERE id = ?;')
    });
})

