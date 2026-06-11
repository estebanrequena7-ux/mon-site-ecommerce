#!/usr/bin/env node
/**
 * Générateur de sites clients
 * Usage : node scripts/generate.js
 *
 * Pose les questions, copie le bon template dans /clients/<slug>
 * et remplace toutes les variables {{...}}.
 * Zéro dépendance : Node.js >= 18 uniquement.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const CLIENTS_DIR = path.join(ROOT, 'clients');

const SECTEURS = ['coiffure', 'restaurant', 'boutique'];

const COULEURS_DEFAUT = {
  coiffure:   { principale: '#c8a96e', secondaire: '#2b2b35' },
  restaurant: { principale: '#b5562e', secondaire: '#2a2520' },
  boutique:   { principale: '#7c6aa6', secondaire: '#252220' },
};

/* ---------- Helpers ---------- */

/* File de lignes : évite que readline perde des réponses
   collées/pipées plus vite que les questions ne s'affichent */
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lineQueue = [];
let lineResolver = null;
let stdinClosed = false;
rl.on('line', (line) => {
  if (lineResolver) { const r = lineResolver; lineResolver = null; r(line); }
  else lineQueue.push(line);
});
rl.on('close', () => {
  stdinClosed = true;
  if (lineResolver) { const r = lineResolver; lineResolver = null; r(''); }
});

function ask(question) {
  process.stdout.write(question);
  if (lineQueue.length) return Promise.resolve(lineQueue.shift().trim());
  if (stdinClosed) return Promise.resolve('');
  return new Promise((resolve) => { lineResolver = (l) => resolve(l.trim()); });
}

function failIfClosed() {
  if (stdinClosed && !lineQueue.length) {
    throw new Error('Entrée interrompue : toutes les questions n\'ont pas reçu de réponse.');
  }
}

async function askRequired(question) {
  let answer = '';
  while (!answer) {
    answer = await ask(question);
    if (!answer) { failIfClosed(); console.log('  ⚠ Ce champ est obligatoire.'); }
  }
  return answer;
}

async function askChoice(question, choices) {
  let answer = '';
  while (!choices.includes(answer)) {
    answer = (await ask(question)).toLowerCase();
    if (!choices.includes(answer)) { failIfClosed(); console.log(`  ⚠ Réponses possibles : ${choices.join(' / ')}`); }
  }
  return answer;
}

async function askColor(question, defaut) {
  while (true) {
    const answer = await ask(`${question} [défaut ${defaut}] : `);
    if (!answer) return defaut;
    if (/^#[0-9a-fA-F]{6}$/.test(answer)) return answer;
    failIfClosed();
    console.log('  ⚠ Format attendu : #RRGGBB (ex : #c8a96e)');
  }
}

/** "Salon de l'Étoile" -> "salon-de-l-etoile" */
function slugify(str) {
  return str
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // retire les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Normalise un lien Instagram/TikTok : "@pseudo" ou "pseudo" -> URL complète */
function normalizeSocial(input, base) {
  if (!input) return '';
  if (input.startsWith('http')) return input;
  return base + input.replace(/^@/, '');
}

/** Remplace toutes les {{VARIABLES}} dans un texte */
function replaceVars(content, vars) {
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    key in vars ? vars[key] : match
  );
}

/** Copie un dossier en remplaçant les variables dans les fichiers texte */
function copyAndReplace(srcDir, destDir, vars) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyAndReplace(src, dest, vars);
    } else if (/\.(html|css|js|json|xml|txt|svg)$/.test(entry.name)) {
      fs.writeFileSync(dest, replaceVars(fs.readFileSync(src, 'utf8'), vars));
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

/* ---------- Programme principal ---------- */

async function main() {
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('   GÉNÉRATEUR DE SITE CLIENT');
  console.log('═══════════════════════════════════════');
  console.log('');

  const nom = await askRequired('Nom du commerce : ');
  const secteur = await askChoice(`Secteur (${SECTEURS.join(' / ')}) : `, SECTEURS);
  const ville = await askRequired('Ville : ');
  const adresse = await askRequired('Adresse (rue + code postal) : ');
  const telephone = await askRequired('Téléphone : ');
  const horaires = await askRequired('Horaires (ex : Mar-Sam 9h-19h) : ');

  const defauts = COULEURS_DEFAUT[secteur];
  const couleurPrincipale = await askColor('Couleur principale', defauts.principale);
  const couleurSecondaire = await askColor('Couleur secondaire', defauts.secondaire);

  const instagram = normalizeSocial(await ask('Instagram (@pseudo ou URL, vide si aucun) : '), 'https://instagram.com/');
  const tiktok = normalizeSocial(await ask('TikTok (@pseudo ou URL, vide si aucun) : '), 'https://tiktok.com/@');

  const slug = slugify(nom);
  const siteUrlDefaut = `https://${slug}.netlify.app`;
  const siteUrl = (await ask(`URL du site [défaut ${siteUrlDefaut}] : `)) || siteUrlDefaut;

  rl.close();

  const destDir = path.join(CLIENTS_DIR, slug);
  if (fs.existsSync(destDir)) {
    console.error(`\n✗ Le dossier clients/${slug} existe déjà. Supprime-le d'abord ou renomme le commerce.`);
    process.exit(1);
  }

  const vars = {
    NOM: nom,
    SECTEUR: secteur,
    VILLE: ville,
    ADRESSE: adresse,
    ADRESSE_URL: encodeURIComponent(`${adresse}, ${ville}`),
    TELEPHONE: telephone,
    HORAIRES: horaires,
    COULEUR_PRINCIPALE: couleurPrincipale,
    COULEUR_SECONDAIRE: couleurSecondaire,
    INSTAGRAM: instagram,
    TIKTOK: tiktok,
    SITE_URL: siteUrl,
  };

  console.log(`\n→ Génération de clients/${slug} depuis le template "${secteur}"...`);
  copyAndReplace(path.join(TEMPLATES_DIR, secteur), destDir, vars);

  /* sitemap.xml */
  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(destDir, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`);

  /* robots.txt */
  fs.writeFileSync(path.join(destDir, 'robots.txt'),
`User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);

  /* Vérification : aucune variable oubliée dans les fichiers générés */
  let leftovers = [];
  (function check(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) check(p);
      else if (/\.(html|css|js|json|xml|txt)$/.test(entry.name)) {
        const found = fs.readFileSync(p, 'utf8').match(/\{\{\w+\}\}/g);
        if (found) leftovers.push(`${path.relative(destDir, p)} : ${[...new Set(found)].join(', ')}`);
      }
    }
  })(destDir);

  console.log('');
  console.log('═══════════════════════════════════════');
  console.log(`✓ Site généré : clients/${slug}/`);
  console.log('═══════════════════════════════════════');
  if (leftovers.length) {
    console.log('\n⚠ Variables non remplacées détectées :');
    leftovers.forEach((l) => console.log('  - ' + l));
  }
  console.log(`
Prochaines étapes :
  1. Personnalise les services/prix : clients/${slug}/config.json
  2. Ajoute le lien de réservation ("reservation_url" dans config.json)
  3. Prévisualise en local : npx serve clients/${slug}
  4. Déploie : bash scripts/deploy.sh ${slug}
`);
}

main().catch((err) => {
  console.error('✗ Erreur :', err.message);
  process.exit(1);
});
