import Read, { QueryOptions } from '../read';

const table = 'test';
const whereOptions: QueryOptions = {
    where: {
        sql: 'id = ? AND test_field < 10',
        params: [1]
    }
}
const options: QueryOptions = {
    options: "GROUP BY type ORDER BY id DESC"
}

describe('Test query SQL builder', () => {
    it('returns expected SQL for no options', () => {
        expect(Read.query('test')).toStrictEqual(`SELECT * FROM ${table};`)
    });

    it('returns expected SQL for where clause', () => {
        expect(Read.query('test', whereOptions)).toStrictEqual(`SELECT * FROM ${table} WHERE id = ? AND test_field < 10;`)
    });

    it('returns expected SQL for specified options', () => {
        expect(Read.query('test', options)).toStrictEqual(`SELECT * FROM ${table} GROUP BY type ORDER BY id DESC;`)
    });

    it('returns expected SQL for where clause with options', () => {
        expect(Read.query('test', {...options, ...whereOptions})).toStrictEqual(`SELECT * FROM ${table} WHERE id = ? AND test_field < 10 GROUP BY type ORDER BY id DESC;`)
    })
})
