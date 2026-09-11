import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'story', label: 'Our Story' },
  { id: 'details', label: 'Details' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'gallery', label: 'Gallery' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const navRef = useRef(null);

  useEffect(() => {
    const triggers = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop — right-side dot nav */}
      <nav
        ref={navRef}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 items-end"
        aria-label="Section navigation"
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-3"
            aria-label={`Scroll to ${label}`}
            aria-current={active === id ? 'true' : undefined}
          >
            <span
              className={cn(
                'text-[10px] uppercase tracking-widest font-sans transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0',
                active === id ? 'text-gold opacity-100 translate-x-0' : 'text-cream/50'
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                active === id
                  ? 'w-3 h-3 bg-gold'
                  : 'w-2 h-2 bg-cream/30 group-hover:bg-cream/60'
              )}
            />
          </button>
        ))}
      </nav>
    </>
  );
}
