'use client';

import * as React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import Link from 'next/link';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string; // ISO date string e.g., '2026-03-12T00:00:00.000Z'
  imageUrl: string;
  href?: string;
}

export interface NewsSectionProps {
  sectionHeadline?: string;
  sectionSubtitle?: string;
  articles: NewsItem[];
}

export function NewsSection({
  sectionHeadline = "Latest Frontline Updates",
  sectionSubtitle = "Direct reports and dispatch logs from our ongoing response operations around the world.",
  articles,
}: NewsSectionProps) {
  
  // Format ISO strings to "Month Date, Year" cleanly
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Section padding="lg" background="default" id="news">
      <Container asymmetric className="space-y-12">
        
        {/* Header Block */}
        <div className="max-w-2xl text-left space-y-3">
          <span className="text-xs uppercase tracking-widest text-accent font-bold">
            Frontline Logs
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-ink">
            {sectionHeadline}
          </h2>
          <p className="text-base text-ink-muted font-sans leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* 3-Card Grid Row with Staggered ScrollReveal */}
        <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((art) => (
            <Card
              key={art.id}
              variant="news-card"
              className="h-full flex flex-col justify-between"
              image={
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
              }
              eyebrow={
                <div className="flex items-center gap-1.5 text-xs text-ink-muted font-sans font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span suppressHydrationWarning>{formatDate(art.date)}</span>
                </div>
              }
              title={art.title}
              body={art.summary}
              footer={
                <Link href={art.href || "#news"} className="w-full flex items-center justify-between group/link">
                  <span className="text-xs font-bold text-ink group-hover/link:text-accent transition-colors font-sans uppercase tracking-wider">
                    Read Full Dispatch
                  </span>
                  <ArrowRight className="w-4 h-4 text-ink-muted group-hover/link:text-accent group-hover/link:translate-x-1 transition-all" />
                </Link>
              }
            />
          ))}
        </ScrollReveal>

      </Container>
    </Section>
  );
}
