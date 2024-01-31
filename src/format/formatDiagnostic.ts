import { Diagnostic } from "vscode-languageserver-types";
import { title } from "../components";
import { d } from "../utils";
import { embedSymbolLinks } from "./embedSymbolLinks";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { identSentences } from "./identSentences";

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string
) {
  const newDiagnostic = embedSymbolLinks(diagnostic);

  return d/*html*/ `
    ${title(diagnostic)}
    ${formatDiagnosticMessage(identSentences(newDiagnostic.message), format)}
  `;
}
