import * as React from 'react';
import type { Metadata } from 'next';
import NewsDetailClient from './NewsDetailClient';

// Generate static params for static site generation
export function generateStaticParams() {
  return [
    { slug: 'madagascar-water-deployment' },
    { slug: 'mobile-medical-clinic' },
    { slug: 'who-shelters-partnership' }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DATA_MAP: Record<string, { title: string; desc: string }> = {
  'madagascar-water-deployment': {
    title: 'Madagascar Clean Water Mission | Clearwater Dispatches',
    desc: 'Deploying gravity water filtration lines to rural villages suffering from severe drought epidemics.',
  },
  'mobile-medical-clinic': {
    title: 'Active Triage Mobilization in Ecuador | Clearwater Dispatches',
    desc: 'Setting up local staging shelters and mobile trauma clinics in flood-hit mudslide sectors.',
  },
  'who-shelters-partnership': {
    title: 'Emergency Staging Partnership Formed | Clearwater Dispatches',
    desc: 'Signing global logistics agreements to pre-stage 50,000 baseline survival kits in UN warehouses.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = DATA_MAP[resolvedParams.slug] || {
    title: 'Field Dispatch | Clearwater News',
    desc: 'Frontline logs and disaster relief reports direct from deployment areas.',
  };
  return {
    title: data.title,
    description: data.desc,
    openGraph: {
      title: data.title,
      description: data.desc,
      type: 'article',
      url: `https://clearwaterrelief.org/news/${resolvedParams.slug}`,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <NewsDetailClient slug={resolvedParams.slug} />;
}
