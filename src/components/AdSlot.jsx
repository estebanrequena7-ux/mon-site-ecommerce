// Emplacement réservé pour la publicité display (AdSense ou autre régie).
// À activer plus tard : remplacer le contenu par le snippet de la régie.
// Rendu invisible en production tant qu'aucune régie n'est branchée.
const ADS_ENABLED = false

export default function AdSlot({ className = '' }) {
  if (!ADS_ENABLED) return null
  return (
    <div className={`mx-auto max-w-6xl px-4 py-8 sm:px-6 ${className}`}>
      <div
        className="flex min-h-24 items-center justify-center rounded-xl border border-dashed border-mist-300 bg-mist-50 text-xs text-mist-400"
        data-ad-slot="display-banner"
      >
        Emplacement publicitaire
      </div>
    </div>
  )
}
