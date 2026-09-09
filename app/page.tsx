'use client';
import { useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { BookOpen, Search, ArrowUpRight, Compass, Package, Sparkles, Skull, Shield, Menu, X, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { chapters } from './wiki-data';
import { ChapterBody } from './chapter-body';
const icons = [Package, Package, Sparkles, BookOpen, Shield, Package, Compass, Skull, Skull, BookOpen];
export default function Home() {
  const [query, setQuery] = useState('');
  const [menu, setMenu] = useState(false);
  const normalized = query.trim().toLocaleLowerCase();
  const visible = chapters.filter(c => !normalized || JSON.stringify(c).toLocaleLowerCase().includes(normalized));
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const hash = event.currentTarget.hash;
    flushSync(() => { setQuery(''); setMenu(false); });
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo({ top: 0 });
    window.history.replaceState(null, '', hash || window.location.pathname);
  }
  return <SidebarProvider className="wiki-shell">
    <a className="skip-link" href="#content">跳转到攻略正文</a>
    <Sidebar collapsible="none" className={`wiki-sidebar ${menu ? 'mobile-open' : ''}`}>
      <a className="brand" href="#" onClick={navigate}><BookOpen size={28}/><div>我的饥荒<span>模组玩家 Wiki</span></div></a>
      <div className="sidebar-edition"><span className="live-dot"/> 版本 1.4.5 <span>简体中文</span></div>
      <SidebarContent><nav aria-label="攻略目录"><p className="nav-label">攻略目录</p>{chapters.map((c, i) => { const Icon = icons[i] || BookOpen; return <a key={c.id} href={`#${c.id}`} onClick={navigate}><Icon size={17}/><span>{c.title}</span><span className="nav-index">{String(i+1).padStart(2,'0')}</span></a>; })}</nav></SidebarContent>
      <div className="sidebar-foot"><span>饥荒联机版</span><p>模组作者 唐小可</p><small>攻略更新 2026 年 9 月 9 日</small><a className="contribute-link" href="#contribute" onClick={navigate}>参与编辑</a></div>
    </Sidebar>
    {menu && <button className="menu-scrim" onClick={()=>setMenu(false)} aria-label="关闭目录"/>}
    <div className="wiki-body">
      <header className="topbar"><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?'关闭目录':'打开目录'} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button><span className="breadcrumb">玩家指南 <ChevronRight size={14}/> <strong>攻略与资料</strong></span><label className="search"><Search size={18}/><Input aria-label="搜索攻略" placeholder="搜索物品、附魔、玩法…" value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button aria-label="清空搜索" onClick={()=>setQuery('')}><X size={16}/></button>}</label></header>
      <main id="content">
        <div className="intro"><div className="eyebrow">饥荒联机版 · 模组生存手册</div><h1>我的饥荒<span className="title-tag">攻略百科</span></h1><p>《我的饥荒》的物品、配方、附魔与生物资料。</p><div className="intro-meta"><span>当前版本 1.4.5</span><span>{chapters.length} 个资料章节</span><span>物品规则与数值速查</span></div><div className="experience-track" aria-hidden="true"><span/></div></div>
        {!normalized && <div className="quick-links"><a href="#enchanting"><span className="item-sprite item-book" aria-hidden="true"/><div><small>装备成长</small><strong>附魔与砂轮</strong><span>书架、硝石与等级消耗</span></div><ArrowUpRight/></a><a href="#totem"><span className="item-sprite item-totem" aria-hidden="true"/><div><small>遗物效果</small><strong>不死图腾</strong><span>装备在遗物栏才会生效</span></div><ArrowUpRight/></a><a href="#recipes"><span className="item-sprite item-bucket" aria-hidden="true"/><div><small>制作配方</small><strong>配方速查</strong><span>材料数量与制作条件</span></div><ArrowUpRight/></a></div>}
        <details id="contribute" className="contribution-guide">
          <summary>参与完善 Wiki <span>公开阅读 · GitHub 登录后编辑 · 唐小可审核发布</span></summary>
          <p>点击章节旁的“登录后编辑”，使用 GitHub 账号登录后修改文档。首次编辑按提示创建个人副本，保存修改后提交审核申请（Pull Request）。唐小可审核并合并后，页面才会更新。</p>
          <p>只保存到个人副本不会进入审核，请继续完成“Create pull request”。</p>
          <a href="https://github.com/tangxiaoke-lab/MineStarve/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">查看编辑说明 ↗</a>
        </details>
        <div className="article-layout"><div className="chapters">
          {normalized && <p className="search-result" role="status">找到 {visible.length} 个包含“{query}”的章节。<button onClick={()=>setQuery('')}>显示全部</button></p>}
          {visible.length === 0 && <div className="no-results"><Search size={30}/><h2>没有找到相关攻略</h2><p>试试“附魔”“书架”“奶桶”或“七咒”。</p></div>}
          {visible.map(c => <section id={c.id} key={c.id} className="chapter">
            <div className="chapter-heading">
              <span>{String(chapters.indexOf(c)+1).padStart(2,'0')}</span><h2>{c.title}</h2>
              <a className="chapter-edit" href={`https://github.com/tangxiaoke-lab/MineStarve/edit/main/content/${c.filename}`} target="_blank" rel="noreferrer" aria-label={`使用 GitHub 登录后编辑${c.title}`}>登录后编辑 ↗</a>
              <a className="chapter-anchor" href={`#${c.id}`} aria-label={`链接到${c.title}`}>#</a>
            </div>
            <p className="chapter-summary">{c.summary}</p>
            <ChapterBody body={c.body} recipes={c.id === 'recipes'} />
          </section>)}
        </div></div>
        <footer className="page-footer"><BookOpen size={20}/><div><strong>我的饥荒 模组 Wiki</strong><p>物品、配方、附魔与生物资料。</p></div><a href="#" onClick={navigate}>回到顶部 ↑</a></footer>
      </main>
    </div>
  </SidebarProvider>;
}
