import { existsSync, readdirSync, readFileSync } from 'node:fs';
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
const baseInterface = JSON.parse(readFileSync('app/locales/en.json', 'utf8'));
const uiKeys = Object.keys(baseInterface);
for (const directory of readdirSync('content/translations', { withFileTypes: true })) {
  if (!directory.isDirectory()) throw new Error('翻译目录下只能放置语言文件夹。');
  const locale = directory.name;
  if (!/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(locale) || Intl.getCanonicalLocales(locale)[0] !== locale || locale === 'zh-CN' || locale === 'zh') {
    throw new Error(`语言代码无效或大小写不规范：${locale}`);
  }
  const translated = new Set();
  for (const filename of readdirSync(`content/translations/${locale}`)) {
    const path = `content/translations/${locale}/${filename}`;
    if (filename === 'ui.json') {
      const values = JSON.parse(readFileSync(path, 'utf8'));
      if (!values || typeof values !== 'object' || Array.isArray(values)) throw new Error(`${path}：界面译文必须为对象。`);
      for (const [key, value] of Object.entries(values)) {
        if (!uiKeys.includes(key) || typeof value !== 'string' || !value.trim()) throw new Error(`${path}：未知字段或无效译文 ${key}`);
        const placeholders = text => [...text.matchAll(/\{\w+\}/g)].map(match => match[0]).sort().join(',');
        if (placeholders(value) !== placeholders(baseInterface[key])) throw new Error(`${path}：请保留 ${key} 中的占位符。`);
      }
      continue;
    }
    if (!files.includes(filename)) throw new Error(`${path}：译文章节文件名须与原文一致。`);
    const chapter = parseChapter(path, readFileSync(path, 'utf8'));
    translated.add(chapter.id);
  }
  if (locale === 'en' && translated.size !== files.length) throw new Error('英文回退版本必须包含全部章节。');
  console.log(`${locale}: ${translated.size}/${files.length}`);
}
if (!existsSync('content/translations/en')) throw new Error('缺少英文回退版本。');
