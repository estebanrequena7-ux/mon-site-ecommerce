// Sélection de produits réellement vendus par des enseignes reconnues.
//
// AFFILIATION — TODO avant mise en production des liens :
// 1. S'inscrire à Amazon Associates (partenaires.amazon.fr) → remplacer les
//    liens Amazon par des liens taggés ?tag=VOTRE_ID
// 2. S'inscrire sur Awin (Boulanger, Darty, Fnac) et Effiliation/Cdiscount
//    → remplacer les URLs par les deeplinks trackés générés par la plateforme
// Les URLs ci-dessous sont des liens de recherche non trackés : le site
// fonctionne, mais ne génère pas encore de commission.
//
// Les prix sont indicatifs (constatés début juillet 2026) et doivent être
// vérifiés régulièrement.

export const CATEGORIES = [
  {
    id: 'climatiseurs',
    label: 'Climatiseurs mobiles',
    note: 'Les seuls appareils qui refroidissent réellement une pièce. Comptez au minimum 300 € pour un monobloc correct — en dessous, ce n’est pas un climatiseur.',
  },
  {
    id: 'ventilateurs',
    label: 'Ventilateurs',
    note: 'Ne baissent pas la température mais créent un flux d’air qui améliore nettement le confort. Excellent rapport efficacité/prix.',
  },
  {
    id: 'rafraichisseurs',
    label: 'Rafraîchisseurs d’air',
    note: 'Entre les deux : rafraîchissent l’air de 2 à 5 °C par évaporation d’eau, pour une personne ou un petit espace. C’est souvent ce type d’appareil que les sites frauduleux font passer pour un climatiseur.',
  },
]

export const PRODUCTS = [
  {
    category: 'climatiseurs',
    name: "De'Longhi Pinguino PAC EM82",
    power: '2,4 kW (9 400 BTU) — pièces jusqu’à ~25 m²',
    price: '≈ 450 €',
    highlight: 'La référence des monoblocs mobiles, marque italienne établie',
    rating: '4,2/5 (avis vérifiés enseignes)',
    links: [
      { retailer: 'Boulanger', url: 'https://www.boulanger.com/resultats?tr=delonghi%20pinguino%20pac%20em82' },
      { retailer: 'Darty', url: 'https://www.darty.com/nav/recherche?text=delonghi+pinguino+pac+em82' },
      { retailer: 'Amazon', url: 'https://www.amazon.fr/s?k=delonghi+pinguino+pac+em82' },
    ],
  },
  {
    category: 'climatiseurs',
    name: 'Whirlpool PACW212CO',
    power: '2,1 kW — pièces jusqu’à ~21 m²',
    price: '≈ 400 €',
    highlight: 'Bon rapport qualité/prix, marque connue, SAV en France',
    rating: '4,1/5 (avis vérifiés enseignes)',
    links: [
      { retailer: 'Boulanger', url: 'https://www.boulanger.com/resultats?tr=whirlpool%20pacw212co' },
      { retailer: 'Darty', url: 'https://www.darty.com/nav/recherche?text=whirlpool+pacw212co' },
      { retailer: 'Cdiscount', url: 'https://www.cdiscount.com/search/10/whirlpool+pacw212co.html' },
    ],
  },
  {
    category: 'climatiseurs',
    name: "De'Longhi PAC EX100 Silent",
    power: '2,7 kW (10 000 BTU) — pièces jusqu’à ~30 m², mode silencieux',
    price: '≈ 700 €',
    highlight: 'Haut de gamme mobile : plus silencieux, plus puissant',
    rating: '4,4/5 (avis vérifiés enseignes)',
    links: [
      { retailer: 'Boulanger', url: 'https://www.boulanger.com/resultats?tr=delonghi%20pac%20ex100%20silent' },
      { retailer: 'Darty', url: 'https://www.darty.com/nav/recherche?text=delonghi+pac+ex100+silent' },
      { retailer: 'Amazon', url: 'https://www.amazon.fr/s?k=delonghi+pac+ex100+silent' },
    ],
  },
  {
    category: 'ventilateurs',
    name: 'Rowenta Turbo Silence Extreme VU5640',
    power: 'Ventilateur sur pied, 5 vitesses, très silencieux',
    price: '≈ 90 €',
    highlight: 'Le best-seller français du ventilateur, fabriqué par un groupe établi (SEB)',
    rating: '4,5/5 (avis vérifiés enseignes)',
    links: [
      { retailer: 'Boulanger', url: 'https://www.boulanger.com/resultats?tr=rowenta%20turbo%20silence%20extreme%20vu5640' },
      { retailer: 'Darty', url: 'https://www.darty.com/nav/recherche?text=rowenta+turbo+silence+extreme' },
      { retailer: 'Amazon', url: 'https://www.amazon.fr/s?k=rowenta+turbo+silence+extreme+vu5640' },
    ],
  },
  {
    category: 'ventilateurs',
    name: 'Dyson Cool CF1 (AM07)',
    power: 'Ventilateur colonne sans pales',
    price: '≈ 430 €',
    highlight: 'Design premium, flux d’air homogène, garantie constructeur 2 ans',
    rating: '4,3/5 (avis vérifiés enseignes)',
    links: [
      { retailer: 'Boulanger', url: 'https://www.boulanger.com/resultats?tr=dyson%20cool%20am07' },
      { retailer: 'Darty', url: 'https://www.darty.com/nav/recherche?text=dyson+cool+ventilateur' },
      { retailer: 'Fnac', url: 'https://www.fnac.com/SearchResult/ResultList.aspx?Search=dyson+cool+ventilateur' },
    ],
  },
  {
    category: 'rafraichisseurs',
    name: 'Klarstein Skyscraper Ice 4-en-1',
    power: 'Rafraîchisseur évaporatif — effet localisé (2 à 4 °C de ressenti)',
    price: '≈ 180 €',
    highlight: 'Un vrai rafraîchisseur vendu pour ce qu’il est, sans promesse trompeuse',
    rating: '4,0/5 (avis vérifiés enseignes)',
    links: [
      { retailer: 'Amazon', url: 'https://www.amazon.fr/s?k=klarstein+skyscraper+ice' },
      { retailer: 'Cdiscount', url: 'https://www.cdiscount.com/search/10/klarstein+skyscraper+ice.html' },
    ],
  },
]
