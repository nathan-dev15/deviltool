import React from "react";
import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Sparkles, Mail, ChevronRight, Calendar, Code2, Users } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";
import { TOOLS } from "@/src/constants";

const LAST_UPDATED = "May 2025";
const SUPPORT_EMAIL = "nsnathan15@yahoo.com";

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

          {/* About This Site — identity + last updated */}
          <section className="bg-primary/5 border border-primary/20 px-10 py-10 rounded-[2.5rem]">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                <Calendar className="size-3" /> Last updated: {LAST_UPDATED}
              </span>
            </div>
            <h2 className="text-2xl font-black text-on-surface mb-4">About KooBrain</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed text-sm">
              <p>
                KooBrain is a free, browser-based productivity platform built and maintained by an independent web developer passionate about making professional-grade tools accessible to everyone without cost or complexity. The platform launched with a simple premise: every task a developer, designer, or knowledge worker performs on scattered websites or expensive desktop software should be available in one clean, instant, privacy-respecting interface.
              </p>
              <p>
                Today KooBrain offers <strong className="text-on-surface">{TOOLS.length}+ tools</strong> across categories including JSON processing, encoding/decoding, image editing, PDF management, financial calculators, text utilities, and security tools. All tools run entirely client-side — your data is processed inside your browser and never transmitted to any server.
              </p>
              <p>
                The site is self-funded and supported by contextual Google AdSense advertisements. Revenue is reinvested into new tools, performance improvements, and expanded guide content. There is no premium tier, no data monetization, and no account requirement — ever.
              </p>
            </div>
          </section>

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
          {/* Quick Facts */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-8 rounded-[2.5rem] space-y-5">
            <h3 className="text-sm font-black text-on-surface uppercase tracking-widest">Quick Facts</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <Code2 className="size-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Platform type</span>
                  <span className="text-on-surface-variant text-xs">Browser-based, client-side SPA built with React + Vite</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Users className="size-4 text-secondary mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Who builds it</span>
                  <span className="text-on-surface-variant text-xs">Independent developer — full-stack web engineering background</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <ShieldCheck className="size-4 text-tertiary mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Data handling</span>
                  <span className="text-on-surface-variant text-xs">Zero server-side processing — all tools run in the browser</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Sparkles className="size-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Monetisation</span>
                  <span className="text-on-surface-variant text-xs">Google AdSense contextual ads — no user data sold</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Calendar className="size-4 text-secondary mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Last updated</span>
                  <span className="text-on-surface-variant text-xs">{LAST_UPDATED}</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="size-4 text-tertiary mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Contact</span>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary font-bold text-xs hover:underline break-all">{SUPPORT_EMAIL}</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="bg-surface-container-high/40 p-8 rounded-[2.5rem] border border-outline-variant/20 backdrop-blur-md">
            <h3 className="text-sm font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-6">{t('label.quick_links')}</h3>
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
              <Link to="/guides" className="group flex items-center justify-between px-6 py-5 bg-surface-container-high rounded-2xl font-black text-xs uppercase tracking-widest text-on-surface hover:bg-secondary hover:text-on-secondary transition-all">
                Guides &amp; Articles <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
