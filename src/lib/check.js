import { WATCHLIST, TRUSTED } from '../data/watchlist.js'

// Signaux de vigilance génériques que l'utilisateur doit vérifier lui-même.
export const SIGNALS = [
  {
    title: 'Ancienneté du nom de domaine',
    detail:
      'Un site créé il y a quelques semaines qui prétend avoir des milliers de clients satisfaits est un signal fort. Vérifiez la date de création du domaine via un service Whois.',
    linkLabel: 'Vérifier sur Whois (who.is)',
    link: 'https://who.is/',
  },
  {
    title: 'Mentions légales et SIRET',
    detail:
      'Tout site vendant en France doit afficher des mentions légales : raison sociale, adresse, numéro SIRET ou d’immatriculation. Vérifiez que la société existe réellement sur l’annuaire officiel des entreprises.',
    linkLabel: 'Vérifier une entreprise (annuaire-entreprises.data.gouv.fr)',
    link: 'https://annuaire-entreprises.data.gouv.fr/',
  },
  {
    title: 'Avis clients vérifiables',
    detail:
      'Des avis uniquement affichés sur le site lui-même, tous à 5 étoiles, sans plateforme tierce (Trustpilot, Avis Vérifiés), ne prouvent rien. Cherchez le nom du site suivi de « avis » ou « arnaque » sur un moteur de recherche.',
    linkLabel: 'Consulter les signalements (signal-arnaques.com)',
    link: 'https://www.signal-arnaques.com/',
  },
  {
    title: 'Moyens de paiement proposés',
    detail:
      'Méfiez-vous des sites qui n’acceptent que la carte bancaire sans 3-D Secure, ou qui poussent des moyens de paiement non remboursables. La possibilité de payer via PayPal avec protection acheteur est un plus.',
  },
  {
    title: 'Prix et promesses irréalistes',
    detail:
      'Un « climatiseur » à 89 € ou 140 € qui promet de rafraîchir tout un appartement n’existe pas : à ce prix, il s’agit au mieux d’un ventilateur ou d’un rafraîchisseur d’appoint. Les remises de −50 % ou −70 % avec compte à rebours sont un procédé de pression classique.',
  },
  {
    title: 'Délais de livraison et adresse de retour',
    detail:
      'Vérifiez dans les CGV le lieu d’expédition et l’adresse de retour. Des délais vagues (« 2 à 6 semaines ») ou une expédition depuis l’étranger non annoncée sur la page produit sont des signaux de vigilance.',
  },
]

function normalize(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
}

function compact(s) {
  return s.replace(/[^a-z0-9]/g, '')
}

/**
 * Évalue une entrée utilisateur (URL ou nom de marque).
 * Retourne { status: 'flagged' | 'trusted' | 'unknown', ... }
 * Ne porte JAMAIS d'accusation : 'flagged' signifie uniquement que le nom
 * correspond à une entrée publiquement sourcée de la liste de vigilance.
 */
export function checkSite(rawInput) {
  const domain = normalize(rawInput)
  if (!domain) return null
  const flat = compact(domain)

  const trusted = TRUSTED.find((t) =>
    t.domains.some((d) => domain === d || domain.endsWith('.' + d)),
  )
  if (trusted) {
    return { status: 'trusted', input: domain, retailer: trusted }
  }

  const flagged = WATCHLIST.find((w) =>
    w.tokens.some((token) => flat.includes(compact(token))),
  )
  if (flagged) {
    return { status: 'flagged', input: domain, entry: flagged }
  }

  return { status: 'unknown', input: domain }
}
