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
        title="About Koobrain | Free Online Tools"
        description="Learn about Koobrain: our mission, how we handle privacy, and how we keep tools free for everyone."
        keywords="about koobrain, online tools, developer tools, privacy friendly tools"
      />

      <div className="mt-12 grid lg:grid-cols-12 gap-12 animate-fade-in">
        <div className="lg:col-span-8 space-y-12">
          {/* Mission */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black tracking-tight text-on-surface flex items-center gap-4 mb-8">
              <Building2 className="size-8 text-primary group-hover:scale-110 transition-transform" />
              Our Mission & Vision
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain was created with a simple yet powerful mission: <span className="text-primary font-bold">to provide free, high-quality online tools that simplify everyday tasks</span>. We believe productivity software shouldn't be expensive or complicated.
              </p>
              <p className="text-base">
                In today's digital world, professionals and students waste valuable time searching for reliable tools across different websites. Our vision is to become your one-stop destination for all your online productivity needs — everything from data formatting to file conversion, all in one place, all completely free.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-6">
                <p className="font-bold text-on-surface text-sm mb-2">Why We Built Koobrain:</p>
                <ul className="text-sm space-y-2 text-on-surface-variant">
                  <li>✓ Eliminate the need for expensive software subscriptions</li>
                  <li>✓ Provide instant, browser-based solutions with zero installation</li>
                  <li>✓ Protect user privacy with client-side processing</li>
                  <li>✓ Create a resource for developers, designers, and content creators worldwide</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy & Trust */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black text-on-surface flex items-center gap-4 mb-8">
              <ShieldCheck className="size-8 text-tertiary group-hover:scale-110 transition-transform" />
              Privacy & Data Protection
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                <span className="text-tertiary font-bold">Your privacy is sacred to us.</span> Unlike many online tools, Koobrain processes all data directly in your browser. Your information never touches our servers, and we don't collect, store, or track any personal data.
              </p>
              <div className="bg-tertiary/5 border border-tertiary/20 rounded-xl p-5">
                <p className="font-bold text-on-surface text-sm mb-3">Our Privacy Commitment:</p>
                <ul className="text-sm space-y-2 text-on-surface-variant">
                  <li>🔒 <span className="font-semibold text-on-surface">Zero Data Collection:</span> No tracking, no analytics of your content</li>
                  <li>🔒 <span className="font-semibold text-on-surface">Client-Side Processing:</span> Everything happens on your device</li>
                  <li>🔒 <span className="font-semibold text-on-surface">No Registration Required:</span> Use all tools instantly without signing up</li>
                  <li>🔒 <span className="font-semibold text-on-surface">No Ads on Data:</span> We don't sell or share your information</li>
                </ul>
              </div>
              <p className="text-base mt-6">
                For complete details, please review our full <Link to="/privacy" className="text-tertiary font-bold hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </section>

          {/* Leadership & E-A-T */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-3xl font-black text-on-surface mb-8">Engineering & Editorial Excellence</h2>
            <div className="space-y-8">
              <p className="text-base text-on-surface-variant leading-relaxed">
                KooBrain isn't just a collection of scripts; it's a platform built by a dedicated team of full-stack developers, SEO specialists, and technical writers. We follow the Google E-A-T (Expertise, Authoritativeness, and Trustworthiness) guidelines to ensure every tool and piece of content we provide is accurate, secure, and helpful.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4 items-start">
                   <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="size-6 text-primary" />
                   </div>
                   <div>
                      <h4 className="font-bold text-on-surface">Precision Engineering</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Our tools are built using modern web technologies like React and WebAssembly to ensure high-performance, client-side processing.</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="size-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="size-6 text-secondary" />
                   </div>
                   <div>
                      <h4 className="font-bold text-on-surface">Data Integrity Team</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Our security experts audit every tool to ensure your data never leaves your browser, maintaining 100% privacy.</p>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quality & Innovation */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black text-on-surface flex items-center gap-4 mb-8">
              <Sparkles className="size-8 text-secondary group-hover:scale-110 transition-transform" />
              Quality, Innovation & Support
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Every tool on Koobrain is carefully built and continuously improved based on user feedback. We're committed to maintaining the highest standards of functionality, accuracy, and user experience.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Regular Updates</p>
                  <p className="text-xs text-on-surface-variant">We continuously improve tools based on user feedback and emerging needs.</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Always Free</p>
                  <p className="text-xs text-on-surface-variant">We believe in keeping productivity tools accessible to everyone, forever.</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Reliable & Fast</p>
                  <p className="text-xs text-on-surface-variant">Built with performance in mind to handle large files and heavy workloads.</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Expert Support</p>
                  <p className="text-xs text-on-surface-variant">Have questions? Our team is ready to help via email or contact form.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Get in Touch */}
          <section className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-outline-variant/20 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Get in Touch</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              Have feedback, suggestions, or want to report an issue? We'd love to hear from you! Reach out to us anytime.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-2xl font-bold hover:scale-105 transition-transform">
              <Mail className="size-5" /> Contact Us
            </Link>
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
          
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
