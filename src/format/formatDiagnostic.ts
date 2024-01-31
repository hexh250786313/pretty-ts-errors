import { Diagnostic } from "vscode-languageserver-types";
import {
  errorCodeExplanationLink,
  errorMessageTranslationLink,
  miniLine,
  title,
} from "../components";
import { d } from "../utils";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { markdownIndent, identSentences } from "./identSentences";

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string = (type) => type
) {
  const newDiagnostic = diagnostic;

  const result = d/*html*/ `
    ${title(diagnostic)}
    ${miniLine}
    ${markdownIndent(
      formatDiagnosticMessage(identSentences(newDiagnostic.message), format)
    )}
    ${errorMessageTranslationLink(diagnostic.message)}
    ${errorCodeExplanationLink(diagnostic.code)}
  `;
  return result;
}
