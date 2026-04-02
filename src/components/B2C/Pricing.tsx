import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../ui/button/Button";
import { useCheckout } from "../../hooks/useCheckout";

const Pricing = () => {
  const { t } = useTranslation();
  const { startCheckout, loading, error } = useCheckout();

  const features = t("pricing_section.features", {
    returnObjects: true,
  }) as string[];

  return (
    <section className="section-padding bg-white relative" id="pricing">
      {" "}
      <div className="container mx-auto px-4">
        <h2 className="section-title">{t("pricing_section.title")}</h2>
        <p className="section-subtitle">{t("pricing_section.subtitle")}</p>

        <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-mywai-light/30 to-mywai/30 rounded-2xl shadow-xl p-1">
          <div className="bg-white rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              {/* Badge removed as per request */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <span className="text-3xl font-display font-bold text-muted-foreground line-through">
                  {t("pricing_section.price")}
                </span>
                <span className="text-5xl font-display font-bold text-mywai">
                  {t("pricing_section.price_promo")}
                </span>
                <span className="ml-2 text-muted-foreground">
                  {t("pricing_section.price_suffix")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-display font-bold mb-4">
                  {t("pricing_section.features_title")}
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-mywai mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-cream rounded-xl p-6">
                <h3 className="text-xl font-display font-bold mb-4">
                  {t("pricing_section.how_to_title")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("pricing_section.how_to_description")}
                </p>
                <Button
                  variant="primary"
                  size="md"
                  endIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  onClick={() => startCheckout({ offer: "b2c_49" })}
                  disabled={loading}
                  className="w-full !bg-mywai hover:!bg-mywai-dark !text-white disabled:opacity-70"
                >
                  {loading ? "Redirection..." : t("pricing_section.cta_button")}
                </Button>
                {error && (
                  <p className="text-xs text-red-500 text-center mt-2">{error}</p>
                )}
                <form method="POST" action="https://app.my-w.ai/gift_cards" className="mt-3">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    endIcon={<ArrowRight className="h-4 w-4" />}
                    className="w-full !bg-mywai hover:!bg-mywai-dark !text-white"
                  >
                    {t("pricing_section.gift_card_button")}
                  </Button>
                </form>
                <p className="text-sm text-center text-muted-foreground mt-4">
                  {t("pricing_section.payment_security")}
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-medium mb-2">
                {t("pricing_section.additional_options_title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("pricing_section.additional_options_description")}
              </p>
            </div>
          </div>
        </div>

        {/* "Voir les avis clients" link removed as per request */}
      </div>
    </section>
  );
};

export default Pricing;
