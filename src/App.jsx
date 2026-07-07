import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Comparatif from './pages/Comparatif.jsx'
import Guide from './pages/Guide.jsx'
import MentionsLegales from './pages/MentionsLegales.jsx'
import Confidentialite from './pages/Confidentialite.jsx'
import { getRouteMeta } from './seo.js'

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getRouteMeta(pathname)
    document.title = meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description)
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <RouteEffects />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparatif" element={<Comparatif />} />
          <Route path="/guide-arnaques" element={<Guide />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
