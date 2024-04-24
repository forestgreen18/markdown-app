/* eslint-disable @typescript-eslint/no-var-requires */
const { checkForInvalidSyntax } = require('../src/converters/markdownToHtml');
const fs = require('fs');
const { getTestFilePath } = require('../utils/getTestFilePath');

describe('checkForInvalidSyntax', () => {
  it('identifies invalid markdown syntax', () => {
    const mdFilePath = getTestFilePath('invalidMD.md');
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');

    const expectedOutput = {
      '**_invalid syntax_**':
        'Embedding styles within each other is prohibited',
      '_`invalid code`_': 'Embedding styles within each other is prohibited'
    };

    expect(checkForInvalidSyntax(mdContent)).toEqual(expectedOutput);
  });

  it('returns an empty object for valid markdown syntax', () => {
    const mdFilePath = getTestFilePath('validMD.md');
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');

    expect(checkForInvalidSyntax(mdContent)).toEqual({});
  });
});
