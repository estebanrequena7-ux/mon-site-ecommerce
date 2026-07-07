// Pré-rendu statique : génère un fichier HTML complet par route à partir du
// bundle SSR, puis le sitemap.xml. Exécuté par `npm run build`.
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
const { render, ROUTES } = await import('./dist-ssr/entry-server.js')

const SITE_URL = 'https://verifclim.netlify.app' // garder synchronisé avec src/seo.js

for (const route of ROUTES) {
  const { html, head } = render(route.path)
  const page = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)
  const filePath =
    route.path === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, route.path.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, page)
  console.log('prerendered', route.path)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path === '/comparatif' || r.path === '/guide-arnaques' ? '0.9' : '0.3'}</priority>
  </url>`,
).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log('sitemap.xml generated')
