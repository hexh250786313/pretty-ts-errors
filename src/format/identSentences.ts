import { d } from "../utils";

export const identSentences = (message: string): string =>
  message
    .split("\n")
    .map((line) => {
      let whiteSpacesCount = line.search(/\S/);
      if (whiteSpacesCount === -1) {
        whiteSpacesCount = 0;
      }
      if (whiteSpacesCount === 0) {
        return line;
      }
      if (whiteSpacesCount >= 2) {
        whiteSpacesCount -= 2;
      }

      return d/*html*/ `
        \n
        →${"\u0020".repeat(2).repeat(whiteSpacesCount)}${line}
      `;
    })
    .join("");

export const identAll = (message: string): string => {
  const ms = message
    .split("\n\n")
    .map((i) => i.trim())
    .filter((i) => i.startsWith("→"));
  if (!ms.length) {
    return message;
  }
  const next = ms.map((lines) => {
    // 获取 → 后连续的空格数
    const spaces = lines.match(/→\s+/)?.[0].length || 0;
    // 给除了第一行的每一行都加上空格
    if (spaces) {
      return lines
        .split("\n")
        .map((line, index) => {
          if (index === 0) {
            return line;
          }
          return `${"\u0020".repeat(spaces)}${line}`;
        })
        .join("\n");
    }
    return lines;
  });
  return next.join("\n\n");
};
