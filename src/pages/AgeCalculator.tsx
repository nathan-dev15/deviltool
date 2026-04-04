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

      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 animate-fade-in px-4 sm:px-0">
        <div className="bg-surface-container-lowest/50 backdrop-blur-3xl border-2 border-slate-300 dark:border-slate-800 border-b-8 border-b-orange-500 rounded-[2rem] sm:rounded-[3rem] shadow-2xl p-6 sm:p-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-[60px] pointer-events-none" />
          
          <div className="max-w-md mx-auto space-y-8 sm:space-y-10 relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-1">
                {t('label.date_of_birth')}
              </label>
              <div className="relative group/input p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-inner">
                 <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within/input:text-orange-500 transition-colors" />
                 <input 
                   type="date" 
                   value={birthDate}
                   onChange={(e) => setBirthDate(e.target.value)}
                   className="w-full pl-14 pr-6 py-4 sm:py-5 bg-white dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-orange-500/50 outline-none transition-all text-slate-800 dark:text-slate-100 font-black text-lg sm:text-xl shadow-sm"
                 />
              </div>
            </div>
   <div className="rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm">
             <AdSense slot="8156203131"/>
          </div>
            <button 
              onClick={calculateAge}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs transition-all shadow-[0_8px_0_0_#ea580c] hover:shadow-[0_6px_0_0_#ea580c] hover:translate-y-[2px] active:shadow-none active:translate-y-[8px] flex items-center justify-center gap-3 group/btn border-2 border-orange-300 ring-2 ring-orange-600/20"
            >
              <Gift className="size-5 group-hover:rotate-12 transition-transform" /> {t('label.calculate_age')}
            </button>

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-3 sm:gap-4 pt-8 relative"
                >
                  <div className="text-center p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-b-4 border-slate-300 dark:border-black shadow-sm transition-all hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl group/card">
                    <p className="text-2xl sm:text-4xl font-black text-orange-500 mb-1 drop-shadow-sm">{result.years}</p>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{t('label.years')}</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-b-4 border-slate-300 dark:border-black shadow-sm transition-all hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl group/card">
                    <p className="text-2xl sm:text-4xl font-black text-orange-500 mb-1 drop-shadow-sm">{result.months}</p>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{t('label.months')}</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-b-4 border-slate-300 dark:border-black shadow-sm transition-all hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl group/card">
                    <p className="text-2xl sm:text-4xl font-black text-orange-500 mb-1 drop-shadow-sm">{result.days}</p>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{t('label.days')}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-8">
          {[
            { icon: Clock, title: t('label.precise_calculation'), desc: t('label.precise_calculation_desc') },
            { icon: Gift, title: t('label.birthday_countdown'), desc: t('label.birthday_countdown_desc') },
            { icon: Star, title: t('label.life_milestones'), desc: t('label.life_milestones_desc') },
          ].map((feature, i) => (
            <div key={i} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-800 border-b-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="size-12 sm:size-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all text-orange-500">
                <feature.icon className="size-6 sm:size-7" />
              </div>
              <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[10px] sm:text-xs mb-3 truncate">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
            <Link to="/tools" className="group flex items-center gap-3 bg-white dark:bg-slate-900 px-8 py-4 sm:px-10 sm:py-5 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-md">
                <LayoutDashboard className="size-5 text-orange-500 group-hover:rotate-12 transition-transform" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">{t('label.view_all_tools')}</span>
            </Link>
        </div>
      </div>
    </ToolPageWrapper>
  );
};
