import { format } from "prettier";
import { d } from "../utils";

export const prettierIt = (code: string) => {
  let res = code;
  try {
    const prefix = "type Type = ";
    res = prefix + res;
    res = format(res, {
      parser: "typescript",
      printWidth: 60,
      tabWidth: 2,
    }).trim();
    res = res.replace(new RegExp(`^${prefix}`), "");
    if (res.includes("\n")) {
      return (
        "\n" +
        `${res
          .split("\n")
          .map((i) => `\u001B[34m${i}\u001B[0m`)
          .join("\n")}` +
        "\n"
      );
    }
  } catch (e) {}
  return `\u001b[31m${code}\u001b[0m`;
};
