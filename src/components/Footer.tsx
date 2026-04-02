import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getAssetPath } from "../lib/utils";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-mywai/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="relative h-14 w-14">
                <img
                  src={getAssetPath("logo_mywai_no_bg.png")}
                  alt="Logo My Wai"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-2xl font-display font-bold text-mywai-dark">
                My Wai
              </span>
            </a>
            <p className="text-muted-foreground">
              {t("footer.brand_description")}
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold mb-4">
              {t("footer.quick_links.title")}
            </h3>
            <ul className="space-y-2">

              <li>
                <a
                  href="#process"
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  {t("footer.quick_links.process")}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  {t("footer.quick_links.pricing")}
                </a>
              </li>
              <li>
                <a
                  href="/blogues"
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  {t("footer.quick_links.testimonials")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold mb-4">
              {t("footer.information.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  {t("footer.information.faq")}
                </a>
              </li>
              <li>
                <Link
                  to="/mentions-legales"
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  {t("footer.information.legal")}
                </Link>
              </li>
              <li>
                <Link
                  to="/cgu"
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  {t("footer.information.terms")}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // @ts-ignore
                    if (typeof window !== 'undefined' && window.Sddan?.cmp?.displayUI) {
                      // @ts-ignore
                      window.Sddan.cmp.displayUI();
                    }
                  }}
                  className="text-muted-foreground hover:text-mywai transition-colors"
                >
                  {t("footer.information.cookies")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold mb-4">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                {t("footer.contact.email")}:
                <a
                  href={`mailto:${t("footer.contact.email_value")}`}
                  className="text-mywai hover:text-mywai-dark transition-colors ml-1"
                >
                  {t("footer.contact.email_value")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-mywai/10 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} My Wai. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
