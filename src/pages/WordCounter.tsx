import React from 'react';
import { motion } from 'framer-motion';
import { Type, Trash2, Copy, Download, Info, CheckCircle, ChevronRight, Home as HomeIcon, FileText, Diff, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';

export const WordCounter: React.FC = () => {
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
    <div className="px-4 py-8 pt-6 pb-4">
      <SEO 
        title="Word Counter - Real-Time Word & Character Count"
        description="Free online word counter tool. Count words, characters, sentences, and paragraphs in real-time. Includes reading time estimate and text formatting tools."
        keywords="word counter, character count, sentence counter, reading time calculator, text tools"
      />
      <nav className="flex mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
        <ol className="flex items-center space-x-2">
          <li className="flex items-center gap-1 hover:text-primary cursor-pointer">
            <Link to="/" className="flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link>
          </li>
          <li><ChevronRight className="size-3" /></li>
          <li className="hover:text-primary cursor-pointer">Text Tools</li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary">Word Counter</li>
        </ol>
      </nav>

      <h1 data-testid="word-counter-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Word Counter</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Real-time word, character, and sentence counting for any text input.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: 'Words', value: stats.words, primary: true },
          { label: 'Chars (w/ space)', value: stats.charsWithSpace },
          { label: 'Chars (no space)', value: stats.charsNoSpace },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
          { label: 'Reading Time', value: `${stats.readingTime} min` },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p 
              data-testid={`stat-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`}
              className={cn("text-2xl font-bold", stat.primary ? "text-primary" : "text-slate-900 dark:text-white")}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="relative group">
        <textarea 
          data-testid="word-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-80 p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-base sm:text-lg resize-none placeholder:text-slate-400 min-h-[300px]" 
          placeholder="Type or paste your text here..."
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 dark:bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow-xl">
          <button 
            onClick={() => setText('')}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white dark:text-slate-900 hover:text-red-400 dark:hover:text-red-600 transition-colors border-r border-slate-700 dark:border-slate-300 pr-6"
          >
            <Trash2 className="size-4" /> Clear
          </button>
          <button 
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white dark:text-slate-900 hover:text-primary transition-colors pl-6"
          >
            <Copy className="size-4" /> Copy
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
        <button onClick={() => transformText('upper')} className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
          UPPERCASE
        </button>
        <button onClick={() => transformText('lower')} className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
          lowercase
        </button>
        <button onClick={() => transformText('title')} className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center">
          Title Case
        </button>
        <button onClick={() => transformText('clean')} className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
          <Type className="size-4" /> Clean Spaces
        </button>
        <button onClick={downloadTxt} className="col-span-2 sm:col-auto px-4 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 sm:ml-auto">
          <Download className="size-4" /> Download .txt
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900/50 py-16 border-y border-slate-200 dark:border-slate-800 mt-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Info className="text-primary size-5" />
              How to use the Word Counter
            </h2>
            <div className="space-y-6">
              {[
                'Simply type directly into the editor or paste your text from any document or website.',
                'Watch the statistics update in real-time at the top of the tool interface.',
                'Use the action buttons below to format your text or download it for later use.'
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">{i+1}</div>
                  <p className="text-slate-600 dark:text-slate-400">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Info className="text-primary size-5" />
              Why Word Counts Matter
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Whether you're writing a blog post for <strong>SEO</strong>, a college <strong>academic paper</strong>, or a <strong>social media</strong> update, maintaining the correct length is crucial.
            </p>
            <ul className="space-y-3">
              {[
                'Search engines prefer content between 1,500 - 2,500 words for ranking.',
                'Twitter and LinkedIn have strict character limits for posts.',
                'Reading time estimates help improve user engagement metrics.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle className="text-green-500 size-4 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="py-16">
        <h3 className="text-xl font-bold mb-8 text-center">Related Text Tools</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <Link to="/case-converter" className="group p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm">
            <FileText className="text-primary mb-3 size-6" />
            <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Case Converter</h4>
            <p className="text-sm text-slate-500">Change text to upper, lower, or camel case.</p>
          </Link>
          <Link to="/text-diff" className="group p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm">
            <Diff className="text-primary mb-3 size-6" />
            <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Text Diff Checker</h4>
            <p className="text-sm text-slate-500">Compare two pieces of text side-by-side.</p>
          </Link>
          <Link to="/lorem-ipsum" className="group p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm">
            <BookOpen className="text-primary mb-3 size-6" />
            <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Lorem Ipsum Generator</h4>
            <p className="text-sm text-slate-500">Generate placeholder text for your projects.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
