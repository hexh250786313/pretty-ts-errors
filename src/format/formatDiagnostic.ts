import { Diagnostic } from "vscode-languageserver-types";
import { miniLine, title } from "../components";
import { d } from "../utils";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { identAll, identSentences } from "./identSentences";
import fs from "fs";

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string
) {
  const newDiagnostic = diagnostic;

  const result = d/*html*/ `
    ${title(diagnostic)}
    ${miniLine}
    ${identAll(
      formatDiagnosticMessage(identSentences(newDiagnostic.message), format)
    )}
  `;
  // 写入 /home/hexh/Desktop/text.md
  fs.writeFileSync("/home/hexh/Desktop/text.md", result);
  return result;
}

//
// links:
// ${errorMessageTranslationLink(diagnostic.message)}
// ${errorCodeExplanationLink(diagnostic.code)}
