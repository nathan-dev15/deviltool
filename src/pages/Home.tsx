import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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
  const { t } = useI18n();

  const filteredTools = TOOLS.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularTools = TOOLS.slice(0, 3);
  const jsonTools    = TOOLS.filter(t => t.category === 'json' && t.id !== 'json-formatter');
  const encodeTools  = TOOLS.filter(t => t.category === 'encoding' && t.id !== 'base64-encode');
  const imageTools   = TOOLS.filter(t => t.category === 'image');

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
          <motion.div {...fadeUp(0)} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Bolt className="size-3" /> {t('home.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 kinetic-gradient leading-[1.05]"
          >
            {t('home.hero_title_1')}<br className="hidden sm:block" /> {t('home.hero_title_2')}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-on-surface-variant text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {t('home.hero_subtitle')}
          </motion.p>

          {/* Search bar */}
          <motion.div {...fadeUp(0.3)} className="relative max-w-2xl mx-auto group">
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
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.45)} className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
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
          </motion.div>
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
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
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
                    </motion.div>
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

            {/* All tools grid */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface whitespace-nowrap">{t('home.all_tools')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-outline-variant/50 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {TOOLS.map((tool, i) => {
                  const Icon = resolveIcon(tool.icon, CodeXml);
                  return (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % 10) * 0.03 }}
                    >
                      <Link
                        to={tool.path}
                        className="glass-card home-tile-3d flex flex-col items-center text-center p-4 rounded-2xl hover:border-primary/30 transition-all duration-200 group h-full"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-on-surface leading-tight">{tool.name}</span>
                      </Link>
                    </motion.div>
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
