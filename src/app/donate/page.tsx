import * as React from 'react';
import type { Metadata } from 'next';
import DonateClient from './DonateClient';

export const metadata: Metadata = {
  title: 'Direct Emergency Staging | Donate Now',
  description: 'Support Clearwater rapid deployments. Every dollar translates to safe drinking water and life-saving triage supplies for crisis survivors.',
  openGraph: {
    title: 'Direct Emergency Staging | Donate Now',
    description: 'Support Clearwater rapid deployments. Every dollar translates to safe drinking water and life-saving triage supplies for crisis survivors.',
    url: 'https://clearwaterrelief.org/donate',
    type: 'website',
  },
};

export default function DonatePage() {
  return <DonateClient />;
}
