import { inlineCodeBlock, multiLineCodeBlock } from "./codeBlock";
import { d } from "../utils";

/**
 * Code block without syntax highlighting like.
 * For syntax highlighting, use {@link inlineCodeBlock} or {@link multiLineCodeBlock}
 */
export const unStyledCodeBlock = (content: string) => d/*html*/ `
  \u001b[31m${content}\u001b[0m
`; // @todo
