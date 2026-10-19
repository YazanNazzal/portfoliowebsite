import { ArrowUpRight, Code2, Smartphone, Layers, Bot } from 'lucide-react';
import { CodeProfile } from '../ui/CodeProfile';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
export function About() {
 const specialties = [
   { icon: Bot, title: 'AI agents & automation', text: 'LLM-powered workflows, custom MCP integrations, and RAG pipelines with evaluation and guardrails.' },
   { icon: Code2, title: 'Stores & booking platforms', text: 'React storefronts, admin dashboards, and appointment booking experiences.' },
   { icon: Smartphone, title: 'Mobile experiences', text: 'Applications built with React Native and Flutter.' },
   { icon: Layers, title: 'Backends & data', text: 'APIs and application data with FastAPI, PostgreSQL, Supabase, and .NET Core.' },
 ];
 return <section id="about" className="editorial-section" aria-labelledby="about-title"><div className="editorial-container">
   <SectionHeading id="about-title" title="A little about me." subtitle="The person behind the interfaces." />
   <div className="about-editorial-grid">
     <Reveal><div className="about-story"><span className="about-kicker">DEVELOPER. BUILDER. ALWAYS LEARNING.</span>
       <h3>I care about how it works.<br/><span>And how it feels.</span></h3>
       <p>I build applications from the interface through to the API and database. My projects include Blossom Dreams, a published salon booking platform; King of Shisha, an online store with an admin dashboard; and a student housing application built with Flutter.</p>
       <p>I also build AI-powered tools such as Warraq, a bilingual document assistant. Across web, mobile, and AI projects, I focus on useful workflows, clear interfaces, and maintainable code, drawing on my experience with digital learning platforms and mobile MVPs.</p>
       <a href="#projects" className="about-work-link focus-ring">See what I've been building <ArrowUpRight size={17} aria-hidden="true" /></a>
     </div></Reveal>
     <Reveal delay={120}><CodeProfile /></Reveal>
   </div>
   <div className="about-specialties">{specialties.map((item,index)=><Reveal key={item.title} delay={index*90}><article><item.icon size={23} strokeWidth={1.4} aria-hidden="true"/><div><h3>{item.title}</h3><p>{item.text}</p></div></article></Reveal>)}</div>
 </div></section>;
}
