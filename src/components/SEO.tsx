import { portfolioData } from '../data/portfolio';

export function SEO() {
  const { name, title, summary, location, email, github, linkedin } = portfolioData.personal;

  return (
    <>
      <title>{`${name} — ${title}`}</title>
      <meta name="description" content={summary} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

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
