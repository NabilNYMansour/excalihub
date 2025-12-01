// import { fetchAllPublicDrawings } from '@/lib/data';
import { MetadataRoute } from 'next'
// import { unstable_noStore as noStore } from 'next/cache';
import { MAIN_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // noStore();
  // const publicDrawingsSlugs = await fetchAllPublicDrawings();

  // const drawingsUrls: MetadataRoute.Sitemap = publicDrawingsSlugs.map((object) => ({
  //   url: `${MAIN_URL}/excalidraw/${object.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return [
    {
      url: `${MAIN_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${MAIN_URL}/home`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${MAIN_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${MAIN_URL}/excalidraw`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${MAIN_URL}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${MAIN_URL}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // ...drawingsUrls,
  ];
}