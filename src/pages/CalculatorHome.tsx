import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Users, Hourglass, ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';
import { ToolPageWrapper } from '../components/ToolPageWrapper';
import { SEO } from '../components/SEO';

const LIVE_TOOLS = [
  {
    id: 'age-calculator',
    path: '/age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, weeks, and days from your date of birth. Accounts for leap years and varying month lengths.',
    icon: Calculator,
    accent: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary',
  },
  {
    id: 'couple-age-calculator',
    path: '/couple-age-calculator',
    name: 'Couple Age Calculator',
    description: 'Find the precise age difference between two people — displayed in years, months, and days. Great for relationship milestones and compatibility checks.',
    icon: Users,
    accent: 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-on-secondary',
  },
  {
    id: 'time-between-dates',
    path: '/time-between-dates',
    name: 'Time Between Dates',
    description: 'Calculate the exact duration between any two calendar dates in years, months, weeks, and days. Useful for project timelines, anniversaries, and deadlines.',
    icon: Hourglass,
    accent: 'bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary',
  },
];

export const CalculatorHome: React.FC = () => {
  return (
    <ToolPageWrapper
      title="Free Online Calculators"
      description="Accurate, browser-based calculators for everyday tasks. No installs, no sign-up — results instantly in your browser."
      breadcrumbs={[{ label: 'Tools', href: '/' }, { label: 'Calculators' }]}
      accentColor="primary"
    >
      <SEO
        title="Free Online Calculators — Age, Date & Time | KooBrain"
        description="Free browser-based calculators: age calculator, couple age difference, and time between dates. Instant results, fully private, no sign-up required."
        keywords="age calculator, time between dates, couple age calculator, free online calculators, date calculator, how old am I"
      />

      <div className="space-y-16 mt-8">

        {/* Live tools grid */}
        <section className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-widest text-on-surface-variant/50 px-1">
            Available Calculators ({LIVE_TOOLS.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIVE_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group p-8 rounded-[2.5rem] bg-surface-container border border-outline-variant/20 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all flex flex-col gap-5"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${tool.accent}`}>
                    <Icon className="size-7" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-black text-on-surface text-lg leading-snug group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{tool.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Calculator <ArrowRight className="size-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why accurate calculators matter */}
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 sm:p-10 space-y-5">
          <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
            <Calculator className="size-6 text-primary" />
            Why accurate date calculations matter
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Date arithmetic is surprisingly tricky to get right. Months have different lengths, leap years add an extra day every four years (with exceptions for century years), and time zones can shift the result by an entire day depending on where the calculation runs. A manual calculation done in your head or on a basic calculator will frequently be off by one or more days.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            KooBrain's calculators use the same high-precision date arithmetic as modern operating systems. The results account for every leap year since the Gregorian calendar was adopted, so whether you are calculating your exact age for a legal form, figuring out the number of days until a contract deadline, or finding the age gap between two people, you can rely on the answer being correct to the day.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            All calculations happen entirely within your browser. No data is sent to any server, no input is logged, and the tools work offline once the page has loaded.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-on-surface-variant pt-2">
            {[
              'Exact arithmetic — accounts for every leap year since 1582',
              'Instant results — no page reload, no waiting',
              'Mobile-friendly — works on phones and tablets',
              'Fully private — inputs never leave your device',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Use cases */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-on-surface">Common Use Cases</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Legal & official forms',
                desc: 'Many forms require your age in exact years and months. Our Age Calculator gives you both, eliminating guesswork on government, medical, and HR documents.',
                tool: '/age-calculator',
                label: 'Age Calculator',
              },
              {
                title: 'Project & contract timelines',
                desc: 'Calculate precisely how many days, weeks, or months remain until a deadline, or how long a project has been running since its start date.',
                tool: '/time-between-dates',
                label: 'Time Between Dates',
              },
              {
                title: 'Relationship milestones',
                desc: 'Find the exact age difference between two people in years, months, and days — useful for anniversary tracking and compatibility questions.',
                tool: '/couple-age-calculator',
                label: 'Couple Age Calculator',
              },
              {
                title: 'School & academic deadlines',
                desc: 'Students and educators can calculate submission deadlines, semester lengths, and study durations with exact day counts.',
                tool: '/time-between-dates',
                label: 'Time Between Dates',
              },
              {
                title: 'Health & fitness tracking',
                desc: 'Track how many weeks or months you have maintained a habit, or calculate your exact age for fitness assessments and health benchmarks.',
                tool: '/age-calculator',
                label: 'Age Calculator',
              },
              {
                title: 'Event planning',
                desc: 'Count the days to a wedding, birthday, or special event, and calculate how long it has been since a memorable date.',
                tool: '/time-between-dates',
                label: 'Time Between Dates',
              },
            ].map((item) => (
              <div key={item.title} className="bg-surface-container rounded-2xl p-6 border border-outline-variant/20 flex flex-col gap-3">
                <h3 className="font-black text-on-surface text-sm">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed flex-1">{item.desc}</p>
                <Link
                  to={item.tool}
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1 mt-1"
                >
                  {item.label} <ArrowRight className="size-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy callout */}
        <section className="bg-surface-container-low/30 rounded-3xl p-8 sm:p-10 border border-outline-variant/20 flex flex-col md:flex-row items-start gap-8">
          <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
            <Shield className="size-7 text-primary" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-black text-on-surface">100% Private — No Data Collected</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-2xl">
              Every calculator on KooBrain runs entirely in your browser. The dates and values you enter are never transmitted to any server, never stored, and never logged. This matters especially for age calculations used in sensitive contexts like medical or legal documents.
            </p>
            <ul className="space-y-1.5 text-sm text-on-surface-variant">
              {[
                'Zero server requests — all arithmetic happens locally',
                'No cookies, no tracking, no analytics on your inputs',
                'Works without an internet connection once the page loads',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-primary mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA to other tools */}
        <section className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 via-surface-container to-surface-container-high p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-black text-on-surface mb-1">Explore more free tools</h3>
            <p className="text-sm text-on-surface-variant">
              KooBrain offers 25+ free browser-based tools — JSON formatters, image compressors, encoding converters, and security tools. All free, all private.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors text-sm">
              Browse all tools <ArrowRight className="size-4" />
            </Link>
            <Link to="/image-compressor" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/35 bg-surface-container px-5 py-3 font-bold text-on-surface hover:border-primary/30 transition-colors text-sm">
              <Zap className="size-4" /> Image Compressor
            </Link>
          </div>
        </section>

      </div>
    </ToolPageWrapper>
  );
};
