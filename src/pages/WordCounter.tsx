import React from 'react';
import { motion } from 'framer-motion';
import { Type, Trash2, Copy, Download, Info, CheckCircle, ChevronRight, Home as HomeIcon, FileText, Diff, BookOpen, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';

export const WordCounter: React.FC = () => {
  const { t } = useI18n();
  const [text, setText] = React.useState('');

  const stats = React.useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const charsWithSpace = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200);

    return { words, charsWithSpace, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  const transformText = (type: 'upper' | 'lower' | 'title' | 'clean') => {
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
    }
    if (type === 'clean') {
      setText(text.replace(/\s+/g, ' ').trim());
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const downloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageWrapper
      title={t('label.word_counter_title')}
      description={t('label.word_counter_desc')}
      breadcrumbs={[
        { label: "Text", href: "#" },
        { label: t('label.word_counter_title') }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="Word Counter - Real-Time Word & Character Count"
        description="Free online word counter tool. Count words, characters, sentences, and paragraphs in real-time. Includes reading time estimate and text formatting tools."
        keywords="word counter, character count, sentence counter, reading time calculator, text tools"
      />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: t('label.words'), value: stats.words, primary: true },
          { label: t('label.chars_with_space'), value: stats.charsWithSpace },
          { label: t('label.chars_no_space'), value: stats.charsNoSpace },
          { label: t('label.sentences'), value: stats.sentences },
          { label: t('label.paragraphs'), value: stats.paragraphs },
          { label: t('label.reading_time'), value: `${stats.readingTime} min` },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-3xl shadow-sm transition-all hover:shadow-md hover:border-primary/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-2">{stat.label}</p>
            <p 
              data-testid={`stat-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`}
              className={cn("text-2xl font-black", stat.primary ? "text-primary" : "text-on-surface")}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="relative group mb-8">
        <textarea 
          data-testid="word-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-80 p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg resize-none placeholder:text-on-surface-variant/30 min-h-[400px] shadow-sm leading-relaxed text-on-surface" 
          placeholder={t('label.word_counter_placeholder')}
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/10 group-focus-within:opacity-100 opacity-60 hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setText('')}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:text-error transition-colors border-r border-white/10 pr-6"
          >
            <Trash2 className="size-4" /> {t('action.clear')}
          </button>
          <button 
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:text-primary transition-colors pl-6"
          >
            <Copy className="size-4" /> {t('action.copy')}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-16">
        <button onClick={() => transformText('upper')} className="px-5 py-3 bg-surface-container-high/60 text-on-surface border border-outline-variant/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all">
          {t('label.uppercase')}
        </button>
        <button onClick={() => transformText('lower')} className="px-5 py-3 bg-surface-container-high/60 text-on-surface border border-outline-variant/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all">
          {t('label.lowercase')}
        </button>
        <button onClick={() => transformText('title')} className="px-5 py-3 bg-surface-container-high/60 text-on-surface border border-outline-variant/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all">
          {t('label.title_case')}
        </button>
        <button onClick={() => transformText('clean')} className="px-5 py-3 bg-surface-container-high/60 text-on-surface border border-outline-variant/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all flex items-center gap-2">
          <Type className="size-4" /> {t('label.clean_spaces')}
        </button>
        <button onClick={downloadTxt} className="px-8 py-4 bg-primary text-on-primary rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg shadow-primary/20 flex items-center gap-2 ml-auto hover:scale-[1.05] active:scale-95">
          <Download className="size-4" /> {t('label.download_txt')}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-12 bg-surface-container-low/30 p-10 rounded-3xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3 text-on-surface">
            <Info className="text-primary size-5" />
            {t('label.how_to_use_word')}
          </h2>
          <div className="space-y-6">
            {[
              t('label.word_step_1'),
              t('label.word_step_2'),
              t('label.word_step_3')
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">{i+1}</div>
                <p className="text-on-surface-variant font-medium text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3 text-on-surface">
            <Info className="text-primary size-5" />
            {t('label.why_word_matters')}
          </h2>
          <p className="text-on-surface-variant font-medium text-sm mb-6 leading-relaxed italic opacity-80">
            {t('label.why_word_matters_desc')}
          </p>
          <ul className="space-y-4">
            {[
              t('label.seo_ranking_desc'),
              t('label.social_limits_desc'),
              t('label.reading_estimates_desc')
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-on-surface font-semibold">
                <CheckCircle className="text-success size-4 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-center text-on-surface">{t('label.related_text_tools')}</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <Link to="/case-converter" className="group p-8 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl hover:border-primary transition-all shadow-sm hover:shadow-md">
            <FileText className="text-primary mb-4 size-8" />
            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-on-surface">{t('label.case_converter')}</h4>
            <p className="text-sm text-on-surface-variant font-medium">{t('label.case_converter_desc')}</p>
          </Link>
          <Link to="/text-diff" className="group p-8 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl hover:border-primary transition-all shadow-sm hover:shadow-md">
            <Diff className="text-secondary mb-4 size-8" />
            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-on-surface">{t('label.text_diff_checker')}</h4>
            <p className="text-sm text-on-surface-variant font-medium">{t('label.text_diff_checker_desc')}</p>
          </Link>
          <Link to="/lorem-ipsum" className="group p-8 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl hover:border-primary transition-all shadow-sm hover:shadow-md">
            <BookOpen className="text-warning mb-4 size-8" />
            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-on-surface">{t('label.lorem_ipsum_gen')}</h4>
            <p className="text-sm text-on-surface-variant font-medium">{t('label.lorem_ipsum_gen_desc')}</p>
          </Link>
        </div>
      </div>
      <div className="mt-12 text-center">
          <Link to="/tools" className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:translate-x-1 transition-transform">
            {t('label.view_all_tools')} <LayoutDashboard className="size-4" />
          </Link>
      </div>
    </ToolPageWrapper>
  );
};
