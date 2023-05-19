import React from 'react';
import Head from 'next/head';

const defaultTitle = 'Академия Майтрея';
const defaultDescription =
  '1431 год от Созидания Империи. Ситуация в Галактике меняется после столкновения асперов Академии с неожиданным соперником';
const baseURL = 'https://maitreya-academy.vercel.app/';
const image =
  'https://images.ctfassets.net/riwkbfr61vnb/6SiQ4zTBbpmQ8w65jTDJbH/9d789bc8c05bd8a1228ab1689143fa4d/tTggZNqt-r4.webp';

export function Meta({ title, description }: { title?: string; description?: string }) {
  return (
    <Head>
      <title>{title ? `${defaultTitle} | ${title}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta property="og:title" content={title ? `${defaultTitle} | ${title}` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={baseURL} />
      <meta property="og:site_name" content={title ? `${defaultTitle} | ${title}` : defaultTitle} />
      <meta name="twitter:title" content={title ? `${defaultTitle} | ${title}` : defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
