import { Diagnostic } from "vscode-languageserver-types";
import {
  errorCodeExplanationLink,
  errorMessageTranslationLink,
  title,
} from "../components";
import { d } from "../utils";
import { embedSymbolLinks } from "./embedSymbolLinks";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { identAll, identSentences } from "./identSentences";

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string
) {
  const newDiagnostic = diagnostic;

  return d/*html*/ `
    ${title(diagnostic)}
    ${identAll(
      formatDiagnosticMessage(identSentences(newDiagnostic.message), format)
    )}
  `;
}

//
// links:
// ${errorMessageTranslationLink(diagnostic.message)}
// ${errorCodeExplanationLink(diagnostic.code)}
