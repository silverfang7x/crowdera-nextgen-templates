'use client';

import React, { useEffect, useState } from 'react';
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
import { TemplateRecipe } from '@/lib/templates/types';

export interface TemplateCompositionProps {
  recipe: TemplateRecipe;
}

export function TemplateComposition({ recipe }: TemplateCompositionProps) {
  const [headlineText, setHeadlineText] = useState('');
  const [missionText, setMissionText] = useState('');
  const [aboutHeadingText, setAboutHeadingText] = useState('');

  // Synchronize controlled copy assist state values whenever the recipe updates
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeadlineText(recipe.orgName + ' — ' + recipe.tagline);
      setMissionText(recipe.missionStatement);
      setAboutHeadingText('Providing Hope, Restoring Dignity, and Purifying Water Since 2012');
    });
    return () => cancelAnimationFrame(frame);
  }, [recipe]);

  // Standard Clearwater Relief / NPO visual asset placeholders
  const heroImages = [
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80',
  ];

  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-water-dripping-from-a-tap-in-slow-motion-41619-large.mp4';
  const aboutVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-water-filtering-through-charcoal-41716-large.mp4';
  const fallbackImage = 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80';

  const aboutParagraphs = [
    `${recipe.orgName} was founded on a simple conviction: immediate, structured assistance is the absolute baseline of human dignity during crisis. When infrastructure collapses, local coordination and rapid-response assets ensure recovery begins from day one.`,
    'Our frontline field units consist of technical specialists, emergency triage doctors, and response coordinators who mobilize within hours of a crisis. By deploying compact resource cargo and logistics directly, we set up local operations serving thousands daily.',
  ];

  const programsData = [
    {
      id: 'water',
      title: 'Clean Water Deployment',
      description: 'Deploying high-yield gravity water purification systems to disaster camps and schools within 24 hours of infrastructure collapse.',
      imageUrl: 'https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=800&q=80',
      ctaText: 'See Deployment Map',
      ctaHref: '/donate',
    },
    {
      id: 'medical',
      title: 'Mobile Medical Triage',
      description: 'Providing immediate primary care, wound treatment, and emergency pharmacy services in the critical first 72 hours.',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      ctaText: 'Deploy Medical Aid',
      ctaHref: '/donate',
    },
    {
      id: 'supply',
      title: 'Survival Resource Packs',
      description: 'Distributing hygiene kits, thermal blankets, emergency lighting, and non-perishable food rations to stranded flood families.',
      imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
      ctaText: 'Sponsor a Survival Pack',
      ctaHref: '/donate',
    },
    {
      id: 'education',
      title: 'Community Water Safety',
      description: 'Training local community coordinators to manage and maintain gravity-powered filtration systems to yield water long-term.',
      imageUrl: 'https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=800&q=80',
      ctaText: 'Learn Safety Model',
      ctaHref: '/#about',
    },
  ];

  const testimonialsData = [
    {
      id: 't1',
      quote: `When coordinates collapsed, ${recipe.orgName}'s filtration and support networks arrived on the ground immediately, saving our local communities from catastrophic outcomes.`,
      author: 'Sarah Thorne',
      designation: 'Emergency Shelter Lead',
      organization: 'Red Cross Florida',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
    },
    {
      id: 't2',
      quote: 'Clean operations and structured cargo deployment are the bedrock of local recovery. We coordinate field logistics directly, treating survivors from day one.',
      author: 'Dr. Marcus Vance',
      designation: 'Chief Field Surgeon',
      organization: 'Frontline Medical',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
    },
    {
      id: 't3',
      quote: `Accountability is second to none. Knowing that 96% of all donations directly support frontline deployments makes ${recipe.orgName} our top recommended NPO.`,
      author: 'James Reynolds',
      designation: 'Philanthropic Investor',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 't4',
      quote: 'Our community coordinators took over operations in under three days. The system is extremely simple to maintain, which creates true resilience after active responders leave.',
      author: 'David Vance',
      designation: 'Community Coordinator',
      organization: 'Resilience Mutual Aid',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
      rating: 4,
    },
  ];

  const galleryItemsData = [
    {
      id: 'g1',
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=600&q=80',
      title: 'Assembling water filters',
      description: 'Field engineers assemble gravity-powered filtration membranes inside an emergency camp.',
      aspectRatioClass: 'aspect-[4/5]',
    },
    {
      id: 'g2',
      type: 'video' as const,
      url: 'https://assets.mixkit.co/videos/preview/mixkit-water-dripping-from-a-tap-in-slow-motion-41619-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80',
      title: 'Flowing clean water tap',
      description: 'First output flow of drinking water from the newly deployed filtration hub.',
      aspectRatioClass: 'aspect-video',
    },
    {
      id: 'g3',
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      title: 'Food and clean water handouts',
      description: 'Displaced kids and families receiving clean water jars and food rations.',
      aspectRatioClass: 'aspect-square',
    },
    {
      id: 'g4',
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=600&q=80',
      title: 'Deploying logistics truck',
      description: 'Loading gravity-powered water lines onto Clearwater Relief\'s rapid response truck.',
      aspectRatioClass: 'aspect-[3/4]',
    },
    {
      id: 'g5',
      type: 'video' as const,
      url: 'https://assets.mixkit.co/videos/preview/mixkit-water-filtering-through-charcoal-41716-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=600&q=80',
      title: 'Charcoal filtration test',
      description: 'Quality assurance test showing filtration media separating impurities from stagnant water.',
      aspectRatioClass: 'aspect-[16/10]',
    },
    {
      id: 'g6',
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80',
      title: 'Disaster deployment briefing',
      description: 'Our response medical team preparing cargo loadout plans.',
      aspectRatioClass: 'aspect-video',
    },
  ];

  const newsArticlesData = [
    {
      id: 'n1',
      title: 'Clean Water Deployed to Frontline Districts',
      summary: 'Emergency response teams set up three emergency water purification lines within 18 hours of storm landfall, supplying 30,000 liters of safe drinking water daily.',
      date: '2026-07-08T00:00:00.000Z',
      imageUrl: 'https://images.unsplash.com/photo-1541913772248-f077579f18a3?auto=format&fit=crop&w=600&q=80',
      href: '/news/madagascar-water-deployment',
    },
    {
      id: 'n2',
      title: 'Mobile Medical Clinic Treats Over 450 Survivors in Crisis Zone',
      summary: 'Our medical triage unit deployed on the ground provides critical medicine, clean water, and primary care in the aftermath of local infrastructure collapse.',
      date: '2026-06-24T00:00:00.000Z',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      href: '/news/mobile-medical-clinic',
    },
    {
      id: 'n3',
      title: 'Lightweight Gravity-Powered Filtration Units Secured in Shelters',
      summary: 'Collaborative agreement deploys lightweight, gravity-powered filtration units directly to schools serving as temporary refuges.',
      date: '2026-05-15T00:00:00.000Z',
      imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80',
      href: '/news/who-shelters-partnership',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 0. Urgent Announcement Banner */}
      {recipe.urgencyBanner && (
        <div className="bg-accent text-accent-contrast py-2.5 px-4 text-center text-[10px] sm:text-xs font-bold font-sans tracking-widest uppercase flex items-center justify-center gap-2 select-none z-50 relative border-b border-white/10 animate-pulse shadow-sm">
          <span>⚠️ Urgently Deploying: Frontline Crisis Operations Active. Dispatch and Staging in Progress.</span>
        </div>
      )}

      {/* Global Header */}
      <Header orgName={recipe.orgName} />

      {/* Dynamic Content Sections */}
      <main className="flex-grow">
        {recipe.sectionOrder.map((sectionKey, index) => {
          switch (sectionKey) {
            case 'hero':
              return (
                <HeroBanner
                  key={index}
                  variant={recipe.variantConfig.hero.variant}
                  images={heroImages}
                  videoUrl={videoUrl}
                  fallbackImage={fallbackImage}
                  headline={headlineText || recipe.orgName + ' — ' + recipe.tagline}
                  missionStatement={missionText || recipe.missionStatement}
                  primaryCtaText="Donate Now"
                  primaryCtaHref="/donate"
                  secondaryCtaText="Read Our Story"
                  secondaryCtaHref="/#about"
                  forceStaticImageOnMobile={true}
                />
              );

            case 'about':
              return (
                <ScrollReveal key={index}>
                  <AboutSection
                    headline={aboutHeadingText || 'Providing Hope, Restoring Dignity, and Purifying Water Since 2012'}
                    paragraphs={aboutParagraphs}
                    quoteText="During a major crisis, institutional logistics collapse. We don't wait for supply chains to rebuild. We carry filtration kits directly to active shelters, ensuring families have pure drinking water from day one."
                    quoteAuthor="Dr. Marcus Vance"
                    quoteAuthorTitle="Founder & Executive Field Director"
                    imageUrl="https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=1200&q=80"
                    videoUrl={aboutVideoUrl}
                    layout={recipe.variantConfig.about.layout}
                    id="about"
                  />
                </ScrollReveal>
              );

            case 'impactStats':
              return (
                <ScrollReveal key={index}>
                  <ImpactStats />
                </ScrollReveal>
              );

            case 'programs':
              return (
                <ScrollReveal key={index}>
                  <ProgramsSection
                    sectionHeadline="Active Rescue Programs"
                    sectionSubtitle="Deploying custom crisis logistics systems, purifying water pipelines, and treating wounded survivors."
                    programs={programsData}
                  />
                </ScrollReveal>
              );

            case 'testimonials':
              return (
                <ScrollReveal key={index}>
                  <TestimonialsSection
                    sectionHeadline="Verified Dispatch Endorsements"
                    sectionSubtitle="Read verified feedback from logistics directors, emergency doctors, and key foundations in our network."
                    testimonials={testimonialsData}
                  />
                </ScrollReveal>
              );

            case 'gallery':
              return (
                <ScrollReveal key={index}>
                  <GallerySection
                    sectionHeadline="Deployments & Visual Logs"
                    sectionSubtitle="A running archive of photographs and video dispatches uploaded by our field units during active missions."
                    items={galleryItemsData}
                    view={recipe.variantConfig.gallery.view}
                  />
                </ScrollReveal>
              );

            case 'news':
              return (
                <ScrollReveal key={index}>
                  <NewsSection
                    sectionHeadline="Latest Dispatch Logs"
                    sectionSubtitle="Direct reports, updates, and logistical field logs compiled by our rapid deployment units."
                    articles={newsArticlesData}
                  />
                </ScrollReveal>
              );

            case 'cta':
              return (
                <React.Fragment key={index}>
                  {/* Reuse FlexibleSection reusability demonstration */}
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

                  <ScrollReveal>
                    <CtaSection
                      headline={`Help ${recipe.orgName} Deliver Hope`}
                      description={recipe.missionStatement}
                      primaryCtaText="Donate Now"
                      primaryCtaHref="/donate"
                      secondaryCtaText="Volunteer With Us"
                      secondaryCtaHref="/volunteer"
                    />
                  </ScrollReveal>
                </React.Fragment>
              );

            default:
              return null;
          }
        })}
      </main>

      {/* Global Footer */}
      <Footer
        orgName={recipe.orgName}
        orgTagline={recipe.tagline}
        contactAddress="802 Crisis Relief Lane, Suite 100, Washington, DC 20005"
        contactEmail="response@clearwaterrelief.org"
        contactPhone="+1 (202) 555-0144"
        newsletterTagline={`Stay updated on emergency deployments, frontline operations, and impact reports for ${recipe.orgName}.`}
      />
    </div>
  );
}
