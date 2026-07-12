import * as React from 'react';
import type { Metadata } from 'next';
import NewsClient from './NewsClient';

export const metadata: Metadata = {
  title: 'Frontline logs & Field Updates | Dispatch Board',
  description: 'Direct log entries, operational reports, and triage dispatches sent directly from active deployment zones.',
  openGraph: {
    title: 'Frontline logs & Field Updates | Dispatch Board',
    description: 'Direct log entries, operational reports, and triage dispatches sent directly from active deployment zones.',
    url: 'https://clearwaterrelief.org/news',
    type: 'website',
  },
};

export default function NewsPage() {
  return <NewsClient />;
}
