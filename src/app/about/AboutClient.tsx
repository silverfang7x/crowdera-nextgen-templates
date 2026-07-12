'use client';

import * as React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Avatar } from '@/components/ui/Avatar';
import { ShieldCheck, Heart, Users, Globe } from 'lucide-react';

const TEAM = [
  {
    name: "Dr. Marcus Vance",
    role: "Founder & Executive Field Director",
    bio: "Former WHO Disaster Surgeon with over 20 years of emergency logistics and triage medical experience in post-crisis regions.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    initial: "MV"
  },
  {
    name: "Sarah Thorne",
    role: "Director of Emergency Operations",
    bio: "Specializes in rapid field dispatch, resource staging, and water infrastructure setup under active disaster conditions.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    initial: "ST"
  },
  {
    name: "David Vance",
    role: "Lead Water Sanitation Engineer",
    bio: "Designs compact, gravity-powered filtration kits that operate without electricity or supply-chain chemical dependencies.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    initial: "DV"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Liaison & Field Medical Coordinator",
    bio: "Coordinates on-the-ground primary health care services and volunteer nursing corps deployment in collaborative zones.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
    initial: "ER"
  }
];

const TIMELINE = [
  {
    year: "2012",
    title: "Founding in Crisis",
    description: "Clearwater Relief Trust was established following Hurricane Sandy to address the immediate breakdown of regional water utilities and medical cargo logistics."
  },
  {
    year: "2016",
    title: "Gravity System Shift",
    description: "Pioneered the deployment of self-contained, gravity-powered water filtration units that bypass the need for external electricity or supply lines."
  },
  {
    year: "2021",
    title: "Global Staging Warehouses",
    description: "Staged medical and water assets across three global hubs (Miami, Dubai, Nairobi) to reduce active field response dispatch time to under 24 hours."
  },
  {
    year: "2026",
    title: "Clearwater Network Expansion",
    description: "Currently supporting emergency operations across 12 countries, providing clean water and medical logistics to over 140,000 survivors annually."
  }
];

const VALUES = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-accent" />,
    title: "Absolute Transparency",
    description: "96% of all funding goes directly to field deployments and emergency medical equipment staging."
  },
  {
    icon: <Heart className="w-6 h-6 text-accent" />,
    title: "Immediate Dignity",
    description: "We don't wait for supply chains. We deploy within hours to ensure survivors have pure drinking water from day one."
  },
  {
    icon: <Users className="w-6 h-6 text-accent" />,
    title: "Community Reliance",
    description: "We train local community leaders to maintain and run systems long-term, building lasting recovery."
  },
  {
    icon: <Globe className="w-6 h-6 text-accent" />,
    title: "Evidenced-Based Relief",
    description: "Every liter of water purified and clinic visit logged is tracked and evaluated against WHO health guidelines."
  }
];

export default function AboutClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header orgName="Clearwater Relief" />

      <main className="flex-grow pt-24 pb-16">
        {/* About Hero Section */}
        <Section padding="lg" background="elevated" className="border-b border-border/50">
          <Container className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
              Our Mission & History
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-ink leading-tight">
              Rapid Response When Seconds Save Lives
            </h1>
            <p className="text-lg text-ink-muted font-sans leading-relaxed max-w-2xl">
              Clearwater Relief Trust is a registered 501(c)(3) NPO. We deploy mobile purification systems, critical medical support, and emergency survival gear to crisis zones within the first 72 hours.
            </p>
          </Container>
        </Section>

        {/* Core Mission detail */}
        <Section padding="md">
          <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink">
                Providing Hope, Restoring Dignity, and Purifying Water Since 2012
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                Waterborne epidemics can claim more lives during natural disasters, floods, or conflicts than the initial events themselves. Our emergency water filtration networks are designed by field doctors and sanitation engineers to deploy instantly, bypassing grid collapses.
              </p>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                By setting up modular, gravity-powered water lines, we enable refugee centers and emergency triage clinics to output clean, WHO-standard drinking water without relying on fuel lines or complex chemical inputs.
              </p>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-accent rounded-lg translate-x-3 translate-y-3 -z-10 opacity-10" />
              <div className="overflow-hidden rounded-lg border border-border bg-surface-elevated aspect-video shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1535090486790-5b8f175d05f7?auto=format&fit=crop&w=800&q=80"
                  alt="Clearwater water line installation"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Timeline Component Section */}
        <Section padding="lg" background="elevated" className="border-y border-border/50">
          <Container className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
                Milestones of Recovery
              </span>
              <h2 className="text-3xl font-serif font-bold text-ink">
                Our Operational Timeline
              </h2>
              <p className="text-sm text-ink-muted font-sans">
                A historical look at how Clearwater expanded its emergency logistics capacity and staging network.
              </p>
            </div>

            {/* Vertical Timeline implementation */}
            <ScrollReveal className="relative max-w-2xl mx-auto pl-8 md:pl-0 before:absolute before:left-4 before:md:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-border select-none">
              <div className="space-y-12">
                {TIMELINE.map((evt, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div 
                      key={evt.year} 
                      className={`relative flex flex-col md:flex-row items-start ${
                        isLeft ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[-20px] md:left-1/2 md:translate-x-[-7px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-surface-elevated z-10" />

                      {/* Content panel */}
                      <div className={`w-full md:w-[45%] ${
                        isLeft ? 'md:text-right' : 'md:text-left'
                      }`}>
                        <span className="inline-block text-sm font-bold text-accent font-sans bg-accent/10 border border-accent/15 px-2 py-0.5 rounded-full mb-1">
                          {evt.year}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-ink">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-ink-muted leading-relaxed font-sans mt-1.5">
                          {evt.description}
                        </p>
                      </div>

                      {/* Empty spacer block for desktop symmetry */}
                      <div className="hidden md:block w-[45%]" />
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Team Grid Section */}
        <Section padding="lg">
          <Container className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
                Field Leadership
              </span>
              <h2 className="text-3xl font-serif font-bold text-ink">
                Our Executive & Medical Team
              </h2>
              <p className="text-sm text-ink-muted font-sans">
                A highly trained team of emergency logistics, nursing, and field sanitation experts leading our dispatches.
              </p>
            </div>

            <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center p-6 bg-surface-elevated/40 border border-border rounded-xl shadow-sm">
                  <Avatar 
                    size="lg" 
                    src={member.imageUrl} 
                    alt={member.name} 
                    fallback={member.initial}
                    className="mb-4 shadow-sm border border-border/80" 
                  />
                  <h3 className="font-sans font-bold text-base text-ink leading-tight">
                    {member.name}
                  </h3>
                  <span className="text-2xs text-accent font-semibold uppercase tracking-wider font-sans mt-1 block">
                    {member.role}
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans mt-3">
                    {member.bio}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </Container>
        </Section>

        {/* Values Section */}
        <Section padding="lg" background="elevated" className="border-t border-border/50">
          <Container className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-sans">
                Operational Pillars
              </span>
              <h2 className="text-3xl font-serif font-bold text-ink">
                Our Core Values
              </h2>
            </div>

            <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((val) => (
                <div key={val.title} className="p-6 bg-surface border border-border rounded-lg shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    {val.icon}
                  </div>
                  <h3 className="font-sans font-bold text-base text-ink">
                    {val.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans">
                    {val.description}
                  </p>
                </div>
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
