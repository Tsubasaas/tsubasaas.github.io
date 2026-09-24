import { useEffect, useState } from "react";
import "./styles.css";

const LANGUAGES = [{ code: "en", label: "EN" }, { code: "zh", label: "中文" }, { code: "ja", label: "日本語" }];
const THEME_COPY = { en: { light: "Light", dark: "Dark", theme: "Theme" }, zh: { light: "浅色", dark: "深色", theme: "主题" }, ja: { light: "ライト", dark: "ダーク", theme: "テーマ" } };
const COPY = {
  en: {
    portfolio: "INDEPENDENT PORTFOLIO", language: "Language", nav: "Explore", work: "Work", writing: "Writing", publications: "Publications",
    intro: "Thinking across languages. Creating across worlds.", bio: "Trilingual thinker, AI developer & business consultant. Fusion bellydance performer.", welcome: "Welcome to my corner of the internet.", connect: "ELSEWHERE", selected: "SELECTED", heading: "WORK", subtitle: "Ideas, translated into things you can explore.",
    project: "Open project", card: "AI-NATIVE GAME CHALLENGE", community: "PEOPLE & CONNECTION", moment: "Turn everyday moments into collectible cards. A space to collect, create, and share a little everyday magic.", chiko: "A private portal connecting Chiko Roundtable members and event participants.",
    writingHeading: "WRITING", writingSub: "Notes, ideas, and perspectives across languages.", writingEmpty: "The next page is still being written.", writingNote: "Selected writing will live here as it becomes available.", pubHeading: "PUBLICATIONS", pubSub: "A growing collection of published work.", pubEmpty: "A space for what comes next.", pubNote: "Publications will be added here as they become available.", upcoming: "TO BE CONTINUED", archive: "PERSONAL ARCHIVE", footer: "Always exploring. Always becoming.", skip: "Skip to content", motion: "Motion", on: "On", off: "Off", portrait: "Tsubasa’s avatar",
  },
  zh: {
    portfolio: "个人作品集", language: "语言", nav: "浏览", work: "作品", writing: "写作", publications: "出版发表", intro: "在语言之间思考，在世界之间创造。", bio: "三语思考者、AI 开发者与商业顾问。Fusion Bellydance 表演者。", welcome: "欢迎来到我的互联网小世界。", connect: "在别处找到我", selected: "精选", heading: "作品", subtitle: "把想法变成可以探索的世界。", project: "探索项目", card: "AI-NATIVE GAME CHALLENGE", community: "人与连接", moment: "把生活瞬间制作成可收藏的卡片。在这里记录、创造、分享日常里的小小魔法。", chiko: "连接 Chiko Roundtable 成员与活动参与者的专属入口。", writingHeading: "写作", writingSub: "跨越语言的笔记、想法与观察。", writingEmpty: "下一页，正在酝酿。", writingNote: "未来的精选文章会陆续收录在这里。", pubHeading: "出版发表", pubSub: "持续积累的发表作品。", pubEmpty: "为下一段探索留一个位置。", pubNote: "之后的出版与发表内容将在这里更新。", upcoming: "未完待续", archive: "个人档案", footer: "不断探索，不断成为。", skip: "跳转到正文", motion: "动态效果", on: "开", off: "关", portrait: "Tsubasa 的头像",
  },
  ja: {
    portfolio: "個人ポートフォリオ", language: "言語", nav: "コンテンツ", work: "作品", writing: "エッセイ", publications: "出版・掲載", intro: "言語を越えて考え、世界を越えてつくる。", bio: "トリリンガルな思考者、AI開発者・ビジネスコンサルタント。フュージョンベリーダンスパフォーマー。", welcome: "私の小さなインターネットの世界へようこそ。", connect: "ほかの場所で", selected: "ピックアップ", heading: "作品", subtitle: "アイデアを、探索できる世界へ。", project: "プロジェクトを見る", card: "AI-NATIVE GAME CHALLENGE", community: "人とつながり", moment: "日々の瞬間を、集められるカードに。記録し、つくり、日常の小さな魔法を分かち合う場所。", chiko: "Chiko Roundtableのメンバーとイベント参加者をつなぐ専用ポータル。", writingHeading: "エッセイ", writingSub: "言語を越えたノート、アイデア、視点。", writingEmpty: "次のページは、まだ執筆中。", writingNote: "選りすぐりの記事を、これから掲載していきます。", pubHeading: "出版・掲載", pubSub: "少しずつ増えていく、発表した作品の記録。", pubEmpty: "次の探求のための場所。", pubNote: "出版・掲載情報はこちらで随時更新します。", upcoming: "つづく", archive: "パーソナルアーカイブ", footer: "いつも探求し、変わり続ける。", skip: "本文へスキップ", motion: "アニメーション", on: "オン", off: "オフ", portrait: "Tsubasaのアバター",
  },
};
const LINKS = [
  { label: "GitHub", url: "https://github.com/Tsubasaas" },
];
const PROJECTS = [
  { name: "Momentweaver", url: "https://www.momentweaver.com/", type: "card", desc: "moment", visual: "moment" },
  { name: "Chiko Roundtable", url: "https://chikoroundtable.com/login", type: "community", desc: "chiko", visual: "chiko" },
];
function initialLanguage() {
  try { const saved = localStorage.getItem("tsubasa-language"); return LANGUAGES.some(l => l.code === saved) ? saved : "en"; } catch { return "en"; }
}
function initialTheme() {
  try { return localStorage.getItem("tsubasa-theme") === "dark" ? "dark" : "light"; } catch { return "light"; }
}
function Arrow() { return <span aria-hidden="true">↗</span>; }
function ExternalLink({ href, children, ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}
function ProjectVisual({ kind }) {
  return <div className={`project-visual ${kind}-visual`}>
    <img
      src={kind === "chiko" ? "/chiko_roundtable_promo.png" : "/momentweaver-cover.svg"}
      alt=""
      width="480"
      height="270"
    />
  </div>;
}
export default function Portfolio() {
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState(initialTheme);
  const [section, setSection] = useState("work");
  const [motion, setMotion] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const copy = COPY[language];
  useEffect(() => {
    try { localStorage.setItem("tsubasa-language", language); } catch { /* Storage may be unavailable. */ }
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }, [language]);
  useEffect(() => {
    try { localStorage.setItem("tsubasa-theme", theme); } catch { /* Storage may be unavailable. */ }
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return <div className={`portfolio theme-${theme} ${motion ? "motion-on" : "motion-off"}`}>
    <a className="skip-link" href="#main-content">{copy.skip}</a>
    <div className="code-rain" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <span key={i} style={{ "--column": i, "--delay": `${-i * 1.7}s` }}>{i % 2 ? "01 ア イ 0 ツ 1 キ 01 ユ 0 メ 1" : "1 ヲ 0 シ 01 コ 1 ト 0 ナ 10"}</span>)}</div>
    <header className="topbar">
      <a className="wordmark" href="#" onClick={() => setSection("work")} aria-label="Tsubasa"><span className="brand-symbol">翼</span> TSUBASA<span className="brand-cursor">_</span></a>
      <div className="topbar-controls"><button className="theme-toggle" type="button" aria-label={`${THEME_COPY[language].theme}: ${theme === "dark" ? THEME_COPY[language].light : THEME_COPY[language].dark}`} aria-pressed={theme === "light"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>{theme === "dark" ? THEME_COPY[language].light : THEME_COPY[language].dark}</button><div className="language-switch" role="group" aria-label={copy.language}><span className="language-caption">{copy.language}</span>{LANGUAGES.map(l => <button key={l.code} type="button" lang={l.code} aria-pressed={language === l.code} onClick={() => setLanguage(l.code)}>{l.label}</button>)}</div></div>
    </header>
    <div className="page-shell">
      <aside className="profile">
        <div className="profile-topline"><span className="status-dot" />{copy.portfolio}</div>
        <div className="portrait-frame"><img src="/avatar.jpg" alt={copy.portrait} width="1080" height="1080" /><span className="portrait-index">TS / 01</span><span className="portrait-cross">+</span></div>
        <h1>Tsubasa<span>翼</span></h1>
        <p className="profile-intro">{copy.intro}</p><p className="profile-bio">{copy.bio}</p>
        <div className="profile-divider" /><p className="small-label">{copy.connect}</p>
        <div className="social-links">{LINKS.map(l => <ExternalLink key={l.label} href={l.url}>{l.label}<Arrow /></ExternalLink>)}</div>
        <p className="profile-note"><span aria-hidden="true">&gt;</span> {copy.welcome}<span className="text-cursor" aria-hidden="true">_</span></p>
      </aside>
      <main id="main-content" tabIndex="-1">
        <nav className="section-nav" aria-label={copy.nav}>{["work", "writing", "publications"].map((item, i) => <button type="button" key={item} onClick={() => setSection(item)} aria-current={section === item ? "page" : undefined}><span className="nav-number">0{i + 1}</span>{copy[item]}{item === "work" && <span className="item-count">02</span>}</button>)}</nav>
        <section className="content-section" key={section} aria-labelledby="section-title">
          <div className="section-heading"><p className="small-label"><span className="green">//</span> {section === "work" ? copy.selected : copy.archive}<span className="heading-line" /></p><h2 id="section-title">{section === "work" ? copy.heading : section === "writing" ? copy.writingHeading : copy.pubHeading}<span className="heading-dot">.</span></h2><p className="section-subtitle">{section === "work" ? copy.subtitle : section === "writing" ? copy.writingSub : copy.pubSub}</p><span className="section-coordinate" aria-hidden="true">[ 0{["work", "writing", "publications"].indexOf(section) + 1} — 03 ]</span></div>
          {section === "work" ? <div className="project-grid">{PROJECTS.map((project, i) => <article className="project-card" key={project.name}><ExternalLink href={project.url} className="project-link" aria-label={`${copy.project}: ${project.name}`}><div className="project-top"><span>0{i + 1} <span className="muted">/ {copy[project.type]}</span></span><Arrow /></div><ProjectVisual kind={project.visual} /><div className="project-details"><span className="project-kind">WEB EXPERIENCE</span><h3>{project.name}</h3><p>{copy[project.desc]}</p><div className="project-cta">{copy.project}<Arrow /></div></div></ExternalLink></article>)}</div> : <div className="coming-soon"><div className="empty-glyph" aria-hidden="true">{section === "writing" ? "[ _ ]" : "{ … }"}</div><p className="small-label green">{copy.upcoming}</p><h3>{section === "writing" ? copy.writingEmpty : copy.pubEmpty}</h3><p>{section === "writing" ? copy.writingNote : copy.pubNote}</p></div>}
          <div className="section-end" aria-hidden="true"><span>+</span><span>{section === "work" ? "END OF SELECTED WORK / MORE TO COME" : "TO BE CONTINUED"}</span><span>+</span></div>
        </section>
      </main>
    </div>
    <footer><span>© {new Date().getFullYear()} TSUBASA</span><span className="footer-thought">{copy.footer}</span><button type="button" className="motion-toggle" aria-pressed={motion} onClick={() => setMotion(!motion)}><span className={motion ? "status-dot" : "status-dot inactive"} />{copy.motion}: {motion ? copy.on : copy.off}</button></footer>
  </div>;
}
