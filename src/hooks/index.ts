import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  { threshold = 0.1, rootMargin = '0px 0px -50px 0px', root = null }: IntersectionObserverInit = {}
) {
  const elementRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root]);

  return [elementRef, isIntersecting] as const;
}

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribeToMotion,
    () => window.matchMedia(motionQuery).matches, () => false);
}

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    const sections = sectionIds.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = (document.querySelector('header')?.getBoundingClientRect().height ?? 80) + 24;
      let current = sections[0]?.id ?? '';
      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= marker + 1) current = section.id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id ?? current;
      }
      setActiveId(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resizeObserver = new ResizeObserver(schedule);
    sections.forEach(({ element }) => resizeObserver.observe(element));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sectionIds]);

  return activeId;
}
