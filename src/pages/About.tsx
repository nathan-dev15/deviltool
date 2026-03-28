import React from "react";
import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Sparkles, Mail, ChevronRight, LayoutDashboard } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

export const About: React.FC = () => {
  const { t } = useI18n();

  return (
    <ToolPageWrapper
      title={t('label.about_title')}
      description={t('label.about_desc')}
      breadcrumbs={[{ label: "Company", href: "#" }, { label: "About" }]}
      accentColor="primary"
    >
      <SEO
        title="About ToolNest | Free Online Tools"
        description="Learn about ToolNest: our mission, how we handle privacy, and how we keep tools free for everyone."
        keywords="about toolnest, online tools, developer tools, privacy friendly tools"
      />

      <div className="mt-12 grid lg:grid-cols-12 gap-12 animate-fade-in">
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black tracking-tight text-on-surface flex items-center gap-4 mb-8">
              <Building2 className="size-8 text-primary group-hover:scale-110 transition-transform" />
              {t('label.about_section_1_title')}
            </h2>
            <div className="space-y-6 text-on-surface-variant font-medium leading-relaxed italic opacity-85 text-lg">
              <p>{t('label.about_section_1_p1')}</p>
              <p>{t('label.about_section_1_p2')}</p>
            </div>
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black text-on-surface flex items-center gap-4 mb-8">
              <ShieldCheck className="size-8 text-tertiary group-hover:scale-110 transition-transform" />
              {t('label.about_section_2_title')}
            </h2>
            <div className="space-y-6 text-on-surface-variant font-medium leading-relaxed italic opacity-85 text-lg">
              <p>{t('label.about_section_2_p1')}</p>
            </div>
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black text-on-surface flex items-center gap-4 mb-8">
              <Sparkles className="size-8 text-secondary group-hover:scale-110 transition-transform" />
              {t('label.about_section_3_title')}
            </h2>
            <div className="space-y-6 text-on-surface-variant font-medium leading-relaxed italic opacity-85 text-lg">
              <p>
                {t('label.about_section_3_p1')}
                {" "}
                <Link to="/privacy" className="text-primary font-bold hover:underline">
                    {t('footer.privacy')}
                </Link>
                .
              </p>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-high/40 p-8 rounded-[2.5rem] border border-outline-variant/20 sticky top-24 backdrop-blur-md">
            <h3 className="text-sm font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-10">{t('label.quick_links')}</h3>
            <div className="grid gap-4">
              <Link to="/contact" className="group flex items-center justify-between px-6 py-5 bg-surface-container-high rounded-2xl font-black text-xs uppercase tracking-widest text-on-surface hover:bg-primary hover:text-on-primary transition-all">
                <span className="flex items-center gap-3">
                    <Mail className="size-4" /> {t('nav.contact')}
                </span>
                <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/privacy" className="group flex items-center justify-between px-6 py-5 bg-surface-container-high rounded-2xl font-black text-xs uppercase tracking-widest text-on-surface hover:bg-tertiary hover:text-on-tertiary transition-all">
                {t('footer.privacy')} <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/terms" className="group flex items-center justify-between px-6 py-5 bg-surface-container-high rounded-2xl font-black text-xs uppercase tracking-widest text-on-surface hover:bg-secondary hover:text-on-secondary transition-all">
                {t('footer.terms')} <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
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
