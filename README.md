# Markdown to HTML Converter

This application is a simple Markdown to HTML converter written in TypeScript.

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

````bash
npm run start -- markdownFilePath.md```
````

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

## Revert commit
