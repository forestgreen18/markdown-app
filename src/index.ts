import { Command } from 'commander';
import { readFileContent } from './fileReader';
import { convertHtmlToAnsi } from './converters/htmlToANSI';
import { convertMarkdownToHTML } from './converters/markdownToHtml';
import { writeFileSync } from 'fs';

const program = new Command();

program
  .option('-f, --format <type>', 'output format')
  .option('-o, --out <path>', 'output file');

program.parse(process.argv);

const options = program.opts();

async function main() {
  try {
    const filePath = process.argv[2];
    if (!filePath) {
      throw new Error('No input file specified');
    }

    const content = await readFileContent(filePath);
    const htmlContent = convertMarkdownToHTML(content);

    if (options['format'] === 'html') {
      if (options['out']) {
        writeFileSync(options['out'], htmlContent);
      } else {
        console.log(htmlContent);
      }
    } else {
      const ANSICode = convertHtmlToAnsi(htmlContent);
      if (options['out']) {
        if (options['format'] === 'ansi') {
          writeFileSync(options['out'], ANSICode);
        } else {
          writeFileSync(options['out'], htmlContent);
        }
      } else {
        console.log(ANSICode);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
