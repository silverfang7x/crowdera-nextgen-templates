import { MetadataRoute } from 'next';
import { TEMPLATE_RECIPES } from '@/lib/templates/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clearwaterrelief.org'; // Staging NGO domain
  const lastModified = new Date().toISOString().split('T')[0];

  const staticRoutes = [
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

  const templateRoutes = TEMPLATE_RECIPES.map((recipe) => `/t/${recipe.id}`);
  const allRoutes = [...staticRoutes, ...templateRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/t/') ? 0.9 : route.startsWith('/programs/') || route.startsWith('/news/') ? 0.7 : 0.8,
  }));
}
