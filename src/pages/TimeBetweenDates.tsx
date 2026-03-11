import React from 'react';
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, parseISO, isValid } from 'date-fns';
import { motion } from 'framer-motion';
import { Clock, Calendar, Info, ChevronRight, Home as HomeIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';

export const TimeBetweenDates: React.FC = () => {
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
    <div className="px-4 py-12">
      <SEO 
        title="Time Between Dates Calculator - Days, Weeks, Months"
        description="Calculate the exact time difference between two dates. Get the duration in days, weeks, months, and years. Perfect for project planning and countdowns."
        keywords="time between dates, date difference calculator, days between dates, duration calculator, date tools"
      />
      <nav className="flex mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li>Calculators</li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">Time Between Dates</li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Time Between Dates</h1>
        <p className="text-slate-600 dark:text-slate-400">Calculate the exact duration between any two dates instantly.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Start Date</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500">End Date</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        <button 
          onClick={calculate}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Clock className="size-5" /> Calculate Duration
        </button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <div className="p-6 bg-primary/5 rounded-2xl text-center">
              <p className="text-3xl font-black text-primary">{result.years}</p>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Years</p>
            </div>
            <div className="p-6 bg-primary/5 rounded-2xl text-center">
              <p className="text-3xl font-black text-primary">{result.months}</p>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Months</p>
            </div>
            <div className="p-6 bg-primary/5 rounded-2xl text-center">
              <p className="text-3xl font-black text-primary">{result.weeks}</p>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Weeks</p>
            </div>
            <div className="p-6 bg-primary/5 rounded-2xl text-center">
              <p className="text-3xl font-black text-primary">{result.days}</p>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Days</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">Why use this tool?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="text-primary size-5" /> Project Planning
            </h3>
            <p className="text-slate-500 text-sm">Calculate the exact number of days or weeks available for a project deadline or sprint cycle.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ArrowRight className="text-primary size-5" /> Event Countdown
            </h3>
            <p className="text-slate-500 text-sm">Find out exactly how long it is until your next vacation, wedding, or major life event.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
