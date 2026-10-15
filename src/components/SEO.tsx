import { portfolioData } from '../data/portfolio';

export function SEO() {
  const { name, location, email, github, linkedin } = portfolioData.personal;

  return (
    <>
      {/* Additional */}
      <meta name="author" content={name} />
      <meta name="keywords" content={[
        'Software Engineer',
        'AI Agentic Engineer',
        'MCP',
        'RAG',
        'LangGraph',
        'React',
        'React Native',
        'Angular',
        '.NET Core',
        'Flutter',
        'Full Stack Developer',
        location,
      ].join(', ')} />
      <link rel="me" href={github} />
      <link rel="me" href={linkedin} />
      <link rel="me" href={`mailto:${email}`} />
    </>
  );
}
