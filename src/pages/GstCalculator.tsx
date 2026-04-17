import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Percent, IndianRupee, Info, CheckCircle2, LayoutDashboard, Star, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from "@/src/components/AdSense";
import { useI18n } from '@/src/i18n/I18nContext';
import { cn } from '@/src/lib/utils';
import { TOOL_SEO_BY_PATH } from '@/src/seo/toolSeo';
import { buildToolSeoPage } from '@/src/seo/generateToolSeo';
import { ToolDetailedContent } from '@/src/components/ToolDetailedContent';

export const GstCalculator: React.FC = () => {
    const { t, locale } = useI18n();
    const [amount, setAmount] = React.useState<string>('');
    const [gstRate, setGstRate] = React.useState<number>(18);
    const [type, setType] = React.useState<'add' | 'remove'>('add');
    const [result, setResult] = React.useState<any>(null);

    const seoConfig = TOOL_SEO_BY_PATH['/gst-calculator'];
    const seoPage = seoConfig ? buildToolSeoPage(seoConfig, { locale }) : null;

    const calculate = () => {
        const amt = parseFloat(amount);
        if (isNaN(amt)) return;

        let gstAmount: number;
        let netAmount: number;
        let totalAmount: number;

        if (type === 'add') {
            gstAmount = (amt * gstRate) / 100;
            totalAmount = amt + gstAmount;
            netAmount = amt;
        } else {
            gstAmount = amt - (amt * (100 / (100 + gstRate)));
            totalAmount = amt;
            netAmount = amt - gstAmount;
        }

        const cgst = gstAmount / 2;
        const sgst = gstAmount / 2;

        setResult({
            netAmount,
            gstAmount,
            totalAmount,
            cgst,
            sgst
        });
    };

    return (
        <ToolPageWrapper
            title="GST Calculator"
            description="Calculate Goods and Services Tax (GST) quickly with our professional GST tool. Add or remove GST from any amount instantly."
            breadcrumbs={[
                { label: "Financial", href: "#" },
                { label: "GST Calculator" }
            ]}
            accentColor="primary"
        >
            <SEO
                title="GST Calculator Online | Add or Remove GST (5%, 12%, 18%, 28%)"
                description="Use our free GST Calculator to find GST amount, CGST, and SGST. Easy to use tool for businesses and individuals. Calculate inclusive and exclusive GST."
                keywords="gst calculator, gst online, goods and services tax, calculate gst india, gst inclusive calculator, gst exclusive calculator"
            />

            <div className="max-w-6xl mx-auto px-4 space-y-16 sm:space-y-24">

                {/* HERO SECTION */}
                <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 mb-4">
                        <Percent className="size-3" /> Professional Financial Tools
                    </div>
                    <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-on-surface">
                        Precision <span className="text-primary">GST</span> Calculator
                    </h1>
                    <p className="text-on-surface-variant text-base sm:text-lg font-medium leading-relaxed opacity-80">
                        The most accurate way to calculate GST for invoices, taxation, and business accounting. Works for all tax slabs.
                    </p>
                </div>

                {/* CALCULATOR PANEL */}
                <div className="bg-surface-container-low border border-outline-variant/30 rounded-[3rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />
                    
                    <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Total Amount</label>
                                <div className="relative group/input">
                                    <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-primary" />
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">GST Rate (%)</label>
                                <div className="grid grid-cols-4 gap-3">
                                    {[5, 12, 18, 28].map((rate) => (
                                        <button
                                            key={rate}
                                            onClick={() => setGstRate(rate)}
                                            className={cn(
                                                "py-3 rounded-xl font-black text-sm border-2 transition-all",
                                                gstRate === rate 
                                                    ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20" 
                                                    : "bg-surface-container-lowest text-on-surface border-outline-variant/20 hover:border-primary/40"
                                            )}
                                        >
                                            {rate}%
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <div className="flex p-1.5 bg-surface-container-highest rounded-2xl border border-outline-variant/10">
                                    <button
                                        onClick={() => setType('add')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                                            type === 'add' ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
                                        )}
                                    >
                                        Add GST
                                    </button>
                                    <button
                                        onClick={() => setType('remove')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                                            type === 'remove' ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"
                                        )}
                                    >
                                        Remove GST
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={calculate}
                                className="w-full bg-primary hover:bg-primary/90 text-on-primary py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Calculator className="size-5" /> Calculate Now
                            </button>
                        </div>

                        <div className="bg-surface-container-lowest/50 border border-outline-variant/20 rounded-[2.5rem] p-8 flex flex-col justify-center gap-6">
                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center pb-4 border-b border-outline-variant/20">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2">Total Amount</p>
                                            <p className="text-4xl font-black text-primary">₹{result.totalAmount.toFixed(2)}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-center">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-1">Net Amount</p>
                                                <p className="text-lg font-bold">₹{result.netAmount.toFixed(2)}</p>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">Total GST</p>
                                                <p className="text-lg font-bold text-primary">₹{result.gstAmount.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 text-center">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-1">CGST ({(gstRate/2).toFixed(1)}%)</p>
                                                <p className="text-md font-bold">₹{result.cgst.toFixed(2)}</p>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 text-center">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-1">SGST ({(gstRate/2).toFixed(1)}%)</p>
                                                <p className="text-md font-bold">₹{result.sgst.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        className="text-center space-y-4 opacity-40 py-12"
                                    >
                                        <Calculator className="size-16 mx-auto text-on-surface-variant/30" />
                                        <p className="font-bold uppercase tracking-widest text-xs">Enter details to see breakdown</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                    <Link to="/age-calculator" className="group flex items-center gap-4 bg-surface-container-low hover:bg-surface-container-lowest px-10 py-5 rounded-full border border-outline-variant/30 shadow-md transition-all">
                        <Star className="size-5 text-primary group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest text-on-surface/80">Try Age Calculator</span>
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
