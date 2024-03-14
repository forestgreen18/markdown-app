export const convertHtmlToAnsi = (html: string): string => {
  let ansiStr = html;

  // Replace <strong> (bold) tags
  ansiStr = ansiStr.replace(/<strong>(.*?)<\/strong>/g, '\x1b[1m$1\x1b[22m');

  // Replace <em> (italic) tags
  ansiStr = ansiStr.replace(/<em>(.*?)<\/em>/g, '\x1b[3m$1\x1b[23m');

  // Replace <code> (fixed-width) tags
  ansiStr = ansiStr.replace(/<code>(.*?)<\/code>/g, '\x1b[7m$1\x1b[27m');

  // Replace <pre> (preformatted) tags
  ansiStr = ansiStr.replace(/<pre>([\s\S]*?)<\/pre>/g, '\x1b[7m$1\x1b[27m');

  // Replace <p> (paragraph) tags
  ansiStr = ansiStr.replace(/<p>(.*?)<\/p>/g, '$1\n');

  return ansiStr;
};
