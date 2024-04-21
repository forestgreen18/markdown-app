import path from 'path';

const TEST_FILES_BASE_PATH = path.resolve(__dirname, '../testInputFiles');

export const getTestFilePath = (filename: string) => {
  return path.join(TEST_FILES_BASE_PATH, filename);
};
