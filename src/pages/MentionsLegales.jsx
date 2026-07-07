export default function MentionsLegales() {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
          Mentions légales
        </h1>

        <div className="prose-editorial mt-8">
          <h2>Éditeur du site</h2>
          <p>
            {/* TODO : compléter avec vos informations réelles avant mise en ligne publique */}
            Site édité par : [Nom / raison sociale à compléter]
            <br />
            Statut : [auto-entrepreneur / société — à compléter]
            <br />
            SIRET : [à compléter]
            <br />
            Contact : [adresse e-mail de contact à compléter]
            <br />
            Directeur de la publication : [à compléter]
          </p>

          <h2>Hébergement</h2>
          <p>
            Netlify, Inc. — 512 2nd Street, Suite 200, San Francisco, CA 94107,
            États-Unis — <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">netlify.com</a>
          </p>

          <h2>Nature du site — disclaimer important</h2>
          <p>
            VérifClim est un <strong>outil indépendant d’aide à la
            vérification</strong>. Il n’est affilié à aucune autorité publique
            et ne se substitue ni à la DGCCRF, ni à SignalConso, ni à aucun
            service de l’État. Les informations publiées le sont à titre
            purement informatif et ne constituent ni un conseil juridique, ni
            une décision administrative ou judiciaire.
          </p>
          <p>
            Les alertes affichées par l’outil de vérification reposent{' '}
            <strong>exclusivement sur des informations déjà publiées par des
            sources publiques identifiées</strong> (presse, communiqués
            officiels), systématiquement citées. VérifClim ne formule aucune
            accusation en propre à l’encontre de quelque entreprise que ce
            soit. L’absence d’alerte sur un nom ne constitue en aucun cas une
            garantie de fiabilité du site concerné.
          </p>
          <p>
            Si vous êtes l’exploitant d’un site mentionné et estimez qu’une
            information est inexacte ou a évolué (par exemple une décision de
            justice ou une mise à jour de la source citée), contactez-nous à
            l’adresse ci-dessus : nous examinerons la demande dans les
            meilleurs délais.
          </p>

          <h2>Liens d’affiliation</h2>
          <p>
            Certains liens vers des sites marchands (Amazon, Boulanger, Darty,
            Fnac, Cdiscount…) sont des liens d’affiliation : un achat effectué
            via ces liens peut générer une commission pour l’éditeur du site,
            sans aucun surcoût pour vous. La sélection des produits et les
            contenus éditoriaux ne sont pas influencés par ces partenariats.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus originaux de ce site (textes, logo,
            structure) est protégé par le droit d’auteur. Les marques citées
            appartiennent à leurs propriétaires respectifs ; leur mention à
            titre informatif ne confère aucun droit sur celles-ci.
          </p>

          <h2>Responsabilité</h2>
          <p>
            L’éditeur s’efforce d’assurer l’exactitude des informations
            publiées, qui reposent sur les sources citées à la date de leur
            consultation. Il ne saurait être tenu responsable des évolutions
            postérieures, des contenus des sites tiers vers lesquels des liens
            sont proposés, ni des décisions d’achat prises par les visiteurs.
          </p>
        </div>
      </div>
    </article>
  )
}
