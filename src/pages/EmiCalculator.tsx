import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, LayoutDashboard, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from "@/src/components/AdSense";
import { useI18n } from '@/src/i18n/I18nContext';
import { TOOL_SEO_BY_PATH } from '@/src/seo/toolSeo';
import { buildToolSeoPage } from '@/src/seo/generateToolSeo';
import { ToolDetailedContent } from '@/src/components/ToolDetailedContent';

export const EmiCalculator: React.FC = () => {
    const { locale } = useI18n();
    const [loanAmount, setLoanAmount] = React.useState<string>('1000000');
    const [interestRate, setInterestRate] = React.useState<string>('8.5');
    const [tenure, setTenure] = React.useState<string>('240');
    const [result, setResult] = React.useState<any>(null);

    const seoConfig = TOOL_SEO_BY_PATH['/emi-calculator'];
    const seoPage = seoConfig ? buildToolSeoPage(seoConfig, { locale }) : null;

    const calculate = () => {
        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 12 / 100;
        const n = parseFloat(tenure);

        if (isNaN(P) || isNaN(r) || isNaN(n) || r === 0) return;

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        setResult({
            monthlyEmi: emi,
            totalInterest,
            totalPayment,
            principalAmount: P
        });
    };

    React.useEffect(() => {
        calculate();
    }, []);

    return (
        <ToolPageWrapper
            title="EMI Calculator"
            description="Plan your loans with precision. Calculate Monthly Installments, total interest payable, and total cost of your loan instantly."
            breadcrumbs={[
                { label: "Financial", href: "#" },
                { label: "EMI Calculator" }
            ]}
            accentColor="secondary"
        >
            <SEO
                title="EMI Calculator Online - Home Loan, Car Loan & Personal Loan"
                description="Calculate your monthly loan EMI with our interactive EMI calculator. Get a detailed breakdown of principal and interest components."
                keywords="emi calculator, loan emi calculator, home loan emi, car loan emi, personal loan emi, monthly installment calculator"
            />

            <div className="max-w-6xl mx-auto px-4 space-y-16 sm:space-y-24">

                {/* HERO SECTION */}
                <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20 mb-4">
                        <TrendingUp className="size-3" /> Smart Financial Planning
                    </div>
                    <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-on-surface">
                        Ultimate <span className="text-secondary">EMI</span> Planner
                    </h1>
                    <p className="text-on-surface-variant text-base sm:text-lg font-medium leading-relaxed opacity-80">
                        Take control of your finances with our professional-grade loan calculator. Accurate results for every type of loan.
                    </p>
                </div>

                {/* CALCULATOR PANEL */}
                <div className="bg-surface-container-low border border-outline-variant/30 rounded-[3rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] pointer-events-none" />
                    
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-10">
                            {/* Loan Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">Loan Amount</label>
                                    <span className="text-xl font-black text-secondary">₹{parseFloat(loanAmount).toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="100000"
                                    max="10000000"
                                    step="50000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                            </div>

                            {/* Interest Rate */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">Interest Rate (P.A.)</label>
                                    <span className="text-xl font-black text-secondary">{interestRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                            </div>

                            {/* Loan Tenure */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">Tenure (Months)</label>
                                    <span className="text-xl font-black text-secondary">{tenure} Mo</span>
                                </div>
                                <input
                                    type="range"
                                    min="12"
                                    max="360"
                                    step="12"
                                    value={tenure}
                                    onChange={(e) => setTenure(e.target.value)}
                                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                            </div>

                            <button
                                onClick={calculate}
                                className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Calculator className="size-5" /> Update Results
                            </button>
                        </div>

                        <div className="bg-surface-container-lowest/50 border border-outline-variant/20 rounded-[2.5rem] p-8 flex flex-col justify-center gap-8 shadow-inner">
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center pb-6 border-b border-outline-variant/20">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2">Monthly EMI</p>
                                        <p className="text-5xl font-black text-secondary tabular-nums">₹{Math.round(result.monthlyEmi).toLocaleString()}</p>
                                    </div>
                                    
                                    <div className="grid gap-4">
                                        <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-2xl">
                                            <span className="text-xs font-bold text-on-surface-variant">Principal Amount</span>
                                            <span className="font-black">₹{result.principalAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                                            <span className="text-xs font-bold text-secondary">Total Interest</span>
                                            <span className="font-black text-secondary">₹{Math.round(result.totalInterest).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-2xl">
                                            <span className="text-xs font-bold text-on-surface-variant">Total Payment</span>
                                            <span className="font-black">₹{Math.round(result.totalPayment).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 h-3 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-secondary/30" 
                                            style={{ width: `${(result.principalAmount/result.totalPayment)*100}%` }} 
                                        />
                                        <div 
                                            className="bg-secondary" 
                                            style={{ width: `${(result.totalInterest/result.totalPayment)*100}%` }} 
                                        />
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-on-surface-variant/60 uppercase tracking-widest">Principal vs Interest Breakdown</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ADS BANNER */}
                <div className="rounded-[2.5rem] overflow-hidden border border-outline-variant/30 shadow-inner bg-surface-container-lowest/30">
                    <AdSense slot="8156203131" />
                </div>

                {/* DETAILED CONTENT */}
                {seoPage && <ToolDetailedContent config={seoPage} />}

                {/* BOTTOM NAVIGATION */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                     <Link to="/gst-calculator" className="group flex items-center gap-4 bg-surface-container-low hover:bg-surface-container-lowest px-10 py-5 rounded-full border border-outline-variant/30 shadow-md transition-all">
                        <Percent className="size-5 text-primary group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest text-on-surface/80">Try GST Calculator</span>
                    </Link>
                    <Link to="/tools" className="group flex items-center gap-4 bg-surface-container-low hover:bg-surface-container-lowest px-12 py-5 rounded-full border border-outline-variant/30 shadow-md transition-all">
                        <LayoutDashboard className="size-5 text-secondary group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest text-on-surface/80">View All Tools</span>
                    </Link>
                </div>

            </div>
        </ToolPageWrapper>
    );
};
