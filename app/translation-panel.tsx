import { useState } from 'react';
import type { Chapter } from './wiki-data';
import { canonicalLanguage, repository, translationUrl, type interfaceText } from './i18n';

export function TranslationPanel({ text, chapters }: { text: ReturnType<typeof interfaceText>; chapters: Chapter[] }) {
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState(chapters[0].filename);
  const locale = canonicalLanguage(code);
  return <details id="translations" className="contribution-guide translation-panel">
    <summary>{text.translateTitle}</summary>
    <p>{text.translationSteps}</p>
    <div className="translation-fields">
      <label>{text.languageCode}<input value={code} onChange={event => setCode(event.target.value)} placeholder="ja / fr / pt-BR" autoComplete="off" spellCheck={false} aria-invalid={!!code && !locale} /></label>
      <label>{text.chapter}<select value={filename} onChange={event => setFilename(event.target.value)}>{chapters.map(chapter => <option key={chapter.id} value={chapter.filename}>{chapter.title}</option>)}</select></label>
    </div>
    {code && !locale && <p role="status">{text.invalidLocale}</p>}
    <p>{text.translationDraft}</p>
    <div className="translation-actions">
      <a href={`${repository}/blob/main/content/translations/en/${filename}`} target="_blank" rel="noreferrer">{text.sourceLink}</a>
      {locale && <a href={translationUrl(locale, filename)} target="_blank" rel="noreferrer">{text.createTranslation}</a>}
      <a href={`${repository}/blob/main/TRANSLATING.md`} target="_blank" rel="noreferrer">{text.translationGuide}</a>
    </div>
    <p>{text.submitReminder}</p>
  </details>;
}
