// function for REGEXP to convert html tag. ie. <TAG> => &lt;TAG*gt;
const formatTag = (html: string): string => {
  return html.replace(/</g, "<").replace(/\>/g, ">");
};

// function for REGEXP to format code-block, highlight remarks/keywords
const formatCode = (m: string, p1: string, p2: string): string => {
  p2 = p2.replace(/</g, "<").replace(/\>/g, ">").replace(/\t/g, "   ");
  p2 = p2
    .replace(/^\/\/(.*)/gm, "<rem>//$1</rem>")
    .replace(/\s\/\/(.*)/gm, " <rem>//$1</rem>");
  p2 = p2.replace(
    /(\s)(function|return|var|let|const|if|then|else|elseif|end|for|next|do|while|loop|continue|break|case|switch|try|catch|finally)(\s)/gim,
    "$1<b>$2</b>$3"
  );
  return "<pre" + p1 + "><code>" + p2 + "</code></pre>";
};

// function to convert mdString into HTML string
const formatMD = (mdstr: string): string => {
  // horizontal rule => <hr>
  mdstr = mdstr
    .replace(/^-{3,}|^\_{3,}|^\*{3,}$/gm, "<hr>")
    .replace(/\n\n<hr\>/g, "\n<br><hr>");

  // inline code-block: `code-block` => <code>code-block</code>
  mdstr = mdstr.replace(/``(.*?)``/gm, function (m: string, p: string): string {
    return "<code>" + formatTag(p).replace(/`/g, "&#96;") + "</code>";
  });
  mdstr = mdstr.replace(/`(.*?)`/gm, "<code>$1</code>");

  // blockquote, max 2 levels => <blockquote>{text}</blockquote>
  mdstr = mdstr.replace(
    /^\>\> (.*$)/gm,
    "<blockquote><blockquote>$1</blockquote></blockquote>"
  );
  mdstr = mdstr.replace(/^\> (.*$)/gm, "<blockquote>$1</blockquote>");
  mdstr = mdstr.replace(/<\/blockquote\>\n<blockquote\>/g, "\n<br>");
  mdstr = mdstr.replace(/<\/blockquote\>\n<br\><blockquote\>/g, "\n<br>");

  // text decoration: bold, italic, underline, strikethrough, highlight
  mdstr = mdstr.replace(/\*\*\*(\w.*?[^\\])\*\*\*/gm, "<b><em>$1</em></b>");
  mdstr = mdstr.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  mdstr = mdstr.replace(/_(.*?)_/g, "<em>$1</em>");
  mdstr = mdstr.replace(/___(\w.*?[^\\])___/gm, "<b><em>$1</em></b>");
  mdstr = mdstr.replace(/__(\w.*?[^\\])__/gm, "<u>$1</u>");
  // mdstr = mdstr.replace(/_(\w.*?[^\\])_/gm, '<u>$1</u>')  // NOT support!!
  mdstr = mdstr.replace(/~~(\w.*?)~~/gm, "<del>$1</del>");
  mdstr = mdstr.replace(/\^\^(\w.*?)\^\^/gm, "<ins>$1</ins>");

  // indent as code-block
  mdstr = mdstr.replace(
    /^ {4,10}(.*)/gm,
    function (m: string, p: string): string {
      return "<pre><code>" + formatTag(p) + "</code></pre>";
    }
  );
  mdstr = mdstr.replace(/^\t(.*)/gm, function (m: string, p: string): string {
    return "<pre><code>" + formatTag(p) + "</code></pre>";
  });
  mdstr = mdstr.replace(/<\/code\><\/pre\>\n<pre\><code\>/g, "\n");

  // Escaping Characters
  return mdstr.replace(/\\([`_~\*\+\-\.\^\\\<\>\(\)\[\]])/gm, "$1");
};

export const simpleMarkdown = (mdText: string): string => {
  // first, handle syntax for code-block
  let pos1: number = 0,
    pos2: number = 0,
    mdHTML: string = "";
  mdText = mdText.replace(/\r\n/g, "\n").replace(/\n~~~/g, "\n```");
  mdText = mdText.replace(/\n``` *(.*?)\n([\s\S]*?)\n``` *\n/g, formatCode);

  // split by "<code>", skip for code-block and process normal text
  while ((pos1 = mdText.indexOf("<code>")) >= 0) {
    pos2 = mdText.indexOf("</code>", pos1);
    mdHTML +=
      formatMD(mdText.slice(0, pos1)) +
      mdText.slice(pos1 + 6, pos2 > 0 ? pos2 : mdText.length);
    mdText = mdText.slice(pos2 + 7);
  }

  return mdHTML + formatMD(mdText);
};
