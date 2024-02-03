import { format } from "prettier";

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
    // res = res.replace(new RegExp(`^${prefix}`), "");
    if (res.includes("\n")) {
      return res;
    }
  } catch (e) {}
  return code;
};
