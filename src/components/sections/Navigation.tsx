import { Brand } from '../ui/Brand';
import { useState, useEffect, useRef } from 'react';
import { useActiveSection, useReducedMotion } from '../../hooks';
import { Menu, X, House, UserRound, Code2, BriefcaseBusiness, Layers, Send } from 'lucide-react';

const navItems = [
  { href: '#hero', label: 'Home', icon: House },
  { href: '#about', label: 'About', icon: UserRound },
  { href: '#skills', label: 'Skills', icon: Code2 },
  { href: '#experience', label: 'Experience', icon: BriefcaseBusiness },
  { href: '#projects', label: 'Projects', icon: Layers },
  { href: '#contact', label: 'Contact', icon: Send },
];

const sectionIds = navItems.map(item => item.href.slice(1));

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const activeSection = `#${useActiveSection(sectionIds)}`;
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuToggle.current?.focus();
      }
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
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuToggle}
              className="lg:hidden min-h-11 min-w-11 p-2 rounded-lg text-text hover:bg-surface transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Compact mobile navigation */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 top-16 z-40 bg-black/10 lg:hidden transition-opacity duration-200 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        {/* Non-modal panel keeps the page in view. */}
        <div
          id="mobile-menu"
          inert={!isMobileMenuOpen}
          className={`mobile-nav-panel lg:hidden ${isMobileMenuOpen ? 'is-open' : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-caption"><span>EXPLORE</span><span>06 sections</span></div>
          <div className="mobile-nav-grid">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                aria-current={activeSection === item.href ? 'location' : undefined}
                className="mobile-nav-link focus-ring"
              >
                <item.icon size={17} strokeWidth={1.6} aria-hidden="true" />
                <span>{item.label}</span>
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
      className={`relative min-h-11 px-2 py-2 text-sm font-medium transition-colors ${
        isActive ? 'text-primary' : 'text-text-muted hover:text-text'
      }`}
      aria-current={isActive ? 'location' : undefined}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" aria-hidden="true" />
      )}
    </button>
  );
}
