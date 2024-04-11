import { d } from "../utils";

export const recoverTypescriptCodeBlockTag = (code: string) =>
  code.replace(specialTypescriptCodeBlockTag, typescriptCodeBlockTag);

/** Prevent prettier from formatting special code block tags */
export const specialTypescriptCodeBlockTag = "\0__typescript__\0";
export const typescriptCodeBlockTag = "typescript";

/**
 * @returns markdown string that will be rendered as a code block (`supportHtml` required)
 * We're using codicon here since it's the only thing that can be `inline-block`
 * and have a background color in hovers due to strict sanitization of markdown on
 * VSCode [code](https://github.com/microsoft/vscode/blob/735aff6d962db49423e02c2344e60d418273ae39/src/vs/base/browser/markdownRenderer.ts#L372)
 */
const codeBlock = (code: string, language: string) => {
  if (!code.includes("\n")) {
    return `\`${code}\``;
  }
  return d/*html*/ `

    \`\`\`${language === "type" ? specialTypescriptCodeBlockTag : language}
    ${code}
    \`\`\`

  `;
};

export const inlineCodeBlock = (code: string, language: string) =>
  codeBlock(`${code}`, language);

export const multiLineCodeBlock = (code: string, language: string) => {
  const codeLines = code.split("\n");
  //this line is finding the longest line
  const maxLineChars = codeLines.reduce(
    (acc, curr) => (curr.length > acc ? curr.length : acc),
    0
  );
  // codicon class align the code to the center, so we must pad it with spaces
  const paddedCode = codeLines
    .map((line) => line.padEnd(maxLineChars + 2))
    .join("\n");

  return d/*html*/ `
    ${codeBlock(paddedCode, language)}
    `;
};
