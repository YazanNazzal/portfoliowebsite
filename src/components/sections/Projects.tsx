import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Code2, Layers, Smartphone } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import type { Project } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
const filters = [{key:'all',label:'All work'}, {key:'mobile',label:'Mobile'}, {key:'web',label:'Web'}, {key:'fullstack',label:'Full-stack'}] as const;
function ProjectArtwork({ project }: { project: Project }) {
  return <div className={`work-art work-art-${project.category}`} aria-hidden="true">
    <span className="art-caption">{project.category === 'mobile' ? 'MOBILE EXPERIENCE' : project.category === 'fullstack' ? 'FULL-STACK APPLICATION' : 'WEB EXPERIENCE'}</span>
    {project.category === 'mobile' ? <div className="mock-phone"><div className="phone-camera" /><div className="mock-app-icon"><Smartphone size={28} /></div><span className="mock-line wide" /><span className="mock-line" /><div className="mock-tiles"><i/><i/><i/><i/></div><span className="mock-action" /></div> : <div className="mock-browser"><div className="mock-browser-bar"><i/><i/><i/><span/></div><div className="mock-browser-body"><Code2 size={35}/><span className="mock-line wide"/><span className="mock-line"/><div className="mock-columns"><i/><i/><i/></div></div></div>}
    <span className="art-stack">{project.technologies.slice(0,2).join(' / ')}</span>
  </div>;
}
function WorkCard({ project, index }: { project: Project; index: number }) {
  return <Reveal delay={(index % 2) * 90}><article className="work-card">
    <ProjectArtwork project={project}/><div className="work-copy"><div className="work-meta"><span>0{portfolioData.projects.findIndex(item=>item.id===project.id)+1} / {project.category}</span><Layers size={16} aria-hidden="true" /></div>
    <h3>{project.title}</h3><p>{project.description}</p><div className="technology-tags">{project.technologies.slice(0,4).map(tech=><span key={tech}>{tech}</span>)}</div>
    <details className="work-details"><summary>Explore the project <ArrowRight size={16} aria-hidden="true" /></summary><div><p>{project.longDescription}</p>{project.highlights && <ul>{project.highlights.map(point=><li key={point}>{point}</li>)}</ul>}{project.role && <p><strong>My role:</strong> {project.role}</p>}{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={14}/></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14}/></a>}</div></details>
    </div></article></Reveal>;
}
export function Projects() {
  const [filter,setFilter] = useState<string>('all');
  const projects = portfolioData.projects.filter(project => filter === 'all' || project.category === filter);
  return <section id="projects" className="editorial-section" aria-labelledby="projects-title"><div className="editorial-container">
    <SectionHeading id="projects-title" title="Ideas, brought to life." subtitle="A selection of applications built with care, curiosity, and code." />
    <div className="work-toolbar"><div className="work-filters" aria-label="Filter projects">{filters.map(item=><button key={item.key} type="button" aria-pressed={filter===item.key} onClick={()=>setFilter(item.key)}>{item.label}</button>)}</div><span className="work-count" aria-live="polite">{projects.length} projects</span></div>
    <div className="work-grid" key={filter}>{projects.map((project,index)=><WorkCard key={project.id} project={project} index={index}/>)}</div>
    <Reveal><a className="github-note focus-ring" href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer"><span>More code. More experiments.</span><span>Find me on GitHub <ArrowUpRight size={18} aria-hidden="true" /></span></a></Reveal>
  </div></section>;
}
