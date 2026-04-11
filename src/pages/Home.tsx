import React from 'react';
import { Link } from 'react-router-dom';
import {
  CodeXml, Lock, Image as ImageIcon, Type, Database,
  Calendar as Calculator, Clock, FileImage, FileCode,
  Bolt, GitCompare, ArrowRight, Search, History, QrCode,
  Link as LinkIcon, ShieldCheck, TableProperties, Diff, AlignJustify,
  Zap, Shield, Globe
} from 'lucide-react';
import { TOOLS } from '../constants';
import { cn } from '../lib/utils';
import { useI18n } from '../i18n/I18nContext';
import { AdSense } from "@/src/components/AdSense";
const iconMap: Record<string, any> = {
  'code-xml':     CodeXml,
  'lock':         Lock,
  'image':        ImageIcon,
  'type':         Type,
  'database':     Database,
  'calendar':     Calculator,
  'clock':        Clock,
  'file-image':   FileImage,
  'file-code':    FileCode,
  'git-compare':  GitCompare,
  'history':      History,
  'qr-code':      QrCode,
  'link':         LinkIcon,
  'shield':       ShieldCheck,
  'table':        TableProperties,
  'diff':         Diff,
  'align-justify':AlignJustify,
  'bolt':         Bolt,
  'search':       Search,
  'arrow-right':  ArrowRight,
};

const resolveIcon = (key: string, fallback: any) => {
  const Icon = iconMap[key];
  // Lucide icons are typically React.forwardRef() objects with $$typeof.
  // If we ever end up with a browser global (e.g. History/Image) by accident, this avoids "Illegal constructor".
  if (Icon && typeof Icon === "object" && "$$typeof" in Icon) return Icon;
  return fallback;
};

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
});

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { t, locale } = useI18n();

  const getToolTranslation = (tool: (typeof TOOLS)[0]) => {
    return {
      ...tool,
      name: t(`tools.${tool.id}.name`),
      description: t(`tools.${tool.id}.description`)
    };
  };

  const filteredTools = TOOLS.map(getToolTranslation).filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularTools = TOOLS.slice(0, 3).map(getToolTranslation);
  const jsonTools    = TOOLS.filter(t => t.category === 'json' && t.id !== 'json-formatter').map(getToolTranslation);
  const encodeTools  = TOOLS.filter(t => t.category === 'encoding' && t.id !== 'base64-encode').map(getToolTranslation);
  const imageTools   = TOOLS.filter(t => t.category === 'image').map(getToolTranslation);
  const allTools     = TOOLS.map(getToolTranslation);

  const cardColors = [
    'from-indigo-500 to-violet-700 shadow-indigo-500/20',
    'from-emerald-500 to-teal-700 shadow-emerald-500/20',
    'from-fuchsia-500 to-pink-700 shadow-fuchsia-500/20',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden home-light-bg">
      <div className="home-light-grid" aria-hidden="true" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 sm:pt-36 sm:pb-32 px-4 sm:px-8 overflow-hidden min-h-[88vh] flex items-center">
        {/* Animated background orbs */}
        <div className="blob w-[520px] h-[520px] sm:w-[720px] sm:h-[720px] bg-primary/35 dark:bg-primary/25 top-[-15%] left-[-8%] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="blob w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] bg-secondary/28 dark:bg-secondary/25 bottom-[-8%] right-[-5%] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="blob blob-pulse w-[320px] h-[320px] sm:w-[470px] sm:h-[470px] bg-tertiary/22 dark:bg-tertiary/15 top-[25%] right-[10%] rounded-full mix-blend-multiply dark:mix-blend-overlay" />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          {/* Badge */}
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Bolt className="size-3" /> {t('home.badge')}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 kinetic-gradient leading-[1.05] animate-fade-in-up delay-150"
          >
            {t('home.hero_title_1')}<br className="hidden sm:block" /> {t('home.hero_title_2')}
          </h1>

          {/* Subheading */}
          <p
            className="text-on-surface-variant text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up delay-225"
          >
            {t('home.hero_subtitle')}
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto group animate-fade-in-up delay-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-tertiary to-secondary rounded-full blur opacity-25 group-focus-within:opacity-60 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex items-center bg-surface-container-low/80 backdrop-blur-md border border-outline-variant/30 rounded-full p-2 pl-5 shadow-2xl transition-all duration-300 group-focus-within:-translate-y-0.5">
              <Search className="text-on-surface-variant mr-3 group-focus-within:text-primary transition-colors size-5 shrink-0" />
              <input
                id="tool-search"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 py-3 outline-none text-sm sm:text-base"
                placeholder={t('home.search_placeholder')}
                aria-label={t('home.search_aria')}
              />
              <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 sm:px-7 py-3 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 shrink-0">
                {t('common.search')}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-fade-in-up delay-450">
            {[
              { icon: Zap,    label: t('home.stats_tools_label', { count: TOOLS.length }), sub: t('home.stats_tools_sub') },
              { icon: Shield, label: t('home.stats_privacy_label'), sub: t('home.stats_privacy_sub') },
              { icon: Globe,  label: t('home.stats_free_label'), sub: t('home.stats_free_sub') },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-on-surface leading-tight">{label}</p>
                  <p className="text-xs text-on-surface-variant">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">

        {/* Search results (shown only when searching) */}
        {searchQuery.trim() && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-on-surface">
              {t('home.search_results_title', { query: searchQuery })}
            </h2>
            {filteredTools.length === 0 ? (
              <p className="text-on-surface-variant">{t('home.search_no_results')}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map(tool => {
                  const Icon = iconMap[tool.icon] || CodeXml;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="glass-card home-tile-3d p-5 rounded-2xl transition-all duration-200 group block"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm mb-1 text-on-surface">{tool.name}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{tool.description}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Welcome & Mission Section */}
        {!searchQuery && (
          <section className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-outline-variant/20 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-on-surface text-center">
                Welcome to Koobrain - Your Free Online Tools Hub
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Why Koobrain?</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Koobrain is your all-in-one solution for online productivity. Our comprehensive suite of {TOOLS.length}+ free tools is designed to simplify your workflow whether you're a developer, designer, student, or content creator.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-3">No Complications</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    From JSON formatting and image optimization to password generation and text analysis, all tools work instantly in your browser. Zero installation, zero registration, zero hassle.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-surface-container-lowest/50 p-4 rounded-2xl border border-outline-variant/10 text-center">
                  <p className="font-bold text-2xl text-primary mb-1">{TOOLS.length}+</p>
                  <p className="text-sm text-on-surface-variant">Professional Tools</p>
                </div>
                <div className="bg-surface-container-lowest/50 p-4 rounded-2xl border border-outline-variant/10 text-center">
                  <p className="font-bold text-2xl text-tertiary mb-1">100% Free</p>
                  <p className="text-sm text-on-surface-variant">Forever & Always</p>
                </div>
                <div className="bg-surface-container-lowest/50 p-4 rounded-2xl border border-outline-variant/10 text-center">
                  <p className="font-bold text-2xl text-secondary mb-1">Privacy Protected</p>
                  <p className="text-sm text-on-surface-variant">Data on Your Device</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Popular Tools */}
        {!searchQuery && (
          <>
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface whitespace-nowrap">{t('home.popular_tools')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-outline-variant/50 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {popularTools.map((tool, index) => {
                  const Icon = iconMap[tool.icon] || CodeXml;
                  return (
                    <div
                      key={tool.id}
                      className={`animate-fade-in-up delay-${index * 75}`}
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <Link
                        to={tool.path}
                        className="glass-card home-tile-3d group p-6 sm:p-8 rounded-3xl transition-all duration-300 relative overflow-hidden block h-full"
                      >
                        <div className="absolute -top-2 -right-2 bg-tertiary text-on-tertiary px-3 py-0.5 rounded-full text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          {t('common.open')}
                        </div>
                        <div className={cn(
                          'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg',
                          cardColors[index]
                        )}>
                          <Icon className="size-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-on-surface">{tool.name}</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-5">{tool.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-0.5 bg-tertiary/15 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {tool.category}
                          </span>
                          {tool.trending && (
                            <span className="px-2.5 py-0.5 bg-primary/15 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                              {t('common.trending')}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* JSON Laboratory */}
            <section className="section-card">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-tertiary rounded-l-3xl" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4 pl-4">
                  <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-3 block">{t('home.section_structural_label')}</span>
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 text-on-surface">{t('home.section_json_title')}</h2>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    {t('home.section_json_desc')}
                  </p>
                  <Link to="/json-formatter" className="inline-flex items-center gap-2 text-tertiary font-bold hover:translate-x-1 transition-transform">
                    {t('home.section_json_cta')} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {jsonTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="home-tile-3d-row dark:bg-surface-container-high/60 p-5 rounded-2xl dark:hover:bg-surface-container-highest transition-all duration-200 flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-tertiary/10 flex items-center justify-center shrink-0 group-hover:bg-tertiary/20 transition-colors">
                        {React.createElement(resolveIcon(tool.icon, CodeXml), { className: 'size-4 text-tertiary' })}
                      </div>
                      <span className="font-semibold text-sm text-on-surface">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Encoding Hub */}
            <section className="section-card">
              <div className="absolute top-0 right-0 w-1.5 h-full bg-error rounded-r-3xl" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {encodeTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="home-tile-3d-row dark:bg-surface-container-high/60 p-5 rounded-2xl dark:hover:bg-surface-container-highest transition-all duration-200 flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-error/10 flex items-center justify-center shrink-0 group-hover:bg-error/20 transition-colors">
                        {React.createElement(resolveIcon(tool.icon, Lock), { className: 'size-4 text-error' })}
                      </div>
                      <span className="font-semibold text-sm text-on-surface">{tool.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="lg:col-span-4 order-1 lg:order-2 pr-4 text-right">
                  <span className="text-error font-bold tracking-widest text-xs uppercase mb-3 block">{t('home.section_security_label')}</span>
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 text-on-surface">{t('home.section_encoding_title')}</h2>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    {t('home.section_encoding_desc')}
                  </p>
                  <Link to="/base64-encode" className="inline-flex items-center gap-2 text-error font-bold hover:-translate-x-1 transition-transform">
                    {t('home.section_encoding_cta')} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Image Forge */}
            <section className="section-card">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary rounded-l-3xl" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-4 pl-4">
                  <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-3 block">{t('home.section_visual_label')}</span>
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 text-on-surface">{t('home.section_image_title')}</h2>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    {t('home.section_image_desc')}
                  </p>
                  <Link to="/image-compressor" className="inline-flex items-center gap-2 text-secondary font-bold hover:translate-x-1 transition-transform">
                    {t('home.section_image_cta')} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {imageTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="home-tile-3d-row dark:bg-surface-container-high/60 p-5 rounded-2xl dark:hover:bg-surface-container-highest transition-all duration-200 flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                        {React.createElement(resolveIcon(tool.icon, ImageIcon), { className: 'size-4 text-secondary' })}
                      </div>
                      <span className="font-semibold text-sm text-on-surface">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Success Stories / Use Cases */}
            <section className="bg-gradient-to-r from-tertiary/5 to-secondary/5 rounded-[2.5rem] p-8 sm:p-12 border border-outline-variant/20">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-on-surface text-center">
                Who Benefits From Koobrain?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    title: 'Developers & Programmers',
                    description: 'JSON formatters, regex testers, SQL formatters, and code beautifiers help you write cleaner code faster. No need for heavy IDE plugins.',
                    icon: CodeXml
                  },
                  {
                    title: 'Content Creators',
                    description: 'Image compressors, word counters, and text analyzers streamline your content production workflow and optimize files for web publishing.',
                    icon: FileCode
                  },
                  {
                    title: 'Students & Researchers',
                    description: 'Unit converters, calculators, text tools, and data processors help with homework, projects, and academic research.',
                    icon: Calculator
                  },
                  {
                    title: 'Security Professionals',
                    description: 'Password generators, JWT decoders, and encryption tools provide essential utilities for cybersecurity and data protection.',
                    icon: ShieldCheck
                  },
                  {
                    title: 'Designers & Photographers',
                    description: 'Image compressors, resizers, and converters optimize visual assets for web and print without expensive software.',
                    icon: ImageIcon
                  },
                  {
                    title: 'Business Professionals',
                    description: 'CSV converters, document analyzers, and formatting tools increase productivity in everyday data work.',
                    icon: Database
                  },
                ].map(({ title, description, icon: Icon }, idx) => (
                  <div
                    key={idx}
                    className={`bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 animate-fade-in-up delay-${idx * 75}`}
                    style={{ animationDelay: `${idx * 75}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-on-surface mb-2">{title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </section>

            <AdSense slot="8156203131"/>
            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-on-surface text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: 'Are all Koobrain tools truly free?',
                    answer: 'Yes! All {TOOLS.length}+ tools on Koobrain are completely free. We believe in making productivity tools accessible to everyone. There are no hidden charges, no premium versions, and no credit card required. Use as many tools as you like, whenever you like.'
                  },
                  {
                    question: 'Is my data safe and private?',
                    answer: 'Absolutely. Privacy is our top priority. All processing happens directly in your browser - your data never leaves your device. We don\'t collect, store, or track any of your information. Check our Privacy Policy for complete details about our zero-data-collection approach.'
                  },
                  {
                    question: 'Do I need to install anything to use these tools?',
                    answer: 'No installation required! All Koobrain tools work directly in your web browser. Simply visit koobrain.com, select a tool, and start using it instantly. It works on any device: desktop, tablet, or mobile.'
                  },
                  {
                    question: 'Which tools are most popular?',
                    answer: 'Our most popular tools include JSON Formatter for data validation, Password Generator for creating secure passwords, Image Compressor for optimizing images, and Word Counter for text analysis. However, we have tools for every need - from SQL formatting to Base64 encoding.'
                  },
                  {
                    question: 'Can I use Koobrain tools offline?',
                    answer: 'Once a page loads, most tools work offline. However, for the best experience, we recommend having an internet connection to ensure you have access to the latest versions of all tools.'
                  },
                  {
                    question: 'Do you offer an API or bulk processing?',
                    answer: 'Currently, Koobrain tools are designed for web-based use. For special requirements or partnerships, please contact us at contact@koobrain.com.'
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 hover:border-outline-variant/40 transition-all duration-200 group animate-fade-in-up delay-${index * 75}`}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <h3 className="font-bold text-on-surface mb-3 flex items-start gap-3">
                      <span className="text-primary font-black text-lg w-6 pt-0.5">Q:</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-on-surface-variant text-sm ml-9 leading-relaxed">
                      {faq.answer.replace('{TOOLS.length}', TOOLS.length.toString())}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* All tools grid */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface whitespace-nowrap">{t('home.all_tools')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-outline-variant/50 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {allTools.map((tool, i) => {
                  const Icon = resolveIcon(tool.icon, CodeXml);
                  return (
                    <div
                      key={tool.id}
                      className={`glass-card home-tile-3d flex flex-col items-center text-center p-4 rounded-2xl hover:border-primary/30 transition-all duration-200 group h-full animate-fade-in-up delay-${(i % 10) * 75}`}
                      style={{ animationDelay: `${(i % 10) * 75}ms` }}
                    >
                      <Link
                        to={tool.path}
                        className="flex flex-col items-center text-center w-full h-full"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-on-surface leading-tight">{tool.name}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
