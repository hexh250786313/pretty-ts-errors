import { Diagnostic } from "vscode-languageserver-types";
import { compressToEncodedURIComponent } from "../utils";
import { KNOWN_ERROR_NUMBERS } from "./consts/knownErrorNumbers";

const getDiagnosticSeverity = (diagnostic: Diagnostic) => {
  switch (diagnostic.severity) {
    case 4:
      return "Hint";
    case 3:
      return "Info";
    case 2:
      return "Warning";
    case 1:
      return "Error";
    default:
      return "Error";
  }
};

const getDiagnosticIcon = (diagnostic: Diagnostic) => {
  switch (diagnostic.severity) {
    case 4:
      return "🟢";
    case 3:
      return "🔵";
    case 2:
      return "🟠";
    case 1:
      return "🔴";
    default:
      return "🔴";
  }
};

export const title = (diagnostic: Diagnostic) => {
  let title = "";
  const severity = getDiagnosticSeverity(diagnostic);
  const icon = getDiagnosticIcon(diagnostic);
  const code =
    typeof diagnostic.code === "number" ? `(TS${diagnostic.code})` : "";
  title = `${icon} ${severity} ${code}`;
  return title;
};

export const errorCodeExplanationLink = (errorCode: Diagnostic["code"]) =>
  KNOWN_ERROR_NUMBERS.has(errorCode)
    ? `\n- https://typescript.tv/errors/#ts${errorCode}`
    : "";

export const errorMessageTranslationLink = (message: Diagnostic["message"]) => {
  const encodedMessage = compressToEncodedURIComponent(message);

  return `\n- https://ts-error-translator.vercel.app/?error=${encodedMessage}`;
};
