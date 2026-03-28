import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink, HelpCircle, ListChecks, Sparkles, ArrowRight } from "lucide-react";
import { buildToolSeoPage } from "@/src/seo/generateToolSeo";
import type { ToolSeoConfig } from "@/src/seo/toolSeo";
import { useI18n } from "@/src/i18n/I18nContext";

export const ToolSeoArticle: React.FC<{ config: ToolSeoConfig }> = ({ config }) => {
  const { t, locale } = useI18n();
  const page = buildToolSeoPage(config, { locale });
  const location = useLocation();

  const withLang = React.useCallback((href: string) => {
    try {
      const sp = new URLSearchParams(location.search);
      const lang = sp.get("lang");
      if (!lang) return href;
      const sep = href.includes("?") ? "&" : "?";
      return `${href}${sep}lang=${encodeURIComponent(lang)}`;
    } catch {
      return href;
    }
  }, [location.search]);

  return (
    <article className="mt-14">
      <div className="relative overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container p-6 sm:p-10 shadow-sm">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-tertiary/12 blur-[60px] pointer-events-none" />

        <header className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-variant/40 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-on-surface-variant">
            <Sparkles className="size-4 text-tertiary" />
            {t('seo.badge')}
          </p>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            {page.h1}
          </h2>
          <p className="mt-4 max-w-3xl text-on-surface-variant leading-relaxed">
            {page.intro}
          </p>
        </header>

        <section className="relative mt-10">
          <h3 className="text-xl font-extrabold text-on-surface flex items-center gap-2">
            <ListChecks className="size-5 text-primary" />
            {t('seo.how_to_use')}
          </h3>
          <ol className="mt-4 grid gap-3">
            {page.howToSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-outline-variant/25 bg-surface-container-low px-4 py-3">
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary font-black">
                  {i + 1}
                </span>
                <span className="text-sm sm:text-base text-on-surface">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="relative mt-10">
          <h3 className="text-xl font-extrabold text-on-surface">{t('seo.features')}</h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {page.features.map((f, i) => (
              <li key={i} className="rounded-2xl border border-outline-variant/25 bg-surface-container-low px-4 py-3 text-sm text-on-surface">
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="relative mt-10">
          <h3 className="text-xl font-extrabold text-on-surface">{t('seo.benefits')}</h3>
          <ul className="mt-4 grid gap-3">
            {page.benefits.map((b, i) => (
              <li key={i} className="rounded-2xl border border-outline-variant/25 bg-surface-container-low px-4 py-3 text-sm text-on-surface">
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section className="relative mt-10">
          <h3 className="text-xl font-extrabold text-on-surface flex items-center gap-2">
            <HelpCircle className="size-5 text-secondary" />
            {t('seo.faq')}
          </h3>
          <div className="mt-4 grid gap-3">
            {page.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-outline-variant/25 bg-surface-container-low px-4 py-3"
              >
                <summary className="cursor-pointer list-none font-bold text-on-surface flex items-center justify-between gap-4">
                  <span>{f.question}</span>
                  <span className="text-on-surface-variant group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="relative mt-10">
          <h3 className="text-xl font-extrabold text-on-surface">{t('seo.internal_links')}</h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {page.internalLinks.map((l) => (
              <li key={l.href} className="rounded-2xl border border-outline-variant/25 bg-surface-container-low px-4 py-3">
                <Link to={withLang(l.href)} className="font-bold text-on-surface hover:text-primary transition-colors inline-flex items-center gap-2">
                  {l.label} <ArrowRight className="size-4" />
                </Link>
                {l.note && <p className="mt-1 text-sm text-on-surface-variant">{l.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="relative mt-10">
          <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/18 via-surface-container to-surface-container-high p-6 sm:p-8">
            <h3 className="text-2xl font-black tracking-tight text-on-surface">
              {page.cta.headline}
            </h3>
            <p className="mt-2 text-on-surface-variant max-w-2xl">{page.cta.copy}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to={withLang(page.cta.buttonHref)}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors"
              >
                {page.cta.buttonText} <ArrowRight className="size-4" />
              </Link>
              <Link
                to={withLang("/")}
                className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/35 bg-surface-container-low px-6 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors"
              >
                {t('seo.see_more_tools')} <ExternalLink className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <footer className="relative mt-10 rounded-2xl border border-outline-variant/25 bg-surface-container-low px-4 py-4 text-sm text-on-surface-variant">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              <strong className="text-on-surface">{t('seo.suggested_url')}:</strong> {page.urlSlug}
            </span>
            <span>
              <strong className="text-on-surface">{t('seo.suggested_alt')}:</strong> {page.imageAltText}
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
};
