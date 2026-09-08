import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger reveal hook.
 * Animates children matching `selector` with staggered fade-up on scroll enter.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal(selector = '.gsap-reveal', options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = container.querySelectorAll(selector);

    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.set(elements, {
        opacity: 0,
        y: prefersReduced ? 0 : 30,
      });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: prefersReduced ? 0.01 : (options.duration || 0.8),
        stagger: prefersReduced ? 0 : (options.stagger || 0.12),
        ease: options.ease || 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          toggleActions: 'play none none none',
          once: true,
          ...options.scrollTrigger,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [selector, options.duration, options.stagger, options.ease, options.start, options.end]);

  return containerRef;
}

export default useScrollReveal;
