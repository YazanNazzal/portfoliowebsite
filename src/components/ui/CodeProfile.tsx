import { useState, type KeyboardEvent } from 'react';
import { portfolioData } from '../../data/portfolio';

const tabs = ['About', 'Stack', 'Approach'] as const;
type ProfileTab = typeof tabs[number];

export function CodeProfile() {
  const [active, setActive] = useState<ProfileTab>('About');
  const rows = {
    About: [['name', `"${portfolioData.personal.name}"`], ['focus', '"AI, Web & Mobile"'], ['learning', 'true']],
    Stack: [['interfaces', '["React", "Angular"]'], ['mobile', '["React Native", "Flutter"]'], ['backend', '["FastAPI", ".NET Core"]'], ['data', '["PostgreSQL", "Supabase"]'], ['agents', '["LangGraph", "MCP"]']],
    Approach: [['code', '"Readable & maintainable"'], ['experience', '"Clear & accessible"'], ['delivery', '"Build, review, improve"'], ['evaluation', 'true']],
  } satisfies Record<ProfileTab, string[][]>;
  const navigate = (event: KeyboardEvent<HTMLButtonElement>) => {
    const current = tabs.indexOf(active);
    const next = event.key === 'ArrowRight' ? (current + 1) % tabs.length : event.key === 'ArrowLeft' ? (current + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(tabs[next]);
    event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus();
  };
  return <aside className="about-profile code-editor" aria-label="Developer profile">
    <div className="profile-file"><span className="profile-dots" aria-hidden="true"><i/><i/><i/></span><span>yazan / profile.ts</span><span className="profile-file-type">TS</span></div>
    <div className="code-tabs" role="tablist" aria-label="Explore developer profile">{tabs.map(tab => <button key={tab} id={`profile-tab-${tab}`} role="tab" aria-selected={active === tab} aria-controls={`profile-panel-${tab}`} tabIndex={active === tab ? 0 : -1} onClick={() => setActive(tab)} onKeyDown={navigate}>{tab.toLowerCase()}.ts</button>)}</div>
    <div className="profile-code code-panel" role="tabpanel" id={`profile-panel-${active}`} aria-labelledby={`profile-tab-${active}`} tabIndex={0} key={active}>
      <div className="code-comment">// {active === 'About' ? 'A little context.' : active === 'Stack' ? 'The tools behind the work.' : 'How I like to build.'}</div>
      <div><span className="code-keyword">const</span> {active.toLowerCase()} = {'{'}</div>
      <dl>{rows[active].map(([key, value]) => <div key={key}><dt>{key}:</dt><dd className={value === 'true' ? 'code-boolean' : undefined}>{value}<span className="code-punctuation">,</span></dd></div>)}</dl>
      <div>{'};'}</div>
    </div>
    <div className="code-editor-status"><span><span className="status-dot" /> TypeScript</span><span>UTF-8</span></div>
    <div className="profile-languages">{portfolioData.languages.map(language => <span key={language.name}>{language.name}<small>{language.proficiency}</small></span>)}</div>
  </aside>;
}
