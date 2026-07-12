'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section';
import Image from 'next/image';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  aspectRatioClass?: string; // e.g. "aspect-[4/3]", "aspect-[3/4]" etc.
}

export interface GallerySectionProps {
  sectionHeadline?: string;
  sectionSubtitle?: string;
  items: GalleryItem[];
}

export function GallerySection({
  sectionHeadline = "Relief Operations Gallery",
  sectionSubtitle = "A visual archive of our direct response teams deploying water filtration and medical support around the globe.",
  items,
}: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const lightboxRef = React.useRef<HTMLDivElement>(null);
  const lastActiveElementRef = React.useRef<HTMLElement | null>(null);

  const handlePrev = React.useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const handleNext = React.useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % items.length;
    });
  }, [items.length]);

  const openLightbox = (index: number) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement;
    setActiveIndex(index);
  };

  const closeLightbox = React.useCallback(() => {
    setActiveIndex(null);
    // Restore focus to trigger card for accessibility
    setTimeout(() => {
      lastActiveElementRef.current?.focus();
    }, 50);
  }, []);

  // Keyboard navigation & accessibility focus trap
  React.useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
        return;
      }

      if (e.key === 'Tab') {
        if (!lightboxRef.current) return;
        const focusables = lightboxRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex="0"], video'
        );
        if (focusables.length === 0) return;

        const first = focusables[0] as HTMLElement;
        const last = focusables[focusables.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus Close button inside the lightbox modal
    const closeBtn = lightboxRef.current?.querySelector('[aria-label="Close lightbox"]') as HTMLElement;
    closeBtn?.focus();

    // Lock page scroll when active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeIndex, closeLightbox, handlePrev, handleNext]);

  return (
    <Section padding="lg" background="default" id="gallery">
      <Container asymmetric className="space-y-12">
        
        {/* Header Block */}
        <div className="max-w-2xl text-left space-y-3">
          <span className="text-xs uppercase tracking-widest text-accent font-bold">
            Frontline Visuals
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-ink">
            {sectionHeadline}
          </h2>
          <p className="text-base text-ink-muted font-sans leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* CSS Masonry Layout Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-6 group relative rounded-xl border border-border/80 overflow-hidden shadow-sm bg-surface-elevated/40 cursor-pointer"
            >
              {/* Trigger Button wrapping the image */}
              <button
                onClick={() => openLightbox(index)}
                className="w-full text-left relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                aria-label={`Open lightbox viewer for ${item.title}`}
              >
                <div className={`relative w-full ${item.aspectRatioClass || 'aspect-video'} overflow-hidden`}>
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Play Button Overlay for Videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors group-hover:bg-black/40">
                      <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center text-accent-contrast shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay with details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <span className="text-3xs uppercase tracking-widest text-accent-contrast/75 font-semibold">
                      {item.type === 'video' ? 'Video Report' : 'Photo dispatch'}
                    </span>
                    <h4 className="font-serif font-bold text-base mt-1 text-white leading-tight">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-2xs text-accent-contrast/90 line-clamp-2 mt-1 leading-normal font-sans">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* ACCESSIBLE LIGHTBOX DRAWER */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              ref={lightboxRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Image & Video Lightbox Viewer"
            >
              {/* Lightbox Header Bar */}
              <div className="w-full flex items-center justify-between text-white z-10">
                <div className="text-left max-w-xl">
                  <span className="text-3xs uppercase tracking-widest text-accent font-bold">
                    Item {activeIndex + 1} of {items.length} — {items[activeIndex].type === 'video' ? 'Video dispatch' : 'Image dispatch'}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-bold mt-1 text-white leading-tight">
                    {items[activeIndex].title}
                  </h3>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Media Container */}
              <div className="flex-grow flex items-center justify-center my-4 relative">
                
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="absolute left-0 md:left-4 p-3 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-all cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Content Area */}
                <div className="max-w-4xl max-h-[70vh] w-full h-full relative flex items-center justify-center select-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full relative flex items-center justify-center"
                    >
                      {items[activeIndex].type === 'video' ? (
                        <video
                          src={items[activeIndex].url}
                          controls
                          autoPlay
                          playsInline
                          className="max-w-full max-h-[70vh] rounded-lg shadow-2xl outline-none"
                        />
                      ) : (
                        <div className="relative w-full h-full max-h-[70vh] aspect-[16/10]">
                          <Image
                            src={items[activeIndex].url}
                            alt={items[activeIndex].title}
                            fill
                            priority
                            className="object-contain rounded-lg"
                            sizes="(max-width: 1024px) 100vw, 1200px"
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="absolute right-0 md:right-4 p-3 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-all cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

              </div>

              {/* Lightbox Footer Bar (Description) */}
              <div className="w-full text-center text-white/70 text-xs md:text-sm max-w-2xl mx-auto z-10 pb-4">
                {items[activeIndex].description && (
                  <p className="font-sans leading-relaxed">
                    {items[activeIndex].description}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </Section>
  );
}
