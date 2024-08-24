import { Diagnostic } from "vscode-languageserver-types";
import { miniLine, recoverTypescriptCodeBlockTag, title } from "../components";
import { d } from "../utils";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { markdownIndent, identSentences } from "./identSentences";
import { prettify } from "./prettify";
import { format as prettier } from "prettier";
import { embedSymbolLinks } from "./embedSymbolLinks";

// 接收一个 message 字符串参数，然后追加写入到
// /home/hexh/workspace/hexh/coc-pretty-ts-errors/.hexh-git-branches/pretty-1/log.txt
export const log = (message: any) => {
  if (typeof message !== "string") {
    message = JSON.stringify(message);
  }
  const fs = require("fs");
  fs.appendFileSync(
    "/home/hexh/workspace/hexh/coc-pretty-ts-errors/.hexh-git-branches/pretty-1/log.txt",
    message + "\n"
  );
};


// 为字符串原型添加 log，便于调试
String.prototype.log = function () {
  log(this);
  return this.toString();
};

export const clearLog = () => {
  const fs = require("fs");
  fs.writeFileSync(
    "/home/hexh/workspace/hexh/coc-pretty-ts-errors/.hexh-git-branches/pretty-1/log.txt",
    ""
  );
};

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string = prettify
) {
  clearLog();
  const result = recoverTypescriptCodeBlockTag(
    embedSymbolLinks(
      prettier(
        d/*html*/ `
    ${title(diagnostic)}
    ${miniLine}
    ${markdownIndent(
      formatDiagnosticMessage(identSentences(diagnostic.message), format)
    )}
  `,
        {
          parser: "markdown",
        }
      ),
      diagnostic
    )
  );
  return result;
}
