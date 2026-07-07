import { Link } from 'react-router-dom'
import { Logo } from './Header.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-mist-200 bg-mist-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="font-semibold tracking-tight text-navy-900">
                Vérif<span className="text-azure-600">Clim</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mist-500">
              Outil indépendant d’aide à la vérification des sites de vente de
              climatiseurs. VérifClim n’est pas une autorité officielle et ne se
              substitue pas aux services de l’État.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-900">Navigation</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="text-mist-500 transition-colors hover:text-navy-900">Vérifier un site</Link></li>
              <li><Link to="/comparatif" className="text-mist-500 transition-colors hover:text-navy-900">Climatiseurs fiables</Link></li>
              <li><Link to="/guide-arnaques" className="text-mist-500 transition-colors hover:text-navy-900">Reconnaître une arnaque</Link></li>
              <li><Link to="/mentions-legales" className="text-mist-500 transition-colors hover:text-navy-900">Mentions légales</Link></li>
              <li><Link to="/confidentialite" className="text-mist-500 transition-colors hover:text-navy-900">Confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-900">Ressources officielles</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://signal.conso.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-mist-500 transition-colors hover:text-navy-900">
                  SignalConso — signaler une fraude (DGCCRF) ↗
                </a>
              </li>
              <li>
                <a href="https://www.cybermalveillance.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-mist-500 transition-colors hover:text-navy-900">
                  Cybermalveillance.gouv.fr ↗
                </a>
              </li>
              <li>
                <a href="https://www.economie.gouv.fr/dgccrf" target="_blank" rel="noopener noreferrer" className="text-mist-500 transition-colors hover:text-navy-900">
                  DGCCRF ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-mist-200 pt-6 text-xs leading-relaxed text-mist-400">
          <p>
            © {new Date().getFullYear()} VérifClim. Certains liens vers des
            enseignes partenaires sont des liens d’affiliation : ils peuvent
            générer une commission pour ce site, sans surcoût pour vous. Cela
            n’influence pas nos alertes de vigilance, qui reposent uniquement
            sur des sources publiques citées.
          </p>
        </div>
      </div>
    </footer>
  )
}
