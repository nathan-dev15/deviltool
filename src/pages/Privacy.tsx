import React from "react";
import { Link } from "react-router-dom";
import { Shield, Cookie, Globe, Mail } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

const SUPPORT_EMAIL = "nsnathan15@yahoo.com";

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
        keywords="privacy policy, koobrain privacy, adsense privacy, cookies policy"
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-8 animate-fade-in">
        <div className="lg:col-span-8 space-y-8">
          {/* Overview */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3 mb-6">
              <Shield className="size-7 text-primary" />
              Privacy Policy Overview
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                At Koobrain, we are deeply committed to protecting your privacy and ensuring transparency about how we handle your information. This Privacy Policy explains our data practices for koobrain.com. Our fundamental principle is simple: <span className="text-primary font-bold">your data belongs to you, and we don't collect or store it.</span>
              </p>
              <p className="text-base">
                This policy was last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. We may update this policy from time to time, so please review it regularly. If you have questions about our privacy practices, contact us at{" "}
                <a className="text-primary font-bold hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
                  {SUPPORT_EMAIL}
                </a>.
              </p>
            </div>
          </section>

          {/* Data We Don't Collect */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3 mb-6">
              <Globe className="size-7 text-tertiary group-hover:scale-110 transition-transform" />
              What Data We Don't Collect
            </h2>
            <div className="space-y-5 text-on-surface-variant leading-relaxed">
              <p className="text-base font-semibold text-on-surface">
                Koobrain tools process all data directly in your web browser. Your information never reaches our servers.
              </p>
              <div className="bg-tertiary/5 border border-tertiary/20 rounded-xl p-6 space-y-3">
                <p className="text-sm"><span className="font-bold text-on-surface">✓ No Content Monitoring:</span> We don't observe, log, or store the content you process through our tools</p>
                <p className="text-sm"><span className="font-bold text-on-surface">✓ No Usage Analytics:</span> We don't track which tools you use or how frequently you use them</p>
                <p className="text-sm"><span className="font-bold text-on-surface">✓ No Behavioral Tracking:</span> We don't store information about your browsing patterns or device behavior</p>
                <p className="text-sm"><span className="font-bold text-on-surface">✓ No Personal Data Collection:</span> We don't collect names, emails, phone numbers, or other identifiable information</p>
                <p className="text-sm"><span className="font-bold text-on-surface">✓ No File Storage:</span> Files you upload or convert are processed instantly and never saved on our servers</p>
              </div>
            </div>
          </section>

          {/* Browser Technology */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Client-Side Processing Technology</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain uses <span className="font-bold text-on-surface">client-side processing</span>, which means all our tools run entirely within your web browser. When you use any Koobrain tool:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-sm ml-2">
                <li><span className="font-semibold text-on-surface">Your data stays on your device</span> — Never transmitted to our servers</li>
                <li><span className="font-semibold text-on-surface">Processing happens locally</span> — Your browser performs all calculations and transformations</li>
                <li><span className="font-semibold text-on-surface">Instant results</span> — No waiting for server responses means faster processing</li>
                <li><span className="font-semibold text-on-surface">Works offline</span> — Most tools function even without an internet connection after the page loads</li>
              </ol>
              <p className="text-base mt-4 bg-secondary/5 border border-secondary/20 rounded-lg p-4 text-sm">
                <span className="font-bold text-on-surface">Technical Implementation:</span> We use WebAssembly, JavaScript libraries, and browser APIs to process your data. This provides both privacy and performance benefits.
              </p>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3 mb-6">
              <Cookie className="size-7 text-secondary group-hover:scale-110 transition-transform" />
              Cookies & Web Technologies
            </h2>
            <div className="space-y-5 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain uses minimal tracking and respects Do Not Track (DNT) requests. Here's what happens on our site:
              </p>
              <div className="space-y-4">
                <div className="border border-secondary/20 rounded-lg p-4 bg-secondary/5">
                  <p className="font-bold text-on-surface text-sm mb-2">Localization Cookie</p>
                  <p className="text-sm">We store your language preference in a local cookie so Koobrain displays in your chosen language on return visits.</p>
                </div>
                <div className="border border-secondary/20 rounded-lg p-4 bg-secondary/5">
                  <p className="font-bold text-on-surface text-sm mb-2">Google AdSense (Third-Party)</p>
                  <p className="text-sm">We use Google AdSense to display contextual advertisements. Google sets cookies to serve relevant ads. Read <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-secondary font-bold hover:underline">Google's privacy policy</a> for details.</p>
                </div>
                <div className="border border-secondary/20 rounded-lg p-4 bg-secondary/5">
                  <p className="font-bold text-on-surface text-sm mb-2">Performance Monitoring</p>
                  <p className="text-sm">We may use minimal analytics to identify technical issues and improve performance, but this respects your privacy preferences.</p>
                </div>
              </div>
              <p className="text-base mt-4">
                <span className="font-semibold text-on-surface">Ad Consent:</span> When you first visit, we ask for your consent regarding personalized ads. You can change this preference at any time through our Ad Consent Banner.
              </p>
            </div>
          </section>

          {/* Your Rights & Control */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3 mb-6">
              <Shield className="size-7 text-primary" />
              Your Rights & Control
            </h2>
            <div className="space-y-5 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                You have complete control over your privacy on Koobrain:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">✓</span>
                  <span><span className="font-semibold text-on-surface">No Registration Required:</span> Browse and use all tools without creating an account</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">✓</span>
                  <span><span className="font-semibold text-on-surface">Ad Preferences:</span> Accept or reject personalized advertising through our consent banner</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">✓</span>
                  <span><span className="font-semibold text-on-surface">Browser Controls:</span> Manage cookies and JavaScript storage through your browser settings</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">✓</span>
                  <span><span className="font-semibold text-on-surface">DNT Respect:</span> We honor Do Not Track browser settings</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary shrink-0">✓</span>
                  <span><span className="font-semibold text-on-surface">No Communication:</span> We don't send emails or marketing messages</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Third-Party Services</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain integrates with Google AdSense for advertisements. While we maintain strict privacy standards, Google may collect information according to their privacy policy. We recommend reviewing Google's policies directly.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                <p className="text-sm font-bold text-on-surface">Third-Party Privacy:</p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>Google AdSense privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">policies.google.com/privacy</a></li>
                  <li>We are not responsible for third-party privacy practices</li>
                  <li>External links in tools may have different privacy policies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Security & Protection</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain is secured with HTTPS/SSL encryption. All communication between your browser and our servers is encrypted. Since most processing happens on your device, your data is protected at the source.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm">
                  <span className="font-bold text-green-700 dark:text-green-300">🔒 HTTPS Enabled</span>
                  <p className="text-xs text-green-600 dark:text-green-200 mt-1">All connections encrypted</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
                  <span className="font-bold text-blue-700 dark:text-blue-300">🛡️ Browser Security</span>
                  <p className="text-xs text-blue-600 dark:text-blue-200 mt-1">Client-side processing</p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy Changes & Contact */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Updates & Contact</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                We may update this Privacy Policy to reflect changes in our practices or technology. When we make material changes, we'll notify visitors via this page. Your continued use of Koobrain following any changes means you accept the updated policy.
              </p>
              <p className="text-base">
                Questions or concerns about our privacy practices? <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary font-bold hover:underline">Contact us at {SUPPORT_EMAIL}</a>
              </p>
              <p className="text-base mt-6">
                Related documents: <Link to="/terms" className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link to="/disclaimer" className="text-primary font-bold hover:underline">Disclaimer</Link>
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-[2rem] sticky top-24 space-y-5">
            <h3 className="text-lg font-black text-on-surface">Quick Reference</h3>
            <ul className="space-y-3 text-sm">
              <li className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <span className="font-bold text-on-surface">No Data Collection</span>
                <p className="text-xs text-on-surface-variant mt-1">Your content never reaches our servers</p>
              </li>
              <li className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <span className="font-bold text-on-surface">Client-Side Processing</span>
                <p className="text-xs text-on-surface-variant mt-1">All tools run in your browser</p>
              </li>
              <li className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <span className="font-bold text-on-surface">HTTPS Secured</span>
                <p className="text-xs text-on-surface-variant mt-1">All connections encrypted</p>
              </li>
              <li className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <span className="font-bold text-on-surface">Contact Privacy Team</span>
                <p className="text-xs"><a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary font-bold hover:underline">{SUPPORT_EMAIL}</a></p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
