import { format } from "prettier";

export const prettierIt = (code: string) => {
  let res = code;
  try {
    res = format(res, {
      parser: "typescript",
      printWidth: 60,
      tabWidth: 2,
    }).trim();
    if (res.includes("\n")) {
      return res;
    }
  } catch (e) {}
  return code;
};
