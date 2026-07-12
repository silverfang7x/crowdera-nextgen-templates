'use client';

import * as React from 'react';
import { Section, Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

import { AIContentSuggest } from '@/components/editor/AIContentSuggest';

export interface FlexibleSectionProps {
  layout: 'text-only' | 'text-image' | 'text-video' | 'text-image-video';
  align?: 'left' | 'right';
  eyebrow?: string;
  heading: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaIcon?: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'elevated' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function FlexibleSection({
  layout,
  align = 'right',
  eyebrow,
  heading,
  content,
  children,
  imageUrl,
  imageAlt = 'Rescue operations visual',
  videoUrl,
  ctaText,
  ctaHref = '#',
  ctaIcon,
  className,
  id,
  background = 'default',
  padding = 'lg',
}: FlexibleSectionProps) {
  const isAlignRight = align === 'right';

  const [headingText, setHeadingText] = React.useState(heading);
  const [hlHeading, setHlHeading] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeadingText(heading);
    });
    return () => cancelAnimationFrame(frame);
  }, [heading]);

  const changeHeading = (newText: string) => {
    setHeadingText(newText);
    setHlHeading(true);
    setTimeout(() => setHlHeading(false), 1000);
  };

  // Render text block
  const renderTextContent = () => (
    <div className="space-y-6 flex flex-col justify-center">
      {eyebrow && (
        <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        "text-3xl md:text-4xl font-serif font-bold tracking-tight text-ink leading-tight transition-all duration-500 relative group/editor inline-flex items-center w-full text-left",
        hlHeading ? "bg-accent/25 ring-4 ring-accent/30 rounded-md scale-[1.01] px-2 text-accent-contrast dark:text-accent" : ""
      )}>
        <span>{headingText}</span>
        {id === 'about' && (
          <AIContentSuggest
            sectionKey="about-headline"
            onSelect={changeHeading}
            className="opacity-0 group-hover/editor:opacity-100 transition-opacity duration-200"
          />
        )}
      </h2>
      
      {content && (
        <div className="text-base text-ink-muted leading-relaxed font-sans">
          {content}
        </div>
      )}

      {ctaText && (
        <div className="pt-2">
          <a href={ctaHref}>
            <Button
              variant="secondary"
              size="md"
              iconRight={ctaIcon}
              className="font-bold border border-border"
            >
              {ctaText}
            </Button>
          </a>
        </div>
      )}
    </div>
  );

  // Render Image card
  const renderImageMedia = () => {
    if (!imageUrl) return null;
    return (
      <div className="relative group overflow-hidden rounded-lg border border-border bg-surface-elevated aspect-[4/3] shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  };

  // Render Video card
  const renderVideoMedia = () => {
    if (!videoUrl) return null;
    return (
      <div className="relative overflow-hidden rounded-lg border border-border bg-surface-elevated aspect-video shadow-md">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  // Grid Arrangement Strategy
  const renderLayoutContent = () => {
    switch (layout) {
      case 'text-only':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div
              className={cn(
                "space-y-6 lg:col-span-8",
                isAlignRight ? "lg:col-start-1 text-left" : "lg:col-start-5 text-left"
              )}
            >
              {renderTextContent()}
            </div>
          </div>
        );

      case 'text-image':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
            <div className={cn("lg:col-span-6 space-y-6", isAlignRight ? "order-1" : "order-2")}>
              {renderTextContent()}
            </div>
            <div className={cn("lg:col-span-4 relative", isAlignRight ? "order-2" : "order-1")}>
              <div className="absolute inset-0 bg-accent rounded-lg translate-x-3 translate-y-3 -z-10 opacity-10" />
              {renderImageMedia()}
            </div>
          </div>
        );

      case 'text-video':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className={cn("lg:col-span-7 space-y-6", isAlignRight ? "order-1" : "order-2")}>
              {renderTextContent()}
            </div>
            <div className={cn("lg:col-span-5 relative", isAlignRight ? "order-2" : "order-1")}>
              <div className="absolute inset-0 bg-accent rounded-lg translate-x-3 translate-y-3 -z-10 opacity-10" />
              {renderVideoMedia()}
            </div>
          </div>
        );

      case 'text-image-video':
        // Text spans 5 columns, Image spans 3 columns, Video spans 4 columns
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className={cn("lg:col-span-5 space-y-6", isAlignRight ? "order-1" : "order-3")}>
              {renderTextContent()}
            </div>
            <div className={cn("lg:col-span-3 relative", "order-2")}>
              <div className="absolute inset-0 bg-accent rounded-lg translate-x-2.5 translate-y-2.5 -z-10 opacity-10" />
              {renderImageMedia()}
            </div>
            <div className={cn("lg:col-span-4 relative", isAlignRight ? "order-3" : "order-1")}>
              <div className="absolute inset-0 bg-accent rounded-lg translate-x-2.5 translate-y-2.5 -z-10 opacity-10" />
              {renderVideoMedia()}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Section padding={padding} background={background} id={id} className={className}>
      <Container asymmetric className="space-y-16">
        {renderLayoutContent()}
        {children}
      </Container>
    </Section>
  );
}
