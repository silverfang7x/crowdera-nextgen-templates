import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clearwaterrelief.org'; // Staging NGO domain
  const lastModified = new Date().toISOString().split('T')[0];

  const routes = [
    '',
    '/about',
    '/programs',
    '/programs/water',
    '/programs/medical',
    '/programs/supply',
    '/programs/education',
    '/volunteer',
    '/donate',
    '/contact',
    '/news',
    '/news/madagascar-water-deployment',
    '/news/mobile-medical-clinic',
    '/news/who-shelters-partnership',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/programs/') || route.startsWith('/news/') ? 0.7 : 0.8,
  }));
}
