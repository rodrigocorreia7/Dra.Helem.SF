import type { MetadataRoute } from 'next';
import { blogPosts } from '../src/lib/blog';
import { site } from '../src/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = site.url || 'https://www.drahelemmachado.com.br';

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date('2026-09-07'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date('2026-09-07'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sobre/dra-helem`,
      lastModified: new Date('2026-09-14'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified || post.datePublished),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
