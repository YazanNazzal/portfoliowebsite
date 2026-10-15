import { LinkedInIcon } from '../ui/LinkedInIcon';
import { EmailLink } from '../ui/EmailLink';
import { GitHubIcon } from '../ui/GitHubIcon';
import { ArrowDown, ArrowUpRight, Mail, Download } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { useEffect, useState } from 'react';
import { usePointerTilt } from '../../hooks/usePointerTilt';

function Typewriter({ reducedMotion, text }: { reducedMotion: boolean; text: string }) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (reducedMotion) return;
    let length = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      length += deleting ? -1 : 1;
      setDisplay(text.slice(0, length));
      let delay = deleting ? 45 : 85;
      if (length === text.length) {
        deleting = true;
        delay = 1700;
      } else if (length === 0) {
        deleting = false;
        delay = 600;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, [reducedMotion, text]);

  return <span className="typewriter">
    <span className="sr-only">{text}</span>
    <span className="typewriter-sizer" aria-hidden="true">{text} ▊</span>
    <span aria-hidden="true" className="typewriter-text">{reducedMotion ? text : display}{!reducedMotion && <span className="animate-cursor-blink">▊</span>}</span>
  </span>;
}

interface HeroContentProps {
  name: string; title: string; location: string; email: string; phone: string;
  github: string; linkedin: string; summary: string;
  isVisible: boolean; prefersReducedMotion: boolean;
}

export function HeroContent({ name, title, summary, email, phone, github, linkedin, isVisible, prefersReducedMotion }: HeroContentProps) {
  const portraitTilt = usePointerTilt(5);
  const stats = [
    { value: String(portfolioData.projects.length).padStart(2, '0'), label: 'Selected projects' },
    { value: String(portfolioData.experience.length).padStart(2, '0'), label: 'Professional roles' },
    { value: String(new Set(portfolioData.skills.flatMap(group => group.skills.map(skill => skill.name))).size) + '+', label: 'Technologies & tools' },
    { value: 'AI + Web + Mobile', label: 'Built with purpose' },
  ];
  return (
    <div className={`hero-container ${isVisible || prefersReducedMotion ? 'hero-entered' : ''}`}>
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="status-dot" /> Welcome to my portfolio <svg width="20" height="14" viewBox="0 0 30 20" role="img" aria-label="Palestine flag"><path fill="#000" d="M0 0h30v7H0z"/><path fill="#fff" d="M0 7h30v6H0z"/><path fill="#009639" d="M0 13h30v7H0z"/><path fill="#ed2e38" d="M0 0l15 10L0 20z"/></svg></div>
          <h1 id="hero-title" className="hero-name"><span className="hero-intro">I'm</span><span className="gradient-text">{name}</span><span className="hero-name-dot">.</span></h1>
          <p className="hero-role"><span aria-hidden="true">❯</span> <Typewriter reducedMotion={prefersReducedMotion} text={title} /></p>
          <p className="hero-pitch">{summary}</p>
          <div className="hero-actions">
            <a className="design-button design-button-primary focus-ring" href="#projects">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
            <a className="design-button focus-ring" href="/Yazan_Nazzal_CV.pdf" download="Yazan_Nazzal_CV.pdf">Download CV <Download size={17} aria-hidden="true" /></a>
            <a className="design-button focus-ring" href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="Let's talk on WhatsApp">Let's talk <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="hero-socials">
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="focus-ring"><GitHubIcon size={19} /></a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="focus-ring"><LinkedInIcon size={19} /></a>
            <EmailLink email={email} aria-label="Email" className="focus-ring"><Mail size={19} /></EmailLink>
            <span>// let's connect</span>
          </div>
        </div>
        <div className="portrait-area">
          <div className="portrait-frame interactive-portrait" {...portraitTilt}>
            <img src="/profile-photo.jpg" alt={`Portrait of ${name}`} width={1300} height={1210} fetchPriority="high" />
            <div className="portrait-shade" aria-hidden="true" />
            <div className="portrait-caption"><span className="status-dot" /> Available for opportunities</div>
          </div>
          <div className="portrait-chip chip-react"><span className="chip-dot" /> Mobile Developer</div>
          <div className="portrait-chip chip-fullstack"><span className="chip-dot" /> Full-stack developer</div>
          <div className="portrait-chip chip-ai"><span className="chip-dot" /> AI Agentic Engineer</div>
        </div>
      </div>
      <div className="hero-stats">{stats.map(stat => <div key={stat.label}><span className="hero-stat-value">{stat.value}</span><span className="hero-stat-label">{stat.label}</span></div>)}</div>
      <a href="#about" className="hero-scroll focus-ring">SCROLL TO EXPLORE <ArrowDown size={14} aria-hidden="true" /></a>
    </div>
  );
}
