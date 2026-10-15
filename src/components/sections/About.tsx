import { ArrowUpRight, Code2, Smartphone, Layers, Bot } from 'lucide-react';
import { CodeProfile } from '../ui/CodeProfile';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
export function About() {
 const specialties = [
   { icon: Bot, title: 'AI agents & automation', text: 'LLM-powered workflows, custom MCP integrations, and RAG pipelines with evaluation and guardrails.' },
   { icon: Code2, title: 'Web interfaces', text: 'Responsive, accessible experiences with React and Angular.' },
   { icon: Smartphone, title: 'Mobile experiences', text: 'Applications built with React Native and Flutter.' },
   { icon: Layers, title: 'Connected systems', text: 'APIs, databases, and backend development with .NET Core.' },
 ];
 return <section id="about" className="editorial-section" aria-labelledby="about-title"><div className="editorial-container">
   <SectionHeading id="about-title" title="A little about me." subtitle="The person behind the interfaces." />
   <div className="about-editorial-grid">
     <Reveal><div className="about-story"><span className="about-kicker">DEVELOPER. BUILDER. ALWAYS LEARNING.</span>
       <h3>I care about how it works.<br/><span>And how it feels.</span></h3>
       <p>My work has taken me from digital learning platforms to mobile MVPs, collaborating with teams to turn product requirements into usable interfaces.</p>
       <p>I value code reviews, clear communication, and maintainable code. I bring that same approach to automation: useful features, careful integration, and evaluation before delivery.</p>
       <a href="#projects" className="about-work-link focus-ring">See what I've been building <ArrowUpRight size={17} aria-hidden="true" /></a>
     </div></Reveal>
     <Reveal delay={120}><CodeProfile /></Reveal>
   </div>
   <div className="about-specialties">{specialties.map((item,index)=><Reveal key={item.title} delay={index*90}><article><item.icon size={23} strokeWidth={1.4} aria-hidden="true"/><div><h3>{item.title}</h3><p>{item.text}</p></div></article></Reveal>)}</div>
 </div></section>;
}
