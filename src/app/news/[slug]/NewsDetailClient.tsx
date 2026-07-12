'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleDetail {
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  summary: string;
  paragraphs: string[];
  subheadings: string[];
}

const ARTICLE_DETAILS: Record<string, ArticleDetail> = {
  "madagascar-water-deployment": {
    title: "Clean Water Deployed to Flooded Districts in Madagascar",
    author: "Sarah Thorne (Ops Director)",
    date: "2026-07-08T00:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=1200&q=80",
    summary: "In the immediate aftermath of tropical storm rainfall, Clearwater Relief staging crews successfully deployed gravity filtration assemblies, securing drinking water safety.",
    subheadings: [
      "Securing the First 24 Hours",
      "Gravity Technology vs Secondary Epidemics",
      "Next Steps in Local Integration"
    ],
    paragraphs: [
      "Following storm landfall, high river volumes flooded regional drinking wells across Madagascar's eastern district. Rapid water staging was prioritized as road blocks threatened standard bottled supply routes. Within 18 hours, Clearwater field units arrived with modular filtration lines.",
      "By setting up three high-yield gravity filtration stations directly inside local shelters, we secured clean water delivery for over 2,500 displaced families. The gravity units operate without diesel generators, protecting operations from localized fuel shortages.",
      "Over the next two weeks, our field operators will run daily quality audits and initiate safety workshops. We are training local council members to carry out testing to ensure water safety after the emergency crews dispatch elsewhere."
    ]
  },
  "mobile-medical-clinic": {
    title: "Mobile Medical Clinic Treats Over 450 Survivors in Crisis Zone",
    author: "Dr. Marcus Vance (Founder)",
    date: "2026-06-24T00:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    summary: "Clearwater's medical triage trucks completed deployment staging at borders, treating local wound trauma and distributing chronic care medicine.",
    subheadings: [
      "Trauma Care in Demolished Infrastructure",
      "Staging Safe Supplies",
      "Coordinated Operations"
    ],
    paragraphs: [
      "Collapsing clinics and pharmacy networks leave thousands without essential care in the wake of conflict. Our mobile triage unit was dispatched to address immediate medical containment needs at transit centers.",
      "Clearwater doctors and volunteer nurses have processed 450 patients over a 48-hour surge. Our team is distributing chronic medications, treating infected wounds, and providing hydration solutions to counter waterborne fatigue.",
      "All medical logistics are coordinated alongside local WHO commanders to ensure safe staging, transparent cargo tracking, and seamless secondary hospital routing for severe surgical cases."
    ]
  },
  "who-shelters-partnership": {
    title: "Clearwater Partners with WHO to Secure 15 Local Shelters",
    author: "Dr. Elena Rostova (Field Liaison)",
    date: "2026-05-15T00:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    summary: "A joint initiative secures compact filtration setups for classrooms serving as temporary disaster shelters.",
    subheadings: [
      "Scaling Safe Spaces",
      "Compact Gravity Installations",
      "Building Resilience"
    ],
    paragraphs: [
      "Schools and community center classrooms are frequently converted to makeshift shelters during floods. Clearwater is partnering with the World Health Organization (WHO) to outfit 15 secondary schools with pre-staged filtration units.",
      "Each compact gravity line filters up to 8,000 liters daily. The simple layout requires no technical expertise to configure, allowing volunteer shelter coordinators to set up lines in minutes.",
      "This proactive deployment model establishes water security directly at emergency assembly locations, easing logistics pressures on water transport trucks during critical hours."
    ]
  }
};

export default function NewsDetailClient({ slug }: { slug: string }) {
  const data = ARTICLE_DETAILS[slug];

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

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <Header orgName="Clearwater Relief" />
        <main className="flex-grow pt-32 text-center">
          <Container className="space-y-4">
            <h1 className="text-3xl font-serif font-bold text-ink">Dispatch Not Found</h1>
            <p className="text-ink-muted">The requested news dispatch does not exist or has been archived.</p>
            <Link href="/news">
              <Button variant="secondary" size="md">
                Back to News
              </Button>
            </Link>
          </Container>
        </main>
        <Footer orgName="Clearwater Relief" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header orgName="Clearwater Relief" />

      <main className="flex-grow pt-24 pb-16">
        
        {/* Navigation & Header Info */}
        <Section padding="none" className="pt-8">
          <Container className="max-w-2xl mx-auto flex items-center justify-between">
            <Link href="/news" className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent/80 font-sans cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dispatches</span>
            </Link>
            <span className="text-2xs text-ink-muted uppercase tracking-widest font-sans font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-accent" /> Field Log
            </span>
          </Container>
        </Section>

        {/* Article Content Column */}
        <Section padding="md">
          <Container className="max-w-2xl mx-auto space-y-8">
            
            {/* Title & Metadata */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-ink leading-tight">
                {data.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted font-sans border-y border-border/50 py-3">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-accent" />
                  <span className="font-semibold">{data.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span suppressHydrationWarning>{formatDate(data.date)}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-sm">
              <Image
                src={data.imageUrl}
                alt={data.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>

            {/* Narrative text with correct heading structures */}
            <ScrollReveal className="space-y-6 text-sm text-ink-muted leading-relaxed font-sans pt-4">
              <p className="text-base text-ink font-sans font-semibold leading-relaxed border-l-2 border-accent pl-4 italic">
                {data.summary}
              </p>

              {/* Subheading 1 & Paragraph 1 */}
              <div className="space-y-3 pt-4">
                <h2 className="text-xl font-serif font-bold text-ink tracking-tight">
                  1. {data.subheadings[0]}
                </h2>
                <p>{data.paragraphs[0]}</p>
              </div>

              {/* Subheading 2 & Paragraph 2 */}
              <div className="space-y-3 pt-4">
                <h2 className="text-xl font-serif font-bold text-ink tracking-tight">
                  2. {data.subheadings[1]}
                </h2>
                <p>{data.paragraphs[1]}</p>
              </div>

              {/* Subheading 3 & Paragraph 3 */}
              <div className="space-y-3 pt-4">
                <h2 className="text-xl font-serif font-bold text-ink tracking-tight">
                  3. {data.subheadings[2]}
                </h2>
                <p>{data.paragraphs[2]}</p>
              </div>
            </ScrollReveal>

            {/* Back Button */}
            <div className="pt-8 border-t border-border/50 flex justify-center">
              <Link href="/news">
                <Button variant="secondary" size="sm">
                  Return to Dispatch Board
                </Button>
              </Link>
            </div>

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
