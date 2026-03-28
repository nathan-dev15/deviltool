import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Scale, Info } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

export const Disclaimer: React.FC = () => {
  const { t } = useI18n();
  return (
    <ToolPageWrapper
      title={t("legal.disclaimer.title")}
      description={t("legal.disclaimer.description")}
      breadcrumbs={[{ label: t("legal.breadcrumb"), href: "#" }, { label: t("legal.disclaimer.title") }]}
      accentColor="error"
    >
      <SEO
        title={t("legal.disclaimer.seo_title")}
        description={t("legal.disclaimer.seo_desc")}
        keywords="disclaimer, toolnest disclaimer, no warranty, limitation of liability"
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-8 animate-fade-in">
        <div className="lg:col-span-8 space-y-8">
          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <AlertTriangle className="size-7 text-error" />
              {t("legal.disclaimer.general_h")}
            </h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.disclaimer.general_p1")}
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.disclaimer.general_p2")}
            </p>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <Scale className="size-7 text-secondary" />
              {t("legal.disclaimer.liability_h")}
            </h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.disclaimer.liability_p1")}
            </p>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <Info className="size-7 text-tertiary" />
              {t("legal.disclaimer.third_h")}
            </h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.disclaimer.third_p1")}
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.disclaimer.third_p2_prefix")}{" "}
              <Link className="text-primary font-bold hover:underline" to="/privacy">
                {t("legal.disclaimer.legal_privacy")}
              </Link>{" "}
              for details about cookies and advertising.
            </p>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="tool-card p-6 sticky top-24">
            <h3 className="text-xl font-black text-on-surface">{t("legal.disclaimer.legal_pages_h")}</h3>
            <div className="mt-4 grid gap-3">
              <Link to="/privacy" className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                {t("legal.disclaimer.legal_privacy")}
              </Link>
              <Link to="/terms" className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                {t("legal.disclaimer.legal_terms")}
              </Link>
              <Link to="/contact" className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                {t("legal.disclaimer.legal_contact")}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
