import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Search, Banknote, Landmark, TrendingUp, Tag, Activity, Hourglass, Percent, ArrowRight, Filter } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { ToolPageWrapper } from '../components/ToolPageWrapper';
import { SEO } from '../components/SEO';
import { cn } from '../lib/utils';

export const CalculatorHome: React.FC = () => {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Finance', 'Health', 'Daily'];

  const tools = [
    { id: 'emi-calculator', category: 'Finance', icon: <Banknote className="size-6" /> },
    { id: 'gst-calculator', category: 'Finance', icon: <Landmark className="size-6" /> },
    { id: 'sip-calculator', category: 'Finance', icon: <TrendingUp className="size-6" /> },
    { id: 'loan-calculator', category: 'Finance', icon: <Banknote className="size-6" /> },
    { id: 'discount-calculator', category: 'Finance', icon: <Tag className="size-6" /> },
    { id: 'bmi-calculator', category: 'Health', icon: <Activity className="size-6" /> },
    { id: 'age-calculator', category: 'Daily', icon: <Calculator className="size-6" /> },
    { id: 'time-calculator', category: 'Daily', icon: <Hourglass className="size-6" /> },
    { id: 'percentage-calculator', category: 'Daily', icon: <Percent className="size-6" /> },
  ].map(tool => ({
    ...tool,
    name: t(`tools.${tool.id}.name`),
    description: t(`tools.${tool.id}.description`),
    path: `/${tool.id}`
  }));

  const filtered = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || tool.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <ToolPageWrapper
      title="Home Calculator Tools"
      description="Simple, fast, and accurate calculators for your daily financial and health needs."
      breadcrumbs={[{ label: "Tools", href: "/" }, { label: "Calculators" }]}
      accentColor="primary"
    >
      <SEO 
        title="Free Online Calculators - EMI, GST, BMI & Age"
        description="Accurate online calculators for finance, health, and daily tasks. Free EMI, GST, SIP, and Age calculators."
      />

      <div className="space-y-10 mt-8">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container-high/40 p-4 rounded-3xl border border-outline-variant/20 backdrop-blur-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant/40" />
            <input 
              type="text"
              placeholder="Search all calculators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-outline-variant/20 rounded-2xl text-sm font-bold outline-none focus:ring-4 ring-primary/10 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            <Filter className="size-4 text-on-surface-variant/40 mr-2 shrink-0 hidden sm:block" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filtered.map((tool) => (
            <Link 
              key={tool.id} 
              to={tool.path} 
              className="home-tile-3d p-8 rounded-[2.5rem] bg-white dark:bg-surface-container-high/60 border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all flex flex-col items-center text-center gap-5 group"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 group-hover:rotate-6">
                {tool.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-on-surface uppercase tracking-tight">{tool.name}</h3>
                <p className="text-xs text-on-surface-variant font-medium italic opacity-70 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 px-6 py-2 bg-primary/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                Use Calculator
              </div>
            </Link>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="py-20 text-center text-on-surface-variant font-bold italic opacity-50">No tools match your criteria.</div>
        )}
      </div>
    </ToolPageWrapper>
  );
};