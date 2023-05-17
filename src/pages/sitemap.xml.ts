import { GetServerSidePropsContext } from 'next';

const paths = ['/', '/login', '/user', '/restricted', '/technics', '/models', '/setting'];

const Sitemap = () => {};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const userId = req?.cookies._maitreya_user || null;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${paths
        .map((path) => {
          if (path === '/user' && (!userId || userId === 'guest')) {
            return '';
          }
          return `
            <url>
              <loc>${`https://maitreya-academy.vercel.app${path}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default Sitemap;
