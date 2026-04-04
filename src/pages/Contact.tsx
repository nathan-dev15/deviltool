import React from "react";
import { Mail, MessageSquare, ShieldAlert, LayoutDashboard, ChevronRight } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";
import { Link } from "react-router-dom";

const SUPPORT_EMAIL = "nsnathan15@yahoo.com";

export const Contact: React.FC = () => {
  const { t } = useI18n();

  return (
    <ToolPageWrapper
      title={t('label.contact_title')}
      description={t('label.contact_desc')}
      breadcrumbs={[{ label: "Company", href: "#" }, { label: t('nav.contact') }]}
      accentColor="secondary"
    >
      <SEO
        title="Contact Koobrain | Support & Feedback"
        description="Contact Koobrain support for help, bug reports, and feedback. We typically reply within 1-2 business days."
        keywords="contact koobrain, koobrain support, report bug, feedback"
      />

      <div className="mt-12 grid lg:grid-cols-12 gap-12 animate-fade-in">
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black tracking-tight text-on-surface flex items-center gap-4 mb-8">
              <MessageSquare className="size-8 text-secondary group-hover:scale-110 transition-transform" />
              {t('label.contact_title')}
            </h2>
            <p className="text-on-surface-variant font-medium leading-relaxed italic opacity-85 text-lg mb-10 border-l-4 border-secondary/20 pl-8">
              {t('label.contact_p1')} {t('label.contact_p2')}
            </p>

            <div className="grid gap-6">
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-high/40 px-6 py-5 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60">{t('label.email_support')}</p>
                  <a className="text-on-surface text-lg font-black hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                  <p className="text-on-surface-variant text-sm opacity-80">{t('label.support_notes_p3')}</p>
                </div>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary text-on-secondary px-5 py-3 font-black uppercase tracking-widest text-[11px] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20"
                >
                  <Mail className="size-4" />
                  {t('label.email_support')}
                </a>
              </div>

              <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-high/30 p-6">
                <p className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed font-medium">
                  <ShieldAlert className="size-4 text-secondary mt-0.5" />
                  {t('label.support_notes_p2')}
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low/30 p-10 rounded-[2.5rem] border border-outline-variant/20 sticky top-24 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full pointer-events-none" />
            
            <h3 className="text-sm font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-8">{t('label.support_notes')}</h3>
            <div className="space-y-6 text-sm text-on-surface-variant leading-relaxed font-medium italic opacity-85">
              <p>
                {t('label.support_notes_p1')}
              </p>
              <div className="p-6 rounded-2xl border border-error/20 bg-error/5 group-hover:border-error/40 transition-colors">
                <p className="flex items-start gap-4">
                    <ShieldAlert className="size-5 text-error mt-0.5 shrink-0" />
                    {t('label.support_notes_p2')}
                </p>
              </div>
              <p className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px] pt-4">
                <ChevronRight className="size-3" />
                {t('label.support_notes_p3')}
              </p>
            </div>
          </div>
          
          <div className="p-8 text-center pt-16">
            <Link to="/tools" className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:translate-x-1 transition-transform">
                {t('label.view_all_tools')}
                <LayoutDashboard className="size-4" />
            </Link>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
