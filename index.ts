import { readFileContent } from "./fileReader";
import { simpleMarkdown } from "./markdownToHtml";

async function main() {
  try {
    const filePath = "./test-markdown.md"; // Replace with the actual file path
    const content = await readFileContent(filePath); // Display the file content
    console.log(simpleMarkdown(content));
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

main();
