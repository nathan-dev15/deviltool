import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2, Zap, Image } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const ImageCompressionGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="Image Compression for the Web: The Complete Guide"
      description="Large images are the single biggest cause of slow websites. Learn how compression works, which formats to use, and how to cut image size without losing quality."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Image Compression' }]}
      accentColor="tertiary"
    >
      <SEO
        title="Image Compression for the Web: The Complete Guide | KooBrain"
        description="Learn how image compression works, when to use JPEG vs PNG vs WebP, how to cut file size without losing quality, and the best practices for web performance."
        keywords="image compression guide, compress images for web, jpeg vs png vs webp, lossy compression, lossless compression, web performance images"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        {/* Intro callout */}
        <section className="bg-tertiary/5 border border-tertiary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-tertiary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• Why image size is the #1 page speed issue</li>
                <li>• The difference between lossy and lossless compression</li>
                <li>• When to use JPEG, PNG, WebP, and AVIF</li>
                <li>• Practical rules for quality vs. file size</li>
                <li>• How to serve the right format to every browser</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Why Image Compression Matters</h2>
          <p className="text-on-surface-variant leading-relaxed">
            According to HTTP Archive, images account for more than 50% of the total bytes downloaded on the average web page. Uncompressed images are the single most common cause of slow page loads — and slow pages directly cost you users and revenue. Google's Core Web Vitals, which influence search rankings, heavily penalize pages where large images delay the display of the largest visible element (Largest Contentful Paint).
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            Compression doesn't mean degrading your images. The right technique can cut file size by 60–90% while leaving the image visually indistinguishable from the original. The key is understanding the two types of compression and choosing the right format for each use case.
          </p>
          <div className="bg-tertiary/5 border border-tertiary/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="size-4 text-tertiary" />
              <span className="font-black text-on-surface text-sm">Impact by the numbers</span>
            </div>
            <p className="text-sm text-on-surface-variant">A 1-second delay in page load time reduces conversions by 7%, page views by 11%, and customer satisfaction by 16% (Akamai). Properly compressed images are the fastest win available.</p>
          </div>
        </section>

        {/* Section 2 — Lossy vs Lossless */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-on-surface">Lossy vs. Lossless Compression</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/20">
              <p className="font-black text-on-surface mb-3">Lossy compression</p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                Permanently discards data the human eye is unlikely to notice — subtle colour variations in large areas of similar colour, high-frequency detail in shadows, etc. The file cannot be restored to its exact original.
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-tertiary">Formats: JPEG, WebP (lossy), AVIF</p>
              <p className="text-xs text-on-surface-variant mt-1">Best for: photographs, complex scenes, hero images</p>
            </div>
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/20">
              <p className="font-black text-on-surface mb-3">Lossless compression</p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                Reduces file size by encoding repeated patterns more efficiently, without discarding any data. The original can be perfectly reconstructed. Smaller savings than lossy but zero quality loss.
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Formats: PNG, WebP (lossless), GIF</p>
              <p className="text-xs text-on-surface-variant mt-1">Best for: logos, icons, text, screenshots</p>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            The practical rule: use lossy compression for photographs (where detail loss is imperceptible) and lossless for graphics with sharp edges, flat colours, or transparency (where artefacts would be visible).
          </p>
        </section>

        {/* Section 3 — Format guide */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-on-surface">Choosing the Right Format</h2>
          <div className="space-y-3">
            {[
              {
                format: 'JPEG',
                when: 'Photographs, complex images with gradients',
                tip: 'Quality 70–85 is the sweet spot. Below 60 introduces visible artefacts. JPEG does not support transparency.',
                color: 'text-primary',
              },
              {
                format: 'PNG',
                when: 'Logos, icons, screenshots, images needing transparency',
                tip: 'Always run through a lossless optimizer (like oxipng). PNG-24 for transparency; PNG-8 for flat-colour graphics with fewer than 256 colours.',
                color: 'text-secondary',
              },
              {
                format: 'WebP',
                when: 'All modern browsers (95%+ global support)',
                tip: 'WebP delivers 25–35% smaller files than JPEG at equivalent quality, and supports both transparency and animation. Use it as your primary format with a JPEG fallback.',
                color: 'text-tertiary',
              },
              {
                format: 'AVIF',
                when: 'Next-generation quality at smallest size',
                tip: 'AVIF beats WebP by another 20–30%, but encoding is slow and browser support (~90% in 2025) is slightly lower. Best served via a <picture> element with WebP fallback.',
                color: 'text-error',
              },
              {
                format: 'SVG',
                when: 'Icons, logos, illustrations with geometric shapes',
                tip: 'SVG is vector, not raster — it scales to any size without quality loss. Always run through SVGO to remove unnecessary metadata. Tiny file sizes for simple graphics.',
                color: 'text-on-surface-variant',
              },
            ].map((item) => (
              <div key={item.format} className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20 flex gap-4">
                <div className="shrink-0">
                  <span className={`font-black text-sm ${item.color}`}>{item.format}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface mb-1">{item.when}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Practical rules */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Practical Rules for Web Images</h2>
          <div className="space-y-3">
            {[
              { rule: 'Never serve images larger than they display', detail: 'If an image appears at 800px wide on a desktop screen, don\'t upload a 4000px original. Resize to 800px (or 1600px for retina) before uploading.' },
              { rule: 'Use responsive images with srcset', detail: 'The HTML srcset attribute lets you provide different sized images for different screen widths. Browsers automatically download only the size they need.' },
              { rule: 'Aim for under 200KB per above-fold image', detail: 'Images in the initial viewport directly affect LCP. Keep hero images under 200KB; all other images under 100KB where possible.' },
              { rule: 'Lazy load below-fold images', detail: 'Add loading="lazy" to any <img> that starts below the visible viewport. Browsers defer those requests until the user scrolls near them.' },
              { rule: 'Serve next-gen formats with a fallback', detail: 'Use a <picture> element to serve AVIF to modern browsers, WebP to most others, and JPEG as the final fallback for older browsers.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="size-8 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black text-tertiary">
                  {i + 1}
                </div>
                <div>
                  <p className="font-black text-on-surface text-sm mb-1">{item.rule}</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — Quality settings */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Understanding Quality Settings</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Most image tools expose a "quality" slider from 0–100. This does not map linearly to file size or visual quality — the relationship is exponential.
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6">
            <div className="space-y-3">
              {[
                { range: 'Quality 85–100', size: 'Large files', verdict: 'Indistinguishable quality — overkill for web', color: 'bg-error/20 text-error' },
                { range: 'Quality 70–85', size: 'Medium files', verdict: 'Sweet spot: excellent quality, significant savings', color: 'bg-tertiary/20 text-tertiary' },
                { range: 'Quality 50–70', size: 'Small files', verdict: 'Acceptable for small thumbnails', color: 'bg-secondary/20 text-secondary' },
                { range: 'Quality below 50', size: 'Tiny files', verdict: 'Visible artefacts — avoid for anything large', color: 'bg-surface-container text-on-surface-variant' },
              ].map((row) => (
                <div key={row.range} className="grid grid-cols-3 gap-3 text-sm">
                  <span className={`font-black px-3 py-1.5 rounded-xl text-center text-xs ${row.color}`}>{row.range}</span>
                  <span className="text-on-surface-variant font-medium">{row.size}</span>
                  <span className="text-on-surface-variant text-xs">{row.verdict}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-tertiary/20 bg-gradient-to-br from-tertiary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Compress your images now</h3>
            <p className="text-sm text-on-surface-variant">Use KooBrain's Image Compressor to reduce file sizes instantly — no upload to a server, all processing in your browser.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/image-compressor" className="inline-flex items-center gap-2 rounded-2xl bg-tertiary px-5 py-3 font-extrabold text-on-tertiary hover:bg-tertiary-container transition-colors text-sm">
              Image Compressor <ArrowRight className="size-4" />
            </Link>
            <Link to="/image-size-converter" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container px-5 py-3 font-extrabold text-on-surface hover:border-tertiary/30 transition-colors text-sm">
              Image Resizer
            </Link>
          </div>
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
