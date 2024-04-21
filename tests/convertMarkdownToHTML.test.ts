import { convertMarkdownToHTML } from '../src/converters/markdownToHtml'; // replace 'your-file' with the actual file name
import fs from 'fs';
import { getTestFilePath } from '../utils/getTestFilePath';

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
