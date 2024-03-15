export const checkForInvalidSyntax = (
  mdContent: string
): Record<string, string> => {
  const invalidFormat: Record<string, string> = {};

  // Define constants for each regex
  const nestedFormatRegex =
    /\s(\*\*|_|`)(\*\*|_|`){1,}([^ \r\n]+.*[^ \r\n]+)\1\s/g;
  const infiniteFormatRegex = /\s(\*\*|_|`)[^ *_`\r\n]+(?!.*\1).*\r?\n/g;
  const missingStartFormatRegex = /(^|\n)[^(**)(_)(`)]*^ *_`\r\n\s/g;

  const nestedFormat = [...mdContent.matchAll(nestedFormatRegex)];
  nestedFormat.forEach((format) => {
    const [matched] = format;
    invalidFormat[matched.trim()] =
      'Embedding styles within each other is prohibited';
  });

  const infiniteFormat = [...mdContent.matchAll(infiniteFormatRegex)];
  infiniteFormat.forEach((format) => {
    const [matched] = format;
    invalidFormat[matched.trim()] =
      'Formatting that does not terminate is forbidden';
  });

  const missingStartFormat = [...mdContent.matchAll(missingStartFormatRegex)];
  missingStartFormat.forEach((format) => {
    const [matched] = format;
    invalidFormat[matched.trim()] =
      'Formatting that lacks an initial style marker is not permitted';
  });

  return invalidFormat;
};

// function for REGEXP to convert html tag. ie. <TAG> => &lt;TAG*gt;
const formatTag = (html: string): string => {
  return html.replace(/</g, '<').replace(/\>/g, '>');
};

// function for REGEXP to format code-block, highlight remarks/keywords
const formatCode = (m: string, p1: string, p2: string): string => {
  const keywordRegex =
    /(\s)(function|return|var|let|const|if|then|else|elseif|end|for|next|do|while|loop|continue|break|case|switch|try|catch|finally)(\s)/gim;

  p2 = p2
    .replace(/</g, '<')
    .replace(/\>/g, '>')
    .replace(/\t/g, '   ')
    .replace(keywordRegex, '$1<strong>$2</strong>$3');

  return `\n<pre><code>${p2}</code></pre>`;
};

// function to convert mdString into HTML string
const formatMD = (mdstr: string): string => {
  const codeBlockRegex = /``(.*?)``/gm;

  // inline code-block: `code-block` => <code>code-block</code>
  mdstr = mdstr.replace(codeBlockRegex, (m: string, p: string): string => {
    return `<code>${formatTag(p).replace(/`/g, '`')}</code>`;
  });
  mdstr = mdstr.replace(/`(.*?)`/gm, '<code>$1</code>');

  // text decoration: bold, italic, underline, strikethrough, highlight
  mdstr = mdstr
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>');

  // Paragraphs: two line breaks => <p>{text}</p>
  // Split the string into blocks
  const blocks = mdstr.split('\n\n');

  // Process each block
  for (let i = 0; i < blocks.length; i++) {
    // If the block is not already enclosed in tags, add <p> tags
    if (!(blocks[i] as string).startsWith('<')) {
      blocks[i] = `<p>${blocks[i]}</p>`;
    }
  }

  // Join the blocks back together
  mdstr = blocks.join('\n\n');

  return mdstr;
};

export const convertMarkdownToHTML = (mdText: string): string => {
  const errors = checkForInvalidSyntax(mdText);
  console.log(`errors:`, errors);
  if (Object.entries(errors).length > 0) {
    throw new Error(
      `invalid markdown <details are below>\n${JSON.stringify(errors, null, 2)}`
    );
  }

  // first, handle syntax for code-block
  let pos1: number = 0,
    pos2: number = 0,
    mdHTML: string = '';
  let modifiedMdText = mdText.replace(/\r\n/g, '\n').replace(/\n~~~/g, '\n```');
  modifiedMdText = modifiedMdText.replace(
    /\n``` *(.*?)\n([\s\S]*?)\n``` *\n/g,
    formatCode
  );

  // split by "<code>", skip for code-block and process normal text
  while ((pos1 = modifiedMdText.indexOf('<code>')) >= 0) {
    pos2 = modifiedMdText.indexOf('</code>', pos1);
    mdHTML += `${formatMD(modifiedMdText.slice(0, pos1))}${modifiedMdText.slice(
      pos1 + 6,
      pos2 > 0 ? pos2 : modifiedMdText.length
    )}`;
    modifiedMdText = modifiedMdText.slice(pos2 + 7);
  }

  return `${mdHTML}${formatMD(modifiedMdText)}`;
};
