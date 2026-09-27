import { useEffect, useState } from "react";
import "./styles.css";

const LANGUAGES = [{ code: "en", label: "EN" }, { code: "zh", label: "中文" }, { code: "ja", label: "日本語" }];
const THEME_COPY = { en: { light: "Light", dark: "Dark", theme: "Theme" }, zh: { light: "浅色", dark: "深色", theme: "主题" }, ja: { light: "ライト", dark: "ダーク", theme: "テーマ" } };
const COPY = {
  en: {
    portfolio: "INDEPENDENT PORTFOLIO", language: "Language", nav: "Explore", work: "Software Apps", writing: "Daily Notes", publications: "Publications",
    intro: "Thinking across languages. Creating across worlds.", bio: "Trilingual thinker, AI developer & business consultant. Fusion bellydance performer.", welcome: "Welcome to my corner of the internet.", connect: "ELSEWHERE", selected: "SELECTED", heading: "SOFTWARE APPS", subtitle: "Technology is a double-edged sword.",
    project: "Open project", card: "AI-NATIVE GAME CHALLENGE", community: "PEOPLE & CONNECTION", momentKind: "AI-NATIVE GAME", chikoKind: "VISUAL EVENT TOOL", moment: "An AI-native game that transforms memorable everyday moments into magical cards, featuring a spellbook, magic card creation, transformation potions, and more AI-native experiences.", momentTagline: "Attention, back to life.", chiko: "A visual event-planning tool that brings participants, schedules, and event details together in one clear view.",
    writingHeading: "DAILY NOTES", writingSub: "Notes, ideas, and perspectives across languages.", writingEmpty: "The next page is still being written.", writingNote: "Selected writing will live here as it becomes available.", pubHeading: "PUBLICATIONS", pubSub: "A growing collection of published work.", pubEmpty: "A space for what comes next.", pubNote: "Publications will be added here as they become available.", upcoming: "TO BE CONTINUED", archive: "PERSONAL ARCHIVE", footer: "Always exploring. Always becoming.", skip: "Skip to content", motion: "Motion", on: "On", off: "Off", portrait: "Tsubasa’s avatar",
  },
  zh: {
    portfolio: "个人作品集", language: "语言", nav: "浏览", work: "软件应用", writing: "日常记录", publications: "出版作品", intro: "在语言之间思考，在世界之间创造。", bio: "三语思考者、AI 开发者与商业顾问。Fusion Bellydance 表演者。", welcome: "欢迎来到我的互联网小世界。", connect: "在别处找到我", selected: "精选", heading: "软件应用", subtitle: "技术，是一把双刃剑。", project: "探索项目", card: "AI-NATIVE GAME CHALLENGE", community: "人与连接", momentKind: "AI 原生游戏", chikoKind: "可视化活动工具", moment: "一款将日常生活中的精彩瞬间变成魔法卡牌的 AI 原生游戏，内置魔法书、魔法卡牌制作、变形药水等 AI 原生功能。", momentTagline: "让注意力回归生活。", chiko: "一款用于策划和举办活动的可视化软件，让参与者、日程与活动细节一目了然。", writingHeading: "日常记录", writingSub: "跨越语言的笔记、想法与观察。", writingEmpty: "下一页，正在酝酿。", writingNote: "未来的精选文章会陆续收录在这里。", pubHeading: "出版作品", pubSub: "持续积累的发表作品。", pubEmpty: "为下一段探索留一个位置。", pubNote: "之后的出版与发表内容将在这里更新。", upcoming: "未完待续", archive: "个人档案", footer: "不断探索，不断成为。", skip: "跳转到正文", motion: "动态效果", on: "开", off: "关", portrait: "Tsubasa 的头像",
  },
  ja: {
    portfolio: "個人ポートフォリオ", language: "言語", nav: "コンテンツ", work: "ソフトウェアアプリ", writing: "日々の記録", publications: "出版・掲載", intro: "言語を越えて考え、世界を越えてつくる。", bio: "トリリンガルな思考者、AI開発者・ビジネスコンサルタント。フュージョンベリーダンスパフォーマー。", welcome: "私の小さなインターネットの世界へようこそ。", connect: "ほかの場所で", selected: "ピックアップ", heading: "ソフトウェアアプリ", subtitle: "技術は、諸刃の剣です。", project: "プロジェクトを見る", card: "AI-NATIVE GAME CHALLENGE", community: "人とつながり", momentKind: "AIネイティブゲーム", chikoKind: "イベント可視化ツール", moment: "日常の心に残る瞬間を魔法のカードへと変えるAIネイティブゲーム。魔法書、魔法カード作成、変身ポーションなど、AIならではの機能を搭載しています。", momentTagline: "意識を、日常へ。", chiko: "参加者、スケジュール、イベントの詳細をひと目で把握し、企画から開催までを支えるビジュアルツールです。", writingHeading: "日々の記録", writingSub: "言語を越えたノート、アイデア、視点。", writingEmpty: "次のページは、まだ執筆中。", writingNote: "選りすぐりの記事を、これから掲載していきます。", pubHeading: "出版・掲載", pubSub: "少しずつ増えていく、発表した作品の記録。", pubEmpty: "次の探求のための場所。", pubNote: "出版・掲載情報はこちらで随時更新します。", upcoming: "つづく", archive: "パーソナルアーカイブ", footer: "いつも探求し、変わり続ける。", skip: "本文へスキップ", motion: "アニメーション", on: "オン", off: "オフ", portrait: "Tsubasaのアバター",
  },
};
const LINKS = [
  { label: "GitHub", url: "https://github.com/Tsubasaas" },
  { label: "Substack", url: "https://tsubasayf.substack.com/" },
];
const PROJECTS = [
  { name: "Momentweaver", url: "https://www.momentweaver.com/", type: "card", kind: "momentKind", desc: "moment", visual: "moment", releasedAt: "2026-09" },
  { name: "Chiko Roundtable", url: "https://chikoroundtable.com/login", type: "community", kind: "chikoKind", desc: "chiko", visual: "chiko", releasedAt: "2026-04" },
];
const RELEASE_LABEL = { en: "First released", zh: "初次发布", ja: "初回リリース" };
const MOMENTWEAVER_STORY = {
  title: "A 100-Hour AI-Native Game Challenge",
  url: "https://tsubasayf.substack.com/p/a-100-hour-ai-native-game-challenge",
  updatedAt: "2026-09-27",
};
const ARTICLE_COPY = {
  en: { story: "Behind the story", read: "Read article", updated: "Updated" },
  zh: { story: "背后的故事", read: "阅读原文", updated: "更新于" },
  ja: { story: "制作の舞台裏", read: "記事を読む", updated: "更新日" },
};
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
function ProjectVisual({ kind, tagline }) {
  return <div className={`project-visual ${kind}-visual`}>
    <img
      src={kind === "chiko" ? "/chiko_roundtable_promo.png" : "/momentweaver-cover.svg"}
      alt=""
      width="480"
      height="270"
    />
    {tagline && <span className="visual-tagline">{tagline}</span>}
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
          {section === "work" ? <div className="project-grid">{PROJECTS.map((project, i) => <article className="project-card" key={project.name}>
            <ExternalLink href={project.url} className="project-link" aria-label={`${copy.project}: ${project.name}`}><div className="project-top"><span>0{i + 1} <span className="muted">/ {copy[project.type]}</span></span><Arrow /></div><ProjectVisual kind={project.visual} tagline={project.visual === "moment" ? copy.momentTagline : "Where every encounter sparks"} /><div className="project-details"><span className="project-kind">{copy[project.kind]}</span><h3>{project.name}</h3><div className="project-release">{RELEASE_LABEL[language]} <time dateTime={project.releasedAt}>{project.releasedAt}</time></div><p>{copy[project.desc]}</p><div className="project-cta">{copy.project}<Arrow /></div></div></ExternalLink>
            {project.visual === "moment" && <ExternalLink href={MOMENTWEAVER_STORY.url} className="project-story">{ARTICLE_COPY[language].story}<Arrow /></ExternalLink>}
          </article>)}</div> : section === "writing" ? <article className="writing-card">
            <ExternalLink href={MOMENTWEAVER_STORY.url} className="writing-link"><img className="writing-cover" src="/ai-native-game-challenge-cover.png" alt="The 100-Hour AI-Native Game Challenge — Reflections on the Future of Human Creativity" width="1672" height="941" /><div className="writing-details"><div className="writing-meta"><span className="small-label green">SUBSTACK</span><span className="writing-date">{ARTICLE_COPY[language].updated} <time dateTime={MOMENTWEAVER_STORY.updatedAt}>{MOMENTWEAVER_STORY.updatedAt}</time></span></div><h3 lang="en">{MOMENTWEAVER_STORY.title}</h3><div className="project-cta">{ARTICLE_COPY[language].read}<Arrow /></div></div></ExternalLink>
          </article> : <div className="coming-soon"><div className="empty-glyph" aria-hidden="true">{ "{ … }" }</div><p className="small-label green">{copy.upcoming}</p><h3>{copy.pubEmpty}</h3><p>{copy.pubNote}</p></div>}
          <div className="section-end" aria-hidden="true"><span>+</span><span>{section === "work" ? "END OF SELECTED WORK / MORE TO COME" : section === "writing" ? "END OF DAILY NOTES / MORE TO COME" : "TO BE CONTINUED"}</span><span>+</span></div>
        </section>
      </main>
    </div>
    <footer><span>© {new Date().getFullYear()} TSUBASA</span><span className="footer-thought">{copy.footer}</span><button type="button" className="motion-toggle" aria-pressed={motion} onClick={() => setMotion(!motion)}><span className={motion ? "status-dot" : "status-dot inactive"} />{copy.motion}: {motion ? copy.on : copy.off}</button></footer>
  </div>;
}
