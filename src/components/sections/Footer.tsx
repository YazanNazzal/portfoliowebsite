import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Brand } from '../ui/Brand';
export function Footer() {
 const [year] = useState(()=>new Date().getFullYear());
 return <footer className="personal-footer"><div className="editorial-container"><Brand/><span>&copy; {year} Yazan Nazzal. All rights reserved.</span><a href="#hero" className="focus-ring">Back to top <ArrowUp size={15} aria-hidden="true"/></a></div></footer>;
}
