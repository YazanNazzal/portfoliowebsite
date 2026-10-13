import { Code2, Database, Smartphone, Workflow, ArrowUpRight, Braces, Users, Bot, Cloud } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
const icons = [Code2, Database, Smartphone, Braces, Workflow, Users, Bot, Workflow, Database, Cloud];
const descriptions = ['Interfaces that feel as good as they look.', 'The logic and data behind the experience.', 'Thoughtful experiences, on every screen.', 'The languages behind the applications.', 'A better process makes better software.', 'Communication, collaboration, and problem solving.', 'Agents that plan, use tools, and automate useful work.', 'Frameworks and tools for building and integrating AI agents.', 'Semantic search, tracing, and evaluation for AI systems.', 'Cloud platforms and services for AI applications.'];
export function Skills() {
  return <section id="skills" className="editorial-section" aria-labelledby="skills-title"><div className="editorial-container">
    <SectionHeading id="skills-title" title="The tools. The craft." subtitle="A practical toolkit for AI agents, web, mobile, and backend development." />
    <div className="expertise-grid">{portfolioData.skills.map((group, index) => {
      const Icon = icons[index] || Code2;
      return <Reveal key={group.category} delay={index * 90}><article className={`expertise-card expertise-${index}`}>
        <div className="expertise-top"><Icon size={25} strokeWidth={1.4} aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span></div>
        <h3>{group.category}</h3><p>{descriptions[index]}</p>
        <div className="technology-tags">{group.skills.map(skill => <span key={skill.name}>{skill.name}</span>)}</div>
        <div className="expertise-bottom"><span>{group.skills.length} tools in the toolkit</span><ArrowUpRight size={17} aria-hidden="true" /></div>
      </article></Reveal>;
    })}</div>
    <Reveal><div className="craft-note"><span className="status-dot" /> Clean code. Clear interfaces. Continuous learning.</div></Reveal>
  </div></section>;
}
