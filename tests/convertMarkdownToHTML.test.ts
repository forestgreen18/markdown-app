/* eslint-disable @typescript-eslint/no-var-requires */
export {}; // Add this line to treat this file as a module

const fs = require('fs');
const { getTestFilePath } = require('../utils/getTestFilePath');
const { convertMarkdownToHTML } = require('../src/converters/markdownToHtml');

describe('convertMarkdownToHTML', () => {
  it('converts valid markdown to HTML', () => {
    const mdFilePath = getTestFilePath('validMD.md');
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');

    const htmlFilePath = getTestFilePath('expected.html');
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    const expectedOutput = htmlContent; // the expected HTML output

    expect(convertMarkdownToHTML(mdContent)).toEqual(expectedOutput);
  });

  it('throws an error for invalid markdown syntax', () => {
    const mdFilePath = getTestFilePath('invalidMD.md');
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');
    expect(() =>
      convertMarkdownToHTML(mdContent)
    ).toThrowErrorMatchingSnapshot();
  });
});
