'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, ArrowRight, Heart, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProgramDetail {
  title: string;
  category: string;
  headline: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  location: string;
  stats: { value: number; suffix: string; label: string }[];
  deliverables: string[];
  relatedSlugs: string[];
}

const DETAILS_DATA: Record<string, ProgramDetail> = {
  water: {
    title: "Clean Water Deployment",
    category: "Water",
    headline: "Deploying high-yield gravity-powered water purification hubs in crisis shelters.",
    description: "Installing compact, gravity-powered water filtration units yielding thousands of liters of clean drinking water daily.",
    longDescription: "When natural disasters collapse municipal utilities, waterborne diseases present a secondary crisis that can surpass the initial event in lethality. Our clean water initiative deploys portable, gravity-powered filtration units directly to frontline shelters, clinics, and community centers. These systems run without external power or chemical logistics, filtering out 99.99% of bacteria and viral pathogens.",
    imageUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=1200&q=80",
    location: "Mozambique & Madagascar",
    stats: [
      { value: 142500, suffix: "+", label: "Liters Distributed" },
      { value: 82, suffix: "", label: "Shelter Systems Active" },
      { value: 96, suffix: "%", label: "Purity Rating" }
    ],
    deliverables: [
      "Gravity purification lines setup in under 24 hours.",
      "10,000 liters of safe drinking water per unit daily.",
      "Water quality monitoring and sanitization testing in the field.",
      "Hands-on operator training for local camp coordinators."
    ],
    relatedSlugs: ["medical", "education"]
  },
  medical: {
    title: "Mobile Medical Triage",
    category: "Medical",
    headline: "Providing immediate primary care, wound triage, and medicine distribution.",
    description: "Deploying response medical teams and mobile health clinics directly to disaster borders and refugee centers.",
    longDescription: "The first 72 hours of a disaster are critical for trauma care and primary containment. Our mobile clinics carry emergency doctors, nursing staff, and medical supplies directly into collapse zones. We setup temporary clinical tents to treat minor wounds, distribute life-saving prescriptions, and coordinate trauma routing to secondary regional facilities.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    location: "Syria & Ukraine Border",
    stats: [
      { value: 12400, suffix: "+", label: "Patients Treated" },
      { value: 35, suffix: "", label: "Active Field Doctors" },
      { value: 24, suffix: "h", label: "Average Dispatch Speed" }
    ],
    deliverables: [
      "Clinical triage tents equipped for wound treatment and diagnostics.",
      "Distribution of essential chronic medications and pain relief.",
      "Pediatric nutrition screening and fluid therapy staging.",
      "Direct medical coordination with WHO command structures."
    ],
    relatedSlugs: ["water", "supply"]
  },
  supply: {
    title: "Survival Resource Packs",
    category: "Logistics",
    headline: "Staging and deploying survival kits to families displaced by severe storm damage.",
    description: "Distributing hygiene packages, thermal blankets, emergency lighting, and non-perishable rations.",
    longDescription: "Floods and hurricanes leave thousands stranded without power, clean shelter, or sanitation. Clearwater stages and distributes survival cargo packs directly to displaced families. Each pack is modularly prepared in our warehouses to provide basic cooking, lighting, and hygiene security for a family of four for up to 14 days.",
    imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    location: "Kentucky Floods (USA)",
    stats: [
      { value: 4500, suffix: "", label: "Kits Distributed" },
      { value: 18000, suffix: "", label: "Individuals Supported" },
      { value: 98, suffix: "%", label: "Delivery Precision Score" }
    ],
    deliverables: [
      "Standard survival kit assemblies containing dry rations and solar lights.",
      "Hygiene pack inclusion with basic medical and dental items.",
      "Water storage container handout for family transportation.",
      "Staging warehouse logistics routing to avoid grid blockage."
    ],
    relatedSlugs: ["water", "medical"]
  },
  education: {
    title: "Community Water Safety",
    category: "Water",
    headline: "Training community leaders in system maintenance to secure long-term recovery.",
    description: "Running educational workshops and field maintenance operations to sustain deployed water lines.",
    longDescription: "True recovery is self-sustaining. After the emergency responders depart, Clearwater remains to transition water asset operations to local leaders. We provide comprehensive technical training, maintenance schedules, and replacements to ensure gravity water hubs supply pure water for years to come.",
    imageUrl: "https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=1200&q=80",
    location: "Global Training Hubs",
    stats: [
      { value: 850, suffix: "+", label: "Trained Coordinators" },
      { value: 120, suffix: "", label: "Transitioned Communities" },
      { value: 5, suffix: "yr+", label: "Average System Longevity" }
    ],
    deliverables: [
      "Technical hands-on mechanical water line operations classes.",
      "Distribution of maintenance spares and tools manuals.",
      "Hygiene outreach workshops taught by localized trainers.",
      "Scheduled water purity checks coordinate systems audit."
    ],
    relatedSlugs: ["water", "supply"]
  }
};

export default function ProgramDetailClient({ slug }: { slug: string }) {
  const data = DETAILS_DATA[slug];

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <Header orgName="Clearwater Relief" />
        <main className="flex-grow pt-32 text-center">
          <Container className="space-y-4">
            <h1 className="text-3xl font-serif font-bold text-ink">Program Not Found</h1>
            <p className="text-ink-muted">The requested program does not exist or has been archived.</p>
            <Link href="/programs">
              <Button variant="secondary" size="md">
                Back to Programs
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
        
        {/* Breadcrumb & Navigation Header */}
        <Section padding="none" className="pt-8">
          <Container className="flex items-center justify-between">
            <Link href="/programs" className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent/80 font-sans cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Programs</span>
            </Link>
            <Badge variant="outline" className="text-2xs rounded-md">
              Category: {data.category}
            </Badge>
          </Container>
        </Section>

        {/* Hero Section */}
        <Section padding="md">
          <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
                Clearwater Program
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-display font-serif font-bold tracking-tight text-ink leading-tight">
                {data.title}
              </h1>
              <p className="text-base md:text-lg text-ink-muted font-sans leading-relaxed">
                {data.headline}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-ink-muted font-semibold font-sans mt-2">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Staging Base: {data.location}</span>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-accent rounded-lg translate-x-3 translate-y-3 -z-10 opacity-10" />
              <div className="overflow-hidden rounded-lg border border-border bg-surface-elevated aspect-[16/10] shadow-md relative">
                <Image
                  src={data.imageUrl}
                  alt={data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Dynamic Impact Counters Grid */}
        <Section padding="md" background="elevated" className="border-y border-border/50">
          <Container className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="p-6 bg-surface border border-border/60 rounded-xl text-center shadow-sm space-y-2">
                <span className="text-2xs text-accent font-bold uppercase tracking-wider font-sans block">
                  {stat.label}
                </span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-ink tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.5}
                  />
                </h3>
              </div>
            ))}
          </Container>
        </Section>

        {/* Long Narrative & Key Deliverables */}
        <Section padding="lg">
          <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Narrative Column (60% width) */}
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-ink">
                Operational Framework
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                {data.longDescription}
              </p>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-sans font-bold text-sm text-ink uppercase tracking-wider">
                  Key Field Deliverables:
                </h3>
                <ul className="space-y-3.5">
                  {data.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-ink-muted leading-relaxed font-sans">
                      <CheckCircle className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Right Column: Embedded Donate CTA (40% width) */}
            <ScrollReveal className="lg:col-span-5">
              <div className="p-8 bg-accent text-accent-contrast rounded-xl shadow-md space-y-6 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-48 h-48 bg-white/5 rounded-full select-none pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                
                <div className="space-y-2 relative z-10">
                  <span className="text-3xs uppercase tracking-widest text-accent-contrast/75 font-bold font-sans">
                    Support This Initiative
                  </span>
                  <h3 className="text-2xl font-serif font-bold tracking-tight">
                    Fund Clean Deliveries
                  </h3>
                  <p className="text-xs text-accent-contrast/90 leading-relaxed font-sans pt-2">
                    Your contribution directly scales {data.title.toLowerCase()} logistics, fuel staging, and cargo clearance for active disaster deployments.
                  </p>
                </div>

                <div className="relative z-10 pt-4">
                  <Link href={`/donate?program=${slug}`}>
                    <Button
                      size="md"
                      className="bg-surface text-ink hover:bg-surface-elevated border-none font-bold uppercase tracking-wider w-full justify-center transition-all gap-2"
                      iconLeft={<Heart className="w-4 h-4 fill-accent text-accent" />}
                    >
                      Support {data.title}
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

          </Container>
        </Section>

        {/* Related Programs at the Bottom */}
        <Section padding="lg" background="elevated" className="border-t border-border/50">
          <Container className="space-y-8">
            <div className="text-left space-y-2">
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
                Other Deployments
              </span>
              <h2 className="text-2xl font-serif font-bold text-ink">
                Related Relief Operations
              </h2>
            </div>

            <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.relatedSlugs.map((relSlug) => {
                const item = DETAILS_DATA[relSlug];
                if (!item) return null;
                return (
                  <Card
                    key={relSlug}
                    variant="program-card"
                    className="h-full flex flex-col justify-between"
                    image={
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    }
                    eyebrow={
                      <span className="text-xs text-accent uppercase tracking-widest font-sans font-semibold">
                        {item.category}
                      </span>
                    }
                    title={item.title}
                    body={item.description}
                    footer={
                      <Link href={`/programs/${relSlug}`} className="w-full">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full justify-between transition-all duration-300 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                          iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          See Program Details
                        </Button>
                      </Link>
                    }
                  />
                );
              })}
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
