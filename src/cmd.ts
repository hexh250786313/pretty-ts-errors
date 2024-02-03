import { program } from "commander";
import { readJsonSync } from "fs-extra";
import { resolve } from "path";
import { Diagnostic } from "vscode-languageserver-types";
import { formatDiagnostic } from "./format/formatDiagnostic";

const pkg = readJsonSync(resolve(__dirname, "../package.json"));

let input = "";
let inputProvided = false;

program
  .version(pkg.version, "-v, --version")
  .usage(`[ -i | --input <Diagnostic> ] [ -v | --version ]`)
  .option(
    "-i, --input <Diagnostic>",
    "Input the stringified Diagnostic object JSON.",
    (value) => {
      input = value;
      inputProvided = true;
    }
  )
  .parse(process.argv);

program
  .version(pkg.version, "-v, --version")
  .usage(`[ -i | --input ] [ -v | --version ] [ '<Diagnostic[]>' ]\n`)
  .parse(process.argv);

function processInput(rawInput: string) {
  let diagnostic: Diagnostic;
  try {
    diagnostic = JSON.parse(rawInput);
    try {
      const result = formatDiagnostic(diagnostic);
      process.stdout.write(`${result}`);
    } catch (e) {
      process.stderr.write(`${e}\n`);
    }
  } catch (e) {
    process.stderr.write("Stringified JSON object required as input\n");
  }
}

export function run() {
  if (inputProvided) {
    // 处理来自命令行参数的输入
    processInput(input);
  } else {
    // 从标准输入读取
    process.stdin.setEncoding("utf8");

    process.stdin.on("readable", () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        input += chunk;
      }
    });

    process.stdin.on("end", () => {
      processInput(input.trim());
    });
  }
}
