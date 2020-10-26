import DatabaseManager from "../DatabaseManager"
import Version from "../Version";

jest.mock('../Connection');
jest.mock('../Repository');

const createVersionTable = jest.spyOn(Version, 'createVersionTable').mockImplementation(jest.fn());
const getLatestVersion = jest.spyOn(Version, 'getLatestVersion').mockImplementation(jest.fn().mockResolvedValue(5));
const updateVersion = jest.spyOn(Version, 'updateVersion')
    .mockImplementation(jest.fn((newVersion, connection) => { return Promise.resolve() }));

describe('Test DatabaseManager', () => {
    it('Opens and stores multiple connections', async () => {
        await DatabaseManager.openConnection('test', jest.fn());
        expect(DatabaseManager.getConnection('test')).toBeTruthy();

        await DatabaseManager.openConnection('test2', jest.fn());
        expect(DatabaseManager.getConnection('test2')).toBeTruthy();
    });

    it('Calls the migrations callback with the latest version in db', async () => {
        const updateSchema = jest.fn((dbVersion) => new Promise<number>((res, rej) => res(dbVersion + 1)));
        await DatabaseManager.openConnection('test', updateSchema);

        expect(getLatestVersion).toHaveBeenCalled();
        expect(updateSchema).toHaveBeenCalledWith(5);
        expect(updateVersion).toHaveBeenCalledWith(6, DatabaseManager.getConnection('test'));
    })
})