'use client';
import { useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { BookOpen, Search, ArrowUpRight, Compass, Package, Sparkles, Skull, Shield, Settings, Menu, X, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { chapters } from './wiki-data';
const icons = [Compass, Package, Package, Sparkles, BookOpen, Shield, Package, Compass, Skull, Skull, Settings, BookOpen];
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
      <div className="sidebar-foot"><span>饥荒联机版</span><p>模组作者 唐小可</p><a className="repository-link" href="https://github.com/zhouoneok-lab/MineStarve" target="_blank" rel="noreferrer">查看源码仓库 ↗</a><small>攻略更新 2026 年 9 月 9 日</small></div>
    </Sidebar>
    {menu && <button className="menu-scrim" onClick={()=>setMenu(false)} aria-label="关闭目录"/>}
    <div className="wiki-body">
      <header className="topbar"><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?'关闭目录':'打开目录'} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button><span className="breadcrumb">玩家指南 <ChevronRight size={14}/> <strong>攻略与资料</strong></span><label className="search"><Search size={18}/><Input aria-label="搜索攻略" placeholder="搜索物品、附魔、玩法…" value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button aria-label="清空搜索" onClick={()=>setQuery('')}><X size={16}/></button>}</label></header>
      <main id="content">
        <div className="intro"><div className="eyebrow">饥荒联机版 · 模组生存手册</div><h1>我的饥荒<span className="title-tag">攻略百科</span></h1><p>收好物资，积累经验，给装备附上魔法。这里是《我的饥荒》的玩法攻略与数值速查。</p><div className="intro-meta"><span>当前版本 1.4.5</span><span>12 个攻略章节</span><span>默认配置与七咒挑战</span></div><div className="experience-track" aria-hidden="true"><span/></div></div>
        {!normalized && <div className="quick-links"><a href="#enchanting"><span className="item-sprite item-book" aria-hidden="true"/><div><small>装备成长</small><strong>第一次附魔</strong><span>书架、硝石与等级消耗</span></div><ArrowUpRight/></a><a href="#totem"><span className="item-sprite item-totem" aria-hidden="true"/><div><small>生存准备</small><strong>用好不死图腾</strong><span>装备在遗物栏才会生效</span></div><ArrowUpRight/></a><a href="#recipes"><span className="item-sprite item-bucket" aria-hidden="true"/><div><small>随手查阅</small><strong>配方速查</strong><span>材料数量与制作条件</span></div><ArrowUpRight/></a></div>}
        <div className="article-layout"><div className="chapters">
          {normalized && <p className="search-result" role="status">找到 {visible.length} 个包含“{query}”的章节。<button onClick={()=>setQuery('')}>显示全部</button></p>}
          {visible.length === 0 && <div className="no-results"><Search size={30}/><h2>没有找到相关攻略</h2><p>试试“附魔”“书架”“奶桶”或“七咒”。</p></div>}
          {visible.map(c => <section id={c.id} key={c.id} className="chapter"><div className="chapter-heading"><span>{String(chapters.indexOf(c)+1).padStart(2,'0')}</span><h2>{c.title}</h2><a href={`#${c.id}`} aria-label={`链接到${c.title}`}>#</a></div><p className="chapter-summary">{c.summary}</p>{c.blocks.map((b,j)=><div key={j} className="content-block">
            {b.heading && <h3>{b.heading}</h3>}{b.text && <p>{b.text}</p>}{b.steps && <ol className="steps">{b.steps.map((s,k)=><li key={k}>{s}</li>)}</ol>}
            {b.headers && b.rows && <Table><TableHeader><TableRow>{b.headers.map(h=><TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader><TableBody>{b.rows.map((row,k)=><TableRow key={k}>{row.map((v,l)=><TableCell key={l}>{v}</TableCell>)}</TableRow>)}</TableBody></Table>}
            {b.note && <p className="note"><strong>记住这一点</strong>{b.note}</p>}
          </div>)}</section>)}
        </div><aside className="reading-aside"><p className="eyebrow">出发前确认</p><h2>带上这三件事</h2><ol><li><strong>先把图腾装上</strong><span>放进背包里不会替你挡下致命伤害。</span></li><li><strong>夜间远离建筑打怪</strong><span>苦力怕自爆会伤害周围目标，也能破坏建筑。</span></li><li><strong>附魔前看完整提示</strong><span>门槛等级与实际扣除的等级是两回事。</span></li></ol><div className="aside-version"><strong>关于这份攻略</strong><p>按 1.4.5 版本内容整理。房主配置会影响格数、怪物生成和七咒玩法。</p><p>末影龙在当前版本中停用。</p></div><a href="#settings">查看房主配置 <ArrowUpRight size={16}/></a></aside></div>
        <footer className="page-footer"><BookOpen size={20}/><div><strong>我的饥荒 模组 Wiki</strong><p>数值与机制依据当前模组配置、物品及功能脚本整理。攻略建议不代表实战测试结果。</p></div><a href="#" onClick={navigate}>回到顶部 ↑</a></footer>
      </main>
    </div>
  </SidebarProvider>;
}
