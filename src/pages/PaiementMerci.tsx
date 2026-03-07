import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function PaiementMerci() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Délai pour l'animation
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white flex items-center justify-center px-4 py-16">
      <div
        className={`max-w-lg w-full text-center transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Icône succès */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
          Merci pour votre commande !
        </h1>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Votre paiement a bien été reçu. Notre équipe va vous contacter
          dans les prochaines 24h pour démarrer votre biographie.
        </p>

        {/* Ce qui se passe ensuite */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 text-left">
          <h2 className="font-display font-bold text-gray-800 mb-4 text-center">
            Prochaines étapes
          </h2>
          <ol className="space-y-3">
            {[
              "Vous recevrez un email de confirmation sous quelques minutes",
              "Notre équipe vous contacte sous 24h pour planifier votre entretien",
              "Une à deux sessions d'entretien de 45 min (par visio ou téléphone)",
              "Rédaction et révision de votre biographie",
              "Livraison du document finalisé",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-mywai/10 text-mywai rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {sessionId && (
          <p className="text-xs text-gray-400 mb-6">
            Référence commande : {sessionId.slice(-12)}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-mywai text-white px-6 py-3 rounded-xl font-medium hover:bg-mywai-dark transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <a
            href="mailto:contact@my-w.ai"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:border-mywai hover:text-mywai transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}
