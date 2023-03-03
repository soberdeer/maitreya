import { NextApiResponse } from 'next';

const Robots = () => {};

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const robots = `# *
User-agent: *
Allow: /

# Host
Host: https://maitreya-academy.vercel.app

# Sitemaps
Sitemap: https://maitreya-academy.vercel.app/sitemap.xml
  `;
  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default Robots;
