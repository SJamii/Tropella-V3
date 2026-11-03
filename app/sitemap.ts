import type { MetadataRoute } from 'next';
import { PRODUCT_DETAILS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tropella.net';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...PRODUCT_DETAILS.map(({ slug }) => ({
      url: `${baseUrl}/products/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
