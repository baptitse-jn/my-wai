import React from "react";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../ui/button/Button";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white relative" id="contact">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-mywai-light/30 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-0 w-80 h-80 bg-mywai/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <h2 className="section-title">{t("contact_section.title")}</h2>
        <p
          className="section-subtitle"
          dangerouslySetInnerHTML={{ __html: t("contact_section.subtitle") }}
        ></p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-cream p-6 rounded-xl">
              <h3 className="text-xl font-display font-bold mb-4">
                {t("contact_section.help_section.title")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("contact_section.help_section.description")}
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-mywai mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">
                      {t("contact_section.help_section.email_label")}
                    </h4>
                    <p className="text-muted-foreground">
                      {t("contact_section.help_section.email_value")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-mywai mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">
                      {t("contact_section.help_section.chat_label")}
                    </h4>
                    <p className="text-muted-foreground">
                      {t("contact_section.help_section.chat_hours")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-mywai p-6 rounded-xl text-white">
              <h3 className="text-xl font-display font-bold mb-4">
                {t("contact_section.start_project.title")}
              </h3>
              <p className="mb-6 text-white/90">
                {t("contact_section.start_project.description")}
              </p>
              <Button
                variant="outline"
                size="md"
                endIcon={<ArrowRight className="h-4 w-4" />}
                className="!bg-white !text-mywai-dark !border-white hover:!bg-gray-50"
              >
                {t("contact_section.start_project.button")}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3 bg-cream rounded-xl p-6 md:p-8 shadow-md">
            <h3 className="text-xl font-display font-bold mb-6">
              {t("contact_section.form.title")}
            </h3>

            <form
              className="space-y-5"
              action="https://formspree.io/f/xanpygdo"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("contact_section.form.name_label")}
                  </label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mywai focus:border-mywai outline-none transition-colors"
                    placeholder={t("contact_section.form.name_placeholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("contact_section.form.email_label")}
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mywai focus:border-mywai outline-none transition-colors"
                    placeholder={t("contact_section.form.email_placeholder")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  {t("contact_section.form.subject_label")}
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mywai focus:border-mywai outline-none transition-colors"
                  placeholder={t("contact_section.form.subject_placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  {t("contact_section.form.message_label")}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mywai focus:border-mywai outline-none transition-colors"
                  placeholder={t("contact_section.form.message_placeholder")}
                ></textarea>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full !bg-mywai hover:!bg-mywai-dark !text-white"
              >
                {t("contact_section.form.submit_button")}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t("contact_section.form.privacy_notice")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
