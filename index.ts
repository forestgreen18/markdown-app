import { readFileContent } from "./fileReader";

async function main() {
  try {
    const filePath = "./test-markdown.md"; // Replace with the actual file path
    const content = await readFileContent(filePath);
    console.log(content); // Display the file content
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

main();
