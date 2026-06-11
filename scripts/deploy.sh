#!/usr/bin/env bash
# Déploiement d'un client sur Netlify
# Usage : bash scripts/deploy.sh <nom-client>
#
# Exemples :
#   bash scripts/deploy.sh salon-de-l-etoile
#   bash scripts/deploy.sh le-petit-bistro

set -euo pipefail

# ---------- Vérifications de base ----------

if [[ $# -eq 0 ]]; then
  echo "Usage : bash scripts/deploy.sh <nom-client>"
  echo "        Le nom correspond au dossier dans /clients/"
  echo "Exemple : bash scripts/deploy.sh salon-de-l-etoile"
  exit 1
fi

SLUG="$1"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CLIENT_DIR="${ROOT_DIR}/clients/${SLUG}"

if [[ ! -d "$CLIENT_DIR" ]]; then
  echo "✗ Dossier introuvable : clients/${SLUG}"
  echo ""
  echo "Clients disponibles :"
  ls "${ROOT_DIR}/clients/" | grep -v '\.gitkeep' | sed 's/^/  - /' || echo "  (aucun)"
  exit 1
fi

if ! command -v netlify &>/dev/null; then
  echo "✗ Netlify CLI non trouvé."
  echo ""
  echo "Installe-le avec :"
  echo "  npm install -g netlify-cli"
  echo ""
  echo "Puis connecte ton compte :"
  echo "  netlify login"
  exit 1
fi

# ---------- netlify.toml (créé si absent) ----------

TOML="${CLIENT_DIR}/netlify.toml"
if [[ ! -f "$TOML" ]]; then
  cat > "$TOML" <<TOML
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000"
TOML
  echo "→ netlify.toml créé pour ${SLUG}"
fi

# ---------- Déploiement ----------

echo ""
echo "═══════════════════════════════════════"
echo "   DÉPLOIEMENT : ${SLUG}"
echo "═══════════════════════════════════════"
echo ""

STATE_DIR="${ROOT_DIR}/.netlify-sites"
STATE_FILE="${STATE_DIR}/${SLUG}"
mkdir -p "$STATE_DIR"

if [[ -f "$STATE_FILE" ]]; then
  # Site existant : mise à jour
  SITE_ID=$(cat "$STATE_FILE")
  echo "→ Mise à jour du site Netlify (ID: ${SITE_ID})..."
  netlify deploy \
    --dir="$CLIENT_DIR" \
    --prod \
    --site="$SITE_ID" \
    --message="Mise à jour ${SLUG} — $(date '+%Y-%m-%d %H:%M')"
else
  # Premier déploiement
  echo "→ Premier déploiement — création du site Netlify..."
  DEPLOY_OUTPUT=$(netlify deploy \
    --dir="$CLIENT_DIR" \
    --prod \
    --message="Création ${SLUG}" 2>&1)

  echo "$DEPLOY_OUTPUT"

  # Récupère le Site ID depuis la sortie ou via netlify api
  SITE_ID=$(echo "$DEPLOY_OUTPUT" | grep -oE 'Site ID: [a-z0-9-]+' | awk '{print $3}' || true)
  if [[ -z "$SITE_ID" ]]; then
    SITE_ID=$(netlify api getSite --data '{}' 2>/dev/null | grep '"id"' | head -1 | grep -oE '"[a-z0-9-]+"' | tr -d '"' || true)
  fi

  if [[ -n "$SITE_ID" ]]; then
    echo "$SITE_ID" > "$STATE_FILE"
    echo "→ Site ID sauvegardé pour les prochains déploiements."
  fi
  exit 0
fi

echo ""
echo "✓ Déploiement terminé : ${SLUG}"
