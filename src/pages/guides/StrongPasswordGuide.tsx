import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2, ShieldAlert, Shield, AlertCircle } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const StrongPasswordGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="How to Create Strong Passwords (And Actually Remember Them)"
      description="Weak passwords are the leading cause of account breaches. Learn what makes a password strong, how generators work, and the right way to manage credentials."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Strong Passwords' }]}
      accentColor="error"
    >
      <SEO
        title="How to Create Strong Passwords (And Actually Remember Them) | KooBrain"
        description="A complete guide to password security: what makes passwords strong, how password managers work, passphrase strategy, and why length beats complexity."
        keywords="strong password guide, how to create strong password, password security, password manager guide, passphrase vs password, password entropy"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        {/* Intro callout */}
        <section className="bg-error/5 border border-error/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-error" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• What makes a password mathematically strong</li>
                <li>• The most common password mistakes (and why people keep making them)</li>
                <li>• Why length matters more than complexity</li>
                <li>• How password managers eliminate the memory problem</li>
                <li>• How to audit and upgrade your existing passwords</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">The Scale of the Password Problem</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Over 80% of confirmed data breaches involve weak, stolen, or reused passwords (Verizon Data Breach Investigations Report). Yet the average person uses the same password across more than five accounts. When one site is breached, attackers automatically try those credentials on banking, email, and social media sites — a technique called <strong className="text-on-surface">credential stuffing</strong>.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            The good news: a strong, unique password for each account — combined with a password manager — provides protection that is practically impossible to crack. You don't have to choose between security and convenience.
          </p>
        </section>

        {/* Section 2 — What makes a strong password */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What Makes a Password Strong?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Password strength is measured in <strong className="text-on-surface">entropy bits</strong> — a measure of unpredictability. The more entropy, the longer it takes to crack. Entropy is determined by two factors: the size of the character set and the length of the password.
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 mb-4">Crack time estimates (2025 GPU attack)</p>
            <div className="space-y-3">
              {[
                { password: '8 chars, lowercase only', time: 'Under 1 minute', bar: 5, color: 'bg-error' },
                { password: '8 chars, mixed case + numbers', time: 'About 1 day', bar: 20, color: 'bg-error' },
                { password: '12 chars, mixed case + numbers + symbols', time: '34,000 years', bar: 75, color: 'bg-tertiary' },
                { password: '16+ chars, all character types', time: 'Billions of years', bar: 100, color: 'bg-primary' },
              ].map((row) => (
                <div key={row.password} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-on-surface">{row.password}</span>
                    <span className="font-black text-on-surface-variant">{row.time}</span>
                  </div>
                  <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            The key insight: a 16-character password made of common words is stronger than a complex 8-character password. <strong className="text-on-surface">Length beats complexity.</strong>
          </p>
        </section>

        {/* Section 3 — Common mistakes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">The Most Common Password Mistakes</h2>
          <div className="space-y-3">
            {[
              {
                mistake: 'Using personal information',
                detail: 'Birthdays, names, pet names, and cities are the first things attackers try. Any attacker who has spent 10 minutes looking at your social media can guess these in seconds.',
              },
              {
                mistake: 'Password reuse across accounts',
                detail: 'When one site is breached (and sites are breached constantly — check haveibeenpwned.com), every account sharing that password is immediately at risk.',
              },
              {
                mistake: 'Simple character substitutions',
                detail: 'Replacing "e" with "3" or "a" with "@" is a well-known pattern. Modern cracking software includes these substitutions by default and they add almost no security.',
              },
              {
                mistake: 'Short "complex" passwords',
                detail: '"P@ssw0rd!" satisfies most complexity requirements but is in every password cracking dictionary. A 16-character random string without symbols is far stronger.',
              },
              {
                mistake: 'Storing passwords in plain text',
                detail: 'Sticky notes, unencrypted files, or browser autofill without a master password all create single points of failure. Use a dedicated password manager.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
                <AlertCircle className="size-4 text-error shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-on-surface text-sm mb-1">{item.mistake}</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Passphrases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">The Passphrase Strategy</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A <strong className="text-on-surface">passphrase</strong> is a sequence of random words — like <code className="bg-surface-container-highest px-2 py-0.5 rounded text-sm">correct-horse-battery-staple</code> — that is both long and memorable. Four random words give approximately 51 bits of entropy, which is comparable to a truly random 9-character password but far easier to type and remember.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="size-5 text-primary" />
              <p className="font-black text-on-surface">When passphrases work best</p>
            </div>
            <ul className="text-sm text-on-surface-variant space-y-2">
              <li className="flex gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Your master password manager password (the one you must memorize)</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Disk encryption passwords (e.g., FileVault, BitLocker)</li>
              <li className="flex gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Accounts where you regularly type the password</li>
            </ul>
            <p className="text-xs text-on-surface-variant mt-3 italic">For all other accounts, a password manager with randomly generated passwords is more secure than any passphrase.</p>
          </div>
        </section>

        {/* Section 5 — Password managers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How Password Managers Solve the Problem</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A password manager stores all your credentials in an encrypted vault, unlocked by one strong master password. You only need to remember one password, and every other account gets a long, unique, randomly generated password.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'You only memorize one password', desc: 'Your master password. Everything else is generated and remembered for you.' },
              { title: 'Every account gets a unique password', desc: 'A breach of one site cannot compromise another account.' },
              { title: 'Auto-fill defends against phishing', desc: 'Password managers only fill credentials on the exact domain they were saved for. A phishing clone of your bank will not trigger autofill.' },
              { title: 'Audit weak and reused passwords', desc: 'Most managers include a security audit showing which of your passwords are weak, reused, or found in known data breaches.' },
            ].map((item) => (
              <div key={item.title} className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span className="font-black text-on-surface text-sm">{item.title}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Well-regarded password managers include Bitwarden (open source, free tier), 1Password, and Dashlane. All store your vault encrypted — even the company cannot read your passwords.
          </p>
        </section>

        {/* Section 6 — MFA */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Passwords + Multi-Factor Authentication</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Even the strongest password can be phished or leaked in a data breach. Multi-factor authentication (MFA) adds a second layer: after entering your password, you must also provide a code from your phone, a hardware key, or a biometric. Even if an attacker has your password, they cannot log in without the second factor.
          </p>
          <div className="bg-error/5 border border-error/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="size-4 text-error mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-on-surface text-sm mb-1">Avoid SMS-based MFA where possible</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">SIM-swapping attacks let attackers intercept SMS codes. Use an authenticator app (Google Authenticator, Authy) or a hardware key (YubiKey) instead.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-error/20 bg-gradient-to-br from-error/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Generate a strong password now</h3>
            <p className="text-sm text-on-surface-variant">KooBrain's Password Generator uses cryptographically secure randomness to create passwords that meet any requirements — instantly and privately.</p>
          </div>
          <Link to="/password-generator" className="inline-flex items-center gap-2 rounded-2xl bg-error px-5 py-3 font-extrabold text-on-error hover:bg-error-container transition-colors text-sm shrink-0">
            Password Generator <ArrowRight className="size-4" />
          </Link>
        </section>

        <div className="pt-2">
          <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-black text-on-surface-variant hover:text-primary transition-colors">
            ← Back to all guides
          </Link>
        </div>

      </article>
    </ToolPageWrapper>
  );
};
