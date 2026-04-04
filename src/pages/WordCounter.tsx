import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Type, Trash2, Copy, Download, Info, CheckCircle, ChevronRight, Home as HomeIcon, FileText, Diff, BookOpen, LayoutDashboard, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';

export const WordCounter: React.FC = () => {
  const { t } = useI18n();
  const [text, setText] = React.useState('');
  const [cursorPos, setCursorPos] = React.useState({ line: 1, col: 1 });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  const updateCursor = () => {
    const el = textAreaRef.current;
    if (!el) return;
    const textBeforeCursor = el.value.substring(0, el.selectionStart);
    const lines = textBeforeCursor.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    updateCursor();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const downloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word-counter.txt';
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

      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-slate-300 dark:border-slate-800 shadow-2xl bg-surface-container-lowest/50 backdrop-blur-3xl mb-12 ring-1 ring-white/10 p-4 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        {/* 3D Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 relative z-10">
          {[
            { label: t('label.words'), value: stats.words, primary: true },
            { label: t('label.chars_with_space'), value: stats.charsWithSpace },
            { label: t('label.chars_no_space'), value: stats.charsNoSpace },
            { label: t('label.sentences'), value: stats.sentences },
            { label: t('label.paragraphs'), value: stats.paragraphs },
            { label: t('label.reading_time'), value: `${stats.readingTime}m`, highlight: true },
          ].map((stat, i) => (
            <div key={i} className="relative group overflow-hidden bg-white dark:bg-slate-900 border-b-4 border-slate-300 dark:border-slate-800 p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary">
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
              <p className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 sm:mb-2 truncate">{stat.label}</p>
              <p 
                data-testid={`stat-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`}
                className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-black tabular-nums transition-colors tracking-tight", 
                  stat.primary ? "text-primary drop-shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]" : "text-slate-700 dark:text-slate-200",
                  stat.highlight && "text-tertiary"
                )}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* 3D Glassmorphic Editor Area */}
        <div className="relative group mb-8 rounded-2xl md:rounded-3xl p-1 bg-gradient-to-b from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 shadow-inner">
          <textarea 
            ref={textAreaRef}
            data-testid="word-counter-input"
            value={text}
            onChange={handleTextChange}
            onKeyUp={updateCursor}
            onClick={updateCursor}
            className="w-full p-4 pt-10 md:p-8 md:pt-10 rounded-xl md:rounded-[1.4rem] bg-white/80 dark:bg-black/40 backdrop-blur-md outline-none transition-all text-base md:text-lg resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[250px] md:min-h-[400px] shadow-inner leading-relaxed text-slate-800 dark:text-slate-200 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 custom-scrollbar" 
            placeholder={t('label.word_counter_placeholder') || "Type your masterpiece here..."}
          />
          
          {/* Cursor Indicator */}
          <div className="absolute top-4 right-6 flex items-center gap-2 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 dark:border-white/5 pointer-events-none">
             <MousePointer2 className="size-3 text-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 tabular-nums">Ln {cursorPos.line}, Col {cursorPos.col}</span>
          </div>

          {/* Floating Action Menu */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900 dark:bg-black/80 backdrop-blur-xl p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 group-focus-within:opacity-100 opacity-80 hover:opacity-100 transition-all scale-95 group-focus-within:scale-100">
            <button 
              onClick={() => { setText(''); setCursorPos({line:1, col:1}); }}
              className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest text-white hover:bg-error transition-colors"
            >
              <Trash2 className="size-3 sm:size-4" /> <span className="hidden sm:inline">{t('action.clear')}</span>
            </button>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <button 
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-colors"
            >
              <Copy className="size-3 sm:size-4" /> <span className="hidden sm:inline">{t('action.copy')}</span>
            </button>
          </div>
        </div>

        {/* 3D Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <div className="p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl flex flex-wrap justify-center gap-1.5 shadow-inner w-full sm:w-auto">
            <button onClick={() => transformText('upper')} className="px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white dark:bg-slate-900 border-b-4 border-slate-300 dark:border-black text-slate-600 dark:text-slate-300 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-primary active:border-b-0 active:translate-y-1 transition-all">
              UPPER
            </button>
            <button onClick={() => transformText('lower')} className="px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white dark:bg-slate-900 border-b-4 border-slate-300 dark:border-black text-slate-600 dark:text-slate-300 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-primary active:border-b-0 active:translate-y-1 transition-all">
              lower
            </button>
            <button onClick={() => transformText('title')} className="px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white dark:bg-slate-900 border-b-4 border-slate-300 dark:border-black text-slate-600 dark:text-slate-300 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-primary active:border-b-0 active:translate-y-1 transition-all">
              Title
            </button>
            <button onClick={() => transformText('clean')} className="px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white dark:bg-slate-900 border-b-4 border-slate-300 dark:border-black text-slate-600 dark:text-slate-300 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-primary active:border-b-0 active:translate-y-1 transition-all flex items-center gap-1 sm:gap-2">
              <Type className="size-3 sm:size-4" /> <span className="hidden sm:inline">{t('label.clean_spaces')}</span>
            </button>
          </div>
          
          <button onClick={downloadTxt} className="w-full sm:w-auto mt-2 sm:mt-0 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-white rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-primary-container transition-all flex items-center justify-center gap-2 sm:ml-auto shadow-[0_6px_0_0_rgba(var(--primary-rgb),0.3)] active:border-b-0 active:translate-y-1.5 active:shadow-none border border-white/10 group border-b-4">
            <Download className="size-4 group-hover:animate-bounce" /> <span className="sm:inline hidden">{t('label.download_txt')}</span> <span className="sm:hidden inline">Download</span>
          </button>
        </div>
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
    </ToolPageWrapper>
  );
};
