'use client';
import { useEffect, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { BookOpen, Search, ArrowUpRight, Compass, Package, Sparkles, Skull, Shield, Menu, X, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { languages, localizedChapters } from './wiki-data';
import { ChapterBody } from './chapter-body';
import { TranslationPanel } from './translation-panel';
import { initialLanguage, interfaceText, languageName, repository, translationUrl, type TextKey } from './i18n';
const icons = [Package, Package, Sparkles, BookOpen, Shield, Package, Compass, Skull, Skull, BookOpen];
export default function Home() {
  const [locale, setLocale] = useState(initialLanguage);
  const [query, setQuery] = useState('');
  const [menu, setMenu] = useState(false);
  const text = interfaceText(locale);
  const chapters = localizedChapters(locale);
  const translatedCount = chapters.filter(chapter => !chapter.translationMissing).length;
  const t = (key: TextKey, params: Record<string, string | number> = {}) => text[key].replace(/\{(\w+)\}/g, (match, name) => String(params[name] ?? match));
  const normalized = query.trim().toLocaleLowerCase();
  const visible = chapters.filter(chapter => !normalized || `${chapter.title} ${chapter.summary} ${chapter.body}`.toLocaleLowerCase().includes(normalized));
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${text.brand} Wiki · ${text.reference}`;
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState(null, '', url);
    try { localStorage.setItem('minestarve-language', locale); } catch { /* Storage is optional. */ }
  }, [locale, text.brand, text.reference]);
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const hash = event.currentTarget.hash;
    flushSync(() => { setQuery(''); setMenu(false); });
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target?.tagName === 'DETAILS') (target as HTMLDetailsElement).open = true;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0 });
    const url = new URL(window.location.href);
    url.hash = hash;
    window.history.replaceState(null, '', url);
  }
  const quick = [
    { id: 'enchanting', icon: 'book', category: text.growth, hint: text.enchantHint },
    { id: 'totem', icon: 'totem', category: text.relics, hint: text.totemHint },
    { id: 'recipes', icon: 'bucket', category: text.crafting, hint: text.recipeHint },
  ];
  return <SidebarProvider className="wiki-shell">
    <a className="skip-link" href="#content">{text.skip}</a>
    <Sidebar collapsible="none" className={`wiki-sidebar ${menu ? 'mobile-open' : ''}`}>
      <a className="brand" href="#" onClick={navigate}><BookOpen size={28}/><div>{text.brand}<span>{text.wiki}</span></div></a>
      <div className="sidebar-edition"><span className="live-dot"/> {text.version} 1.4.5</div>
      <div className="language-controls">
        <label htmlFor="wiki-language">{text.language} / Language</label>
        <select id="wiki-language" value={locale} onChange={event => { setLocale(event.target.value); setQuery(''); }}>
          {languages.map(code => <option key={code} value={code}>{languageName(code)}</option>)}
        </select>
        <small>{t('coverage', { count: translatedCount, total: chapters.length })}</small>
        <a href="#translations" onClick={navigate}>{text.addTranslation} ↗</a>
      </div>
      <SidebarContent><nav aria-label={text.contents}><p className="nav-label">{text.contents}</p>{chapters.map((chapter, i) => { const Icon = icons[i] || BookOpen; return <a key={chapter.id} href={`#${chapter.id}`} onClick={navigate}><Icon size={17}/><span>{chapter.title}</span><span className="nav-index">{String(i+1).padStart(2,'0')}</span></a>; })}</nav></SidebarContent>
      <div className="sidebar-foot"><span>{text.game}</span><p>{text.author}</p><small>{text.updated}</small><a className="contribute-link" href="#contribute" onClick={navigate}>{text.contribute}</a></div>
    </Sidebar>
    {menu && <button className="menu-scrim" onClick={()=>setMenu(false)} aria-label={text.closeMenu}/>}
    <div className="wiki-body">
      <header className="topbar"><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?text.closeMenu:text.openMenu} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button><span className="breadcrumb">{text.guide} <ChevronRight size={14}/> <strong>{text.reference}</strong></span><label className="search"><Search size={18}/><Input aria-label={text.search} placeholder={text.searchHint} value={query} onChange={event=>setQuery(event.target.value)}/>{query && <button aria-label={text.clear} onClick={()=>setQuery('')}><X size={16}/></button>}</label></header>
      <main id="content">
        <div className="intro"><div className="eyebrow">{text.eyebrow}</div><h1>{text.brand}<span className="title-tag">{text.encyclopedia}</span></h1><p>{text.intro}</p><div className="intro-meta"><span>{text.version} 1.4.5</span><span>{t('chapterCount', { count: chapters.length })}</span><span>{text.facts}</span></div><div className="experience-track" aria-hidden="true"><span/></div></div>
        {!normalized && <div className="quick-links">{quick.map(item => <a key={item.id} href={`#${item.id}`} onClick={navigate}><span className={`item-sprite item-${item.icon}`} aria-hidden="true"/><div><small>{item.category}</small><strong>{chapters.find(chapter => chapter.id === item.id)?.title}</strong><span>{item.hint}</span></div><ArrowUpRight/></a>)}</div>}
        <details id="contribute" className="contribution-guide">
          <summary>{text.helpTitle} <span>{text.reviewFlow}</span></summary>
          <p>{text.helpBody}</p><p>{text.submitReminder}</p>
          <a href={`${repository}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">{text.editGuide}</a>
        </details>
        <TranslationPanel text={text} chapters={chapters}/>
        <div className="article-layout"><div className="chapters">
          {normalized && <p className="search-result" role="status">{t('results', { count: visible.length, query })}<button onClick={()=>setQuery('')}>{text.showAll}</button></p>}
          {visible.length === 0 && <div className="no-results"><Search size={30}/><h2>{text.noResults}</h2><p>{text.trySearch}</p></div>}
          {visible.map(chapter => <section id={chapter.id} key={chapter.id} className="chapter">
            <div className="chapter-heading">
              <span>{String(chapters.indexOf(chapter)+1).padStart(2,'0')}</span><h2 lang={chapter.sourceLocale} dir="auto">{chapter.title}</h2>
              <a className="chapter-edit" href={translationUrl(locale, chapter.filename)} target="_blank" rel="noreferrer" aria-label={`${chapter.translationMissing ? text.translateChapter : text.edit}: ${chapter.title}`}>{chapter.translationMissing ? text.translateChapter : text.edit}</a>
              <a className="chapter-anchor" href={`#${chapter.id}`} aria-label={`${text.anchor} ${chapter.title}`}>#</a>
            </div>
            {chapter.translationMissing && <p className="translation-fallback">{text.translationFallback}</p>}
            <div lang={chapter.sourceLocale} dir="auto"><p className="chapter-summary">{chapter.summary}</p>
              <ChapterBody body={chapter.body} recipes={chapter.id === 'recipes'} mechanicsLabel={text.mechanics}/>
            </div>
          </section>)}
        </div></div>
        <footer className="page-footer"><BookOpen size={20}/><div><strong>{text.brand} Wiki</strong><p>{text.intro}</p></div><a href="#" onClick={navigate}>{text.top}</a></footer>
      </main>
    </div>
  </SidebarProvider>;
}
