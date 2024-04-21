/* eslint-disable @typescript-eslint/no-var-requires */
export {}; // Add this line to treat this file as a module
const { readFileContent } = require('../src/fileReader');
const fs = require('fs');

jest.mock('fs', () => {
  const originalFs = jest.requireActual('fs');
  return {
    ...originalFs,
    readFile: jest.fn()
  };
});

describe('readFileContent', () => {
  it('reads file content', async () => {
    (fs.readFile as jest.Mock).mockImplementation(
      (
        filePath: string,
        encoding: string,
        cb: (err: Error | null, data: string) => void
      ) => cb(null, 'file content')
    );

    const content = await readFileContent('filePath');
    expect(content).toEqual('file content');
  });

  it('throws error if reading file fails', async () => {
    (fs.readFile as jest.Mock).mockImplementation(
      (
        filePath: string,
        encoding: string,
        cb: (err: Error | null, data?: string) => void
      ) => cb(new Error('error'))
    );

    await expect(readFileContent('filePath')).rejects.toThrow('error');
  });
});
