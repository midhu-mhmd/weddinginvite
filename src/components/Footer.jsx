import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEDDING } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const monoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (monoRef.current) {
        gsap.fromTo(monoRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: monoRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="py-20 md:py-28 bg-deep-olive text-center">
      <div className="max-w-lg mx-auto px-6">
        {/* Monogram bookend */}
        <div ref={monoRef} className="mb-8">
          <svg
            className="w-20 h-20 mx-auto"
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Letter A */}
            <path
              d="M30 90 L55 20 L80 90 M40 65 L70 65"
              stroke="#C7A252"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Ampersand */}
            <text
              x="100"
              y="65"
              textAnchor="middle"
              fontFamily="'Cormorant Garamond', serif"
              fontSize="24"
              fontStyle="italic"
              fill="#D4A5A5"
            >
              &amp;
            </text>
            {/* Letter J */}
            <path
              d="M140 20 L140 70 Q140 90 125 90 Q115 90 112 80"
              stroke="#C7A252"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line
              x1="125" y1="20" x2="160" y2="20"
              stroke="#C7A252"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p dir="rtl" className="font-['Aref_Ruqaa',serif] text-2xl md:text-3xl text-cream/80 mb-3">
          بِكُلِّ حُبِّنَا
        </p>
        <p className="font-serif text-lg text-cream/50 italic">
          {WEDDING.groomFirst} &amp; {WEDDING.brideFirst}
        </p>

        <div className="w-12 h-px bg-sage/30 mx-auto my-8" />

        <p dir="rtl" className="font-['Aref_Ruqaa',serif] text-[12px] text-sage/60 tracking-wide">
          © ٢٠٢٦ {WEDDING.groomFirst} &amp; {WEDDING.brideFirst}
        </p>
      </div>
    </footer>
  );
}
