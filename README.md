# Agence Web — Sites vitrine en abonnement mensuel

Guide complet pour créer, personnaliser et déployer des sites pour tes clients locaux (salons de coiffure, restaurants, boutiques) en moins de 30 minutes par client.

---

## Sommaire

1. [Installation (à faire une seule fois)](#1-installation)
2. [Créer un site pour un nouveau client](#2-créer-un-site)
3. [Déployer sur Netlify](#3-déployer-sur-netlify)
4. [Checklist livraison client](#4-checklist-livraison)
5. [Gérer ta prospection](#5-prospection)
6. [Structure du projet](#6-structure)

---

## 1. Installation

### Prérequis
- [Node.js](https://nodejs.org) v18 ou supérieur — vérifie avec `node -v`
- [Git](https://git-scm.com) — vérifie avec `git -v`

### Cloner le repo et installer les dépendances

```bash
git clone https://github.com/TON-REPO/mon-site-ecommerce.git
cd mon-site-ecommerce
npm install
```

### Installer et connecter Netlify CLI

```bash
# Installer Netlify CLI globalement
npm install -g netlify-cli

# Vérifier l'installation
netlify --version

# Se connecter à ton compte Netlify (ouvre le navigateur)
netlify login
```

> Netlify te demande de t'authentifier dans le navigateur. Une fois connecté, tu n'as plus à le refaire.

---

## 2. Créer un site

Lance le générateur interactif :

```bash
node scripts/generate.js
```

Le script te pose ces questions une par une :
- Nom du commerce
- Secteur (coiffure / restaurant / boutique)
- Ville
- Adresse complète
- Téléphone
- Horaires d'ouverture
- Couleur principale (ex : `#c8a96e`)
- Couleur secondaire (ex : `#1a1a2e`)
- Lien Instagram (facultatif)
- Lien TikTok (facultatif)

Il génère automatiquement le dossier `/clients/nom-du-commerce/` avec :
- `index.html` — le site complet personnalisé
- `css/style.css` — styles avec tes couleurs
- `js/main.js` — interactions
- `config.json` — services/prix modifiables sans toucher au HTML
- `sitemap.xml` et `robots.txt`

### Modifier les services et prix

Ouvre `clients/nom-du-commerce/config.json` et modifie les valeurs. Les prix et services s'affichent automatiquement sur le site via JavaScript.

```json
{
  "services": [
    { "nom": "Coupe femme", "prix": "35€", "description": "Coupe + brushing" },
    { "nom": "Coloration", "prix": "65€", "description": "Couleur complète" }
  ]
}
```

---

## 3. Déployer sur Netlify

### Premier déploiement d'un client

```bash
bash scripts/deploy.sh nom-du-commerce
```

Le script :
1. Se positionne dans le dossier du client
2. Initialise le site Netlify (te donne l'URL)
3. Déploie en production

**Résultat :** une URL Netlify du type `https://coiffure-martin.netlify.app`

### Ajouter un domaine personnalisé

1. Connecte-toi sur [app.netlify.com](https://app.netlify.com)
2. Sélectionne le site du client
3. Va dans **Domain settings → Add custom domain**
4. Saisis le domaine (ex : `salon-martin.fr`)
5. Netlify te donne les DNS à configurer chez le registrar du client

### Re-déployer après une modification

```bash
bash scripts/deploy.sh nom-du-commerce
```

Même commande — Netlify détecte que le site existe déjà et met à jour.

---

## 4. Checklist livraison client

Quand un client signe, suis ces étapes dans l'ordre :

- [ ] **Photos réelles** — Récupère les photos (WhatsApp, email, Google Drive) et remplace les placeholders dans `/clients/nom-du-commerce/` (noms : `photo-1.jpg`, `photo-2.jpg`…)
- [ ] **Services et prix** — Mets à jour `config.json` avec les vrais services et tarifs
- [ ] **Lien de réservation** — Dans `config.json`, renseigne `reservation_url` (Planity, Calendly, Cal.com ou `tel:+336XXXXXXXX`)
- [ ] **Vérifier le formulaire** — Envoie un message test via le formulaire de contact et vérifie que tu le reçois dans ton tableau de bord Netlify (Netlify Forms)
- [ ] **Google Maps** — Vérifie que l'adresse s'affiche correctement dans la section contact
- [ ] **Domaine personnalisé** — Configure le domaine chez Netlify si le client a le sien
- [ ] **Test mobile** — Ouvre le site sur iPhone et Android (ou utilise les DevTools Chrome)
- [ ] **Lighthouse** — Lance un audit depuis Chrome DevTools → onglet Lighthouse, vise 90+ en performance et SEO
- [ ] **Livraison** — Envoie l'URL au client avec le guide d'utilisation

---

## 5. Prospection

### Gérer tes prospects

Ouvre `/prospection/prospects.csv` dans Excel, Numbers ou Google Sheets.

Statuts disponibles : `à contacter` → `contacté` → `relancé` → `RDV` → `signé` → `refusé`

### Voir tes statistiques

```bash
node scripts/stats.js
```

Affiche :
- Nombre total de prospects
- Nombre contactés
- Taux de réponse
- Taux de signature
- Relances à faire aujourd'hui

### Templates de messages

Les templates DM Instagram, email et SMS sont dans `/prospection/messages.md`.

---

## 6. Structure du projet

```
/
├── templates/
│   ├── coiffure/     ← Template salon de coiffure
│   ├── restaurant/   ← Template restaurant
│   └── boutique/     ← Template boutique
│
├── clients/
│   └── [nom-client]/ ← Généré par scripts/generate.js
│
├── scripts/
│   ├── generate.js   ← Générateur de sites (CLI interactif)
│   ├── deploy.sh     ← Déploiement Netlify en 1 commande
│   └── stats.js      ← Statistiques de prospection
│
├── prospection/
│   ├── prospects.csv ← Suivi des prospects
│   └── messages.md   ← Templates de messages
│
└── README.md
```

---

## Tarification suggérée

| Formule | Prix | Contenu |
|---------|------|---------|
| Starter | 49€/mois | Site vitrine 1 page, formulaire contact, SEO base |
| Pro | 79€/mois | + domaine perso, galerie photos, lien réservation |
| Premium | 129€/mois | + mise à jour mensuelle, priorité support |

> Frais de setup uniques conseillés : 0€ (intégré dans les 3 premiers mois) pour lever la barrière à l'entrée.

---

*Généré avec le système d'automatisation Agence Web.*
