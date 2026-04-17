import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Clock, Users, Hourglass, ArrowRight, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { ToolPageWrapper } from '../components/ToolPageWrapper';
import { SEO } from '../components/SEO';
import { cn } from '../lib/utils';

const LIVE_TOOLS = [
  {
    id: 'age-calculator',
    path: '/age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days from your date of birth.',
    icon: <Calculator className="size-6" />,
    category: 'Daily',
    badge: 'Live',
  },
  {
    id: 'couple-age-calculator',
    path: '/couple-age-calculator',
    name: 'Couple Age Calculator',
    description: 'Find the age difference between two people and display it in years, months, and days.',
    icon: <Users className="size-6" />,
    category: 'Daily',
    badge: 'Live',
  },
  {
    id: 'time-between-dates',
    path: '/time-between-dates',
    name: 'Time Between Dates',
    description: 'Calculate the exact duration between any two calendar dates.',
    icon: <Hourglass className="size-6" />,
    category: 'Daily',
    badge: 'Live',
  },
];

const PLANNED_TOOLS = [
  { name: 'EMI Calculator', category: 'Finance', desc: 'Calculate monthly loan EMI with full amortization breakdown.' },
  { name: 'GST Calculator', category: 'Finance', desc: 'Add or remove GST from any price instantly.' },
  { name: 'SIP Calculator', category: 'Finance', desc: 'Project your mutual fund SIP returns over time.' },
  { name: 'Loan Calculator', category: 'Finance', desc: 'Compare loan options and total interest payable.' },
  { name: 'Discount Calculator', category: 'Finance', desc: 'Find the final price after any percentage discount.' },
  { name: 'BMI Calculator', category: 'Health', desc: 'Check your Body Mass Index against WHO standards.' },
  { name: 'Percentage Calculator', category: 'Daily', desc: 'Calculate percentages, increases, and decreases.' },
  { name: 'Time Calculator', category: 'Daily', desc: 'Add and subtract hours, minutes, and seconds.' },
];

export const CalculatorHome: React.FC = () => {
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Finance', 'Health', 'Daily'];

  const filteredPlanned = PLANNED_TOOLS.filter(
    (t) => category === 'All' || t.category === category
  );

  return (
    <ToolPageWrapper
      title="Calculator Tools"
      description="Free, accurate calculators for finance, health, and everyday tasks. All browser-based — no installs required."
      breadcrumbs={[{ label: "Tools", href: "/" }, { label: "Calculators" }]}
      accentColor="primary"
    >
      <SEO
        title="Free Online Calculators — Age, Date & More | KooBrain"
        description="Free online calculators for daily use. Calculate your exact age, find the time between dates, and compare ages. More financial and health calculators coming soon."
        keywords="age calculator, time between dates, couple age calculator, free online calculators, date calculator"
      />

      <div className="space-y-16 mt-8">

        {/* Live tools */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="p-2 rounded-xl bg-primary/10">
              <Calculator className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-widest text-on-surface">Available Now</h2>
            <span className="text-xs font-black uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1">
              {LIVE_TOOLS.length} Tools Live
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {LIVE_TOOLS.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="p-8 rounded-[2.5rem] bg-white dark:bg-surface-container-high/60 border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all flex flex-col items-center text-center gap-5 group"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 group-hover:rotate-6">
                  {tool.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-on-surface uppercase tracking-tight">{tool.name}</h3>
                  <p className="text-xs text-on-surface-variant font-medium italic opacity-70 leading-relaxed">{tool.description}</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-primary/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  Open Calculator <ArrowRight className="size-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why calculators matter */}
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 sm:p-10 space-y-5">
          <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
            <Clock className="size-6 text-primary" />
            Why accurate calculators matter
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Manual calculations are prone to errors, especially when dealing with date arithmetic, compound interest, or unit conversions. A small mistake in an age calculation on a form submission or a miscounted date range in a project plan can cause real problems. Browser-based calculators give you instant, accurate answers without any software installation or data entry risk from switching between apps.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            KooBrain Calculators are designed to be fast, self-explanatory, and free. Each tool shows clear input fields, explains its methodology, and gives you results you can immediately copy or share. All calculations happen in your browser — we don't log your inputs or send them to any server.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-on-surface-variant">
            {[
              "Exact date arithmetic — accounts for leap years and varying month lengths",
              "Instant results with clear formatting — no waiting, no page reload",
              "Mobile-friendly layout — works on phones and tablets",
              "Zero data collection — your inputs stay private on your device",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Planned tools */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 flex-wrap px-1">
            <div className="p-2 rounded-xl bg-secondary/10">
              <Sparkles className="size-5 text-secondary" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-widest text-on-surface">Coming Soon</h2>
            <div className="flex items-center gap-2 flex-wrap ml-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                    category === cat
                      ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20"
                      : "bg-white dark:bg-slate-900 text-on-surface-variant border-outline-variant/20 hover:border-primary/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlanned.map((tool) => (
              <div
                key={tool.name}
                className="p-6 rounded-2xl border border-outline-variant/20 bg-surface-container flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-on-surface uppercase tracking-tight mb-1">{tool.name}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{tool.desc}</p>
                </div>
                <span className="mt-auto inline-block text-[9px] font-black uppercase tracking-widest text-secondary/60 border border-secondary/20 rounded-full px-3 py-1 w-fit">
                  In Development
                </span>
              </div>
            ))}
          </div>
          {filteredPlanned.length === 0 && (
            <p className="py-10 text-center text-on-surface-variant italic opacity-50 font-bold">No planned tools in this category yet.</p>
          )}
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-surface-container to-surface-container-high p-8 sm:p-10">
          <h3 className="text-2xl font-black text-on-surface mb-2">Explore more free tools</h3>
          <p className="text-on-surface-variant mb-6 max-w-2xl">
            While more calculators are on the way, explore KooBrain's full tool suite — JSON formatters, image compressors, encoding tools, and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors">
              Browse all tools <ArrowRight className="size-4" />
            </Link>
            <Link to="/age-calculator" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/35 bg-surface-container-low px-6 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
              <Zap className="size-4" /> Age Calculator
            </Link>
          </div>
        </section>
      </div>
    </ToolPageWrapper>
  );
};
