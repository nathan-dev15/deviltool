import React from 'react';
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, parseISO, isValid } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Info, ChevronRight, LayoutDashboard, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';

export const TimeBetweenDates: React.FC = () => {
  const { t } = useI18n();
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [result, setResult] = React.useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    
    if (!isValid(start) || !isValid(end)) return;

    setResult({
      days: Math.abs(differenceInDays(end, start)),
      weeks: Math.abs(differenceInWeeks(end, start)),
      months: Math.abs(differenceInMonths(end, start)),
      years: Math.abs(differenceInYears(end, start)),
    });
  };

  return (
    <ToolPageWrapper
      title={t('label.time_between_dates')}
      description={t('label.time_between_dates_desc')}
      breadcrumbs={[
        { label: "Calculators", href: "#" },
        { label: t('label.time_between_dates') }
      ]}
      accentColor="secondary"
    >
      <SEO 
        title="Time Between Dates Calculator - Days, Weeks, Months"
        description="Calculate the exact time difference between two dates. Get the duration in days, weeks, months, and years. Perfect for project planning and countdowns."
        keywords="time between dates, date difference calculator, days between dates, duration calculator, date tools"
      />

      <div className="space-y-12 animate-fade-in">

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] shadow-xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">{t('label.start_date')}</label>
              <div className="relative group/input">
                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-on-surface-variant/40 group-focus-within/input:text-secondary transition-colors" />
                 <input 
                   type="date" 
                   value={startDate}
                   onChange={(e) => setStartDate(e.target.value)}
                   className="w-full pl-12 pr-6 py-5 bg-surface-container-high/40 dark:bg-slate-900 border border-outline-variant/20 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary/50 outline-none transition-all text-on-surface font-bold text-lg"
                 />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">{t('label.end_date')}</label>
              <div className="relative group/input">
                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-on-surface-variant/40 group-focus-within/input:text-tertiary transition-colors" />
                 <input 
                   type="date" 
                   value={endDate}
                   onChange={(e) => setEndDate(e.target.value)}
                   className="w-full pl-12 pr-6 py-5 bg-surface-container-high/40 dark:bg-slate-900 border border-outline-variant/20 rounded-2xl focus:ring-4 focus:ring-tertiary/10 focus:border-tertiary/50 outline-none transition-all text-on-surface font-bold text-lg"
                 />
              </div>
            </div>
          </div>

          <button 
            onClick={calculate}
            className="w-full bg-on-surface dark:bg-white text-surface dark:text-black py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3"
          >
            <Clock className="size-5" /> {t('label.calculate_duration')}
          </button>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {[
                  { label: t('label.years'), value: result.years, color: 'text-primary' },
                  { label: t('label.months'), value: result.months, color: 'text-secondary' },
                  { label: t('label.weeks'), value: result.weeks, color: 'text-tertiary' },
                  { label: t('label.days'), value: result.days, color: 'text-success' },
                ].map((stat, i) => (
                  <div key={i} className="bg-surface-container-high/30 border border-outline-variant/10 p-8 rounded-[2rem] text-center backdrop-blur-sm group/card hover:bg-surface-container-high/60 transition-colors">
                    <p className={cn("text-5xl font-black mb-2 tracking-tighter group-hover/card:scale-110 transition-transform", stat.color)}>{stat.value}</p>
                    <p className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em]">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="bg-surface-container-low/20 p-12 rounded-[2.5rem] border border-outline-variant/20 relative overflow-hidden group">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/2 blur-[120px] pointer-events-none" />
          
          <h2 className="text-2xl font-black uppercase tracking-widest mb-12 text-center text-on-surface flex items-center justify-center gap-4">
            <Sparkles className="text-warning size-6" />
            {t('label.why_use_this_tool')}
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="flex gap-6 group/item">
              <div className="size-16 bg-primary/10 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
                 <Calendar className="text-primary size-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-on-surface">{t('label.project_planning')}</h3>
                <p className="text-on-surface-variant text-sm font-medium leading-relaxed italic">{t('label.project_planning_desc')}</p>
              </div>
            </div>
            <div className="flex gap-6 group/item">
              <div className="size-16 bg-tertiary/10 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-tertiary/20 transition-colors">
                 <ArrowRight className="text-tertiary size-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-on-surface">{t('label.event_countdown')}</h3>
                <p className="text-on-surface-variant text-sm font-medium leading-relaxed italic">{t('label.event_countdown_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-20">
            <Link to="/tools" className="group flex items-center gap-3 bg-surface-container-high/40 hover:bg-surface-container-high px-10 py-5 rounded-[2rem] border border-outline-variant/10 transition-all">
                <LayoutDashboard className="size-5 text-primary group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-black uppercase tracking-widest text-on-surface">{t('label.view_all_tools')}</span>
            </Link>
        </div>

      </div>
    </ToolPageWrapper>
  );
};
