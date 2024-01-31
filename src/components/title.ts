import { Diagnostic } from "vscode-languageserver-types";
import { compressToEncodedURIComponent, d } from "../utils";
import { KNOWN_ERROR_NUMBERS } from "./consts/knownErrorNumbers";
import { miniLine } from "./miniLine";

// @todo
export const title = (diagnostic: Diagnostic) => d/*html*/ `
    \u001b[0m\u001b[31m\u001b[1m⚠ Error \u001b[0m${
      typeof diagnostic.code === "number"
        ? d/*html*/ `
            \u001b[0m\u001b[31m\u001b[1m(TS${diagnostic.code}) ${errorCodeExplanationLink(diagnostic.code)} | ${errorMessageTranslationLink(diagnostic.message)}\u001b[0m
          `
        : ""
    }
    \n
    ${miniLine}
`;

export const errorCodeExplanationLink = (errorCode: Diagnostic["code"]) =>
  KNOWN_ERROR_NUMBERS.has(errorCode)
    ? d/*html*/ `
        \u001b[0m\u001b[31m\u001b[1mhttps://typescript.tv/errors/#ts${errorCode}
        \u001b[0m`
    : "";

export const errorMessageTranslationLink = (message: Diagnostic["message"]) => {
  const encodedMessage = compressToEncodedURIComponent(message);

  return d/*html*/ `
    \u001b[0m\u001b[31m\u001b[1mhttps://ts-error-translator.vercel.app/?error=${encodedMessage}
    \u001b[0m`;
};
