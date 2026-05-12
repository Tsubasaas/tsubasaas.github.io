import { useState, useEffect } from "react";

const PROFILE = {
  name: "Tsubasa",
  nameJa: "翼",
  title: {
    en: "Trilingual Thinker, AI Developer & Business Consultant, Fusion Bellydance Performer.",
    zh: "三语思考者，AI 开发者与商业顾问，Fusion Bellydance 表演者。",
    ja: "トリリンガルな思考者、AI開発者・ビジネスコンサルタント、フュージョンベリーダンスパフォーマー。",
  },
  photo: null, // placeholder
  links: [
    { label: "Instagram", url: "https://www.instagram.com/sylvia_fyi?igsh=MWFwcjNqYm5vcWdraQ%3D%3D&utm_source=qr", icon: "ig" },
    { label: "GitHub", url: "https://github.com/Tsubasaas", icon: "gh" },
    { label: "note.com", url: "https://note.com/sylvia_f", icon: "nt" },
    { label: "Substack", url: "https://substack.com/@yfan296358", icon: "sb" },
  ],
  works: [
    {
      title: {
        en: "Still Us — RSVP App",
        zh: "Still Us — RSVP 应用",
        ja: "Still Us — RSVPアプリ",
      },
      desc: {
        en: "Still Us turns reunion promises into reality, one-tap RSVPs, visualized as a living star cluster.",
        zh: "Still Us 将重聚的约定变为现实，一键 RSVP，并以鲜活的星群呈现。",
        ja: "Still Usは再会の約束を現実に変え、ワンタップRSVPを生きた星群として可視化します。",
      },
      tag: "DEV",
      url: "https://alumni-rsvp-v2.vercel.app/event/still-us-gathering",   // e.g. "https://stillus.app"
      image: "/stillus_promo.jpg",
    },
  ],
  aboutme: {
    en: "Hi, I'm Tsubasa. Welcome to my world.",
    zh: "你好，我是 Tsubasa。欢迎来到我的世界。",
    ja: "こんにちは、Tsubasaです。私の世界へようこそ。",
  },
};

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
];

const COPY = {
  en: {
    nav: { about: "about me", links: "links", works: "works" },
    prompts: { about: "cat about.txt", links: "ls ~/links/", works: "ls ~/works/" },
    viewProject: "VIEW PROJECT",
    linkTbd: "LINK TBD",
    noImage: "NO IMAGE",
  },
  zh: {
    nav: { about: "关于我", links: "链接", works: "作品" },
    prompts: { about: "cat about.txt", links: "ls ~/links/", works: "ls ~/works/" },
    viewProject: "查看项目",
    linkTbd: "链接待定",
    noImage: "暂无图片",
  },
  ja: {
    nav: { about: "私について", links: "リンク", works: "作品" },
    prompts: { about: "cat about.txt", links: "ls ~/links/", works: "ls ~/works/" },
    viewProject: "プロジェクトを見る",
    linkTbd: "リンク未定",
    noImage: "画像なし",
  },
};

const NAV_ITEMS = ["about", "links", "works"];

function getInitialLanguage() {
  const saved = localStorage.getItem("tsubasa-language");
  return LANGUAGES.some((lang) => lang.code === saved) ? saved : "en";
}

// ─── Blinking cursor ───
function Cursor() {
  return <span style={{ animation: "blink 1s step-end infinite", color: "var(--accent)" }}>_</span>;
}

// ─── Avatar ───
function Avatar() {
  return (
    <div style={{
      width: 120, height: 120, borderRadius: "50%",
      background: "var(--surface)", border: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 40, color: "var(--accent)", fontFamily: "var(--mono)",
      letterSpacing: 2, userSelect: "none", overflow: "hidden",
    }}>
      {PROFILE.photo
        ? <img src={PROFILE.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : "翼"
      }
    </div>
  );
}

// ─── Panel: About ───
function LanguageSwitcher({ language, onChange }) {
  return (
    <div style={{
      display: "flex", gap: 0, marginTop: 22,
      border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden",
    }}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          style={{
            minWidth: 54, background: language === lang.code ? "var(--accent)" : "transparent",
            color: language === lang.code ? "#0a0a0a" : "var(--dim)",
            border: "none", padding: "7px 11px", cursor: "pointer",
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 0,
            fontWeight: language === lang.code ? 700 : 400,
            transition: "all .2s", borderRight: "1px solid var(--border)",
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

function AboutPanel({ copy }) {
  return (
    <div style={{ maxWidth: 520 }}>
      <p style={{ color: "var(--dim)", fontSize: 13, marginBottom: 6, fontFamily: "var(--mono)" }}>
        <span style={{ color: "var(--accent)" }}>$</span> {copy.prompts.about}
      </p>
      <p style={{ color: "var(--fg)", lineHeight: 1.7, fontSize: 14 }}>{copy.aboutme}</p>
    </div>
  );
}

// ─── Panel: Links ───
function LinksPanel({ copy }) {
  const iconMap = {
    in: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    gh: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    ig: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    nt: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    sb: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
      </svg>
    ),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360 }}>
      <p style={{ color: "var(--dim)", fontSize: 13, marginBottom: 2, fontFamily: "var(--mono)" }}>
        <span style={{ color: "var(--accent)" }}>$</span> {copy.prompts.links}
      </p>
      {PROFILE.links.map((l) => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            color: "var(--fg)", textDecoration: "none", fontFamily: "var(--mono)",
            fontSize: 14, padding: "8px 12px", borderRadius: 4,
            border: "1px solid var(--border)", transition: "all .2s",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--fg)";
          }}
        >
          <span style={{ opacity: 0.7, display: "flex" }}>{iconMap[l.icon]}</span>
          <span>{l.label}</span>
          <span style={{ marginLeft: "auto", opacity: 0.3, fontSize: 11 }}>→</span>
        </a>
      ))}
    </div>
  );
}

// ─── Panel: Works ───
function WorksPanel({ copy }) {
  return (
    <div style={{ maxWidth: 520 }}>
      <p style={{ color: "var(--dim)", fontSize: 13, marginBottom: 10, fontFamily: "var(--mono)" }}>
        <span style={{ color: "var(--accent)" }}>$</span> {copy.prompts.works}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {PROFILE.works.map((w) => (
          <div key={w.title.en} style={{
            borderRadius: 4, border: "1px solid var(--border)",
            background: "var(--surface)", overflow: "hidden",
          }}>
            {/* thumbnail */}
            {w.image ? (
              <img src={w.image} alt={w.title[copy.language]} style={{
                width: "100%", height: 160, objectFit: "cover", display: "block",
                borderBottom: "1px solid var(--border)",
              }} />
            ) : (
              <div style={{
                width: "100%", height: 100,
                background: "repeating-linear-gradient(135deg, #111 0px, #111 10px, #0d0d0d 10px, #0d0d0d 20px)",
                borderBottom: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--border)", letterSpacing: 2 }}>
                  {copy.noImage}
                </span>
              </div>
            )}

            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{
                  fontSize: 10, fontFamily: "var(--mono)", color: "var(--accent)",
                  background: "rgba(0,255,136,0.08)", padding: "2px 7px", borderRadius: 3,
                  letterSpacing: 1,
                }}>{w.tag}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg)" }}>{w.title[copy.language]}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.5, margin: "0 0 10px" }}>{w.desc[copy.language]}</p>

              {/* link */}
              {w.url ? (
                <a href={w.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)",
                  textDecoration: "none", letterSpacing: 1,
                  borderBottom: "1px solid rgba(0,255,136,0.3)", paddingBottom: 1,
                }}>
                  {copy.viewProject} →
                </a>
              ) : (
                <span style={{
                  fontSize: 11, fontFamily: "var(--mono)", color: "var(--border)",
                  letterSpacing: 1,
                }}>
                  {copy.linkTbd}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ───
export default function Portfolio() {
  const [active, setActive] = useState(null);
  const [entered, setEntered] = useState(false);
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("tsubasa-language", language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }, [language]);

  const copy = {
    ...COPY[language],
    language,
    title: PROFILE.title[language],
    aboutme: PROFILE.aboutme[language],
  };
  const panels = {
    about: <AboutPanel copy={copy} />,
    links: <LinksPanel copy={copy} />,
    works: <WorksPanel copy={copy} />,
  };

  return (
    <div style={{
      "--bg": "#0a0a0a", "--fg": "#e0e0e0", "--dim": "#777", "--accent": "#00ff88",
      "--border": "#222", "--surface": "#111", "--mono": "'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace",
      background: "var(--bg)", color: "var(--fg)", minHeight: "100vh",
      fontFamily: "var(--mono)", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", position: "relative",
      overflow: "hidden",
    }}>
      {/* noise overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundSize: "256px",
      }} />

      {/* scanline */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* content */}
      <div style={{
        position: "relative", zIndex: 2, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 0, width: "100%", maxWidth: 600,
        padding: "0 24px", boxSizing: "border-box",
        opacity: entered ? 1 : 0, transform: entered ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* avatar */}
        <Avatar />

        {/* name */}
        <h1 style={{
          fontSize: 28, fontWeight: 300, margin: "20px 0 4px",
          letterSpacing: 6, color: "var(--fg)", textTransform: "uppercase",
        }}>
          {PROFILE.name}
        </h1>
        <p style={{ fontSize: 12, color: "var(--dim)", margin: 0, letterSpacing: 2 }}>
          {PROFILE.nameJa}
        </p>

        {/* subtitle */}
        <p style={{
          fontSize: 12, color: "var(--dim)", margin: "16px 0 0", textAlign: "center",
          maxWidth: 380, lineHeight: 1.6,
        }}>
          {copy.title}<Cursor />
        </p>

        <LanguageSwitcher language={language} onChange={setLanguage} />

        {/* nav */}
        <nav style={{
          display: "flex", gap: 0, marginTop: 24,
          border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden",
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActive(active === item ? null : item)}
              style={{
                background: active === item ? "var(--accent)" : "transparent",
                color: active === item ? "#0a0a0a" : "var(--dim)",
                border: "none", padding: "10px 28px", cursor: "pointer",
                fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 2,
                textTransform: "uppercase", fontWeight: active === item ? 700 : 400,
                transition: "all .2s", borderRight: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                if (active !== item) e.currentTarget.style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                if (active !== item) e.currentTarget.style.color = "var(--dim)";
              }}
            >
              {copy.nav[item]}
            </button>
          ))}
        </nav>

        {/* panel */}
        <div style={{
          marginTop: 28, width: "100%",
          maxHeight: active ? 600 : 0, opacity: active ? 1 : 0,
          overflow: active ? "auto" : "hidden",
          transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
        }}>
          {active && panels[active]}
        </div>

        {/* footer */}
        <p style={{
          marginTop: 48, fontSize: 10, color: "var(--border)", letterSpacing: 1,
        }}>
          © {new Date().getFullYear()} TSUBASA
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600;700&display=swap');
        @keyframes blink { 50% { opacity: 0; } }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>
    </div>
  );
}
