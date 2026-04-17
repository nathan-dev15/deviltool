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

          {/* How we build tools */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-3xl font-black text-on-surface flex items-center gap-4 mb-8">
              <Sparkles className="size-8 text-secondary group-hover:scale-110 transition-transform" />
              How We Build and Verify Tools
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Every tool on KooBrain follows a deliberate build process: the core logic is authored by developers with domain expertise in that area (encoding, security, data formats), cross-checked against the relevant specification or RFC, and tested against real-world edge cases before release. We don't ship tools until they produce correct output consistently.
              </p>
              <p className="text-base">
                Client-side processing is a first-class requirement — not a feature. Every tool that handles user data is verified to operate entirely within the browser before it goes live. We review this as part of every release cycle.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Spec-verified accuracy</p>
                  <p className="text-xs text-on-surface-variant">Tools are validated against official specifications (RFCs, ISO standards) to ensure correct output, not just plausible output.</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Always Free</p>
                  <p className="text-xs text-on-surface-variant">We believe in keeping productivity tools accessible to everyone, forever. No paywalls, no feature gating.</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Reliable & Fast</p>
                  <p className="text-xs text-on-surface-variant">Built with performance in mind. All processing happens locally so there's no server round-trip adding latency.</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="font-bold text-on-surface text-sm mb-2">Responsive to feedback</p>
                  <p className="text-xs text-on-surface-variant">User bug reports and suggestions directly drive our update backlog. Tools are improved continuously, not abandoned after launch.</p>
                </div>
              </div>
            </div>
          </section>

          {/* E-E-A-T — Editorial standards */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-3xl font-black text-on-surface mb-8">Editorial Standards</h2>
            <div className="space-y-5 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                KooBrain publishes <Link to="/guides" className="text-primary font-bold hover:underline">developer guides</Link> alongside its tools. Every guide is written to explain the underlying concept clearly and accurately — not to rank for keywords. We cite authoritative sources (RFCs, official documentation, academic research) and flag the limits of our explanations where simplifications are made for accessibility.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="font-bold text-on-surface text-sm mb-2">Our content criteria</p>
                <ul className="text-sm space-y-2 text-on-surface-variant">
                  <li>✓ <span className="font-semibold text-on-surface">Technically accurate:</span> content reviewed against specifications and tested with real data</li>
                  <li>✓ <span className="font-semibold text-on-surface">Written for humans:</span> jargon explained, examples included, no filler content</li>
                  <li>✓ <span className="font-semibold text-on-surface">Updated on change:</span> pages are revised when underlying specs or best practices change</li>
                  <li>✓ <span className="font-semibold text-on-surface">Honest about limitations:</span> we tell you when a tool has constraints, not just what it does well</li>
                </ul>
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
