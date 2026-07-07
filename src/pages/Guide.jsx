import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { WATCHLIST, SOURCES } from '../data/watchlist.js'
import { SIGNALS } from '../lib/check.js'
import { FAQ } from '../data/faq.js'

export default function Guide() {
  return (
    <>
      <section className="border-b border-mist-200 bg-mist-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold tracking-wide text-azure-600 uppercase">Guide — été 2026</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl">
              Comment reconnaître une arnaque à la clim
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-600">
              Le mode opératoire des faux sites de climatiseurs documenté par la
              presse et la répression des fraudes, les signaux qui doivent vous
              alerter, et les démarches si vous avez déjà payé.
            </p>
          </Reveal>
        </div>
      </section>

      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="prose-editorial">
              <h2 id="mode-operatoire">Le mode opératoire, étape par étape</h2>
              <p>
                Tout commence presque toujours par une publicité sur les réseaux
                sociaux. Elle met en scène une histoire séduisante : un
                ingénieur qui aurait inventé un « climatiseur portable
                révolutionnaire », une petite entreprise familiale, une
                trouvaille née d’un été caniculaire. Le lien mène vers ce qui
                ressemble à un article de presse ou à un comparatif indépendant
                — en réalité une page publicitaire déguisée.
              </p>
              <p>
                Vient ensuite la page de vente : un appareil compact promis
                comme capable de « refroidir une pièce en quelques minutes »,
                affiché autour de 140 € au lieu d’un prix barré bien plus haut,
                avec compte à rebours et stock prétendument limité. Selon les
                enquêtes publiées (
                <a href={SOURCES.signalArnaques.url} target="_blank" rel="noopener noreferrer">Signal-Arnaques</a>,{' '}
                <a href={SOURCES.franceinfo.url} target="_blank" rel="noopener noreferrer">franceinfo</a>
                ), les clients reçoivent au mieux un simple ventilateur expédié
                depuis l’Asie — parfois équipé d’une résistance chauffante —,
                au pire rien du tout. Le service client ne répond plus, et le
                site disparaît pour renaître quelques jours plus tard sous un
                autre nom.
              </p>
              <p>
                C’est le point clé pour comprendre cette vague : il ne s’agit
                pas de quelques sites isolés, mais d’un réseau industrialisé.
                La DGCCRF, citée par la presse, évoque plus de 200 sites
                identifiés et des dizaines de nouvelles pages créées chaque
                jour, pour un préjudice dépassant 5 millions d’euros.
              </p>

              <h2 id="pourquoi-ca-marche">Pourquoi ça fonctionne (surtout en pleine canicule)</h2>
              <p>
                Ces sites exploitent trois leviers : l’urgence (il fait 38 °C
                dans votre salon, vous voulez une solution ce soir), le prix (un
                « vrai » climatiseur coûte 300 à 700 €, l’offre à 140 € semble
                être l’affaire du siècle) et la confiance simulée (faux avis 5
                étoiles, faux articles, faux compteurs de commandes). Aucun de
                ces signaux n’est une preuve de fiabilité : ils sont tous
                fabriqués en quelques minutes.
              </p>
              <p>
                Rappel physique simple : produire du froid exige un compresseur
                et un fluide frigorigène. Cette technologie a un coût et un
                poids incompressibles. <strong>Un appareil de la taille d’une
                enceinte Bluetooth vendu 140 € ne peut pas climatiser une
                pièce</strong> — au mieux, il brasse ou humidifie l’air à
                quelques centimètres.
              </p>

              <h2 id="signaux">Les signaux à vérifier avant tout achat</h2>
            </div>
          </Reveal>

          <Reveal>
            <ul className="mt-6 space-y-5">
              {SIGNALS.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-xl border border-mist-200 bg-mist-50/60 p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mist-600">{s.detail}</p>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-sm font-medium text-azure-600 hover:underline">
                        {s.linkLabel} ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="prose-editorial">
              <h2 id="noms-cites">Les noms déjà cités publiquement</h2>
              <p>
                Les marques ci-dessous ont été citées par la presse ou dans des
                enquêtes publiques dans le cadre de cette vague de fraudes.
                <strong> VérifClim ne porte aucune accusation en propre</strong> :
                nous relayons uniquement des informations publiées, avec leurs
                sources, que nous vous invitons à consulter.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-mist-200">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-mist-200 bg-mist-50 text-xs tracking-wide text-mist-500 uppercase">
                    <th className="px-5 py-3 font-semibold">Nom cité</th>
                    <th className="px-5 py-3 font-semibold">Contexte</th>
                    <th className="px-5 py-3 font-semibold">Sources</th>
                  </tr>
                </thead>
                <tbody>
                  {WATCHLIST.map((w) => (
                    <tr key={w.name} className="border-b border-mist-100 align-top last:border-0">
                      <td className="px-5 py-4 font-semibold whitespace-nowrap text-danger-700">{w.name}</td>
                      <td className="px-5 py-4 leading-relaxed text-mist-600">{w.summary}</td>
                      <td className="px-5 py-4">
                        <ul className="space-y-1">
                          {w.sources.map((s) => (
                            <li key={s.url}>
                              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-azure-600 hover:underline">
                                {s.label.split(' — ')[0]} ↗
                              </a>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose-editorial">
              <h2 id="victime">Vous avez déjà commandé ? Les démarches, dans l’ordre</h2>
              <ol>
                <li>
                  <strong>Contactez votre banque immédiatement.</strong> Demandez
                  une opposition si le paiement est récent, ou une procédure de
                  « chargeback » (contestation de paiement par carte) si le
                  produit reçu ne correspond pas à la commande ou n’arrive
                  jamais.
                </li>
                <li>
                  <strong>Signalez le site sur{' '}
                  <a href="https://signal.conso.gouv.fr" target="_blank" rel="noopener noreferrer">SignalConso</a></strong>, la
                  plateforme officielle de la DGCCRF : votre signalement aide la
                  répression des fraudes à agir.
                </li>
                <li>
                  <strong>Déclarez l’escroquerie sur{' '}
                  <a href="https://www.cybermalveillance.gouv.fr" target="_blank" rel="noopener noreferrer">cybermalveillance.gouv.fr</a></strong>,
                  qui vous orientera dans vos démarches.
                </li>
                <li>
                  <strong>Déposez plainte</strong> auprès de la police ou de la
                  gendarmerie, ou en ligne via la plateforme THESEE pour les
                  escroqueries sur internet.
                </li>
                <li>
                  <strong>Conservez toutes les preuves</strong> : captures
                  d’écran de la publicité et du site, e-mails de confirmation,
                  relevé bancaire.
                </li>
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight text-navy-900 md:text-3xl">
                Questions fréquentes
              </h2>
              <div className="mt-6 divide-y divide-mist-200 rounded-2xl border border-mist-200">
                {FAQ.map((item) => (
                  <details key={item.q} className="group px-6 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 shrink-0 text-mist-400 transition-transform group-open:rotate-45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-mist-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 rounded-2xl bg-navy-950 p-8 text-center">
              <h2 className="text-xl font-semibold text-white">Un doute sur un site précis ?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist-300">
                Utilisez notre outil gratuit : il croise le nom avec les
                signalements publics connus et vous donne la liste des points à
                vérifier.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-azure-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-azure-500"
              >
                Vérifier un site →
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <AdSlot />
    </>
  )
}
