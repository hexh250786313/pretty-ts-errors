import { format } from "prettier";

export const prettierIt = (code: string) => {
  let res = code;
  try {
    const prefix = "type __PrettyTsErrorType__ =";
    res = prefix + res;
    const temps: string[] = [];
    // For: ... code?: string | /* 1 more */ | undefined; ...
    res = res.replace(/\|\u0020\/\*\u0020\d\u0020more\u0020\*\//, (match) => {
      temps.push(match);
      return "/**\0*/";
    });
    res = format(res, {
      parser: "typescript",
      printWidth: 60,
      tabWidth: 2,
    }).trim();
    res = res
      .replace("/**\0*/", () => temps.shift() || "")
      .replace(new RegExp(`^${prefix}`), "").trim();
    if (res.includes("\n")) {
      return res;
    }
  } catch (e) {}
  return code;
};
