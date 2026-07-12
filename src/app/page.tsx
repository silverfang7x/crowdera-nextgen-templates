'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Palette, Sun, Moon, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { AboutSection } from '@/components/sections/AboutSection';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { NewsSection } from '@/components/sections/NewsSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FlexibleSection } from '@/components/sections/FlexibleSection';

const PRESETS = [
  { id: 'humanitarian', name: 'Humanitarian', desc: 'Terracotta & Ink', color: '#d24c2d' },
  { id: 'environment', name: 'Environment', desc: 'Forest Moss & Clay', color: '#25733b' },
  { id: 'healthcare', name: 'Healthcare', desc: 'Trust Blue & Soft White', color: '#1463e1' },
  { id: 'animal-welfare', name: 'Animal Welfare', desc: 'Amber & Charcoal', color: '#e59419' },
  { id: 'disaster-relief', name: 'Disaster Relief', desc: 'Emergency Red & Graphite', color: '#d91d1d' },
];

export default function ClearwaterHomepage() {
  const { theme, setTheme } = useTheme();
  const [activePreset, setActivePreset] = useState<string>('disaster-relief'); // Default to disaster-relief for Clearwater Relief Trust
  const [heroVariant, setHeroVariant] = useState<'image' | 'video' | 'carousel'>('carousel');
  const [mounted, setMounted] = useState(false);

  // Sync preset with html[data-theme]
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      const savedPreset = localStorage.getItem('npo-theme-preset') || 'disaster-relief';
      setActivePreset(savedPreset);
      document.documentElement.setAttribute('data-theme', savedPreset);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handlePresetChange = (presetId: string) => {
    setActivePreset(presetId);
    localStorage.setItem('npo-theme-preset', presetId);
    document.documentElement.setAttribute('data-theme', presetId);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-ink-muted">
        <div className="flex items-center gap-2 animate-pulse">
          <Palette className="w-5 h-5" />
          <span className="font-sans text-base">Initializing design token engine...</span>
        </div>
      </div>
    );
  }

  // Clearwater Relief Trust Persona Content
  const heroImages = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80", // Aid distribution
    "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=1920&q=80", // Pure drinking water
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80"  // Relief camp team
  ];
  
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-water-dripping-from-a-tap-in-slow-motion-41619-large.mp4";
  const aboutVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-water-filtering-through-charcoal-41716-large.mp4";
  const fallbackImage = "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80";

  const aboutParagraphs = [
    "Clearwater Relief Trust was founded on a simple conviction: clean, safe water is the absolute baseline of human survival during crisis. When natural disasters, hurricanes, or armed conflicts strike and local utilities collapse, waterborne epidemics can claim more lives than the initial event itself.",
    "Our elite rapid-response teams consist of emergency doctors, water sanitation engineers, and logistics experts who mobilize within hours of a crisis. By deploying compact, gravity-powered water filtration units directly to frontline communities, we set up local water lines that yield thousands of liters of clean, medical-grade drinking water daily."
  ];

  // Programs Data (4 items, triggers carousel layout)
  const programsData = [
    {
      id: "water",
      title: "Clean Water Deployment",
      description: "Deploying high-yield gravity water purification systems to disaster camps and schools within 24 hours of infrastructure collapse.",
      imageUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=800&q=80",
      ctaText: "See Deployment Map",
      ctaHref: "/donate"
    },
    {
      id: "medical",
      title: "Mobile Medical Triage",
      description: "Providing immediate primary care, wound treatment, and emergency pharmacy services in the critical first 72 hours.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      ctaText: "Deploy Medical Aid",
      ctaHref: "/donate"
    },
    {
      id: "supply",
      title: "Survival Resource Packs",
      description: "Distributing hygiene kits, thermal blankets, emergency lighting, and non-perishable food rations to stranded flood families.",
      imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
      ctaText: "Sponsor a Survival Pack",
      ctaHref: "/donate"
    },
    {
      id: "education",
      title: "Community Water Safety",
      description: "Training local community coordinators to manage and maintain gravity-powered filtration systems to yield water long-term.",
      imageUrl: "https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=800&q=80",
      ctaText: "Learn Safety Model",
      ctaHref: "/#about"
    }
  ];

  // Testimonials Data (with optional rating check)
  const testimonialsData = [
    {
      id: "t1",
      quote: "When the hurricane took down the city reservoir, Clearwater's filtration systems were set up at our shelter in under 8 hours. They saved hundreds of kids from severe dehydration and potential cholera.",
      author: "Sarah Thorne",
      designation: "Emergency Shelter Lead",
      organization: "Red Cross Florida",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
      rating: 5
    },
    {
      id: "t2",
      quote: "Clean water is the bedrock of clinical triage. By partnering with Clearwater, our volunteer doctors can treat patients without worrying about the water supply being contaminated.",
      author: "Dr. Marcus Vance",
      designation: "Chief Field Surgeon",
      organization: "Clearwater Medical",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      rating: 5
    },
    {
      id: "t3",
      quote: "Clearwater's accountability is second to none. Knowing that 96% of all donations go straight to deployments and water purification makes them our top NPO recommendation.",
      author: "James Reynolds",
      designation: "Philanthropic Investor",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: "t4",
      quote: "Our community leaders took over the water purification systems in three days. The system is extremely simple to maintain, which creates true resilience after the responders leave.",
      author: "David Vance",
      designation: "Community Coordinator",
      organization: "Resilience Mutual Aid",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
      rating: 4
    }
  ];

  // Gallery Data (Masonry layout, mixed images and video URLs)
  const galleryItemsData = [
    {
      id: "g1",
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=1200&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=600&q=80",
      title: "Assembling water filters",
      description: "Field engineers assemble gravity-powered filtration membranes inside an emergency camp.",
      aspectRatioClass: "aspect-[4/5]"
    },
    {
      id: "g2",
      type: "video" as const,
      url: "https://assets.mixkit.co/videos/preview/mixkit-water-dripping-from-a-tap-in-slow-motion-41619-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80",
      title: "Flowing clean water tap",
      description: "First output flow of drinking water from the newly deployed filtration hub.",
      aspectRatioClass: "aspect-video"
    },
    {
      id: "g3",
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      title: "Food and clean water handouts",
      description: "Displaced kids and families receiving clean water jars and food rations.",
      aspectRatioClass: "aspect-square"
    },
    {
      id: "g4",
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=1200&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=600&q=80",
      title: "Deploying logistics truck",
      description: "Loading gravity-powered water lines onto Clearwater Relief's rapid response truck.",
      aspectRatioClass: "aspect-[3/4]"
    },
    {
      id: "g5",
      type: "video" as const,
      url: "https://assets.mixkit.co/videos/preview/mixkit-water-filtering-through-charcoal-41716-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=600&q=80",
      title: "Charcoal filtration test",
      description: "Quality assurance test showing filtration media separating impurities from stagnant water.",
      aspectRatioClass: "aspect-[16/10]"
    },
    {
      id: "g6",
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80",
      title: "Disaster deployment briefing",
      description: "Our response medical team preparing cargo loadout plans.",
      aspectRatioClass: "aspect-video"
    }
  ];

  // News Articles Data (3 items, stacks to 1 column on mobile)
  const newsArticlesData = [
    {
      id: "n1",
      title: "Clean Water Deployed to Flooded Districts in Madagascar",
      summary: "Clearwater Relief response teams set up three emergency water purification lines within 18 hours of storm landfall, supplying 30,000 liters of safe drinking water daily.",
      date: "2026-07-08T00:00:00.000Z",
      imageUrl: "https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=600&q=80",
      href: "/news/madagascar-water-deployment"
    },
    {
      id: "n2",
      title: "Mobile Medical Clinic Treats Over 450 Survivors in Crisis Zone",
      summary: "Our medical triage unit deployed on the ground provides critical medicine, clean water, and primary care in the aftermath of local infrastructure collapse.",
      date: "2026-06-24T00:00:00.000Z",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      href: "/news/mobile-medical-clinic"
    },
    {
      id: "n3",
      title: "Clearwater Partners with WHO to Secure 15 Local Shelters",
      summary: "Collaborative agreement deploys lightweight, gravity-powered filtration units directly to schools serving as temporary refuges.",
      date: "2026-05-15T00:00:00.000Z",
      imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80",
      href: "/news/who-shelters-partnership"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Header */}
      <Header orgName="Clearwater Relief" />

      {/* Homepage Content Sections */}
      <main className="flex-grow">
        
        {/* 1. HERO BANNER */}
        <HeroBanner
          variant={heroVariant}
          images={heroImages}
          videoUrl={videoUrl}
          fallbackImage={fallbackImage}
          headline="Rapid Response When Seconds Save Lives"
          missionStatement="Clearwater Relief Trust deploys mobile purification systems, medical support, and critical survival packs directly to families in disaster zones in the crucial first 72 hours."
          primaryCtaText="Donate to Relief"
          primaryCtaHref="/donate"
          secondaryCtaText="Read Our Story"
          secondaryCtaHref="/#about"
          forceStaticImageOnMobile={true}
        />

        {/* 2. ABOUT ORGANIZATION */}
        <ScrollReveal>
          <AboutSection
            headline="Providing Hope, Restoring Dignity, and Purifying Water Since 2012"
            paragraphs={aboutParagraphs}
            quoteText="During a major crisis, institutional logistics collapse. We don't wait for supply chains to rebuild. We carry filtration kits directly to active shelters, ensuring families have pure drinking water from day one."
            quoteAuthor="Dr. Marcus Vance"
            quoteAuthorTitle="Founder & Executive Field Director"
            imageUrl="https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=1200&q=80"
            videoUrl={aboutVideoUrl}
          />
        </ScrollReveal>

        {/* 3. IMPACT STATISTICS */}
        <ScrollReveal>
          <ImpactStats />
        </ScrollReveal>

        {/* 4. PROGRAMS */}
        <ScrollReveal>
          <ProgramsSection
            sectionHeadline="Active Frontline Rescue Programs"
            sectionSubtitle="Deploying custom crisis logistics systems, purifying water pipelines, and treating wounded survivors."
            programs={programsData}
          />
        </ScrollReveal>

        {/* 5. TESTIMONIALS */}
        <ScrollReveal>
          <TestimonialsSection
            sectionHeadline="Verified Frontline Dispatch Endorsements"
            sectionSubtitle="Read verified feedback from logistics directors, emergency doctors, and key foundations in our network."
            testimonials={testimonialsData}
          />
        </ScrollReveal>

        {/* 6. GALLERY */}
        <ScrollReveal>
          <GallerySection
            sectionHeadline="Relief Deployments & Visual Logs"
            sectionSubtitle="A running archive of photographs and video dispatches uploaded by our field units during active missions."
            items={galleryItemsData}
          />
        </ScrollReveal>

        {/* 7. LATEST NEWS & UPDATES */}
        <ScrollReveal>
          <NewsSection
            sectionHeadline="Latest Frontline Dispatches"
            sectionSubtitle="Direct reports, updates, and logistical field logs compiled by our rapid deployment units."
            articles={newsArticlesData}
          />
        </ScrollReveal>

        {/* 7.5 GLOBAL LOGISTICS PREPAREDNESS (FlexibleSection Reusability Demo) */}
        <ScrollReveal>
          <FlexibleSection
            id="logistics-demo"
            layout="text-image-video"
            align="left"
            eyebrow="Global Preparedness"
            heading="Staged, Tested, and Deployed"
            content={
              <p>
                Our response operations rely on pre-staged supplies loaded at our three global logistics warehouses in Miami, Dubai, and Nairobi. By testing filtration systems and checking expiration limits on triage medication before transport, we ensure that cargo arrivals operate immediately upon field deployment.
              </p>
            }
            imageUrl="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
            imageAlt="Emergency staging warehouse cargo loaders"
            videoUrl="https://assets.mixkit.co/videos/preview/mixkit-water-filtering-through-charcoal-41716-large.mp4"
            ctaText="Read Staging Metrics"
            ctaHref="/#about"
            background="elevated"
            padding="lg"
          />
        </ScrollReveal>

        {/* 8. CALL TO ACTION */}
        <ScrollReveal>
          <CtaSection
            headline="Help Us Deploy Survival Resources When Seconds Save Lives"
            description="Clearwater Relief Trust is a registered 501(c)(3) NPO. Your tax-deductible contribution directly funds water filtration logistics and emergency medical cargo."
            primaryCtaText="Donate Now"
            primaryCtaHref="/donate"
            secondaryCtaText="Volunteer With Us"
            secondaryCtaHref="/volunteer"
          />
        </ScrollReveal>

      </main>

      {/* Global Footer */}
      <Footer 
        orgName="Clearwater Relief" 
        orgTagline="Deploying medical-grade water purification and rapid survival resources directly to natural disaster zones and conflict areas worldwide."
        contactAddress="802 Crisis Relief Lane, Suite 100, Washington, DC 20005"
        contactEmail="response@clearwaterrelief.org"
        contactPhone="+1 (202) 555-0144"
        newsletterTagline="Stay updated on emergency deployments, frontline operations, and impact reports."
      />

      {/* Hackathon Interactive Design Token Control Panel (Sticky Bottom Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-surface-elevated/95 backdrop-blur-md border-t border-border shadow-lg py-4 px-6 transition-all duration-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent font-sans">
            <Sparkles className="w-4 h-4" />
            <span>Hackathon Review Console</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            
            {/* Theme Preset Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-2xs text-ink-muted font-sans font-semibold">Preset:</span>
              <select
                value={activePreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="bg-surface border border-border text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent text-ink font-sans cursor-pointer"
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Hero Variant Selector */}
            <div className="flex items-center gap-2">
              <span className="text-2xs text-ink-muted font-sans font-semibold">Hero Media:</span>
              <select
                value={heroVariant}
                onChange={(e) => setHeroVariant(e.target.value as 'image' | 'video' | 'carousel')}
                className="bg-surface border border-border text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent text-ink font-sans cursor-pointer"
              >
                <option value="carousel">Carousel (Fade)</option>
                <option value="video">Video Loop</option>
                <option value="image">Static Image</option>
              </select>
            </div>

            {/* Mode Toggle Buttons */}
            <div className="flex items-center gap-1 border-l border-border/50 pl-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-md border text-xs flex items-center gap-1 transition-all ${
                  theme === 'light' ? 'bg-surface border-accent text-accent' : 'bg-surface/30 border-border text-ink-muted hover:bg-surface'
                }`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="sr-only">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-md border text-xs flex items-center gap-1 transition-all ${
                  theme === 'dark' ? 'bg-surface border-accent text-accent' : 'bg-surface/30 border-border text-ink-muted hover:bg-surface'
                }`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="sr-only">Dark</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

