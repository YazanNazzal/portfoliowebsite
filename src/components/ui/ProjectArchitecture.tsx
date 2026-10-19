import { ArrowDown, GitBranch } from 'lucide-react';

const flows: Record<string, { label: string; detail: string }[]> = {
  'forme-commerce': [
    { label: 'Storefront & Studio', detail: 'Separate React and TypeScript shopping and admin interfaces' },
    { label: 'Shared Zustand state', detail: 'Catalog changes, cart, stock validation, and demo orders' },
    { label: 'Browser persistence', detail: 'localStorage with same-origin cross-tab synchronization' },
  ],
  'blossom-dreams': [
    { label: 'Salon website', detail: 'HTML, JavaScript, and Tailwind CSS booking interface' },
    { label: 'FastAPI backend', detail: 'Booking workflows, admin access, and email verification' },
    { label: 'PostgreSQL & Resend', detail: 'Persistent booking data and transactional emails' },
  ],
  'math-tutor-website': [
    { label: 'Feedback & portrait', detail: 'Arabic or English text and a local photo' },
    { label: 'Canvas design', detail: '23 templates with multi-page text layout' },
    { label: 'Export & share', detail: '1080 × 1920 PNG Stories from the browser' },
  ],
  'hakini-screen': [
    { label: 'Arabic interface', detail: 'React Native + Expo with custom fonts' },
    { label: 'Login form', detail: 'Email, secure password, and remember-me controls' },
    { label: 'UI demonstration', detail: 'Local demo alert for the sign-in action' },
  ],
  'employees-api': [
    { label: 'REST endpoints', detail: 'Employee and company operations' },
    { label: 'ASP.NET Core 6', detail: 'Controllers + Entity Framework Core' },
    { label: 'SQL Server', detail: 'Related records and code-first migrations' },
  ],
  'warraq-pdf-assistant': [
    { label: 'Documents', detail: 'Browser-side text extraction' },
    { label: 'Retrieval', detail: 'BM25 + semantic search + reranking' },
    { label: 'Answers', detail: 'Gemini responses with document sources' },
  ],
  'apartment-reservation': [
    { label: 'Flutter app', detail: 'Student & owner interfaces' },
    { label: 'Application flow', detail: 'Riverpod state + GoRouter navigation' },
    { label: 'Firebase', detail: 'Authentication + Cloud Firestore data' },
  ],
  'auth-modules': [
    { label: 'React Native UI', detail: 'Mobile interface prototype' },
    { label: 'Account screens', detail: 'Login & signup presentation' },
    { label: 'Map screen', detail: 'Map-based interface' },
  ],
  'online-store': [
    { label: 'REST endpoints', detail: 'Store, category & product operations' },
    { label: 'ASP.NET Core', detail: 'C# backend + Entity Framework Core' },
    { label: 'SQL Server', detail: 'Related entities + code-first database' },
  ],
  'guessing-game': [
    { label: 'Choose a number', detail: 'Player input in React Native' },
    { label: 'Give a hint', detail: 'Higher or lower narrows the range' },
    { label: 'Find the answer', detail: 'Guess history + round count + restart' },
  ],
  'poc-react': [
    { label: 'React dashboard', detail: 'Material UI + React Router' },
    { label: 'API requests', detail: 'Axios connects management screens' },
    { label: 'Operations data', detail: 'Organizations, projects & timecards' },
  ],
};

export function ProjectArchitecture({ projectId }: { projectId: string }) {
  const steps = flows[projectId];
  if (!steps) return null;
  return <section className="project-architecture" aria-label="How this project works">
    <h4><GitBranch size={15} aria-hidden="true" /> How it works</h4>
    <ol>{steps.map((step, index) => <li key={step.label}>
      <span className="architecture-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div><strong>{step.label}</strong><span>{step.detail}</span></div>
      {index < steps.length - 1 && <ArrowDown className="architecture-connector" size={13} aria-hidden="true" />}
    </li>)}</ol>
  </section>;
}
