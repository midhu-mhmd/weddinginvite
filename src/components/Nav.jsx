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
  const [mobileOpen, setMobileOpen] = useState(false);
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
      setMobileOpen(false);
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

      {/* Mobile — bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom">
        {/* Toggle button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="absolute right-4 bottom-full mb-4 w-11 h-11 rounded-full bg-olive/90 backdrop-blur-sm flex items-center justify-center border border-sage/30"
          aria-label="Toggle navigation"
        >
          <div className="flex flex-col gap-1">
            <span className={cn('block w-4 h-px bg-cream transition-transform duration-300', mobileOpen && 'rotate-45 translate-y-[3px]')} />
            <span className={cn('block w-4 h-px bg-cream transition-opacity duration-300', mobileOpen && 'opacity-0')} />
            <span className={cn('block w-4 h-px bg-cream transition-transform duration-300', mobileOpen && '-rotate-45 -translate-y-[3px]')} />
          </div>
        </button>

        {/* Mobile nav panel */}
        <div
          className={cn(
            'bg-olive/95 backdrop-blur-md border-t border-sage/20 transition-transform duration-300 ease-out',
            mobileOpen ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className="grid grid-cols-4 gap-1 p-4">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  'py-3 text-[10px] uppercase tracking-wider font-sans rounded transition-colors min-h-[44px]',
                  active === id ? 'text-gold bg-deep-olive/50' : 'text-cream/60'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
