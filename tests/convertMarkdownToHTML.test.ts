import { convertMarkdownToHTML } from '../src/converters/markdownToHtml'; // replace 'your-file' with the actual file name
import fs from 'fs';
import path from 'path';

describe('convertMarkdownToHTML', () => {
  it('converts valid markdown to HTML', () => {
    const mdFilePath = path.resolve(__dirname, '../utils/validMD.md'); // replace with the path to your markdown file
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');

    const htmlFilePath = path.resolve(__dirname, '../utils/expected.html'); // replace with the path to your markdown file
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    const expectedOutput = htmlContent; // the expected HTML output

    expect(convertMarkdownToHTML(mdContent)).toEqual(expectedOutput);
  });

  it('throws an error for invalid markdown syntax', () => {
    const mdFilePath = path.resolve(__dirname, '../utils/invalidMD.md'); // replace with the path to your markdown file
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');
    expect(() =>
      convertMarkdownToHTML(mdContent)
    ).toThrowErrorMatchingSnapshot();
  });
});
