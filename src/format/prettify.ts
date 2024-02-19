import parserTypescript from "prettier/parser-typescript";
import { format } from "prettier/standalone";

function prettierIt(text: string) {
  return format(text, {
    plugins: [parserTypescript],
    parser: "typescript",
    printWidth: 60,
    singleAttributePerLine: false,
    arrowParens: "avoid",
  });
}

export function prettify(text: string) {
  let res = text;
  try {
    res = prettierIt(res).trim();
    if (res.includes("\n")) {
      return res;
    }
  } catch (e) {}
  return text;
}
