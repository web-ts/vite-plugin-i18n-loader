import deepMerge from "../deep-merge";
import { MessageDictionary } from "../types";

function extractPath(path: string, ignored: Array<string> = []) {
  const parts = path.split("/").slice(1);
  let lang = parts.pop();

  lang = lang.split(".")[0];

  return {
    lang,
    parts: parts.filter((part) => !ignored.includes(part))
  };
}

function createLangObject(parts: Array<string>, contents: MessageDictionary) {
  if (parts.length === 0) return contents;
  parts.reverse();
  let result: MessageDictionary = { [parts[0]]: { ...contents } };

  for (let i = 1; i < parts.length; i++) {
    const item = parts[i];

    result = { [item]: { ...result } };
  }

  return result;
}

export default function (data: Array<{ path: string; content: MessageDictionary }>, ignored: Array<string> = []) {
  let result: MessageDictionary = {};

  for (const { path, content } of data) {
    const extracted = extractPath(path, ignored);
    const locale = { [extracted.lang]: createLangObject(extracted.parts, content) };

    result = deepMerge(result, locale);
  }

  return result;
}
