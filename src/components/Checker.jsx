import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { checkSite, SIGNALS } from '../lib/check.js'

function SignalChecklist({ compactMode = false }) {
  return (
    <ul className="space-y-3">
      {SIGNALS.slice(0, compactMode ? 4 : SIGNALS.length).map((s) => (
        <li key={s.title} className="flex gap-3">
          <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-azure-500" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6v4.5M10 13.5v.5" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-navy-900">{s.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-mist-600">{s.detail}</p>
            {s.link && (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-azure-600 hover:underline"
              >
                {s.linkLabel} ↗
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

function OfficialLinks() {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <a
        href="https://signal.conso.gouv.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-mist-200 bg-white px-3.5 py-1.5 text-xs font-medium text-navy-900 transition-colors hover:border-azure-400 hover:text-azure-600"
      >
        Consulter / signaler sur SignalConso (DGCCRF) ↗
      </a>
      <a
        href="https://www.signal-arnaques.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-mist-200 bg-white px-3.5 py-1.5 text-xs font-medium text-navy-900 transition-colors hover:border-azure-400 hover:text-azure-600"
      >
        Rechercher les signalements existants ↗
      </a>
    </div>
  )
}

function Result({ result }) {
  if (result.status === 'flagged') {
    const { entry } = result
    return (
      <div className="rounded-2xl border border-danger-600/25 bg-danger-50 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-danger-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 9v4M12 17v.5M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
            </svg>
          </span>
          <div>
            <h3 className="text-lg font-semibold text-danger-700">
              « {entry.name} » figure dans notre liste de vigilance
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-900">{entry.summary}</p>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-white/70 p-4">
          <p className="text-xs font-semibold tracking-wide text-mist-500 uppercase">Sources publiques citées</p>
          <ul className="mt-2 space-y-1.5">
            {entry.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-azure-600 hover:underline">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-mist-500">
          VérifClim ne porte aucune accusation en propre : cette alerte reflète
          uniquement des informations publiées par les sources citées ci-dessus.
          Si vous avez déjà commandé,{' '}
          <Link to="/guide-arnaques" className="font-medium text-azure-600 hover:underline">
            voici les démarches à suivre
          </Link>
          .
        </p>
        <OfficialLinks />
      </div>
    )
  }

  if (result.status === 'trusted') {
    return (
      <div className="rounded-2xl border border-ok-600/25 bg-ok-50 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ok-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ok-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <div>
            <h3 className="text-lg font-semibold text-ok-700">
              {result.retailer.name} est une enseigne établie
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-900">
              Cette enseigne est implantée de longue date en France avec un
              service client identifiable et de vrais recours en cas de litige.
              Vérifiez tout de même que vous êtes bien sur le site officiel
              (attention aux fautes de frappe dans l’URL) et, sur les
              marketplaces, l’identité du vendeur tiers.
            </p>
            <Link
              to="/comparatif"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-700"
            >
              Voir notre sélection de climatiseurs fiables →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azure-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-azure-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
        </span>
        <div>
          <h3 className="text-lg font-semibold text-navy-900">
            « {result.input} » : aucun signalement dans notre liste — restez vigilant
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-mist-600">
            Ce nom ne figure ni dans notre liste de vigilance (établie à partir
            de sources publiques), ni parmi les enseignes établies que nous
            connaissons. Cela ne garantit rien : de nouveaux sites frauduleux
            apparaissent chaque jour. Vérifiez vous-même ces points avant
            d’acheter :
          </p>
        </div>
      </div>
      <div className="mt-6">
        <SignalChecklist />
      </div>
      <OfficialLinks />
    </div>
  )
}

export default function Checker() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)

  function onSubmit(e) {
    e.preventDefault()
    setResult(checkSite(value))
  }

  return (
    <div id="verifier" className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-mist-200 bg-white p-2.5 shadow-xl shadow-navy-900/5 sm:flex-row"
      >
        <label htmlFor="site-input" className="sr-only">
          URL ou nom du site à vérifier
        </label>
        <input
          id="site-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ex. : coolizi.com ou « Breezo »"
          autoComplete="off"
          className="w-full flex-1 rounded-xl bg-transparent px-4 py-3 text-navy-900 placeholder:text-mist-400 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-azure-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-azure-500 focus:outline-2 focus:outline-offset-2 focus:outline-azure-600"
        >
          Vérifier gratuitement
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-mist-400">
        Outil indépendant et gratuit. Aucune donnée conservée — la vérification
        s’effectue dans votre navigateur.
      </p>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.input + result.status}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-6"
          >
            <Result result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
