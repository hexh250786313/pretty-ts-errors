import { Diagnostic } from "vscode-languageserver-types";
import { URI } from "vscode-uri";

export function embedSymbolLinks(str: string, diagnostic: Diagnostic): string {
  if (
    !diagnostic?.relatedInformation?.[0]?.message?.includes("is declared here")
  ) {
    return str;
  }
  const ref = diagnostic.relatedInformation[0];
  const _symbol = ref?.message.match(/(?<symbol>'.*?') is declared here./)
    ?.groups?.symbol;
  const symbol = _symbol?.replaceAll(/(^')|('$)/g, "`");
  if (!symbol) {
    return str;
  }
  return str.replaceAll(
    symbol,
    `[${_symbol} 📄](${URI.parse(ref.location.uri).fsPath}#${
      ref.location.range.start.line + 1
    },${ref.location.range.start.character + 1})`
  );
}
