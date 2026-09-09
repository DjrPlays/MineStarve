import { parseChapter } from '../lib/chapter-content.js';

const documents = import.meta.glob('../content/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

export const chapters = Object.entries(documents)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, source]) => parseChapter(path, source));
export type Chapter = (typeof chapters)[number];
