import { parseChapter } from '../lib/chapter-content.js';

const documents = import.meta.glob('../content/**/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;
const interfaces = import.meta.glob('../content/translations/*/ui.json');
export type Chapter = ReturnType<typeof parseChapter>;
export const chapterSets: Record<string, Chapter[]> = { 'zh-CN': [] };
for (const [path, source] of Object.entries(documents).sort(([a], [b]) => a.localeCompare(b))) {
  const locale = path.match(/\/translations\/([^/]+)\//)?.[1] || 'zh-CN';
  (chapterSets[locale] ||= []).push(parseChapter(path, source));
}
for (const path of Object.keys(interfaces)) {
  const locale = path.split('/').at(-2)!;
  chapterSets[locale] ||= [];
}
export const chapters = chapterSets['zh-CN'];
export const languages = ['zh-CN', 'en', ...Object.keys(chapterSets).filter(code => code !== 'zh-CN' && code !== 'en').sort()];
export function localizedChapters(locale: string) {
  return chapters.map(original => {
    const translated = chapterSets[locale]?.find(chapter => chapter.id === original.id);
    const fallback = chapterSets.en.find(chapter => chapter.id === original.id)!;
    return { ...(translated || fallback), sourceLocale: translated ? locale : 'en', translationMissing: !translated };
  });
}
