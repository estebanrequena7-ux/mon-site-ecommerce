import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Checker from '../components/Checker.jsx'
import Reveal from '../components/Reveal.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { SOURCES } from '../data/watchlist.js'

const stats = [
  { value: '200+', label: 'faux sites identifiés par la DGCCRF', source: SOURCES.franceinfo },
  { value: '5 M€', label: 'de préjudice estimé pour les consommateurs', source: SOURCES.selectra },
  { value: '~140 €', label: 'le prix type du faux « climatiseur » (un simple ventilateur)', source: SOURCES.consoglobe },
]

const steps = [
  {
    title: 'Collez l’URL ou le nom du site',
    text: 'Celui d’une publicité vue sur les réseaux sociaux, d’un site inconnu trouvé sur Google, ou d’une marque dont vous doutez.',
  },
  {
    title: 'Consultez le résultat sourcé',
    text: 'Si le nom a été publiquement cité par la presse ou la DGCCRF, nous affichons l’alerte avec ses sources. Sinon, nous vous donnons la liste exacte des points à vérifier vous-même.',
  },
  {
    title: 'Achetez au bon endroit',
    text: 'Notre comparatif ne référence que des appareils réels, vendus par des enseignes établies disposant d’un vrai service après-vente.',
  },
]

export default function Home() {
  const reduce = useReducedMotion()
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60rem 30rem at 70% -10%, rgba(46,130,234,0.25), transparent 60%), radial-gradient(40rem 24rem at 10% 110%, rgba(46,130,234,0.12), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-alert-500/30 bg-alert-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-alert-100">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-alert-500" />
              Canicule 2026 — vague d’arnaques aux climatiseurs en cours
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Vérifiez ce site
              <br />
              <span className="text-azure-400">avant</span> d’acheter votre climatiseur
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist-300">
              Plus de 200 faux sites de vente de climatiseurs ont été identifiés
              par la répression des fraudes cet été. En 10 secondes, vérifiez si
              un site a déjà été signalé publiquement — et apprenez à repérer
              les suivants.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Checker />
          </motion.div>
        </div>
      </section>

      {/* Contexte chiffré, sourcé */}
      <section className="border-b border-mist-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="text-center sm:text-left">
                  <p className="text-4xl font-semibold tracking-tight text-navy-900">{s.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mist-600">{s.label}</p>
                  <a
                    href={s.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-mist-400 hover:text-azure-600 hover:underline"
                  >
                    Source ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui se passe */}
      <section className="bg-mist-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-navy-900">
                Ce qui se passe cet été
              </h2>
              <div className="mt-5 space-y-4 text-mist-700 leading-relaxed">
                <p>
                  Depuis le début des fortes chaleurs, la presse et la DGCCRF
                  (répression des fraudes) documentent une vague de sites
                  frauduleux vendant de prétendus « climatiseurs portables
                  révolutionnaires » autour de 140 €. Selon ces sources, les
                  produits livrés — quand ils le sont — sont de simples
                  ventilateurs, parfois équipés d’une résistance chauffante.
                </p>
                <p>
                  Ces sites apparaissent par dizaines chaque jour sous des noms
                  proches les uns des autres, avec des pages de vente quasi
                  identiques, de faux articles de presse et de faux comparatifs.
                  Ils sont massivement promus par publicité sur les réseaux
                  sociaux.
                </p>
                <p className="text-sm text-mist-500">
                  Sources :{' '}
                  <a href={SOURCES.franceinfo.url} target="_blank" rel="noopener noreferrer" className="text-azure-600 hover:underline">franceinfo</a>,{' '}
                  <a href={SOURCES.signalArnaques.url} target="_blank" rel="noopener noreferrer" className="text-azure-600 hover:underline">Signal-Arnaques</a>,{' '}
                  <a href={SOURCES.selectra.url} target="_blank" rel="noopener noreferrer" className="text-azure-600 hover:underline">Selectra</a>,{' '}
                  <a href={SOURCES.consoglobe.url} target="_blank" rel="noopener noreferrer" className="text-azure-600 hover:underline">ConsoGlobe</a>.
                </p>
              </div>
              <Link
                to="/guide-arnaques"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-600 hover:underline"
              >
                Lire le guide complet : reconnaître une arnaque à la clim →
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-mist-200 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-navy-900">Comment ça marche</h3>
                <ol className="mt-6 space-y-6">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-navy-900">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-mist-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AdSlot />

      {/* CTA comparatif */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-8 py-14 text-center sm:px-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(40rem 20rem at 50% 120%, rgba(46,130,234,0.3), transparent 65%)',
                }}
              />
              <div className="relative">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Besoin de vraie fraîcheur, sans mauvaise surprise ?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-mist-300 leading-relaxed">
                  Nous avons sélectionné des climatiseurs, ventilateurs et
                  rafraîchisseurs réellement efficaces, vendus uniquement par
                  des enseignes établies.
                </p>
                <Link
                  to="/comparatif"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy-900 transition-transform hover:scale-[1.03]"
                >
                  Voir le comparatif fiable →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
