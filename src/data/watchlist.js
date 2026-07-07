// Liste de vigilance : uniquement des noms publiquement cités par la presse
// ou les autorités (DGCCRF) dans le cadre de la vague d'arnaques aux
// climatiseurs de l'été 2026.
//
// RÈGLE ABSOLUE : ne jamais ajouter un nom ici sans au moins une source
// publique identifiée (article de presse, communiqué officiel). Chaque
// entrée doit lister ses sources. Le site n'affirme jamais qu'une marque
// "est une arnaque" : il rapporte, sources à l'appui, que ce nom a été
// cité dans des signalements publics.

export const SOURCES = {
  franceinfo: {
    label: 'franceinfo — « Avec la canicule, les arnaques aux climatiseurs se multiplient »',
    url: 'https://www.franceinfo.fr/replay-radio/le-vrai-du-faux/avec-la-canicule-les-arnaques-aux-climatiseurs-se-multiplient_8061869.html',
  },
  selectra: {
    label: 'Selectra — « Canicule : les arnaques au climatiseur explosent (200 faux sites, 5 M€) »',
    url: 'https://selectra.info/energie/actualites/marche/arnaques-climatiseur-canicule-2026-faux-sites-comment-eviter',
  },
  signalArnaques: {
    label: 'Signal-Arnaques — « Coolizi, Jiuberry, Breezo : le réseau de faux climatiseurs — Enquête »',
    url: 'https://info.signal-arnaques.com/avis-dexpert/reseau-coolizi-climatiseurs-frauduleux-canicule-2026/',
  },
  consoglobe: {
    label: 'ConsoGlobe — « Faux climatiseurs portables : l’arnaque Coolizi, Breezo et Epicooler »',
    url: 'https://www.consoglobe.com/faux-climatiseurs-portables-arnaque-coolizi-breezo-epicooler-cg',
  },
  hellowatt: {
    label: 'Hello Watt — « Piège sur les réseaux sociaux : ce climatiseur star est un faux »',
    url: 'https://www.hellowatt.fr/blog/epicooler-arnaque-climatisation/',
  },
  journalEco: {
    label: 'Le Journal de l’Économie — « Ces climatiseurs vendus en ligne peuvent cacher une arnaque »',
    url: 'https://www.journaldeleconomie.fr/climatiseurs-en-ligne-arnaque/',
  },
}

export const WATCHLIST = [
  {
    name: 'Coolizi',
    tokens: ['coolizi'],
    summary:
      'Nom cité par la presse parmi les sites de vente de climatiseurs signalés lors de la vague de fraudes de l’été 2026. Une enquête de Signal-Arnaques décrit un réseau de sites aux pages de vente quasi identiques.',
    sources: [SOURCES.signalArnaques, SOURCES.consoglobe, SOURCES.selectra],
  },
  {
    name: 'Breezo',
    tokens: ['breezo'],
    summary:
      'Nom cité par plusieurs médias parmi les marques de « climatiseurs portables » signalées : le produit livré serait un simple ventilateur, sans réelle fonction de climatisation.',
    sources: [SOURCES.consoglobe, SOURCES.signalArnaques, SOURCES.selectra],
  },
  {
    name: 'EpiCooler',
    tokens: ['epicooler', 'epi-cooler'],
    summary:
      'Nom cité par la presse spécialisée parmi les fausses marques de climatiseurs promues par publicité sur les réseaux sociaux pendant la canicule 2026.',
    sources: [SOURCES.hellowatt, SOURCES.consoglobe],
  },
  {
    name: 'Cooling Ace',
    tokens: ['coolingace', 'cooling-ace', 'cooling ace'],
    summary:
      'Nom cité dans la presse parmi les sites signalés vendant de prétendus climatiseurs portables lors de l’été 2026.',
    sources: [SOURCES.selectra],
  },
  {
    name: 'Coolzy',
    tokens: ['coolzy'],
    summary:
      'Nom cité par la presse parmi les noms de sites signalés pendant la vague de fraudes de l’été 2026. Attention aux homonymies : vérifiez l’URL exacte et les mentions légales du site que vous consultez.',
    sources: [SOURCES.journalEco, SOURCES.selectra],
  },
  {
    name: 'Jiuberry',
    tokens: ['jiuberry'],
    summary:
      'Nom cité dans l’enquête de Signal-Arnaques sur le réseau de sites de faux climatiseurs actif pendant la canicule 2026.',
    sources: [SOURCES.signalArnaques],
  },
]

// Enseignes reconnues, disposant de magasins physiques en France ou d'une
// implantation établie de longue date.
export const TRUSTED = [
  { name: 'Boulanger', domains: ['boulanger.com'] },
  { name: 'Darty', domains: ['darty.com'] },
  { name: 'Fnac', domains: ['fnac.com'] },
  { name: 'Amazon', domains: ['amazon.fr', 'amazon.com'] },
  { name: 'Cdiscount', domains: ['cdiscount.com'] },
  { name: 'Leroy Merlin', domains: ['leroymerlin.fr'] },
  { name: 'Castorama', domains: ['castorama.fr'] },
  { name: 'ManoMano', domains: ['manomano.fr'] },
  { name: 'But', domains: ['but.fr'] },
  { name: 'Conforama', domains: ['conforama.fr'] },
  { name: 'E.Leclerc', domains: ['e.leclerc'] },
  { name: 'Carrefour', domains: ['carrefour.fr'] },
]
