'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PROGRAMS_DATA = [
  {
    id: "water",
    title: "Clean Water Deployment",
    category: "Water",
    description: "Deploying high-yield gravity water purification systems to disaster camps and schools within 24 hours of infrastructure collapse.",
    imageUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=800&q=80",
    location: "Mozambique & Madagascar",
    status: "Active",
    ctaText: "See Deployment details",
    ctaHref: "/programs/water"
  },
  {
    id: "medical",
    title: "Mobile Medical Triage",
    category: "Medical",
    description: "Providing immediate primary care, wound treatment, and emergency pharmacy services in the critical first 72 hours.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    location: "Syria & Ukraine Border",
    status: "Active",
    ctaText: "Deploy Medical Aid",
    ctaHref: "/programs/medical"
  },
  {
    id: "supply",
    title: "Survival Resource Packs",
    category: "Logistics",
    description: "Distributing hygiene kits, thermal blankets, emergency lighting, and non-perishable food rations to stranded flood families.",
    imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
    location: "Kentucky Floods (USA)",
    status: "Completed",
    ctaText: "Sponsor a Survival Pack",
    ctaHref: "/programs/supply"
  },
  {
    id: "education",
    title: "Community Water Safety",
    category: "Water",
    description: "Training local community coordinators to manage and maintain gravity-powered filtration systems to yield water long-term.",
    imageUrl: "https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=800&q=80",
    location: "Global Training Hubs",
    status: "Active",
    ctaText: "Learn Safety Model",
    ctaHref: "/programs/education"
  }
];

const CATEGORIES = ["All", "Water", "Medical", "Logistics"];

export default function ProgramsClient() {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredPrograms = PROGRAMS_DATA.filter((prog) => {
    if (activeCategory === "All") return true;
    return prog.category === activeCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header orgName="Clearwater Relief" />

      <main className="flex-grow pt-24 pb-16">
        {/* Page Hero */}
        <Section padding="lg" background="elevated" className="border-b border-border/50">
          <Container className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
              Deployment List
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-ink leading-tight">
              Active Relief Initiatives
            </h1>
            <p className="text-lg text-ink-muted font-sans leading-relaxed max-w-2xl">
              From installing gravity water pipelines to mobilizing critical medical assets, we carry out evidence-based programs designed for instant response and long-term recovery.
            </p>
          </Container>
        </Section>

        {/* Filter controls & Grid */}
        <Section padding="lg">
          <Container className="space-y-12">
            
            {/* Category Badges Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider font-sans mr-2">
                Filter by Category:
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="cursor-pointer focus:outline-none"
                  >
                    <Badge variant={isActive ? "active" : "outline"} className="text-xs px-3.5 py-1.5 rounded-full">
                      {cat}
                    </Badge>
                  </button>
                );
              })}
            </div>

            {/* Program Card Grid (Staggered ScrollReveal) */}
            <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPrograms.map((prog) => (
                <Card
                  key={prog.id}
                  variant="program-card"
                  className="h-full flex flex-col justify-between"
                  image={
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={prog.imageUrl}
                        alt={prog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  }
                  eyebrow={
                    <div className="flex items-center justify-between text-xs font-sans font-semibold">
                      <span className="text-accent uppercase tracking-widest">{prog.category}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                        prog.status === 'Active' 
                          ? 'bg-green-500/10 border-green-500/20 text-green-600' 
                          : 'bg-ink-muted/10 border-border text-ink-muted'
                      }`}>
                        {prog.status}
                      </span>
                    </div>
                  }
                  title={prog.title}
                  body={
                    <div className="space-y-3">
                      <p className="text-sm text-ink-muted leading-relaxed font-sans">{prog.description}</p>
                      <div className="flex items-center gap-1.5 text-xs text-ink-muted font-semibold font-sans mt-2">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{prog.location}</span>
                      </div>
                    </div>
                  }
                  footer={
                    <Link href={prog.ctaHref} className="w-full">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full justify-between transition-all duration-300 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                        iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        {prog.ctaText}
                      </Button>
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
