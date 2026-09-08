import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEDDING } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const blocks = sectionRef.current?.querySelectorAll('.story-block');

      blocks?.forEach((block) => {
        const img = block.querySelector('.story-img');
        const text = block.querySelector('.story-text');

        if (img) {
          gsap.set(img, {
            clipPath: prefersReduced ? 'inset(0%)' : 'inset(100% 0% 0% 0%)',
            opacity: prefersReduced ? 1 : 0,
          });
          gsap.to(img, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: prefersReduced ? 0.01 : 1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true,
            },
          });
        }

        if (text) {
          const children = text.querySelectorAll('.story-text-line');
          gsap.set(children, { opacity: 0, y: prefersReduced ? 0 : 25 });
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: prefersReduced ? 0.01 : 0.7,
            stagger: prefersReduced ? 0 : 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 70%',
              toggleActions: 'play none none none',
              once: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="py-24 md:py-32 bg-off-white text-deep-olive"
    >
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage text-center mb-4 scroll-reveal">
          How it all began
        </p>
        <h2 className="text-fluid-heading font-serif italic text-deep-olive text-center mb-16 md:mb-24 scroll-reveal">
          Our Story
        </h2>

        <div className="space-y-20 md:space-y-32">
          {WEDDING.story.map((entry, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={entry.year}
                className={`story-block flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 overflow-hidden">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="story-img w-full h-64 md:h-80 object-cover rounded-sm"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className={`story-text w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="story-text-line block font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2">
                    {entry.year}
                  </span>
                  <h3 className="story-text-line font-serif text-2xl md:text-3xl italic text-deep-olive mb-4">
                    {entry.title}
                  </h3>
                  <p className="story-text-line font-sans text-sm md:text-base font-light leading-relaxed text-olive">
                    {entry.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
