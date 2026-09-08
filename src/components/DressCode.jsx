import { WEDDING } from '../lib/utils';

export default function DressCode() {
  return (
    <section
      id="dresscode"
      className="py-24 md:py-32 bg-deep-olive text-center"
    >
      <div className="max-w-2xl mx-auto px-6">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage mb-4 scroll-reveal">
          What to wear
        </p>
        <h2 className="text-fluid-heading font-serif italic text-cream mb-6 scroll-reveal">
          {WEDDING.dressCode.title}
        </h2>
        <p className="font-sans text-sm md:text-base font-light leading-relaxed text-cream/70 mb-12 scroll-reveal">
          {WEDDING.dressCode.description}
        </p>

        {/* Color Swatches */}
        <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
          {WEDDING.dressCode.swatches.map((swatch) => (
            <div key={swatch.name} className="scroll-reveal-scale flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-sage/30 transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: swatch.color }}
                title={swatch.name}
              />
              <span className="font-sans text-[10px] uppercase tracking-wider text-sage">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
