import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const WhatIsJwt: React.FC = () => {
  return (
    <ToolPageWrapper
      title="How JWT Tokens Work: A Developer's Visual Guide"
      description="JWT tokens are everywhere in modern authentication. Learn what they contain, how they are signed, and how to use them safely."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How JWTs Work' }]}
      accentColor="error"
    >
      <SEO
        title="How JWT Tokens Work: A Developer's Visual Guide | KooBrain"
        description="Learn what JSON Web Tokens (JWTs) are, how the three-part structure works, how signatures are verified, and how to use JWTs safely in your applications."
        keywords="jwt tutorial, json web token explained, jwt structure, jwt signature, jwt authentication, decode jwt, jwt header payload"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        <section className="bg-error/5 border border-error/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-error" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• The three-part structure of a JWT token</li>
                <li>• How the header, payload, and signature work</li>
                <li>• How token signatures are created and verified</li>
                <li>• Common JWT claims and what they mean</li>
                <li>• Security pitfalls to avoid</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What is a JWT?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A <strong className="text-on-surface">JSON Web Token</strong> (JWT, pronounced "jot") is a compact, self-contained token format used to transmit information securely between systems. It is widely used for authentication: when a user logs in, a server issues a JWT that the client stores and sends with every subsequent request to prove its identity.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            The key property of a JWT is that it is <em>self-contained</em>. The token carries all the information needed to verify it — the server does not need to look up a session in a database for every request. This makes JWTs highly scalable and suitable for distributed systems and microservices.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">The Three-Part Structure</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A JWT is a string of three Base64URL-encoded parts separated by dots:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <p className="font-mono text-sm leading-loose break-all">
              <span className="text-error font-bold">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
              <span className="text-on-surface-variant">.</span>
              <span className="text-primary font-bold">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>
              <span className="text-on-surface-variant">.</span>
              <span className="text-secondary font-bold">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Header', color: 'text-error bg-error/10 border-error/20', desc: 'Specifies the token type (JWT) and the signing algorithm (e.g. HS256 or RS256).' },
              { label: 'Payload', color: 'text-primary bg-primary/10 border-primary/20', desc: 'Contains the claims — data about the user and the token itself (expiry, issuer, subject, custom fields).' },
              { label: 'Signature', color: 'text-secondary bg-secondary/10 border-secondary/20', desc: 'A cryptographic signature that proves the token was issued by a trusted party and has not been tampered with.' },
            ].map(p => (
              <div key={p.label} className={`rounded-2xl border p-4 ${p.color}`}>
                <p className="font-black text-sm mb-2">{p.label}</p>
                <p className="text-xs leading-relaxed opacity-80">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Inside the Header</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The header is a JSON object Base64URL-encoded into the first part of the token. It tells the receiver how to verify the signature:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`{
  "alg": "HS256",   // Signing algorithm: HMAC-SHA256
  "typ": "JWT"      // Token type
}`}</pre>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Common algorithms include <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">HS256</code> (HMAC with SHA-256, uses a shared secret) and <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">RS256</code> (RSA with SHA-256, uses a public/private key pair). RS256 is generally preferred for production systems because the private key signs and the public key verifies — no secret needs to be shared with services that only verify tokens.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Inside the Payload: Claims</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The payload contains <em>claims</em> — statements about the entity (typically a user) and the token itself. The JWT specification defines several standard registered claims:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { claim: 'sub', meaning: 'Subject — the user ID or entity the token represents' },
              { claim: 'iss', meaning: 'Issuer — the server or service that created the token' },
              { claim: 'aud', meaning: 'Audience — the intended recipients of the token' },
              { claim: 'exp', meaning: 'Expiration — Unix timestamp after which the token is invalid' },
              { claim: 'iat', meaning: 'Issued At — Unix timestamp when the token was created' },
              { claim: 'nbf', meaning: 'Not Before — Unix timestamp before which the token is not valid' },
            ].map(c => (
              <div key={c.claim} className="flex gap-3 items-start p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono shrink-0 mt-0.5">{c.claim}</code>
                <p className="text-sm text-on-surface-variant leading-relaxed">{c.meaning}</p>
              </div>
            ))}
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            You can also include custom claims for application-specific data like roles, permissions, or user email. These are called <em>private claims</em>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How the Signature is Created and Verified</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The signature is computed over the encoded header and payload:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`signature = HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)`}</pre>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            When a server receives a JWT, it recomputes the signature using the same algorithm and key. If the computed signature matches the one in the token, the token is authentic and unmodified. If even a single character of the header or payload has changed, the signature will not match and the token is rejected.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-on-surface">Critical Security Warnings</h2>
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6 space-y-4">
            {[
              { title: 'JWTs are not encrypted by default', desc: 'The payload is only Base64URL-encoded, not encrypted. Anyone who intercepts a JWT can read the claims. Never store sensitive data (passwords, payment info) in a JWT payload unless you use JWE (JSON Web Encryption).' },
              { title: 'Never accept the "none" algorithm', desc: 'Some JWT libraries accept "alg": "none" as a valid header, which disables signature verification entirely. Always explicitly specify which algorithms your application accepts and reject "none".' },
              { title: 'Always validate expiration', desc: 'Always check the exp claim. A token without an expiry (or with a very long expiry) creates a permanent credential that cannot be revoked if the secret is compromised.' },
              { title: 'Validate the audience and issuer', desc: 'Check the aud and iss claims to ensure the token was intended for your service and issued by a trusted authority. Skipping these checks can allow tokens from other systems to be used against yours.' },
            ].map(w => (
              <div key={w.title} className="flex items-start gap-3">
                <AlertCircle className="size-4 text-error mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-on-surface">{w.title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">JWT vs Session Tokens</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Traditional session authentication stores a session ID in a database and gives the client an opaque cookie. Every request requires a database lookup to validate the session. JWTs eliminate this lookup — the token itself is the proof of identity. The tradeoff is that JWTs cannot be revoked before they expire without additional infrastructure (a token blocklist or short expiry times combined with refresh tokens).
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            For most web applications, short-lived JWTs (15 minutes to 1 hour) combined with refresh tokens stored in secure HTTP-only cookies represent the best balance of statelessness and security.
          </p>
        </section>

        <section className="rounded-3xl border border-error/20 bg-gradient-to-br from-error/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Inspect a JWT token right now</h3>
            <p className="text-sm text-on-surface-variant">Paste any JWT into KooBrain's decoder to read the header, payload claims, expiry, and algorithm — all in one view.</p>
          </div>
          <Link to="/jwt-decoder" className="inline-flex items-center gap-2 rounded-2xl bg-error px-5 py-3 font-extrabold text-on-error hover:opacity-90 transition-opacity text-sm shrink-0">
            JWT Decoder <ArrowRight className="size-4" />
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
