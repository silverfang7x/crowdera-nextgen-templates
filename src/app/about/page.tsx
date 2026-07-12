import * as React from 'react';
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Our Mission | Clearwater Relief Trust',
  description: 'Learn about our history since 2012, our emergency triage sanitation kits, and the leaders managing our global staging warehouses.',
  openGraph: {
    title: 'About Our Mission | Clearwater Relief Trust',
    description: 'Learn about our history since 2012, our emergency triage sanitation kits, and the leaders managing our global staging warehouses.',
    url: 'https://clearwaterrelief.org/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
