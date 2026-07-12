import * as React from 'react';
import type { Metadata } from 'next';
import ProgramsClient from './ProgramsClient';

export const metadata: Metadata = {
  title: 'Active Rescue Programs | Clearwater Relief Trust',
  description: 'Explore our emergency clean water deployments, mobile trauma triage clinics, and family survival kit distribution.',
  openGraph: {
    title: 'Active Rescue Programs | Clearwater Relief Trust',
    description: 'Explore our emergency clean water deployments, mobile trauma triage clinics, and family survival kit distribution.',
    url: 'https://clearwaterrelief.org/programs',
    type: 'website',
  },
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
