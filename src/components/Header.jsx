import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Vérifier un site' },
  { to: '/comparatif', label: 'Climatiseurs fiables' },
  { to: '/guide-arnaques', label: 'Reconnaître une arnaque' },
]

export function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 3 L34 8.5 V19 c0 8.6-5.9 14.6-14 18-8.1-3.4-14-9.4-14-18 V8.5 Z"
        className="fill-navy-900"
      />
      <path
        d="M20 10.5 v13 M20 10.5 l-3.2 3.2 M20 10.5 l3.2 3.2 M20 23.5 l-3.2-3.2 M20 23.5 l3.2-3.2 M14.4 13.75 l11.2 6.5 M14.4 20.25 l11.2-6.5"
        stroke="#5ea3f2"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="29" cy="27.5" r="7.5" className="fill-ok-600" />
      <path
        d="M25.8 27.6 l2.3 2.3 4-4.4"
        stroke="white"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-mist-200 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-navy-900">
            Vérif<span className="text-azure-600">Clim</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-navy-900 text-white'
                    : 'text-mist-600 hover:bg-mist-100 hover:text-navy-900'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-navy-900 md:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-mist-200 bg-white px-4 py-3 md:hidden" aria-label="Navigation mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive ? 'bg-mist-100 text-navy-900' : 'text-mist-600'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
