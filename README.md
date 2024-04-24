# Markdown to HTML Converter

This application is a simple Markdown to HTML converter written in TypeScript. It supports a limited set of Markdown features, including:

- **Bold**
- _Italic_
- `Code`
- Preformatted text
- Paragraphs

Please note that this program checks whether the input Markdown file has correct syntax. If it doesn't, it throws an error.

## Prerequisites

Before you can build and run this project, you need to have the following software installed on your computer:

- Node.js: You can download it from the official website.
- npm (comes with Node.js): You can check if it's installed by running `npm -v` in your terminal.
- TypeScript: You can install it globally with npm by running `npm install -g typescript` in your terminal.
- npx (comes with npm 5.2+): You can check if it's installed by running `npx -v` in your terminal.

## Building the Project

1. Install the necessary packages by running the following command in the root directory of the project:

```bash
npm install
```

2. Compile the TypeScript files into JavaScript by running the following command:

```bash
npm run build
```

## Running the Project

Once you have compiled the JavaScript files, you can run the application and convert Markdown to HTML.

If you want to see the compiled HTML text in console, use the following command:

```bash
npm run start -- markdownFilePath.md
```

For example, to convert the provided test Markdown file, you can run:

```bash
npm run start -- .\\test-markdown.md
```

If you want to specify an output path for the HTML file, you can use the --out flag. Here’s the command:

```bash
npm run start -- markdownFilePath.md --out=htmlOutputFilePath.html
```

For example, to convert the provided test Markdown file and output the HTML to result.html, you can run:

```bash
npm run start -- .\\test-markdown.md --out=result.html
```

To convert Markdown text to ANSI format and output it to a file or console, use the following commands:

_To save in file_

```bash
npm run start -- markdownFilePath.md --format=ansi --out=ansiOutputFilePath
```

_To output in console_

```bash
npm run start -- markdownFilePath.md --format=ansi
```

## Testing the Project

For testing, the Jest library is used to ensure the reliability of the code. To run the tests, execute the following command:

```bash
npm run test
```

## Continuous Integration (CI)

This project is integrated with GitHub Actions for Continuous Integration, running tests for each commit in the main branch of the repository. A commit history is maintained to demonstrate the CI process, including a commit where tests have failed, showcasing the effectiveness of the tests.

This will run all the unit tests defined in the project and provide a report of the test results.

## Commits

- [Revert commit](https://github.com/forestgreen18/markdown-app/commit/37e5eaf3d3e2ac03af0bac7ba7793bc2255bae5c)

- [Failed CI Tests Commit](https://github.com/forestgreen18/markdown-app/commit/3c51dd8aa67ea6b8b2024680a9b8d536d071d13f)

## Conclusions

Unit tests have proven to be invaluable in maintaining the integrity of the application’s functionality, especially when adding new features or refactoring existing code. They have significantly reduced the likelihood of introducing bugs and have facilitated a more confident development process.
