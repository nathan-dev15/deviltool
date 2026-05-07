import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const GstGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="GST in India: How It Works and How to Calculate It"
      description="GST replaced 17 taxes in India. Learn the slabs, the difference between CGST/SGST/IGST, how to add and remove GST, and how input tax credit works."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'GST in India Explained' }]}
      accentColor="tertiary"
    >
      <SEO
        title="GST in India Explained: Slabs, CGST, SGST, IGST & Calculation | KooBrain"
        description="Complete guide to GST in India: tax slabs (5%, 12%, 18%, 28%), CGST vs SGST vs IGST, how to add and remove GST from a price, and input tax credit basics."
        keywords="gst india explained, gst slabs, cgst sgst igst, how to calculate gst, gst inclusive exclusive, input tax credit gst"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        <section className="bg-tertiary/5 border border-tertiary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-tertiary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• What GST is and why India adopted it</li>
                <li>• The four GST rate slabs and what falls in each</li>
                <li>• CGST, SGST, and IGST — what's the difference</li>
                <li>• How to calculate GST-exclusive and GST-inclusive prices</li>
                <li>• Input Tax Credit (ITC) in simple terms</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What is GST?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The <strong className="text-on-surface">Goods and Services Tax</strong> (GST) is India's unified indirect tax, implemented on 1 July 2017. It replaced a complex web of central and state taxes — including Central Excise Duty, Service Tax, VAT, Entry Tax, and Octroi — with a single, destination-based tax collected at each stage of the supply chain.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            GST is a <strong className="text-on-surface">consumption tax</strong>: the tax is ultimately borne by the end consumer, but collected incrementally at each stage of production and distribution. Businesses act as tax collectors — they charge GST from customers and deposit it with the government, while claiming credit for the GST they paid to their own suppliers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">The Four GST Rate Slabs</h2>
          <p className="text-on-surface-variant leading-relaxed">
            India's GST Council maintains four standard rate slabs, plus a 0% exempt category:
          </p>
          <div className="space-y-3">
            {[
              { rate: '0% (Exempt)', color: 'text-secondary bg-secondary/10 border-secondary/20', examples: 'Fresh vegetables and fruits, milk, eggs, curd, bread, salt, unbranded flour and rice, healthcare services, educational services' },
              { rate: '5%', color: 'text-primary bg-primary/10 border-primary/20', examples: 'Packed food items, footwear below ₹1,000, medicines for common diseases, small restaurants without AC' },
              { rate: '12%', color: 'text-tertiary bg-tertiary/10 border-tertiary/20', examples: 'Computers, processed food, mobile phones below ₹12,000, non-AC hotels, business class air travel' },
              { rate: '18%', color: 'text-on-surface bg-surface-container border-outline-variant/30', examples: 'Most services (banking, telecom, IT services), consumer goods (soap, toothpaste, hair oil), AC restaurants, most digital services' },
              { rate: '28%', color: 'text-error bg-error/10 border-error/20', examples: 'Luxury goods, cement, cigarettes, aerated drinks, cars, motorcycles above 350cc, five-star hotels' },
            ].map(s => (
              <div key={s.rate} className={`rounded-2xl border p-4 ${s.color}`}>
                <p className="font-black text-sm mb-1">{s.rate}</p>
                <p className="text-xs leading-relaxed opacity-80">{s.examples}</p>
              </div>
            ))}
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Note: Some goods like luxury cars and tobacco also attract an additional <strong className="text-on-surface">Compensation Cess</strong> on top of the 28% GST slab.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">CGST, SGST, and IGST: What's the Difference?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            GST is collected in three different ways depending on whether the transaction is within a state or across state lines:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'CGST', full: 'Central GST', desc: 'Collected by the Central Government on intra-state transactions. Always half the total GST rate.', example: '18% GST = 9% CGST + 9% SGST' },
              { name: 'SGST', full: 'State GST', desc: 'Collected by the State Government on intra-state transactions. Always equal to CGST for the same transaction.', example: 'Goes to the state where the supply occurs' },
              { name: 'IGST', full: 'Integrated GST', desc: 'Collected by the Central Government on inter-state transactions and imports. Equal to CGST + SGST combined.', example: '18% GST on inter-state = 18% IGST (no split)' },
            ].map(t => (
              <div key={t.name} className="p-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
                <p className="font-black text-on-surface text-sm">{t.name}</p>
                <p className="text-xs text-primary mb-2">{t.full}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-2">{t.desc}</p>
                <p className="text-xs text-on-surface-variant bg-surface-container-highest rounded-lg p-2 font-mono">{t.example}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How to Calculate GST: Add and Remove</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
              <p className="font-bold text-on-surface text-sm mb-3">Adding GST to a base price (exclusive to inclusive)</p>
              <div className="text-xs text-on-surface-variant font-mono space-y-1.5">
                <p>Base price: ₹1,000 | GST rate: 18%</p>
                <p>GST amount = 1,000 × 18 ÷ 100 = <strong className="text-tertiary">₹180</strong></p>
                <p>Final price = 1,000 + 180 = <strong className="text-tertiary">₹1,180</strong></p>
              </div>
            </div>
            <div className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
              <p className="font-bold text-on-surface text-sm mb-3">Removing GST from an inclusive price (inclusive to exclusive)</p>
              <div className="text-xs text-on-surface-variant font-mono space-y-1.5">
                <p>Inclusive price: ₹1,180 | GST rate: 18%</p>
                <p>Base price = 1,180 ÷ 1.18 = <strong className="text-tertiary">₹1,000</strong></p>
                <p>GST amount = 1,180 − 1,000 = <strong className="text-tertiary">₹180</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Input Tax Credit (ITC) in Simple Terms</h2>
          <p className="text-on-surface-variant leading-relaxed">
            ITC is the mechanism that prevents double taxation in a multi-stage supply chain. When a registered business pays GST on its purchases (input tax), it can deduct that amount from the GST it collects from customers (output tax), remitting only the difference to the government.
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`Manufacturer buys raw materials:
  Cost: ₹500 + ₹90 GST = ₹590 paid

Manufacturer sells finished goods:
  Price: ₹800 + ₹144 GST = ₹944 collected

GST to deposit = ₹144 - ₹90 (ITC) = ₹54`}</pre>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Without ITC, the manufacturer would pay ₹144 in output GST despite already having paid ₹90 in input GST — effectively paying GST on GST. ITC makes the tax system fair and non-cascading.
          </p>
        </section>

        <section className="rounded-3xl border border-tertiary/20 bg-gradient-to-br from-tertiary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Calculate GST instantly</h3>
            <p className="text-sm text-on-surface-variant">Use KooBrain's GST Calculator to add or remove GST at any rate — with a clear breakdown of base price, tax amount, CGST/SGST split, and total.</p>
          </div>
          <Link to="/gst-calculator" className="inline-flex items-center gap-2 rounded-2xl bg-tertiary px-5 py-3 font-extrabold text-on-tertiary hover:opacity-90 transition-opacity text-sm shrink-0">
            GST Calculator <ArrowRight className="size-4" />
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
