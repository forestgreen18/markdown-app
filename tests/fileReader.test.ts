import { readFileContent } from '../src/fileReader';
import * as fs from 'fs';

// Explicitly cast fs.readFile to jest.Mock
const mockedFsReadFile = fs.readFile as unknown as jest.Mock;

jest.mock('fs');

describe('readFileContent', () => {
  it('reads file content', async () => {
    mockedFsReadFile.mockImplementation((filePath, encoding, cb) =>
      cb(null, 'file content')
    );

    const content = await readFileContent('filePath');

    expect(content).toEqual('file content');
  });

  it('throws error if reading file fails', async () => {
    mockedFsReadFile.mockImplementation((filePath, encoding, cb) =>
      cb(new Error('error'))
    );

    await expect(readFileContent('filePath')).rejects.toThrow('error');
  });
});
