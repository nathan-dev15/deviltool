import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight, Info, CheckCircle2, ListChecks, Lightbulb, Calculator, History, Sparkles } from 'lucide-react';
import { ToolSeoPage } from '@/src/seo/generateToolSeo';

interface ToolDetailedContentProps {
    config: ToolSeoPage;
}

export const ToolDetailedContent: React.FC<ToolDetailedContentProps> = ({ config }) => {
    if (!config.detailedDescription && !config.usageGuide && !config.faqs.length) return null;

    return (
        <div className="space-y-24 py-16 animate-fade-in text-on-surface">
            
            {/* 1. DETAILED EXPLANATION SECTION */}
            {config.detailedDescription && (
                <section className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-6">
                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Info className="size-6" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight underline decoration-primary/30 decoration-4 underline-offset-8">
                            Everything You Need to Know About {config.toolName}
                        </h2>
                    </div>
                    
                    <div className="prose prose-lg prose-invert max-w-none text-on-surface-variant leading-relaxed space-y-6">
                        {config.detailedDescription.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-lg opacity-90 leading-[1.8]">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>
            )}

            {/* 2. FORMULA / METHODOLOGY SECTION */}
            {config.formula && (
                <section className="max-w-4xl mx-auto bg-surface-container-low/50 border border-outline-variant/30 rounded-[3rem] p-8 sm:p-12 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-3xl -z-10" />
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <Calculator className="size-6" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">{config.formula.title}</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-on-surface-variant text-lg leading-relaxed">
                            {config.formula.explanation}
                        </p>
                        {config.formula.calculation && (
                            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-secondary/20 font-mono text-secondary text-lg overflow-x-auto">
                                <code>{config.formula.calculation}</code>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 3. STEP-BY-STEP USAGE GUIDE */}
            {config.usageGuide && (
                <section className="max-w-4xl mx-auto space-y-12">
                     <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                            <ListChecks className="size-6" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">{config.usageGuide.title}</h2>
                    </div>

                    <div className="grid gap-6">
                        {config.usageGuide.steps.map((step, i) => (
                            <div key={i} className="group flex items-start gap-6 p-6 rounded-3xl bg-surface-container-low/30 border border-outline-variant/20 hover:border-tertiary/30 transition-all">
                                <span className="size-10 rounded-xl bg-tertiary/10 text-tertiary font-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    {i + 1}
                                </span>
                                <p className="text-on-surface-variant text-lg font-medium pt-1">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 4. REAL-WORLD EXAMPLES */}
            {config.examples && (
                <section className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-black tracking-tight">{config.examples.title}</h2>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {config.examples.list.map((ex, i) => (
                            <div key={i} className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/30 hover:shadow-xl transition-all space-y-4">
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                    <Lightbulb className="size-5" /> {ex.title}
                                </h3>
                                <p className="text-on-surface-variant leading-relaxed">
                                    {ex.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 5. BENEFITS & USE CASES */}
            {(config.benefits.length > 0 || config.useCases) && (
                <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <CheckCircle2 className="size-6 text-secondary" /> Key Benefits
                        </h3>
                        <ul className="space-y-4">
                            {config.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-3 text-on-surface-variant font-medium">
                                    <ChevronRight className="size-4 text-secondary mt-1 shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {config.useCases && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black flex items-center gap-3">
                                <Sparkles className="size-6 text-primary" /> Use Cases
                            </h3>
                            <ul className="space-y-4">
                                {config.useCases.map((uc, i) => (
                                    <li key={i} className="flex items-start gap-3 text-on-surface-variant font-medium">
                                        <ChevronRight className="size-4 text-primary mt-1 shrink-0" />
                                        {uc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            )}

            {/* 6. FAQ SECTION (Enhanced) */}
            {config.faqs.length > 0 && (
                <section className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-black text-on-surface flex items-center justify-center gap-4">
                            <HelpCircle className="size-8 text-secondary" /> 
                            Common Questions
                        </h2>
                        <p className="text-on-surface-variant font-medium">Everything you need to know about using {config.toolName} safely and effectively.</p>
                    </div>

                    <div className="grid gap-6">
                        {config.faqs.map((faq, i) => (
                            <div key={i} className="bg-surface-container-low/20 border border-outline-variant/20 p-8 rounded-[2rem] hover:border-secondary/40 transition-all group">
                                <h3 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-4">
                                    <span className="size-8 rounded-xl bg-secondary/10 text-secondary text-sm flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">Q</span>
                                    {faq.question}
                                </h3>
                                <p className="text-on-surface-variant text-lg leading-relaxed pl-12 opacity-90">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 7. TRUST SIGNALS & FOOTER */}
            <section className="max-w-4xl mx-auto border-t border-outline-variant/30 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60">
                <div className="flex items-center gap-3">
                    <History className="size-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">Last Updated: {config.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Verified for AdSense Compliance & Accuracy</span>
                    <CheckCircle2 className="size-4 text-secondary" />
                </div>
            </section>
        </div>
    );
};
