import Reveal from '../components/Reveal.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { CATEGORIES, PRODUCTS } from '../data/products.js'

function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-mist-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-mist-200 bg-mist-50 text-xs tracking-wide text-mist-500 uppercase">
            <th className="px-5 py-3.5 font-semibold">Modèle</th>
            <th className="px-5 py-3.5 font-semibold">Puissance / usage</th>
            <th className="px-5 py-3.5 font-semibold">Prix indicatif</th>
            <th className="px-5 py-3.5 font-semibold">Avis</th>
            <th className="px-5 py-3.5 font-semibold">Où l’acheter</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.name} className="border-b border-mist-100 last:border-0 hover:bg-azure-50/40">
              <td className="px-5 py-4">
                <p className="font-semibold text-navy-900">{p.name}</p>
                <p className="mt-0.5 text-xs text-mist-500">{p.highlight}</p>
              </td>
              <td className="px-5 py-4 text-mist-600">{p.power}</td>
              <td className="px-5 py-4 font-semibold whitespace-nowrap text-navy-900">{p.price}</td>
              <td className="px-5 py-4 text-mist-600">{p.rating}</td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.links.map((l) => (
                    <a
                      key={l.retailer}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="rounded-full bg-navy-900 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-azure-600"
                    >
                      {l.retailer} ↗
                    </a>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Comparatif() {
  return (
    <>
      <section className="border-b border-mist-200 bg-mist-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold tracking-wide text-azure-600 uppercase">Comparatif 2026</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl">
              Des climatiseurs fiables, vendus par de vraies enseignes
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-600">
              Chaque appareil ci-dessous existe réellement, est fabriqué par une
              marque établie, et n’est proposé que chez des revendeurs disposant
              d’un service après-vente en France. Aucun produit « miracle »
              vendu par un site inconnu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
          {CATEGORIES.map((cat, i) => {
            const products = PRODUCTS.filter((p) => p.category === cat.id)
            return (
              <Reveal key={cat.id} delay={i * 0.05}>
                <h2 className="text-2xl font-semibold tracking-tight text-navy-900">{cat.label}</h2>
                <p className="mt-2 mb-6 max-w-3xl text-mist-600 leading-relaxed">{cat.note}</p>
                <ProductTable products={products} />
              </Reveal>
            )
          })}

          <Reveal>
            <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6 text-sm leading-relaxed text-mist-500">
              <p>
                <strong className="text-navy-900">Transparence :</strong> les
                liens « Où l’acheter » peuvent être des liens d’affiliation —
                ils génèrent une commission pour VérifClim, sans surcoût pour
                vous, et ne modifient en rien la sélection. Les prix sont
                indicatifs (constatés début juillet 2026) et peuvent varier :
                vérifiez toujours le prix final chez l’enseigne. Les notes
                d’avis correspondent aux moyennes constatées sur les sites des
                enseignes à la même date.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <AdSlot />
    </>
  )
}
