/** @param {string} path @param {string} source */
export function parseChapter(path, source) {
  const filename = path.split('/').pop() || '';
  const id = filename?.match(/^\d{2}-([a-z-]+)\.md$/)?.[1];
  const text = source.replace(/\r\n/g, '\n').trim();
  const match = text.match(/^# ([^\n]+)\n\n([^\n]+)\n\n([\s\S]+)$/);
  if (!id || !match) {
    throw new Error(`${path}：请保留一级标题、空行、一段简介、空行及正文。`);
  }
  if (/^# /m.test(match[3])) {
    throw new Error(`${path}：正文的小标题请使用 ## 或 ###。`);
  }
  return { id, title: match[1], summary: match[2], body: match[3], filename };
}
