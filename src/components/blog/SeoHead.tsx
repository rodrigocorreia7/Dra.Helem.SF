import { useEffect } from 'react';

type Props = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: object | object[];
  keywords?: string[];
};

function upsertMeta(nameOrProp: string, value: string, isProp = false) {
  const sel = isProp ? `meta[property="${nameOrProp}"]` : `meta[name="${nameOrProp}"]`;
  let el = document.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    if (isProp) el.setAttribute('property', nameOrProp);
    else el.setAttribute('name', nameOrProp);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export default function SeoHead({ title, description, canonical, ogImage, ogType = 'article', noindex, jsonLd, keywords }: Props) {
  useEffect(() => {
    document.title = title;
    upsertMeta('description', description);
    if (keywords?.length) upsertMeta('keywords', keywords.join(', '));

    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    upsertMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('og:title', title, true);
    upsertMeta('og:description', description, true);
    upsertMeta('og:url', canonical, true);
    upsertMeta('og:type', ogType, true);
    if (ogImage) {
      upsertMeta('og:image', ogImage, true);
      upsertMeta('twitter:card', 'summary_large_image');
      upsertMeta('twitter:title', title);
      upsertMeta('twitter:description', description);
      upsertMeta('twitter:image', ogImage);
    }

    // JSON-LD injection (managed)
    const id = 'seo-jsonld';
    const prev = document.getElementById(id);
    if (prev) prev.remove();
    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      const s = document.createElement('script');
      s.id = id;
      s.type = 'application/ld+json';
      const jsonString = JSON.stringify(arr.length === 1 ? arr[0] : { '@context': 'https://schema.org', '@graph': arr });
      s.textContent = jsonString.replace(/</g, '\\u003c');
      document.head.appendChild(s);
    }

    return () => {
      // keep title/description as-is; jsonLd removed on next mount
    };
  }, [title, description, canonical, ogImage, ogType, noindex, jsonLd, keywords]);

  return null;
}
