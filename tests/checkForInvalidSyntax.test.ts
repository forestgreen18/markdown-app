/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { testCases } = require('../testInputFiles/testCases');
const { getTestFilePath } = require('../utils/getTestFilePath');

const { checkForInvalidSyntax } = require('../src/converters/markdownToHtml');

describe('checkForInvalidSyntax', () => {
  it('identifies invalid markdown syntax', () => {
    console.log(testCases);
    const mdContent = testCases.invalidMarkdown;

    const expectedOutput = {
      '**_invalid syntax_**': 'Embedding styles within each other is prohibited'
    };

    expect(checkForInvalidSyntax(mdContent)).toEqual(expectedOutput);
  });

  it('returns an empty object for valid markdown syntax', () => {
    const mdFilePath = getTestFilePath('validMD.md');
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');

    expect(checkForInvalidSyntax(mdContent)).toEqual({});
  });
});
