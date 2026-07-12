import * as React from 'react';
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

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <NewsDetailClient slug={resolvedParams.slug} />;
}
