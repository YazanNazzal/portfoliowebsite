import { LinkedInIcon } from '../ui/LinkedInIcon';
import { EmailLink } from '../ui/EmailLink';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
export function Contact() {
  const { email, phone, location, github, linkedin } = portfolioData.personal;
  return <section id="contact" className="editorial-section contact-finale" aria-labelledby="contact-title"><div className="editorial-container"><Reveal>
    <div className="contact-availability"><span className="status-dot" /> Open to opportunities</div>
    <h2 id="contact-title">Have an idea?<br/><span className="gradient-text">Let's build it.</span></h2>
    <p className="contact-intro">A new project, a team opportunity, or just a conversation.<br/>I'd love to hear from you.</p>
    <EmailLink className="contact-email focus-ring" email={email}>{email}<ArrowUpRight aria-hidden="true" /></EmailLink>
    <div className="contact-bottom"><div><span><MapPin size={15} aria-hidden="true" />{location}</span><a href={`tel:${phone.replace(/\s/g,'')}`}><Phone size={15} aria-hidden="true" />{phone}</a></div><div><a href={github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a><a href={linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={16} /> LinkedIn <ArrowUpRight size={14}/></a><EmailLink email={email} aria-label="Send email"><Mail size={18}/></EmailLink></div></div>
  </Reveal></div></section>;
}
