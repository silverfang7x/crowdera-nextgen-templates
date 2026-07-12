import * as React from 'react';
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

export default async function ProgramDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProgramDetailClient slug={resolvedParams.slug} />;
}
