import React from "react";
import { Helmet } from "react-helmet-async";
import { TOOL_SEO_BY_PATH } from "@/src/seo/toolSeo";
import { buildFaqJsonLd, buildToolSeoPage } from "@/src/seo/generateToolSeo";
import { useI18n } from "@/src/i18n/I18nContext";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  jsonLd?: object | object[];
  noIndex?: boolean;
  children?: React.ReactNode;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "",
  canonicalUrl,
  jsonLd: jsonLdProp,
  noIndex = false,
  children
}) => {
  const { locale } = useI18n();

  const toolCfg = typeof window !== "undefined"
    ? TOOL_SEO_BY_PATH[window.location.pathname]
    : undefined;
  const toolPage = toolCfg ? buildToolSeoPage(toolCfg, { locale }) : undefined;

  const finalTitle = toolPage?.seoTitle ?? title;
  const finalDescription = toolPage?.metaDescription ?? description;
  const finalKeywords = toolPage
    ? [toolPage.mainKeyword, ...toolPage.secondaryKeywords].join(", ")
    : keywords;

  const resolvedCanonicalUrl =
    canonicalUrl ?? (typeof window !== "undefined"
      ? window.location.origin + window.location.pathname + window.location.search
      : "");

  const autoJsonLd = React.useMemo(() => {
    if (jsonLdProp) return jsonLdProp;
    if (typeof window === "undefined") return undefined;
    const cfg = TOOL_SEO_BY_PATH[window.location.pathname];
    if (!cfg) return undefined;
    const page = buildToolSeoPage(cfg, { locale });
    return buildFaqJsonLd(page.toolName, page.faqs);
  }, [jsonLdProp, locale]);

  return (
    <Helmet>

      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />

      {finalKeywords && (
        <meta name="keywords" content={finalKeywords} />
      )}

      {resolvedCanonicalUrl && (
        <link rel="canonical" href={resolvedCanonicalUrl} />
      )}

      {noIndex && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {/* OpenGraph */}

      <meta property="og:title" content={finalTitle} />

      <meta property="og:description" content={finalDescription} />

      {resolvedCanonicalUrl && (
        <meta property="og:url" content={resolvedCanonicalUrl} />
      )}

      <meta property="og:type" content="website" />

      {/* Twitter */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={finalTitle} />

      <meta name="twitter:description" content={finalDescription} />

      {autoJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(autoJsonLd)}
        </script>
      )}

      {children}

    </Helmet>
  );
};
