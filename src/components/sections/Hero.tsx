import { portfolioData } from '../../data/portfolio';
import { useIntersectionObserver, useReducedMotion } from '../../hooks';
import { HeroContent } from './HeroContent';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [heroRef, isVisible] = useIntersectionObserver();
  return (
    <>
      <section ref={heroRef} id="hero" className="portfolio-hero" aria-labelledby="hero-title">
        <div className="hero-grid-background" aria-hidden="true" />
        <HeroContent {...portfolioData.personal} isVisible={isVisible} prefersReducedMotion={prefersReducedMotion} />
      </section>
      <div className="stack-strip" aria-label="Primary technologies">
        {['Claude', 'OpenAI', 'MCP', 'LangGraph', 'React', 'TypeScript', '.NET Core', 'Python'].map(tech => <span key={tech}><span aria-hidden="true">&#x2726;</span> {tech}</span>)}
      </div>
    </>
  );
}
