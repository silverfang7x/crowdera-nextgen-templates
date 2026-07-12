import * as React from 'react';
import type { Metadata } from 'next';
import VolunteerClient from './VolunteerClient';

export const metadata: Metadata = {
  title: 'Join the Frontlines | Volunteer Application',
  description: 'Apply to support emergency logistics, water quality test units, or cargo kit staging in our global warehouses.',
  openGraph: {
    title: 'Join the Frontlines | Volunteer Application',
    description: 'Apply to support emergency logistics, water quality test units, or cargo kit staging in our global warehouses.',
    url: 'https://clearwaterrelief.org/volunteer',
    type: 'website',
  },
};

export default function VolunteerPage() {
  return <VolunteerClient />;
}
