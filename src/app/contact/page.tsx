import * as React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Operations Liaison Command | Contact Us',
  description: 'Get in touch with Clearwater Relief operational officers, staging hubs, and compliance offices.',
  openGraph: {
    title: 'Operations Liaison Command | Contact Us',
    description: 'Get in touch with Clearwater Relief operational officers, staging hubs, and compliance offices.',
    url: 'https://clearwaterrelief.org/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
