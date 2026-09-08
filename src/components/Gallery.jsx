import { useState } from 'react';
import { WEDDING } from '../lib/utils';
import { X } from 'lucide-react';

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-off-white text-deep-olive">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage text-center mb-4 scroll-reveal">
          Moments captured
        </p>
        <h2 className="text-fluid-heading font-serif italic text-deep-olive text-center mb-12 md:mb-16 scroll-reveal">
          Gallery
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {WEDDING.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(img)}
              className={`scroll-reveal-scale overflow-hidden rounded-sm group cursor-pointer ${img.span}`}
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay fixed inset-0 z-[90] bg-deep-olive/95 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10 w-11 h-11 flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
