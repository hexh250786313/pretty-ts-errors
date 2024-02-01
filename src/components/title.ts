import { Diagnostic } from "vscode-languageserver-types";
import { compressToEncodedURIComponent, d } from "../utils";
import { KNOWN_ERROR_NUMBERS } from "./consts/knownErrorNumbers";
import { miniLine } from "./miniLine";

// @todo
export const title = (diagnostic: Diagnostic) => d/*html*/ `
    \u001b[31m⚠ Error \u001b[0m${
      typeof diagnostic.code === "number"
        ? d/*html*/ `
            \u001b[31m(TS${diagnostic.code})\u001b[0m
          `
        : ""
    }
    \n
    ${miniLine}
`;

export const errorCodeExplanationLink = (errorCode: Diagnostic["code"]) =>
  KNOWN_ERROR_NUMBERS.has(errorCode)
    ? `\n- https://typescript.tv/errors/#ts${errorCode}`
    : "";

export const errorMessageTranslationLink = (message: Diagnostic["message"]) => {
  const encodedMessage = compressToEncodedURIComponent(message);

  return `\n- https://ts-error-translator.vercel.app/?error=${encodedMessage}`;
};
