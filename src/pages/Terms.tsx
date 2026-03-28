import React from "react";
import { Link } from "react-router-dom";
import { FileText, ShieldAlert } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

export const Terms: React.FC = () => {
  const { t } = useI18n();
  return (
    <ToolPageWrapper
      title={t("legal.terms.title")}
      description={t("legal.terms.description")}
      breadcrumbs={[{ label: t("legal.breadcrumb"), href: "#" }, { label: t("legal.terms.title") }]}
      accentColor="secondary"
    >
      <SEO
        title={t("legal.terms.seo_title")}
        description={t("legal.terms.seo_desc")}
        keywords="terms and conditions, toolnest terms, acceptable use, limitations"
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-8 animate-fade-in">
        <div className="lg:col-span-8 space-y-8">
          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <FileText className="size-7 text-secondary" />
              {t("legal.terms.agreement_h")}
            </h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.terms.agreement_p1")}
            </p>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface">{t("legal.terms.acceptable_h")}</h2>
            <div className="mt-4 space-y-4 text-on-surface-variant leading-relaxed">
              <p>{t("legal.terms.acceptable_p1")}</p>
              <p>{t("legal.terms.acceptable_p2")}</p>
            </div>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface">{t("legal.terms.accuracy_h")}</h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.terms.accuracy_p1")}
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              See the{" "}
              <Link className="text-primary font-bold hover:underline" to="/disclaimer">
                {t("legal.disclaimer.title")}
              </Link>{" "}
              for more details.
            </p>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface">{t("legal.terms.ip_h")}</h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.terms.ip_p1")}
            </p>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface">{t("legal.terms.changes_h")}</h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.terms.changes_p1")}
            </p>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="tool-card p-6 sticky top-24">
            <h3 className="text-xl font-black text-on-surface">{t("legal.terms.related_h")}</h3>
            <div className="mt-4 grid gap-3">
              <Link to="/privacy" className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                {t("legal.terms.related_privacy")}
              </Link>
              <Link to="/disclaimer" className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                {t("legal.terms.related_disclaimer")}
              </Link>
              <Link to="/contact" className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors inline-flex items-center gap-2">
                <ShieldAlert className="size-4 text-error" /> {t("legal.terms.related_report")}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
