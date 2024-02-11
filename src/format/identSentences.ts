import { d } from "../utils";

const prefix = "\0";

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
        ${prefix}${"\u0020".repeat(whiteSpacesCount)}${line.replace(
        /\u0020(?=(\S))/,
        "- "
      )}
      `;
    })
    .join("");

export const markdownIndent = (message: string): string => {
  const ms = message.split("\n\n").map((i) => i.trim());
  if (!ms.filter((i) => i.startsWith(prefix)).length) {
    return message;
  }
  const multiItems =
    ms.filter((i) => i.startsWith(`${prefix}\u0020-`)).length > 1;
  const next = ms.map((lines, index) => {
    if (multiItems && index === 0) {
      return lines;
    } else if (!multiItems && index === 0) {
      lines = `${prefix} - ${lines}`;
    } else if (!multiItems && index !== 0) {
      // 每一行加两个空格
      lines = lines.replace(
        new RegExp(`${prefix}\\u0020`, "gm"),
        `${prefix}\u0020\u0020\u0020`
      );
    }
    // Get the number of consecutive spaces after \0
    let spaces = lines.match(new RegExp(`${prefix}\\s+`))?.[0].length || 0;
    spaces += 2;
    // Add spaces to every line except the first line
    if (spaces) {
      return lines
        .split("\n")
        .map((line, index, self) => {
          if (index === 0) {
            return line.replace(/$/gm, "\u0020\u0020\n");
          }
          // last line
          if (index === self.length - 1) {
            return (
              "." +
              "\u0020".repeat(spaces - 1) +
              line.trim().replace(/$/gm, "\u0020\u0020\n")
            );
          }
          return `${"\u0020".repeat(spaces)}${line}`;
        })
        .join("\n")
        .replace(/^.{2}/gm, "");
    }
    return lines;
  });
  const final = next.join("\n\n");
  return final;
};
