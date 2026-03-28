import React from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, parseISO, isValid } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Info, ChevronRight, Clock, Gift, Star, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';

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

      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] shadow-xl p-8 md:p-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
          
          <div className="max-w-md mx-auto space-y-10">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">{t('label.date_of_birth')}</label>
              <div className="relative group/input">
                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors" />
                 <input 
                   type="date" 
                   value={birthDate}
                   onChange={(e) => setBirthDate(e.target.value)}
                   className="w-full pl-12 pr-6 py-5 bg-surface-container-high/40 border border-outline-variant/20 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none transition-all text-on-surface font-black text-xl"
                 />
              </div>
            </div>

            <button 
              onClick={calculateAge}
              className="w-full bg-primary text-on-primary py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
            >
              <Gift className="size-5" /> {t('label.calculate_age')}
            </button>

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-3 gap-4 pt-10 border-t border-outline-variant/10"
                >
                  <div className="text-center p-6 bg-surface-container-high/40 rounded-3xl border border-outline-variant/10">
                    <p className="text-4xl font-black text-primary mb-1">{result.years}</p>
                    <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">{t('label.years')}</p>
                  </div>
                  <div className="text-center p-6 bg-surface-container-high/40 rounded-3xl border border-outline-variant/10">
                    <p className="text-4xl font-black text-primary mb-1">{result.months}</p>
                    <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">{t('label.months')}</p>
                  </div>
                  <div className="text-center p-6 bg-surface-container-high/40 rounded-3xl border border-outline-variant/10">
                    <p className="text-4xl font-black text-primary mb-1">{result.days}</p>
                    <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">{t('label.days')}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: t('label.precise_calculation'), desc: t('label.precise_calculation_desc') },
            { icon: Gift, title: t('label.birthday_countdown'), desc: t('label.birthday_countdown_desc') },
            { icon: Star, title: t('label.life_milestones'), desc: t('label.life_milestones_desc') },
          ].map((feature, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 p-8 rounded-3xl group shadow-sm hover:shadow-md transition-all">
              <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                <feature.icon className="text-primary size-7" />
              </div>
              <h3 className="font-black text-on-surface uppercase tracking-widest text-xs mb-3">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
            <Link to="/tools" className="group flex items-center gap-3 bg-surface-container-high/40 hover:bg-surface-container-high px-10 py-5 rounded-[2rem] border border-outline-variant/10 transition-all">
                <LayoutDashboard className="size-5 text-primary group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-black uppercase tracking-widest text-on-surface">{t('label.view_all_tools')}</span>
            </Link>
        </div>
      </div>
    </ToolPageWrapper>
  );
};
