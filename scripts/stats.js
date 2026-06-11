#!/usr/bin/env node
/**
 * Statistiques de prospection
 * Usage : node scripts/stats.js
 *
 * Lit prospection/prospects.csv et affiche :
 * - Compteurs par statut
 * - Taux de réponse et de signature
 * - Relances à faire aujourd'hui (date_relance <= aujourd'hui)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '..', 'prospection', 'prospects.csv');

/* ---------- Parsing CSV minimal (sans dépendance) ---------- */

function parseCSV(content) {
  const lines = content.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    // Gère les virgules dans les champs entre guillemets
    const fields = [];
    let current = '';
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === ',' && !inQuotes) { fields.push(current.trim()); current = ''; }
      else { current += ch; }
    }
    fields.push(current.trim());

    return headers.reduce((obj, h, i) => {
      obj[h] = fields[i] || '';
      return obj;
    }, {});
  });
}

/* ---------- Affichage ---------- */

function bar(value, max, width = 20) {
  const filled = max > 0 ? Math.round((value / max) * width) : 0;
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

function pct(num, den) {
  return den > 0 ? ((num / den) * 100).toFixed(0) + '%' : '—';
}

function formatDate(str) {
  if (!str) return '(non définie)';
  const d = new Date(str);
  return isNaN(d.getTime()) ? str : d.toLocaleDateString('fr-FR');
}

/* ---------- Programme principal ---------- */

if (!fs.existsSync(CSV_PATH)) {
  console.error('✗ Fichier introuvable : prospection/prospects.csv');
  process.exit(1);
}

const prospects = parseCSV(fs.readFileSync(CSV_PATH, 'utf8'));

if (prospects.length === 0) {
  console.log('Aucun prospect dans le CSV.');
  process.exit(0);
}

const today = new Date();
today.setHours(0, 0, 0, 0);

// Compteurs par statut
const STATUTS = ['à contacter', 'contacté', 'relancé', 'RDV', 'signé', 'refusé'];
const counts = Object.fromEntries(STATUTS.map(s => [s, 0]));
const autreStatuts = {};

for (const p of prospects) {
  const s = (p.statut || '').toLowerCase();
  const match = STATUTS.find(k => k.toLowerCase() === s);
  if (match) counts[match]++;
  else { autreStatuts[s || '(vide)'] = (autreStatuts[s || '(vide)'] || 0) + 1; }
}

const total = prospects.length;
const contactes = counts['contacté'] + counts['relancé'] + counts['RDV'] + counts['signé'] + counts['refusé'];
const signes = counts['signé'];
const refus = counts['refusé'];
const rdv = counts['RDV'];
const enCours = contactes - signes - refus;

// Relances à faire (date_relance <= aujourd'hui et statut = contacté ou relancé)
const relancesAFaire = prospects.filter(p => {
  if (!p.date_relance) return false;
  const d = new Date(p.date_relance);
  if (isNaN(d.getTime())) return false;
  const statut = (p.statut || '').toLowerCase();
  return d <= today && (statut === 'contacté' || statut === 'relancé');
});

// Prochains RDV
const rdvAVenir = prospects.filter(p => {
  const statut = (p.statut || '').toLowerCase();
  return statut === 'rdv';
});

const ligne = '─'.repeat(46);

console.log('');
console.log('╔══════════════════════════════════════════════╗');
console.log('║         STATS PROSPECTION AGENCE WEB         ║');
console.log(`╚══════════════════════════════════════════════╝`);
console.log(`  Fichier : prospection/prospects.csv`);
console.log(`  Mis à jour le ${today.toLocaleDateString('fr-FR')}`);
console.log('');
console.log(`  ${ligne}`);
console.log(`  VOLUME`);
console.log(`  ${ligne}`);
console.log(`  Total prospects          ${String(total).padStart(4)}`);
console.log(`  Contactés                ${String(contactes).padStart(4)}  ${bar(contactes, total)}  ${pct(contactes, total)}`);
console.log(`  En cours (actifs)        ${String(enCours).padStart(4)}  ${bar(enCours, total)}`);
console.log(`  RDV décrochés            ${String(rdv).padStart(4)}  ${bar(rdv, total)}`);
console.log(`  Signés        🎉         ${String(signes).padStart(4)}  ${bar(signes, total)}`);
console.log(`  Refusés                  ${String(refus).padStart(4)}  ${bar(refus, total)}`);
console.log('');
console.log(`  ${ligne}`);
console.log(`  TAUX`);
console.log(`  ${ligne}`);
console.log(`  Taux de contact          ${pct(contactes, total).padStart(5)}  (contactés / total)`);
console.log(`  Taux de réponse          ${pct(rdv + signes + refus, contactes).padStart(5)}  (RDV+signé+refusé / contactés)`);
console.log(`  Taux de signature        ${pct(signes, contactes).padStart(5)}  (signés / contactés)`);
console.log(`  Taux de conversion RDV   ${pct(signes, rdv + signes).padStart(5)}  (signés / (RDV+signés))`);
console.log('');

if (relancesAFaire.length > 0) {
  console.log(`  ${ligne}`);
  console.log(`  ⚠  RELANCES À FAIRE AUJOURD'HUI (${relancesAFaire.length})`);
  console.log(`  ${ligne}`);
  for (const p of relancesAFaire) {
    const ville = p.ville ? ` — ${p.ville}` : '';
    const insta = p.instagram ? ` [@${p.instagram.replace(/^@/, '')}]` : '';
    console.log(`  • ${(p.nom || '?').padEnd(28)} ${formatDate(p.date_relance)}${ville}${insta}`);
  }
  console.log('');
}

if (rdvAVenir.length > 0) {
  console.log(`  ${ligne}`);
  console.log(`  📅  RDV EN COURS (${rdvAVenir.length})`);
  console.log(`  ${ligne}`);
  for (const p of rdvAVenir) {
    const notes = p.notes ? ` → ${p.notes.slice(0, 40)}` : '';
    console.log(`  • ${(p.nom || '?').padEnd(28)}${notes}`);
  }
  console.log('');
}

if (Object.keys(autreStatuts).length > 0) {
  console.log(`  Statuts non reconnus : ${JSON.stringify(autreStatuts)}`);
  console.log(`  Valeurs attendues : ${STATUTS.join(' / ')}`);
  console.log('');
}

console.log(`  ${ligne}`);
console.log('');
