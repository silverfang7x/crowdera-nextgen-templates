'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface HeroBannerProps {
  variant: 'image' | 'video' | 'carousel';
  images?: string[];
  videoUrl?: string;
  fallbackImage: string;
  headline: string;
  missionStatement: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  forceStaticImageOnMobile?: boolean;
  className?: string;
}

export function HeroBanner({
  variant,
  images = [],
  videoUrl,
  fallbackImage,
  headline,
  missionStatement,
  primaryCtaText = "Donate Now",
  primaryCtaHref = "#donate",
  secondaryCtaText = "Learn Our Story",
  secondaryCtaHref = "#about",
  forceStaticImageOnMobile = true,
  className,
}: HeroBannerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(false);

  // Resize listener for mobile check
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel transition interval
  React.useEffect(() => {
    if (variant !== 'carousel' || (isMobile && forceStaticImageOnMobile) || !images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [variant, isMobile, forceStaticImageOnMobile, images]);

  // Determine background render strategy
  const renderBackground = () => {
    // Mobile static fallback optimization
    if ((isMobile && forceStaticImageOnMobile) || mediaError) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackImage}
          alt={headline}
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
        />
      );
    }

    if (variant === 'video' && videoUrl) {
      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setMediaError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Fallback image if video fails or format not supported */}
          <img src={fallbackImage} alt={headline} className="w-full h-full object-cover" />
        </video>
      );
    }

    if (variant === 'carousel' && images.length > 0) {
      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIdx}
              src={images[currentIdx]}
              alt={`Slide ${currentIdx + 1}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={shouldReduceMotion ? { duration: 0.4 } : { duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setMediaError(true)}
            />
          </AnimatePresence>
        </div>
      );
    }

    // Default image variant
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={images[0] || fallbackImage}
        alt={headline}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setMediaError(true)}
      />
    );
  };

  return (
    <section
      className={cn(
        "relative w-full h-screen min-h-[600px] flex items-center justify-start overflow-hidden bg-surface text-surface dark:text-ink transition-colors duration-200",
        className
      )}
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        {renderBackground()}
        {/* Subtle theme-based gradient legibility overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--color-ink)/0.85)] via-[hsl(var(--color-ink)/0.45)] to-transparent dark:from-[hsl(var(--color-surface)/0.9)] dark:via-[hsl(var(--color-surface)/0.55)] dark:to-transparent transition-colors duration-200 z-10" 
        />
      </div>

      {/* Asymmetric Content Container (Left-third positioned) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 md:px-8 flex flex-col justify-center h-full">
        <div className="w-full md:max-w-2xl text-left space-y-6">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-display font-serif font-bold tracking-tight text-surface dark:text-ink leading-tight drop-shadow-sm"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-surface/85 dark:text-ink-muted leading-relaxed font-sans max-w-lg"
          >
            {missionStatement}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a href={primaryCtaHref}>
              <Button
                variant="donate"
                size="md"
                className="font-bold border-2 border-surface dark:border-ink hover:scale-105 active:scale-100 transition-all shadow-lg"
                iconLeft={<Heart className="w-4 h-4 fill-current" />}
              >
                {primaryCtaText}
              </Button>
            </a>

            <a href={secondaryCtaHref}>
              <Button
                variant="secondary"
                size="md"
                className="bg-transparent/25 text-surface hover:bg-surface hover:text-ink border border-surface/50 dark:border-ink/50 dark:text-ink dark:hover:bg-ink dark:hover:text-surface shadow-md"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                {secondaryCtaText}
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none">
        <span className="text-xs uppercase tracking-widest text-surface/60 dark:text-ink/60 mb-2 font-semibold">
          Scroll to explore
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-surface dark:text-ink" />
        </motion.div>
      </div>
    </section>
  );
}
