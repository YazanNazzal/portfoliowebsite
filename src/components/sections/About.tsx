import { portfolioData } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
export function About() {
 return <section id="about" className="editorial-section" aria-labelledby="about-title"><div className="editorial-container">
   <SectionHeading id="about-title" title="A little about me." subtitle="The person behind the interfaces." />
   <div className="about-editorial-grid">
     <Reveal><div className="about-story"><span className="about-kicker">HOW I WORK</span>
       <h3>I care about how it works.<br/><span>And how it feels.</span></h3>
       <p>I start by understanding the problem and the people using the product, then break the work into small, testable pieces.</p>
       <p>I value clear communication, code reviews, and feedback throughout development. I aim to leave each project easier to understand and maintain.</p>
     </div></Reveal>
     <Reveal delay={120}><aside className="about-profile" aria-label="Developer profile">
       <div className="profile-file"><span className="profile-dots" aria-hidden="true"><i/><i/><i/></span><span>yazan / profile.ts</span><span className="profile-file-type">TS</span></div>
       <div className="profile-code"><div><span className="code-keyword">const</span> developer = {'{'}</div><dl>
         <div><dt>testing:</dt><dd>"Before the handoff"</dd></div><div><dt>tradeoffs:</dt><dd>"Made explicit"</dd></div><div><dt>documentation:</dt><dd>"Part of the handoff"</dd></div>
       </dl><div>{'};'}</div></div>
       <div className="profile-languages">{portfolioData.languages.map(language=><span key={language.name}>{language.name}<small>{language.proficiency}</small></span>)}</div>
     </aside></Reveal>
   </div>
 </div></section>;
}
