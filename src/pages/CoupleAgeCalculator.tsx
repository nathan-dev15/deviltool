import React from 'react';
import {
    differenceInYears,
    differenceInMonths,
    differenceInDays,
    parseISO,
    isValid
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Sparkles, User, LayoutDashboard, Star, Info, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from "@/src/components/AdSense";
import { useI18n } from '@/src/i18n/I18nContext';
import { cn } from '@/src/lib/utils';
import { TOOL_SEO_BY_PATH } from '@/src/seo/toolSeo';
import { buildToolSeoPage } from '@/src/seo/generateToolSeo';
import { ToolDetailedContent } from '@/src/components/ToolDetailedContent';

export const CoupleAgeCalculator: React.FC = () => {
    const { t, locale } = useI18n();
    const [name1, setName1] = React.useState('');
    const [name2, setName2] = React.useState('');
    const [date1, setDate1] = React.useState('');
    const [date2, setDate2] = React.useState('');
    const [result, setResult] = React.useState<any>(null);

    const seoConfig = TOOL_SEO_BY_PATH['/couple-age-calculator'];
    const seoPage = seoConfig ? buildToolSeoPage(seoConfig, { locale }) : null;

    const calculate = () => {
        if (!date1 || !date2) return;

        const d1 = parseISO(date1);
        const d2 = parseISO(date2);

        if (!isValid(d1) || !isValid(d2)) return;

        const older = d1 < d2 ? d1 : d2;
        const younger = d1 > d2 ? d1 : d2;

        const years = differenceInYears(younger, older);
        const months = differenceInMonths(younger, older) % 12;

        const baseDate = new Date(
            younger.getFullYear(),
            younger.getMonth(),
            older.getDate()
        );

        const days = Math.abs(differenceInDays(younger, baseDate));
        const totalDays = Math.abs(differenceInDays(younger, older));

        const loveScore = Math.max(40, 100 - (years * 2 + months * 0.5));

        setResult({
            years,
            months,
            days,
            totalDays,
            loveScore,
            olderName: d1 < d2 ? name1 || t('label.partner_one') : name2 || t('label.partner_two')
        });
    };

    return (
        <ToolPageWrapper
            title={t('tools.couple-age-calculator.name')}
            description={t('tools.couple-age-calculator.description')}
            breadcrumbs={[
                { label: t('nav.tools'), href: "/tools" },
                { label: t('tools.couple-age-calculator.name') }
            ]}
            accentColor="secondary"
        >
            <SEO
                title="Love Calculator ❤️ | Couple Age & Compatibility GAP Tool"
                description="Use the most accurate Love Calculator & Couple Age Gap tool. Calculate love percentage, relationship compatibility, and age difference in years, months, and days."
                keywords="love calculator, couple's age calculator, love percentage, relationship compatibility, age gap calculator, soulmate calculator, relationship test"
                canonicalUrl="https://KooBrain.com/couple-age-calculator"
            />

            <div className="max-w-6xl mx-auto px-4 space-y-16 sm:space-y-24">

                {/* HERO SECTION */}
                <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20 mb-4">
                        <Heart className="size-3 fill-secondary" /> {t('label.compatibility_insight')}
                    </div>
                    <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-on-surface">
                        Ultimate <span className="text-secondary">Love</span> Calculator
                    </h1>
                    <p className="text-on-surface-variant text-base sm:text-xl font-medium leading-relaxed opacity-80">
                        Discover your relationship's unique rhythm with our advanced Couple Age & Compatibility tool. Calculate your Love Score instantly.
                    </p>
                </div>

                {/* CALCULATOR PANEL */}
                <div className="relative">
                    {/* ACCENT GLOWS */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] pointer-events-none" />

                    <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-20">
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="bg-surface-container-low border-2 border-secondary/30 text-secondary p-6 rounded-full shadow-[0_0_50px_rgba(45,212,191,0.2)]"
                        >
                            <Heart className="size-8 fill-secondary" />
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 relative z-10">
                        {/* PARTNER 1 */}
                        <div className="bg-surface-container-low/50 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-outline-variant/30 shadow-2xl space-y-8 group transition-all hover:bg-surface-container-low">
                            <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-6">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <User className="size-6" />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-widest text-on-surface">
                                    {t('label.partner_one')}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">{t('label.name')}</label>
                                    <input
                                        type="text"
                                        placeholder="E.g. Jay"
                                        value={name1}
                                        onChange={(e) => setName1(e.target.value)}
                                        className="w-full p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg shadow-inner"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">{t('label.date_of_birth')}</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-primary" />
                                        <input
                                            type="date"
                                            value={date1}
                                            onChange={(e) => setDate1(e.target.value)}
                                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PARTNER 2 */}
                        <div className="bg-surface-container-low/50 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-outline-variant/30 shadow-2xl space-y-8 group transition-all hover:bg-surface-container-low">
                            <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-6">
                                <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                                    <User className="size-6 shadow-secondary/20 shadow-lg" />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-widest text-on-surface">
                                    {t('label.partner_two')}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">{t('label.name')}</label>
                                    <input
                                        type="text"
                                        placeholder="E.g. Rose"
                                        value={name2}
                                        onChange={(e) => setName2(e.target.value)}
                                        className="w-full p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 focus:ring-4 focus:ring-secondary/10 outline-none transition-all font-bold text-lg shadow-inner"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">{t('label.date_of_birth')}</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-secondary" />
                                        <input
                                            type="date"
                                            value={date2}
                                            onChange={(e) => setDate2(e.target.value)}
                                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 focus:ring-4 focus:ring-secondary/10 outline-none transition-all font-bold text-lg shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CALCULATE BUTTON */}
                <div className="flex justify-center">
                    <button
                        onClick={calculate}
                        className="group relative bg-secondary hover:bg-secondary/90 text-on-secondary px-12 py-6 rounded-full font-black flex items-center gap-4 shadow-[0_12px_40px_rgba(45,212,191,0.3)] hover:shadow-[0_15px_60px_rgba(45,212,191,0.4)] transition-all hover:-translate-y-1 active:translate-y-1 active:scale-95 border-2 border-white/20 active:shadow-none"
                    >
                        <Sparkles className="size-6 group-hover:rotate-12 transition-transform" />
                        <span className="uppercase tracking-[0.25em] text-xs sm:text-sm">{t('label.calculate_love')}</span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 blur-sm rounded-full mx-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>

                {/* ADS BANNER */}
                <div className="rounded-[2.5rem] overflow-hidden border border-outline-variant/30 shadow-inner bg-surface-container-lowest/30">
                    <AdSense slot="8156203131" />
                </div>

                {/* RESULT SECTION */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-surface-container-low border border-outline-variant/30 p-8 sm:p-16 rounded-[4rem] shadow-2xl text-center space-y-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />

                            <div className="space-y-4">
                                <h3 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tighter">
                                    {t('label.relationship_result')}
                                </h3>
                                <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                                    <Star className="size-4 text-secondary fill-secondary" />
                                    {result.olderName} {t('label.is_older')}
                                    <Star className="size-4 text-secondary fill-secondary" />
                                </p>
                            </div>

                            <div className="relative inline-block group">
                                <div className="absolute inset-0 bg-secondary/20 blur-[50px] group-hover:bg-secondary/30 transition-all rounded-full" />
                                <div className="relative bg-surface-container-low p-12 sm:p-16 rounded-full border-4 border-secondary shadow-2xl flex flex-col items-center justify-center min-w-[240px] sm:min-w-[320px]">
                                    <Heart className="size-10 text-secondary fill-secondary mb-4 animate-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-2">{t('label.love_score')}</p>
                                    <p className="text-6xl sm:text-8xl font-black text-secondary tracking-tighter tabular-nums drop-shadow-lg">
                                        {result.loveScore}%
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                                <StatCard label={t('label.years')} value={result.years} color="primary" />
                                <StatCard label={t('label.months')} value={result.months} color="secondary" />
                                <StatCard label={t('label.days')} value={result.days} color="tertiary" />
                                <StatCard label={t('label.days_total')} value={result.totalDays} color="secondary" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ADS BANNER AFTER TOOL */}
                <div className="rounded-[2.5rem] overflow-hidden border border-outline-variant/30 shadow-inner bg-surface-container-lowest/30">
                    <AdSense slot="8156203131" />
                </div>

                {/* DETAILED CONTENT SECTION */}
                {seoPage && <ToolDetailedContent config={seoPage} />}

                {/* BOTTOM NAVIGATION */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                    <Link to="/age-calculator" className="group flex items-center gap-4 bg-surface-container-low hover:bg-surface-container-lowest px-10 py-5 rounded-full border border-outline-variant/30 shadow-lg transition-all hover:scale-105">
                        <Star className="size-5 text-primary group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest text-on-surface/80">Try Age Calculator</span>
                    </Link>
                    <Link to="/tools" className="group flex items-center gap-4 bg-surface-container-low hover:bg-surface-container-lowest px-12 py-5 rounded-full border border-outline-variant/30 shadow-lg transition-all hover:scale-105">
                        <LayoutDashboard className="size-5 text-secondary group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest text-on-surface/80">{t('label.view_all_tools')}</span>
                    </Link>
                </div>

            </div>
        </ToolPageWrapper>
    );
};

const StatCard = ({ label, value, color }: any) => (
    <div className={cn(
        "bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/20 shadow-xl transition-all hover:-translate-y-2 relative overflow-hidden group",
        color === 'primary' && "hover:border-primary/40 shadow-primary/5",
        color === 'secondary' && "hover:border-secondary/40 shadow-secondary/5",
        color === 'tertiary' && "hover:border-tertiary/40 shadow-tertiary/5",
    )}>
        <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity",
            color === 'primary' && "bg-primary",
            color === 'secondary' && "bg-secondary",
            color === 'tertiary' && "bg-tertiary",
        )} />
        <p className={cn(
            "text-4xl sm:text-5xl font-black mb-3 tracking-tighter drop-shadow-sm",
            color === 'primary' && "text-primary",
            color === 'secondary' && "text-secondary",
            color === 'tertiary' && "text-tertiary",
        )}>{value}</p>
        <p className="text-[10px] sm:text-[11px] font-black text-on-surface-variant/60 uppercase tracking-widest">{label}</p>
    </div>
);
