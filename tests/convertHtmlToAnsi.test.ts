/* eslint-disable @typescript-eslint/no-var-requires */
const { convertHtmlToAnsi } = require('../src/converters/htmlToANSI');

describe('convertHtmlToAnsi', () => {
  it('converts HTML tags to ANSI escape codes', () => {
    const html = `<strong>bold</strong> <em>italic</em> <code>code</code> <pre>preformatted</pre> <p>paragraph</p>`;
    const expectedOutput =
      '\x1b[1mbold\x1b[22m \x1b[3mitalic\x1b[23m \x1b[7mcode\x1b[27m \x1b[7mpreformatted\x1b[27m paragraph\n';

    expect(convertHtmlToAnsi(html)).toEqual(expectedOutput);
  });
});
