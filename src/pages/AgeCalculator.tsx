import React from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, parseISO, isValid } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Info, ChevronRight, Clock, Gift, Star, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';
import { AdSense } from "@/src/components/AdSense";
export const AgeCalculator: React.FC = () => {
  const { t } = useI18n();
  const [birthDate, setBirthDate] = React.useState('');
  const [result, setResult] = React.useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = parseISO(birthDate);
    if (!isValid(birth)) return;

    const now = new Date();
    const years = differenceInYears(now, birth);
    const months = differenceInMonths(now, birth) % 12;

    // Approximate days
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), birth.getDate());
    const days = differenceInDays(now, lastMonth) < 0
      ? differenceInDays(now, new Date(now.getFullYear(), now.getMonth() - 1, birth.getDate()))
      : differenceInDays(now, lastMonth);

    setResult({ years, months, days });
  };

  return (
    <ToolPageWrapper
      title={t('label.age_calculator')}
      description={t('label.age_calculator_desc')}
      breadcrumbs={[
        { label: "Calculators", href: "#" },
        { label: t('label.age_calculator') }
      ]}
      accentColor="primary"
    >
      <SEO
        title="Age Calculator - Exact Age in Years, Months, Days"
        description="Calculate your exact age in years, months, and days. Find out how many days until your next birthday with our free online age calculator."
        keywords="age calculator, birthday calculator, exact age, days until birthday, calculator tools"
      />

      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-16 animate-fade-in px-4 sm:px-0">

        {/* MAIN CALCULATOR CARD */}
        <div className="bg-surface-container-low dark:bg-surface-container-low border border-outline-variant/30 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl p-6 sm:p-14 relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[120px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary/10 blur-[80px] pointer-events-none group-hover:bg-tertiary/20 transition-all duration-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-primary/5 rounded-full scale-150 pointer-events-none" />

          <div className="max-w-lg mx-auto space-y-8 sm:space-y-12 relative z-10">
            <div className="space-y-5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-on-surface-variant/60 ml-1 flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                {t('label.date_of_birth')}
              </label>

              <div className="relative group/input p-1.5 bg-surface-container-highest dark:bg-black/40 rounded-3xl shadow-inner border border-outline-variant/10 transition-all hover:border-primary/30">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-on-surface-variant/30 group-focus-within/input:text-primary transition-colors" />
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 sm:py-6 bg-surface-container-lowest dark:bg-surface-container-low border-none rounded-[1.25rem] focus:ring-4 focus:ring-primary/10 outline-none transition-all text-on-surface font-black text-xl sm:text-2xl shadow-sm tracking-tight"
                />
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-inner bg-surface-container-lowest/30">
              <AdSense slot="8156203131" />
            </div>

            <button
              onClick={calculateAge}
              className="w-full bg-primary hover:bg-primary-container text-on-primary py-5 sm:py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs transition-all shadow-[0_10px_0_0_#008b94] hover:shadow-[0_6px_0_0_#008b94] hover:translate-y-[4px] active:shadow-none active:translate-y-[10px] flex items-center justify-center gap-4 group/btn border-2 border-primary/30 relative overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Gift className="size-5 group-hover:rotate-12 transition-transform" />
              <span>{t('label.calculate_age')}</span>
            </button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="grid grid-cols-3 gap-3 sm:gap-6 pt-10 sm:pt-14"
                >
                  {[
                    { val: result.years, label: t('label.years') },
                    { val: result.months, label: t('label.months') },
                    { val: result.days, label: t('label.days') }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center p-5 sm:p-8 bg-surface-container-lowest dark:bg-surface-container-lowest rounded-[2rem] sm:rounded-[2.5rem] border border-outline-variant/20 shadow-lg shadow-black/5 transition-all hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 group/card relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <Star className="size-4 text-primary fill-primary" />
                      </div>
                      <p className="text-3xl sm:text-5xl font-black text-primary mb-2 drop-shadow-sm tracking-tighter">{item.val}</p>
                      <p className="text-[10px] sm:text-[11px] font-black text-on-surface-variant/60 uppercase tracking-widest truncate">{item.label}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FEATURE TILES */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-10">
          {[
            { icon: Clock, title: t('label.precise_calculation'), desc: t('label.precise_calculation_desc'), color: 'primary' },
            { icon: Gift, title: t('label.birthday_countdown'), desc: t('label.birthday_countdown_desc'), color: 'secondary' },
            { icon: Star, title: t('label.life_milestones'), desc: t('label.life_milestones_desc'), color: 'tertiary' },
          ].map((feature, i) => (
            <div key={i} className="bg-surface-container-low/50 dark:bg-surface-container-low/30 backdrop-blur-sm border border-outline-variant/30 p-8 sm:p-10 rounded-[2.5rem] group shadow-sm hover:shadow-2xl hover:bg-surface-container-lowest transition-all hover:-translate-y-2">
              <div className={`size-14 sm:size-16 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-300
                ${feature.color === 'primary' ? 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-on-primary' : ''}
                ${feature.color === 'secondary' ? 'bg-secondary/10 text-secondary border-secondary/20 group-hover:bg-secondary group-hover:text-on-secondary' : ''}
                ${feature.color === 'tertiary' ? 'bg-tertiary/10 text-tertiary border-tertiary/20 group-hover:bg-tertiary group-hover:text-on-tertiary' : ''}
              `}>
                <feature.icon className="size-7 sm:size-8" />
              </div>
              <h3 className="font-black text-on-surface uppercase tracking-widest text-xs mb-4">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-75">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="flex justify-center pt-6">
          <Link to="/tools" className="group flex items-center gap-4 bg-surface-container-low hover:bg-surface-container-lowest px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-outline-variant/30 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <LayoutDashboard className="size-5 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-on-surface/80">{t('label.view_all_tools')}</span>
          </Link>
        </div>
      </div>
    </ToolPageWrapper>
  );
};
