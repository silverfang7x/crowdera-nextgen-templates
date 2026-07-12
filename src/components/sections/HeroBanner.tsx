'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Heart, ArrowRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { AIContentSuggest } from '@/components/editor/AIContentSuggest';

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
  primaryCtaText = "Donate to Relief",
  primaryCtaHref = "/donate",
  secondaryCtaText = "Read Our Story",
  secondaryCtaHref = "/#about",
  forceStaticImageOnMobile = true,
  className,
}: HeroBannerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [headlineText, setHeadlineText] = React.useState(headline);
  const [missionText, setMissionText] = React.useState(missionStatement);
  const [hlHeadline, setHlHeadline] = React.useState(false);
  const [hlMission, setHlMission] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeadlineText(headline);
    });
    return () => cancelAnimationFrame(frame);
  }, [headline]);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMissionText(missionStatement);
    });
    return () => cancelAnimationFrame(frame);
  }, [missionStatement]);

  const changeHeadline = (newText: string) => {
    setHeadlineText(newText);
    setHlHeadline(true);
    setTimeout(() => setHlHeadline(false), 1000);
  };

  const changeMission = (newText: string) => {
    setMissionText(newText);
    setHlMission(true);
    setTimeout(() => setHlMission(false), 1000);
  };

  // Default autoplay off if prefers-reduced-motion is active
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (shouldReduceMotion) {
        setIsPlaying(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion]);

  // Sync video play state on play/pause click
  React.useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

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
    if (variant !== 'carousel' || (isMobile && forceStaticImageOnMobile) || !images || images.length <= 1 || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [variant, isMobile, forceStaticImageOnMobile, images, isPlaying]);

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
          ref={videoRef}
          autoPlay={isPlaying}
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
            className={cn(
              "text-4xl md:text-5xl lg:text-display font-serif font-bold tracking-tight text-surface dark:text-ink leading-tight drop-shadow-sm transition-all duration-500 relative group/editor inline-flex items-center",
              hlHeadline ? "bg-accent/25 ring-4 ring-accent/30 rounded-md scale-[1.01] px-2 text-accent-contrast dark:text-accent" : ""
            )}
          >
            <span>{headlineText}</span>
            <AIContentSuggest
              sectionKey="hero-headline"
              onSelect={changeHeadline}
              className="opacity-0 group-hover/editor:opacity-100 transition-opacity duration-200"
            />
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
            className={cn(
              "text-base md:text-lg text-surface/85 dark:text-ink-muted leading-relaxed font-sans max-w-lg transition-all duration-500 relative group/editor inline-flex items-center",
              hlMission ? "bg-accent/25 ring-4 ring-accent/30 rounded-md scale-[1.01] px-2 text-accent-contrast dark:text-accent" : ""
            )}
          >
            <span>{missionText}</span>
            <AIContentSuggest
              sectionKey="hero-mission"
              onSelect={changeMission}
              className="opacity-0 group-hover/editor:opacity-100 transition-opacity duration-200"
            />
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

      {/* Subtle background media play/pause toggle */}
      {(variant === 'video' || variant === 'carousel') && !(isMobile && forceStaticImageOnMobile) && !mediaError && (
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="absolute bottom-8 right-8 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 hover:scale-105 active:scale-100 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={isPlaying ? "Pause background playback" : "Resume background playback"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
      )}
    </section>
  );
}
