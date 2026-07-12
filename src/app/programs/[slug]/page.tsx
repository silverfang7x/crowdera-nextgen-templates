import * as React from 'react';
import type { Metadata } from 'next';
import ProgramDetailClient from './ProgramDetailClient';

// Generate static params for Next.js static exports
export function generateStaticParams() {
  return [
    { slug: 'water' },
    { slug: 'medical' },
    { slug: 'supply' },
    { slug: 'education' }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DATA_MAP: Record<string, { title: string; desc: string }> = {
  water: {
    title: 'Clean Water Deployment | Clearwater Programs',
    desc: 'Deploying compact, gravity-powered water filtration units directly to frontline crisis zones.',
  },
  medical: {
    title: 'Mobile Trauma Triage Clinics | Clearwater Programs',
    desc: 'Establishing emergency medical triage and clinical stabilization hubs in disaster areas.',
  },
  supply: {
    title: 'Cargo & Survival Kit Staging | Clearwater Programs',
    desc: 'Staging, testing, and distributing critical cargo kits containing baseline resources.',
  },
  education: {
    title: 'Local Infrastructure Training | Clearwater Programs',
    desc: 'Empowering local community leaders to maintain water filtration systems independently.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = DATA_MAP[resolvedParams.slug] || {
    title: 'Program Detail | Clearwater Relief Trust',
    desc: 'Clearwater emergency rescue deployments and humanitarian program details.',
  };
  return {
    title: data.title,
    description: data.desc,
    openGraph: {
      title: data.title,
      description: data.desc,
      type: 'article',
      url: `https://clearwaterrelief.org/programs/${resolvedParams.slug}`,
    },
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProgramDetailClient slug={resolvedParams.slug} />;
}
