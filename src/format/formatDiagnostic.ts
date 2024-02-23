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
import { prettify } from "./prettify";
import { format as prettier } from "prettier";

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string = prettify
) {
  const newDiagnostic = diagnostic;

  const result = prettier(
    d/*html*/ `
    ${title(diagnostic)}
    ${miniLine}
    ${markdownIndent(
      formatDiagnosticMessage(identSentences(newDiagnostic.message), format)
    )}
    ${errorMessageTranslationLink(diagnostic.message)}
    ${errorCodeExplanationLink(diagnostic.code)}
  `,
    {
      parser: "markdown",
    }
  );
  return result;
}
