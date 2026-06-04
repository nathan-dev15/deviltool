import React from 'react';
import { Link } from 'react-router-dom';
import {
  CodeXml, Lock, Image as ImageIcon, Type, Database,
  Calendar as Calculator, Clock, FileImage, FileCode,
  Bolt, GitCompare, ArrowRight, Search, History, QrCode,
  Link as LinkIcon, ShieldCheck, TableProperties, Diff, AlignJustify, 
  Zap, Shield, Globe, FileText, LayoutList, Divide, Percent, 
  BadgeIndianRupee, AreaChart, SquareFunction, FileUp, FileDown, PenLine,
  Scissors, Layers, RotateCw, Signature, Highlighter, Activity, TrendingUp,
  Tag, Banknote, Hourglass, Landmark, Filter, BookOpen
} from 'lucide-react';
import { TOOLS } from '../constants';
import { cn } from '../lib/utils';
import { useI18n } from '../i18n/I18nContext';
import { AdSense } from "@/src/components/AdSense";
import { PdfToolsSection } from '../components/PdfToolsSection';
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
  'file-text':    FileText,
  'layout-list':  LayoutList,
  'percent':      Percent,
  'divide':       Divide,
  'currency':     BadgeIndianRupee,
  'area':         AreaChart,
  'math':         SquareFunction,
  'pen-line':     PenLine,
  'scissors':     Scissors,
  'layers':       Layers,
  'rotate-cw':    RotateCw,
  'signature':    Signature,
  'highlighter':  Highlighter,
  'activity':     Activity,
  'trending-up':  TrendingUp,
  'tag':          Tag,
  'banknote':     Banknote,
  'hourglass':    Hourglass,
  'landmark':     Landmark,
  'file-up':      FileUp,
  'file-down':    FileDown,
  'fingerprint':  Filter
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
  const [calcSearch, setCalcSearch] = React.useState('');
  const [calcCategory, setCalcCategory] = React.useState('All');
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

  // Define categories for Calculator Tools
  const calcCategories = ['All', 'Finance', 'Health', 'Daily'];

  const calculatorToolsList = [
    { id: 'emi-calculator', category: 'Finance', icon: 'banknote' },
    { id: 'gst-calculator', category: 'Finance', icon: 'landmark' },
    { id: 'age-calculator', category: 'Daily', icon: 'calendar' },
    { id: 'couple-age-calculator', category: 'Daily', icon: 'heart' },
  ].map(tool => ({
    ...getToolTranslation(tool as any),
    calcCat: tool.category,
    path: `/${tool.id}`,
    icon: tool.icon
  }));

  const filteredCalculators = calculatorToolsList.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(calcSearch.toLowerCase());
    const matchesCat = calcCategory === 'All' || tool.calcCat === calcCategory;
    return matchesSearch && matchesCat;
  });

  const popularTools = TOOLS.slice(0, 3).map(getToolTranslation);
  const jsonTools    = TOOLS.filter(t => t.category === 'json' && t.id !== 'json-formatter').map(getToolTranslation);
  const encodeTools  = TOOLS.filter(t => t.category === 'encoding' && t.id !== 'base64-encode').map(getToolTranslation);
  const imageTools   = TOOLS.filter(t => t.category === 'image').map(getToolTranslation);
  const prodTools    = TOOLS.filter(t => t.category === 'productivity').map(getToolTranslation);
  const allTools     = TOOLS.map(getToolTranslation);

  const featuredGuides = [
    {
      title: 'What is JSON? A Complete Beginner’s Guide',
      summary: 'Learn the syntax, common use cases, and JSON best practices that every developer should know.',
      href: '/guides/what-is-json',
    },
    {
      title: 'How JWT Tokens Work: A Developer’s Visual Guide',
      summary: 'Understand the JWT structure, signature verification, and how to inspect tokens safely.',
      href: '/guides/how-jwt-works',
    },
    {
      title: 'Image Compression for the Web: The Complete Guide',
      summary: 'Discover how to reduce file size without sacrificing quality and which formats work best for the web.',
      href: '/guides/image-compression-guide',
    },
  ];

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
          <>
          <section className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-outline-variant/20 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-5" />
            <div className="relative z-10 space-y-10">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-black mb-4 text-on-surface">
                  Welcome to KooBrain — Your Free Online Tools Hub
                </h2>
                <p className="text-on-surface-variant leading-relaxed text-base sm:text-lg">
                  KooBrain is a browser-based productivity platform offering {TOOLS.length}+ free tools across seven categories: JSON processing, encoding &amp; decoding, image editing, PDF management, text utilities, financial calculators, and security tools. Every tool runs entirely in your browser — your data never reaches our servers.
                </p>
              </div>

              {/* Why KooBrain — 3-column feature grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    color: 'primary',
                    title: 'Works Instantly — No Install',
                    body: 'Open any tool and start working immediately. No signup, no app download, no plugin required. KooBrain tools load in seconds and run directly inside your browser using modern web APIs and WebAssembly.',
                  },
                  {
                    color: 'secondary',
                    title: 'Your Data Stays on Your Device',
                    body: 'Unlike cloud services, KooBrain processes everything locally. When you format JSON, compress an image, or generate a password, the data never leaves your machine. This is client-side processing by design, not as an afterthought.',
                  },
                  {
                    color: 'tertiary',
                    title: 'Spec-Verified and Accurate',
                    body: 'Every tool is validated against official specifications — RFCs for encoding formats, ISO standards for data structures. We test with real edge-case data so results are reliable enough to use in production workflows.',
                  },
                ].map(({ color, title, body }) => (
                  <div key={title} className={`bg-${color}/5 border border-${color}/20 rounded-2xl p-6`}>
                    <h3 className={`text-base font-black text-${color} mb-3`}>{title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              {/* How It Works — 3 steps */}
              <div className="border-t border-outline-variant/20 pt-8">
                <h3 className="text-xl font-black text-on-surface mb-6 text-center">How It Works</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    { step: '1', heading: 'Pick a tool', detail: 'Browse by category or search by name. Every tool is one click away from the homepage.' },
                    { step: '2', heading: 'Paste or upload your data', detail: 'Type directly, paste from clipboard, or drag and drop a file. Real-time output appears instantly.' },
                    { step: '3', heading: 'Copy or download the result', detail: 'One-click copy to clipboard or download as a file. No account required to save your work.' },
                  ].map(({ step, heading, detail }) => (
                    <div key={step} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary font-black text-sm flex items-center justify-center shrink-0">{step}</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm mb-1">{heading}</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-surface-container-lowest/50 p-5 rounded-2xl border border-outline-variant/10 text-center">
                  <p className="font-bold text-3xl text-primary mb-1">{TOOLS.length}+</p>
                  <p className="text-sm font-semibold text-on-surface mb-0.5">Professional Tools</p>
                  <p className="text-xs text-on-surface-variant">JSON, image, PDF, text, encoding, calculators &amp; more</p>
                </div>
                <div className="bg-surface-container-lowest/50 p-5 rounded-2xl border border-outline-variant/10 text-center">
                  <p className="font-bold text-3xl text-tertiary mb-1">100% Free</p>
                  <p className="text-sm font-semibold text-on-surface mb-0.5">No Paywalls, Ever</p>
                  <p className="text-xs text-on-surface-variant">No subscriptions, no hidden fees, no feature gating</p>
                </div>
                <div className="bg-surface-container-lowest/50 p-5 rounded-2xl border border-outline-variant/10 text-center">
                  <p className="font-bold text-3xl text-secondary mb-1">0 Bytes</p>
                  <p className="text-sm font-semibold text-on-surface mb-0.5">Data Sent to Servers</p>
                  <p className="text-xs text-on-surface-variant">All processing is local — total privacy, guaranteed</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use Our Tools — educational explainer */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 space-y-4">
              <h2 className="text-2xl font-black text-on-surface">Why Use Browser-Based Tools?</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Traditional desktop applications require installation, updates, and often licensing fees. Cloud-based tools send your data to remote servers, introducing privacy risk and latency. KooBrain takes a third approach: the full processing power of a native app, delivered through a URL.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Modern browsers support WebAssembly, the File System API, Canvas, and native cryptography primitives. This means tasks like PDF manipulation, image compression, and AES encryption can run at near-native speed without ever touching the network. The result is a tool that is simultaneously faster, more private, and more accessible than the alternatives.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                For developers this is especially valuable: you can inspect the tool's source, verify there is no data exfiltration, and use it confidently with API keys, credentials, or production data — the kind of inputs you would never put into an unknown cloud tool.
              </p>
              <Link to="/guides" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform">
                Read our technical guides <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8">
                <h2 className="text-2xl font-black text-on-surface mb-4">What Can You Build With KooBrain?</h2>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  {[
                    { label: 'Validate and format API responses', detail: 'Paste raw JSON from Postman or curl output and instantly see a clean, syntax-highlighted view with error detection.' },
                    { label: 'Optimize images for web publishing', detail: 'Compress PNG/JPEG files to target sizes or dimensions without quality loss, directly in the browser.' },
                    { label: 'Decode JWTs and Base64 payloads', detail: 'Inspect authentication tokens and encoded strings safely — no third-party server ever sees your tokens.' },
                    { label: 'Calculate EMI and GST breakdowns', detail: 'Get instant, accurate financial calculations with amortization schedules and full tax breakdowns.' },
                    { label: 'Merge, split, and compress PDFs', detail: 'Handle everyday document workflows without Adobe Acrobat or any installed software.' },
                  ].map(({ label, detail }) => (
                    <li key={label} className="flex gap-3 items-start">
                      <span className="text-primary font-black mt-0.5 shrink-0">→</span>
                      <div>
                        <span className="font-semibold text-on-surface">{label}:</span>{' '}
                        <span>{detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-on-surface">Featured Guides & Learning Resources</h2>
                <p className="text-on-surface-variant max-w-2xl leading-relaxed mt-3">
                  KooBrain is more than a collection of tools. We also publish practical guides, explanations, and real-world examples that help you understand the concepts behind the utilities.
                </p>
              </div>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors"
              >
                Browse all guides <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.href}
                  to={guide.href}
                  className="group rounded-3xl border border-outline-variant/20 bg-surface-container p-6 transition-all hover:border-primary/30 hover:shadow-xl"
                >
                  <h3 className="text-lg font-black text-on-surface mb-3">{guide.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{guide.summary}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-primary font-bold text-sm">
                    Read guide <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          </>
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

            {/* ── Tools Hub: Calculator Hub ──────────────── */}
            <section className="section-card">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-3xl" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4 pl-4">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Calculators</span>
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 text-on-surface">Financial & Age Tools</h2>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    Accurate, expert-verified calculators for your daily life. From calculating precision EMI schedules to tracking chronological milestones.
                  </p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { path: '/age-calculator', label: 'Age Calculator', icon: 'calendar' },
                    { path: '/couple-age-calculator', label: 'Couple Age Calculator', icon: 'users' },
                    { path: '/time-between-dates', label: 'Time Between Dates', icon: 'hourglass' },
                  ].map(tool => (
                    <Link key={tool.path} to={tool.path} className="home-tile-3d-row dark:bg-surface-container-high/60 p-5 rounded-2xl dark:hover:bg-surface-container-highest transition-all duration-200 flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        {React.createElement(resolveIcon(tool.icon, Calculator), { className: 'size-4 text-primary' })}
                      </div>
                      <span className="font-semibold text-sm text-on-surface">{tool.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>



            {/* PDF Tools Studio */}
            <PdfToolsSection />

            {/* ── Tools Hub: Productivity Suite ────────────── */}
            <section className="section-card">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary rounded-l-3xl" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-4 pl-4">
                  <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-3 block">Efficiency Tools</span>
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 text-on-surface">Productivity Suite</h2>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    Organize your thoughts and refine your text with our minimalist productivity utilities.
                  </p>
                  <Link to="/tools" className="inline-flex items-center gap-2 text-secondary font-bold hover:translate-x-1 transition-transform">
                    View All Tools <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prodTools.map(tool => (
                    <Link key={tool.id} to={tool.path} className="home-tile-3d-row dark:bg-surface-container-high/60 p-5 rounded-2xl dark:hover:bg-surface-container-highest transition-all duration-200 flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                        {React.createElement(resolveIcon(tool.icon, LayoutList), { className: 'size-4 text-secondary' })}
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
                Who Benefits From KooBrain?
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
                    question: 'Are all KooBrain tools truly free?',
                    answer: 'Yes! All {TOOLS.length}+ tools on KooBrain are completely free. We believe in making productivity tools accessible to everyone. There are no hidden charges, no premium versions, and no credit card required. Use as many tools as you like, whenever you like.'
                  },
                  {
                    question: 'Is my data safe and private?',
                    answer: 'Absolutely. Privacy is our top priority. All processing happens directly in your browser - your data never leaves your device. We don\'t collect, store, or track any of your information. Check our Privacy Policy for complete details about our zero-data-collection approach.'
                  },
                  {
                    question: 'Do I need to install anything to use these tools?',
                    answer: 'No installation required! All KooBrain tools work directly in your web browser. Simply visit koobrain.com, select a tool, and start using it instantly. It works on any device: desktop, tablet, or mobile.'
                  },
                  {
                    question: 'Which tools are most popular?',
                    answer: 'Our most popular tools include JSON Formatter for data validation, Password Generator for creating secure passwords, Image Compressor for optimizing images, and Word Counter for text analysis. However, we have tools for every need - from SQL formatting to Base64 encoding.'
                  },
                  {
                    question: 'Can I use KooBrain tools offline?',
                    answer: 'Once a page loads, most tools work offline. However, for the best experience, we recommend having an internet connection to ensure you have access to the latest versions of all tools.'
                  },
                  {
                    question: 'Do you offer an API or bulk processing?',
                    answer: 'Currently, KooBrain tools are designed for web-based use. For special requirements or partnerships, please reach out via our Contact page.'
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
