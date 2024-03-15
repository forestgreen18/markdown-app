import { checkForInvalidSyntax } from '../src/converters/markdownToHtml'; // replace 'your-file' with the actual file name
import fs from 'fs';
import path from 'path';

describe('checkForInvalidSyntax', () => {
  it('identifies invalid markdown syntax', () => {
    const mdFilePath = path.resolve(
      __dirname,
      '../testInputFiles/invalidMD.md'
    ); // replace with the path to your markdown file
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');

    const expectedOutput = {
      '**_invalid syntax_**':
        'Embedding styles within each other is prohibited',
      '_`invalid code`_': 'Embedding styles within each other is prohibited'
    };

    expect(checkForInvalidSyntax(mdContent)).toEqual(expectedOutput);
  });

  it('returns an empty object for valid markdown syntax', () => {
    const mdFilePath = path.resolve(__dirname, '../testInputFiles/validMD.md'); // replace with the path to your markdown file
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');

    expect(checkForInvalidSyntax(mdContent)).toEqual({});
  });
});
