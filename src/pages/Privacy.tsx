import React from "react";
import { Link } from "react-router-dom";
import { Shield, Cookie, Globe, Mail } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

const SUPPORT_EMAIL = "support@toolnest.dev";

export const Privacy: React.FC = () => {
  const { t } = useI18n();
  return (
    <ToolPageWrapper
      title={t("legal.privacy.title")}
      description={t("legal.privacy.description")}
      breadcrumbs={[{ label: t("legal.breadcrumb"), href: "#" }, { label: t("legal.privacy.title") }]}
      accentColor="primary"
    >
      <SEO
        title={t("legal.privacy.seo_title")}
        description={t("legal.privacy.seo_desc")}
        keywords="privacy policy, toolnest privacy, adsense privacy, cookies policy"
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-8 animate-fade-in">
        <div className="lg:col-span-8 space-y-8">
          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <Shield className="size-7 text-primary" />
              {t("legal.privacy.overview_h")}
            </h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.privacy.overview_p1")} {t("legal.privacy.overview_p2")}
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              If you have questions, contact us at{" "}
              <a className="text-primary font-bold hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <Globe className="size-7 text-tertiary" />
              {t("legal.privacy.collect_h")}
            </h2>
            <div className="mt-4 space-y-4 text-on-surface-variant leading-relaxed">
              <p>{t("legal.privacy.collect_p1")}</p>
              <p>{t("legal.privacy.collect_p2")}</p>
              <p>{t("legal.privacy.collect_p3")}</p>
            </div>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <Cookie className="size-7 text-secondary" />
              {t("legal.privacy.cookies_h")}
            </h2>
            <div className="mt-4 space-y-4 text-on-surface-variant leading-relaxed">
              <p>{t("legal.privacy.cookies_p1")}</p>
              <p>{t("legal.privacy.cookies_p2")}</p>
              <p>{t("legal.privacy.cookies_p3")}</p>
            </div>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
              <Mail className="size-7 text-primary" />
              {t("legal.privacy.choices_h")}
            </h2>
            <div className="mt-4 space-y-4 text-on-surface-variant leading-relaxed">
              <p>{t("legal.privacy.choices_p1")}</p>
              <p>{t("legal.privacy.choices_p2")}</p>
            </div>
          </section>

          <section className="tool-card p-8 sm:p-10">
            <h2 className="text-2xl font-black text-on-surface">{t("legal.privacy.updates_h")}</h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.privacy.updates_p1")}
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {t("legal.privacy.related_prefix")}{" "}
              <Link className="text-primary font-bold hover:underline" to="/terms">
                {t("legal.terms.title")}
              </Link>{" "}
              and{" "}
              <Link className="text-primary font-bold hover:underline" to="/disclaimer">
                {t("legal.disclaimer.title")}
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="tool-card p-6 sticky top-24">
            <h3 className="text-xl font-black text-on-surface">{t("legal.privacy.quick_h")}</h3>
            <ul className="mt-4 grid gap-3 text-sm text-on-surface-variant">
              <li className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                {t("legal.privacy.quick_1")}
              </li>
              <li className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                {t("legal.privacy.quick_2")}
              </li>
              <li className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                {t("legal.privacy.quick_3")}
              </li>
              <li className="rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                {t("legal.privacy.quick_4")}{" "}
                <a className="text-primary font-bold hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
                  {SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
