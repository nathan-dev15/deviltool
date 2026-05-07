import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const EmiGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="How EMI Works: Understanding Loan Installments Before You Borrow"
      description="Before you sign a loan agreement, understand exactly what EMI means, how it is calculated, and how tenure and rate affect your total repayment."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How EMI Works' }]}
      accentColor="tertiary"
    >
      <SEO
        title="How EMI Works: Loan Installment Calculation Guide | KooBrain"
        description="Understand EMI calculation: the formula, how reducing balance works, how tenure and interest rate affect your monthly payment, and tips to reduce total interest cost."
        keywords="emi calculation explained, how emi works, emi formula, reducing balance method, home loan emi guide, personal loan emi"
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
                <li>• What EMI is and how it is structured</li>
                <li>• The EMI formula explained step by step</li>
                <li>• How reducing balance works vs flat rate</li>
                <li>• How tenure affects EMI and total interest</li>
                <li>• Practical tips to reduce interest cost</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What is EMI?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            <strong className="text-on-surface">EMI</strong> stands for Equated Monthly Installment. It is the fixed amount you pay to a lender every month until the loan is fully repaid. Each EMI payment covers two components: a portion of the <strong className="text-on-surface">principal</strong> (the amount you borrowed) and the <strong className="text-on-surface">interest</strong> charged on the outstanding balance. The split between principal and interest changes every month, but the total EMI amount stays constant throughout the loan tenure.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            In the early months of a loan, the interest component dominates each EMI because the outstanding principal is highest. As you repay, the outstanding balance reduces, so each subsequent EMI pays less interest and more principal. By the final few payments, almost the entire EMI goes toward principal.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-on-surface">The EMI Formula</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The standard EMI formula uses the <strong className="text-on-surface">reducing balance method</strong>:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <p className="font-mono text-on-surface text-sm leading-relaxed text-center mb-4">EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              {[
                { var: 'P', desc: 'Principal — the loan amount' },
                { var: 'R', desc: 'Monthly interest rate = Annual rate ÷ 12 ÷ 100' },
                { var: 'N', desc: 'Number of monthly installments' },
              ].map(v => (
                <div key={v.var} className="bg-surface-container rounded-xl p-3">
                  <code className="font-bold text-tertiary">{v.var}</code>
                  <p className="text-on-surface-variant mt-1">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
            <p className="font-bold text-on-surface text-sm mb-3">Example: ₹10,00,000 home loan at 9% for 20 years</p>
            <div className="text-xs text-on-surface-variant space-y-1.5 font-mono">
              <p>P = 10,00,000</p>
              <p>Annual rate = 9%, so R = 9 ÷ 12 ÷ 100 = 0.0075</p>
              <p>N = 20 × 12 = 240 months</p>
              <p className="mt-2 text-on-surface font-bold">EMI = [10,00,000 × 0.0075 × (1.0075)^240] / [(1.0075)^240 - 1]</p>
              <p className="text-tertiary font-bold">EMI ≈ ₹8,997 per month</p>
              <p className="mt-1">Total paid over 20 years: ₹21,59,280</p>
              <p>Total interest paid: ₹11,59,280 (116% of the loan amount)</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Reducing Balance vs Flat Rate: A Critical Difference</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Some lenders (particularly consumer finance companies and personal loan providers) quote a <strong className="text-on-surface">flat rate</strong> which sounds lower than the effective rate. Here is what each means:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <p className="font-bold text-on-surface text-sm mb-2">Reducing Balance (standard)</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">Interest is calculated on the <em>outstanding principal</em> each month. As you repay, the interest shrinks. Most bank home loans, car loans, and personal loans use this method.</p>
            </div>
            <div className="p-4 rounded-2xl bg-error/5 border border-error/20">
              <p className="font-bold text-error text-sm mb-2">Flat Rate (watch out)</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">Interest is calculated on the <em>original principal</em> every month, ignoring repayments. A flat rate of 9% is equivalent to roughly 16–17% reducing balance. Always compare the effective annual rate (EAR) or APR, not the flat rate.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How Tenure and Rate Affect Your Cost</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Using the same ₹10,00,000 at 9% example, here is how different tenure choices change your EMI and total interest:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="text-left py-2 pr-4 font-bold text-on-surface">Tenure</th>
                  <th className="text-left py-2 pr-4 font-bold text-on-surface">Monthly EMI</th>
                  <th className="text-left py-2 font-bold text-on-surface">Total Interest</th>
                </tr>
              </thead>
              <tbody className="text-on-surface-variant">
                {[
                  ['5 years', '₹20,758', '₹2,45,480'],
                  ['10 years', '₹12,668', '₹5,20,160'],
                  ['15 years', '₹10,143', '₹8,25,740'],
                  ['20 years', '₹8,997', '₹11,59,280'],
                  ['30 years', '₹8,046', '₹18,96,560'],
                ].map(([tenure, emi, interest]) => (
                  <tr key={tenure} className="border-b border-outline-variant/10">
                    <td className="py-2 pr-4">{tenure}</td>
                    <td className="py-2 pr-4 font-mono">{emi}</td>
                    <td className="py-2 font-mono text-error">{interest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-on-surface-variant leading-relaxed text-sm">
            Choosing 30 years over 10 years saves about ₹4,622 per month in EMI but costs ₹13,76,400 more in interest over the loan life. The right tenure depends on your monthly cash flow vs your total cost tolerance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Tips to Reduce Your Total Interest Cost</h2>
          <ul className="space-y-2">
            {[
              'Make part-prepayments when you have surplus cash — these reduce the outstanding principal and save disproportionate interest in early years',
              'Negotiate a lower interest rate when your credit score improves or when you refinance',
              'Choose the shortest tenure your cash flow allows — every year shorter saves significant interest',
              'Avoid missing payments — late payment penalties and compounding on missed installments increase the effective cost',
              'For home loans, switch from monthly to bi-weekly payments if your lender allows — this results in one extra payment per year',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <CheckCircle2 className="size-4 text-tertiary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-tertiary/20 bg-gradient-to-br from-tertiary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Calculate your EMI and full repayment schedule</h3>
            <p className="text-sm text-on-surface-variant">Enter your loan amount, rate, and tenure to see your exact monthly EMI, total interest, and a month-by-month amortization schedule.</p>
          </div>
          <Link to="/emi-calculator" className="inline-flex items-center gap-2 rounded-2xl bg-tertiary px-5 py-3 font-extrabold text-on-tertiary hover:opacity-90 transition-opacity text-sm shrink-0">
            EMI Calculator <ArrowRight className="size-4" />
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
