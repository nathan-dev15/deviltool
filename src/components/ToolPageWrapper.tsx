import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useI18n } from '@/src/i18n/I18nContext';
import { TOOL_SEO_BY_PATH } from '@/src/seo/toolSeo';
import { buildToolSeoPage } from '@/src/seo/generateToolSeo';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ToolPageWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  accentColor?: 'primary' | 'tertiary' | 'secondary' | 'error';
}

const accentMap = {
  primary: {
    badge: 'text-primary bg-primary/10 border-primary/20',
    glow: 'from-primary/20 via-transparent to-transparent',
    text: 'text-primary',
  },
  tertiary: {
    badge: 'text-tertiary bg-tertiary/10 border-tertiary/20',
    glow: 'from-tertiary/15 via-transparent to-transparent',
    text: 'text-tertiary',
  },
  secondary: {
    badge: 'text-secondary bg-secondary/10 border-secondary/20',
    glow: 'from-secondary/15 via-transparent to-transparent',
    text: 'text-secondary',
  },
  error: {
    badge: 'text-error bg-error/10 border-error/20',
    glow: 'from-error/15 via-transparent to-transparent',
    text: 'text-error',
  },
};

export const ToolPageWrapper: React.FC<ToolPageWrapperProps> = ({
  children,
  title,
  description,
  breadcrumbs = [],
  accentColor = 'primary',
}) => {
  const accent = accentMap[accentColor];
  const { t, locale } = useI18n();
  const location = useLocation();

  const toolCfg = TOOL_SEO_BY_PATH[location.pathname];
  const localizedSeo = toolCfg ? buildToolSeoPage(toolCfg, { locale }) : undefined;

  // For non-English locales, prefer localized tool name + short meta description.
  const displayTitle =
    (!String(locale).toLowerCase().startsWith('en') && localizedSeo)
      ? localizedSeo.toolName
      : title;

  const displayDescription =
    (!String(locale).toLowerCase().startsWith('en') && localizedSeo)
      ? localizedSeo.metaDescription
      : description;

  return (
    <div className="min-h-screen">
      {/* Page hero header */}
      <div className="relative overflow-hidden">
        {/* Background gradient glow */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-b opacity-60 pointer-events-none',
          accent.glow
        )} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          {/* Breadcrumb */}
          {(breadcrumbs.length > 0) && (
            <nav className="flex mb-5 text-sm font-medium text-on-surface-variant" aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 flex-wrap">
                <li className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                  <Link to="/" className="flex items-center gap-1">
                    <HomeIcon className="size-3.5" /> {t('common.home')}
                  </Link>
                </li>
                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={i}>
                    <li className="text-outline"><ChevronRight className="size-3.5" /></li>
                    <li className={cn(
                      i === breadcrumbs.length - 1
                        ? accent.text + ' font-semibold'
                        : 'hover:text-primary transition-colors cursor-pointer'
                    )}>
                      {crumb.href ? (
                        <Link to={crumb.href}>{crumb.label}</Link>
                      ) : (
                        crumb.label
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-3 leading-tight">
            {displayTitle}
          </h1>
          {displayDescription && (
            <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {children}
      </div>
    </div>
  );
};
