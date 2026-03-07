import { Link } from "react-router-dom";

export default function PaiementAnnulation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
          </svg>
        </div>

        <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
          Paiement annulé
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Votre paiement n&apos;a pas été finalisé. Aucun montant n&apos;a été débité.
          Vous pouvez réessayer quand vous le souhaitez.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/#pricing"
            className="inline-flex items-center justify-center gap-2 bg-mywai text-white px-6 py-3 rounded-xl font-medium hover:bg-mywai-dark transition-colors"
          >
            Réessayer
          </Link>
          <a
            href="mailto:contact@my-w.ai"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:border-mywai hover:text-mywai transition-colors"
          >
            Besoin d&apos;aide ?
          </a>
        </div>
      </div>
    </div>
  );
}
