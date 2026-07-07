export default function Confidentialite() {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
          Politique de confidentialité
        </h1>

        <div className="prose-editorial mt-8">
          <p>Dernière mise à jour : juillet 2026.</p>

          <h2>Ce que nous collectons</h2>
          <p>
            Le moins possible. L’outil de vérification fonctionne{' '}
            <strong>entièrement dans votre navigateur</strong> : les noms de
            sites que vous saisissez ne sont ni transmis à un serveur, ni
            enregistrés, ni analysés. Le site ne demande la création d’aucun
            compte et ne collecte aucune donnée personnelle directement.
          </p>

          <h2>Cookies et mesure d’audience</h2>
          <p>
            À ce jour, le site ne dépose aucun cookie de suivi. Si une mesure
            d’audience ou de la publicité display était activée à l’avenir,
            cette page serait mise à jour et un bandeau de consentement
            conforme au RGPD serait mis en place au préalable.
          </p>

          <h2>Liens d’affiliation et sites tiers</h2>
          <p>
            Lorsque vous cliquez sur un lien vers un site marchand partenaire,
            ce site peut déposer ses propres cookies afin d’attribuer
            l’éventuelle commission d’affiliation. Ces traitements relèvent de
            la politique de confidentialité du site marchand concerné, que nous
            vous invitons à consulter. Plus généralement, cette politique ne
            couvre pas les pratiques des sites tiers (y compris les sources de
            presse) vers lesquels nous proposons des liens.
          </p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par Netlify, qui peut collecter des journaux
            techniques (adresses IP, horodatage des requêtes) nécessaires au
            fonctionnement et à la sécurité du service, conformément à sa
            propre politique de confidentialité.
          </p>

          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez de droits d’accès, de
            rectification et d’effacement sur les données vous concernant.
            Le site ne collectant pas de données personnelles en propre, ces
            demandes concerneront le plus souvent les tiers cités ci-dessus.
            Pour toute question : [adresse e-mail de contact à compléter].
          </p>
        </div>
      </div>
    </article>
  )
}
