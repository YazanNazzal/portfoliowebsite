import { Brand } from '../ui/Brand';
import { useState, useEffect } from 'react';
import { useActiveSection, useReducedMotion } from '../../hooks';
import { Menu, ChevronRight, Download } from 'lucide-react';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const sectionIds = navItems.map(item => item.href.slice(1));

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = `#${useActiveSection(sectionIds)}`;
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border/50' : 'bg-bg/70 backdrop-blur-md'
        }`}
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-6" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Brand />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={activeSection === item.href}
                  onClick={scrollToSection}
                />
              ))}
              <a href="/Yazan_Nazzal_CV.pdf" download="Yazan_Nazzal_CV.pdf" className="nav-cv focus-ring">Download CV <Download size={14} aria-hidden="true" /></a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-text hover:bg-surface transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <ChevronRight className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Side Drawer */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        {/* Drawer */}
        <div
          id="mobile-menu"
          inert={!isMobileMenuOpen}
          className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm lg:hidden bg-bg/90 backdrop-blur-md border-l border-border/50 overflow-y-auto transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2 p-6 pt-20">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-3 rounded-xl text-left transition-colors ${
                  activeSection === item.href
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-muted hover:text-text hover:bg-surface'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </>
    </>
  );
}

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (href: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(href)}
      className={`relative px-2 py-2 text-sm font-medium transition-colors ${
        isActive ? 'text-primary' : 'text-text-muted hover:text-text'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" aria-hidden="true" />
      )}
    </button>
  );
}
