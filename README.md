# pretty-ts-errors-markdown

A fork of https://github.com/yoavbls/pretty-ts-errors. It transforms TypeScript errors into markdown.

### Usage (CLI)

※ Use inline parameters

```bash
npm i -g pretty-ts-errors-markdown
pretty-ts-errors-markdown -i "{\"range\":{\"start\":{\"line\":6,\"character\":6},\"end\":{\"line\":6,\"character\":7}},\"message\":\"Variable 'a' implicitly has an 'any' type.\",\"code\":7005,\"severity\":1,\"source\":\"tsserver\"}"
```

※ Use standard input

```bash
cat ./examples/input.txt | pretty-ts-errors-markdown > ./examples/output.md
```

### Usage (Programmatically)

```typescript
import { formatDiagnostic } from "pretty-ts-errors-markdown";
import { Diagnostic } from "vscode-languageserver-types";

const diagnostic: Diagnostic = {
  range: {
    start: { line: 6, character: 6 },
    end: { line: 6, character: 7 },
  },
  message: "Variable 'a' implicitly has an 'any' type.",
  code: 7005,
  severity: 1,
  source: "tsserver",
};

const marked = formatDiagnostic(diagnostic);
console.log(marked);
```
