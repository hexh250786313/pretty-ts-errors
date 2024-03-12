import { Diagnostic } from "vscode-languageserver-types";
import { URI } from "vscode-uri";

export function embedSymbolLinks(str: string, diagnostic: Diagnostic): string {
  if (
    !diagnostic?.relatedInformation?.[0]?.message?.includes("is declared here")
  ) {
    return str;
  }
  const ref = diagnostic.relatedInformation[0];
  const symbol = ref?.message.match(/(?<symbol>'.*?') is declared here./)
    ?.groups?.symbol!;

  if (!symbol) {
    return str;
  }
  return str.replaceAll(
    symbol,
    `[${symbol} 📄](${URI.parse(ref.location.uri).path}#${
      ref.location.range.start.line + 1
    },${ref.location.range.start.character + 1})`
  );
}
