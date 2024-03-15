import { checkForInvalidSyntax } from '../src/converters/markdownToHtml'; // replace 'your-file' with the actual file name
import {
  mdContentWithInvalidSyntax,
  mdContentWithValidSyntax
} from '../utils/testData';

describe('checkForInvalidSyntax', () => {
  it('identifies invalid markdown syntax', () => {
    const mdContent = mdContentWithInvalidSyntax;

    const expectedOutput = {
      '**_invalid syntax_**':
        'Embedding styles within each other is prohibited',
      '_`invalid code`_': 'Embedding styles within each other is prohibited'
    };

    expect(checkForInvalidSyntax(mdContent)).toEqual(expectedOutput);
  });

  it('returns an empty object for valid markdown syntax', () => {
    const mdContent = mdContentWithValidSyntax;

    expect(checkForInvalidSyntax(mdContent)).toEqual({});
  });
});
