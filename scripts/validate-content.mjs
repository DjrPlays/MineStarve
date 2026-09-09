import { readdirSync, readFileSync } from 'node:fs';
import { parseChapter } from '../lib/chapter-content.js';

const files = readdirSync('content').filter(file => file.endsWith('.md')).sort();
if (!files.length) throw new Error('攻略章节不能为空。');
const ids = new Set();
for (const file of files) {
  const chapter = parseChapter(file, readFileSync(`content/${file}`, 'utf8'));
  if (ids.has(chapter.id)) throw new Error(`重复的章节编号：${chapter.id}`);
  ids.add(chapter.id);
}
for (const required of ['enchanting', 'totem', 'recipes']) {
  if (!ids.has(required)) throw new Error(`缺少快捷入口对应的章节：${required}`);
}
console.log(`已校验 ${files.length} 个攻略文档的标题、简介与章节编号。`);
