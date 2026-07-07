import { FAQ } from './data/faq.js'

export const SITE_URL = 'https://verifclim.netlify.app' // TODO : remplacer par le domaine définitif (ex: verifclim.fr)
export const SITE_NAME = 'VérifClim'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Outil indépendant pour vérifier la fiabilité d’un site de vente de climatiseurs avant d’acheter.',
  inLanguage: 'fr-FR',
}

export const ROUTES = [
  {
    path: '/',
    title: 'VérifClim — Vérifier un site de climatiseurs avant d’acheter (arnaques 2026)',
    description:
      'Plus de 200 faux sites de climatiseurs signalés par la DGCCRF pendant la canicule 2026. Vérifiez gratuitement un site ou une marque avant d’acheter, et trouvez des revendeurs fiables.',
    jsonLd: [websiteJsonLd],
  },
  {
    path: '/comparatif',
    title: 'Climatiseurs fiables 2026 : comparatif de modèles vendus par de vraies enseignes',
    description:
      'Comparatif de climatiseurs mobiles, ventilateurs et rafraîchisseurs réellement efficaces, vendus par Boulanger, Darty, Amazon ou Fnac. Prix, puissance et liens directs.',
    jsonLd: [],
  },
  {
    path: '/guide-arnaques',
    title: 'Arnaque climatiseur : comment reconnaître un faux site en 2026 (guide complet)',
    description:
      'Coolizi, Breezo, EpiCooler… Le mode opératoire des faux sites de climatiseurs signalés pendant la canicule 2026, les signaux qui doivent alerter, et que faire si vous êtes victime.',
    jsonLd: [faqJsonLd],
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales — VérifClim',
    description: 'Mentions légales, disclaimer et informations éditeur du site VérifClim.',
    jsonLd: [],
    noindex: false,
  },
  {
    path: '/confidentialite',
    title: 'Politique de confidentialité — VérifClim',
    description: 'Politique de confidentialité du site VérifClim.',
    jsonLd: [],
  },
]

export function getRouteMeta(path) {
  const clean = path.replace(/\/$/, '') || '/'
  return ROUTES.find((r) => r.path === clean) ?? ROUTES[0]
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

export function buildHead(path) {
  const meta = getRouteMeta(path)
  const url = SITE_URL + (meta.path === '/' ? '/' : meta.path)
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="robots" content="index, follow" />`,
    ...meta.jsonLd.map(
      (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`,
    ),
  ]
  return lines.join('\n    ')
}
