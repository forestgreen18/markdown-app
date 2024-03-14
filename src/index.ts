import { readFileContent } from "./fileReader";
import { simpleMarkdown } from "./markdownToHtml";
import { writeFileSync } from "fs";

async function main() {
  try {
    // process.argv[2] will be the path to the input file
    const filePath = process.argv[2];
    if (!filePath) {
      throw new Error("No input file specified");
    }

    const content = await readFileContent(filePath);

    // process.argv[3] will be the '--out' flag and the path to the output file
    if (process.argv[3] && process.argv[3].startsWith("--out")) {
      const outputPath = process.argv[3].split("=")[1];
      if (!outputPath) {
        throw new Error("No output file specified");
      }

      const htmlContent = simpleMarkdown(content);
      writeFileSync(outputPath, htmlContent);
      process.exit(0);
    } else if (process.argv[3]) {
      throw new Error(`Unrecognized flag: ${process.argv[3]}`);
    } else {
      console.log(simpleMarkdown(content));
      process.exit(0);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
