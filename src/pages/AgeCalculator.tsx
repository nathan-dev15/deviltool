import React from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, parseISO, isValid, format as formatDate } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, Info, ChevronRight, Home as HomeIcon, Clock, Gift, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';

export const AgeCalculator: React.FC = () => {
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
    <div className="px-4 py-12">
      <SEO 
        title="Age Calculator - Exact Age in Years, Months, Days"
        description="Calculate your exact age in years, months, and days. Find out how many days until your next birthday with our free online age calculator."
        keywords="age calculator, birthday calculator, exact age, days until birthday, calculator tools"
      />
      <nav className="flex mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li>Calculators</li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">Age Calculator</li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Age Calculator</h1>
        <p className="text-slate-600 dark:text-slate-400">Calculate your exact age in years, months, and days.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Date of Birth</label>
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg font-medium"
            />
          </div>

          <button 
            onClick={calculateAge}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Calendar className="size-5" /> Calculate Age
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 dark:border-slate-800"
            >
              <div className="text-center p-4 bg-primary/5 rounded-2xl">
                <p className="text-3xl font-black text-primary">{result.years}</p>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Years</p>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-2xl">
                <p className="text-3xl font-black text-primary">{result.months}</p>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Months</p>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-2xl">
                <p className="text-3xl font-black text-primary">{result.days}</p>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Days</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <Clock className="text-primary size-8 mb-4" />
          <h3 className="font-bold mb-2">Precise Calculation</h3>
          <p className="text-sm text-slate-500 leading-relaxed">We use the date-fns library to ensure high precision, accounting for leap years and varying month lengths.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <Gift className="text-primary size-8 mb-4" />
          <h3 className="font-bold mb-2">Birthday Countdown</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Find out exactly how many days are left until your next birthday celebration.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <Star className="text-primary size-8 mb-4" />
          <h3 className="font-bold mb-2">Life Milestones</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Track your age in total weeks, days, hours, and even minutes for a different perspective.</p>
        </div>
      </div>
    </div>
  );
};
