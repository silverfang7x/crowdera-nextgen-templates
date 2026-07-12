'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ARTICLES = [
  {
    id: "n1",
    slug: "madagascar-water-deployment",
    title: "Clean Water Deployed to Flooded Districts in Madagascar",
    summary: "Clearwater Relief response teams set up three emergency water purification lines within 18 hours of storm landfall, supplying 30,000 liters of safe drinking water daily.",
    date: "2026-07-08T00:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "n2",
    slug: "mobile-medical-clinic",
    title: "Mobile Medical Clinic Treats Over 450 Survivors in Crisis Zone",
    summary: "Our medical triage unit deployed on the ground provides critical medicine, clean water, and primary care in the aftermath of local infrastructure collapse.",
    date: "2026-06-24T00:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "n3",
    slug: "who-shelters-partnership",
    title: "Clearwater Partners with WHO to Secure 15 Local Shelters",
    summary: "Collaborative agreement deploys lightweight, gravity-powered filtration units directly to schools serving as temporary refuges.",
    date: "2026-05-15T00:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80"
  }
];

export default function NewsPage() {
  
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
    <div className="flex flex-col min-h-screen">
      <Header orgName="Clearwater Relief" />

      <main className="flex-grow pt-24 pb-16">
        {/* Page Hero */}
        <Section padding="lg" background="elevated" className="border-b border-border/50">
          <Container className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
              Frontline Logs
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-ink leading-tight">
              Operational News & Dispatches
            </h1>
            <p className="text-lg text-ink-muted font-sans leading-relaxed max-w-2xl">
              Stay informed with direct logs, field diaries, and operational metrics dispatched by our deployment teams across active crisis areas.
            </p>
          </Container>
        </Section>

        {/* Article listing */}
        <Section padding="lg">
          <Container className="space-y-12">
            <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ARTICLES.map((art) => (
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
                    <Link href={`/news/${art.slug}`} className="w-full flex items-center justify-between group/link">
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
      </main>

      <Footer 
        orgName="Clearwater Relief" 
        orgTagline="Deploying medical-grade water purification and rapid survival resources directly to natural disaster zones and conflict areas worldwide."
        contactAddress="802 Crisis Relief Lane, Suite 100, Washington, DC 20005"
        contactEmail="response@clearwaterrelief.org"
        contactPhone="+1 (202) 555-0144"
        newsletterTagline="Stay updated on emergency deployments, frontline operations, and impact reports."
      />
    </div>
  );
}
