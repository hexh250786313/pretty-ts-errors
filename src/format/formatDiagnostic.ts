import { Diagnostic } from "vscode-languageserver-types";
import { miniLine, recoverTypescriptCodeBlockTag, title } from "../components";
import { d } from "../utils";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { markdownIndent, identSentences } from "./identSentences";
import { prettify } from "./prettify";
import { format as prettier } from "prettier";
import { embedSymbolLinks } from "./embedSymbolLinks";

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string = prettify
) {
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
