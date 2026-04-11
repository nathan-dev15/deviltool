import React from "react";
import { Link } from "react-router-dom";
import { FileText, ShieldAlert } from "lucide-react";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

export const Terms: React.FC = () => {
  const { t } = useI18n();
  return (
    <ToolPageWrapper
      title={t("legal.terms.title")}
      description={t("legal.terms.description")}
      breadcrumbs={[{ label: t("legal.breadcrumb"), href: "#" }, { label: t("legal.terms.title") }]}
      accentColor="secondary"
    >
      <SEO
        title={t("legal.terms.seo_title")}
        description={t("legal.terms.seo_desc")}
        keywords="terms and conditions, koobrain terms, acceptable use, limitations"
      />

      <div className="mt-8 grid lg:grid-cols-12 gap-8 animate-fade-in">
        <div className="lg:col-span-8 space-y-8">
          {/* Agreement Overview */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3 mb-6">
              <FileText className="size-7 text-secondary" />
              Terms of Service Agreement
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Welcome to Koobrain ("the Website"). These Terms of Service ("Terms") govern your use of koobrain.com and all associated services, tools, and content. By accessing or using Koobrain, you agree to be bound by these Terms. If you do not agree to any part of these Terms, you may not use the Website.
              </p>
              <p className="text-base">
                These Terms were last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. We reserve the right to modify these Terms at any time. Continued use of the Website following any changes constitutes your acceptance of the new Terms.
              </p>
            </div>
          </section>

          {/* Use License */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">License to Use Website</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain grants you a limited, non-exclusive, non-transferable license to access and use our Website and tools for personal, non-commercial purposes only. This license:
              </p>
              <ul className="space-y-2 text-sm ml-4 list-disc">
                <li>Permits you to use all tools free of charge</li>
                <li>Allows you to download, convert, and process content through our tools</li>
                <li>Does not permit commercial resale or redistribution of our tools</li>
                <li>May be revoked at any time for Terms violations</li>
              </ul>
              <p className="text-base mt-4">
                You may not: (a) copy or reproduce content except as permitted; (b) attempt to reverse engineer our tools; (c) use our Website for automated/bulk processing without permission; (d) access the Website through unauthorized means or bots.
              </p>
            </div>
          </section>

          {/* Acceptable Use Policy */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Acceptable Use Policy</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base font-semibold text-on-surface">You agree not to use Koobrain to:</p>
              <div className="grid gap-3">
                <div className="border border-error/30 bg-error/5 rounded-lg p-4">
                  <p className="text-sm font-bold text-on-surface mb-1">❌ Violate Laws</p>
                  <p className="text-xs">Use the Website for illegal purposes or to violate any applicable laws or regulations</p>
                </div>
                <div className="border border-error/30 bg-error/5 rounded-lg p-4">
                  <p className="text-sm font-bold text-on-surface mb-1">❌ Harmful Content</p>
                  <p className="text-xs">Process or transmit malware, viruses, ransomware, or other malicious code</p>
                </div>
                <div className="border border-error/30 bg-error/5 rounded-lg p-4">
                  <p className="text-sm font-bold text-on-surface mb-1">❌ Copyright Infringement</p>
                  <p className="text-xs">Convert, encode, or process copyrighted material without authorization from the copyright holder</p>
                </div>
                <div className="border border-error/30 bg-error/5 rounded-lg p-4">
                  <p className="text-sm font-bold text-on-surface mb-1">❌ Privacy Violations</p>
                  <p className="text-xs">Process personal data in violation of privacy laws (GDPR, CCPA, etc.)</p>
                </div>
                <div className="border border-error/30 bg-error/5 rounded-lg p-4">
                  <p className="text-sm font-bold text-on-surface mb-1">❌ Harassment & Abuse</p>
                  <p className="text-xs">Use our tools to harass, threaten, defame, or engage in abusive behavior</p>
                </div>
                <div className="border border-error/30 bg-error/5 rounded-lg p-4">
                  <p className="text-sm font-bold text-on-surface mb-1">❌ Unauthorized Access</p>
                  <p className="text-xs">Attempt to gain unauthorized access to our systems or other users' data</p>
                </div>
              </div>
            </div>
          </section>

          {/* Accuracy & Disclaimer */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">No Warranties & Accuracy</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain provides all tools and services "AS-IS" without warranties of any kind, express or implied. We do not warrant that:
              </p>
              <ul className="space-y-2 text-sm ml-4 list-disc">
                <li>Tools will be uninterrupted, error-free, or always available</li>
                <li>Results will be 100% accurate or suitable for your specific needs</li>
                <li>The Website is free from viruses, bugs, or malicious code</li>
                <li>All conversions will be perfectly compatible with third-party software</li>
              </ul>
              <p className="text-base mt-4 bg-warning/5 border border-warning/30 rounded-lg p-4 text-sm">
                <span className="font-bold text-on-surface">Important:</span> While we strive for accuracy, you should independently verify critical conversions, especially for financial, legal, or medical data. See our <Link to="/disclaimer" className="text-primary font-bold hover:underline">Disclaimer</Link> for more details.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Limitation of Liability</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base font-bold text-on-surface">
                To the maximum extent permitted by law, Koobrain shall not be liable for:
              </p>
              <ul className="space-y-2 text-sm ml-4 list-disc">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Damages resulting from use or inability to use the Website</li>
                <li>Any damages related to third-party content or services</li>
              </ul>
              <p className="text-base mt-4">
                Our total liability for any claim arising from your use of Koobrain shall not exceed $100 USD or the amount you paid us (if any). Some jurisdictions do not allow liability limitations, so this may not apply to you.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Intellectual Property Rights</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                All content on Koobrain — including code, design, text, graphics, and tools — is owned by or licensed to Koobrain. The Website and its contents are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 space-y-3">
                <p className="text-sm font-bold text-on-surface">Your Rights:</p>
                <ul className="text-xs space-y-1 ml-3 list-disc text-on-surface-variant">
                  <li>You own all content you input into our tools</li>
                  <li>You own results generated by our tools from your input</li>
                  <li>You may use results for personal or commercial purposes</li>
                  <li>You may not claim our tools or Website as your own creation</li>
                </ul>
              </div>
              <p className="text-base mt-4">
                If you believe your intellectual property rights have been violated, please contact us immediately with details.
              </p>
            </div>
          </section>

          {/* Service Modifications */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Service Modifications & Termination</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain reserves the right to modify, suspend, or discontinue services at any time with or without notice. We may:
              </p>
              <ul className="space-y-2 text-sm ml-4 list-disc">
                <li>Add, remove, or modify tools and features</li>
                <li>Change Website functionality or user interface</li>
                <li>Temporarily or permanently remove the Website</li>
                <li>Restrict access for Terms violations</li>
              </ul>
              <p className="text-base mt-4">
                We are not liable for any loss or damage resulting from modifications, suspension, or discontinuation of services. Your continued use of the Website constitutes acceptance of any modifications to these Terms.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Third-Party Links & Services</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain may contain links to third-party websites and services. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party services is governed by their terms and policies, not ours.
              </p>
              <p className="text-base">
                We do not endorse any third-party websites or services linked from Koobrain. Review their privacy policies and terms before using them.
              </p>
            </div>
          </section>

          {/* Advertising & Third-Party Ads */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Advertising & Third-Party Ads</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                Koobrain may display advertisements from Google AdSense and other authorized advertising partners. These ads are served by third parties and are not under our direct control.
              </p>
              <ul className="list-disc ml-4 space-y-2 text-sm text-on-surface-variant">
                <li>Ads may be personalized based on your browser and device settings.</li>
                <li>Third-party advertisers may use cookies and similar technologies to serve ads.</li>
                <li>We are not responsible for the accuracy or quality of third-party advertisements.</li>
              </ul>
              <p className="text-base">
                For AdSense or advertising policy questions, please <Link to="/contact" className="text-primary font-bold hover:underline">contact us</Link>. Google AdSense ads are subject to Google's policies.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Indemnification</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                You agree to indemnify and hold harmless Koobrain and its owners, operators, and employees from any claims, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="space-y-2 text-sm ml-4 list-disc">
                <li>Your use of the Website in violation of these Terms</li>
                <li>Your use of content you processed through our tools</li>
                <li>Your violation of any applicable laws or third-party rights</li>
                <li>Any claim that your input violates others' intellectual property</li>
              </ul>
            </div>
          </section>

          {/* Governing Law */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Governing Law & Dispute Resolution</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p className="text-base">
                These Terms are governed by and construed in accordance with applicable laws, without regard to conflicts of law principles. Any disputes arising from these Terms shall be resolved exclusively in the appropriate courts.
              </p>
              <p className="text-base">
                Before filing any legal action, please attempt to resolve the dispute by <Link to="/contact" className="text-primary font-bold hover:underline">contacting us</Link>.
              </p>
            </div>
          </section>

          {/* Contact & Support */}
          <section className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-outline-variant/20 px-10 py-12 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black text-on-surface mb-6">Questions or Concerns?</h2>
            <p className="text-on-surface-variant mb-6">
              If you have any questions about these Terms or need to report a violation, please reach out to us:
            </p>
            <div className="space-y-3">
              <p className="text-base">
                <span className="font-bold text-on-surface">Email:</span> <a href="mailto:terms@koobrain.com" className="text-primary font-bold hover:underline">terms@koobrain.com</a>
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-on-secondary rounded-2xl font-bold hover:scale-105 transition-transform">
                Contact Support
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-[2rem] sticky top-24 space-y-5">
            <h3 className="text-lg font-black text-on-surface">Related Documents</h3>
            <div className="space-y-3">
              <Link to="/privacy" className="flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                Disclaimer
              </Link>
              <Link to="/contact" className="flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
