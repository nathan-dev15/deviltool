import React from "react";
import { diffWords, diffChars } from "diff";
import { Copy, Trash2, GitCompare, Download, Info, ChevronRight, LayoutDashboard, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';

export const StringComparison: React.FC = () => {
  const { t } = useI18n();
  const [textA, setTextA] = React.useState("");
  const [textB, setTextB] = React.useState("");

  const [resultA, setResultA] = React.useState("");
  const [resultB, setResultB] = React.useState("");

  const [mode, setMode] = React.useState<"word" | "char">("word");

  const [ignoreCase, setIgnoreCase] = React.useState(false);
  const [ignoreSpace, setIgnoreSpace] = React.useState(false);

  const processText = (text: string) => {
    let value = text;

    if (ignoreCase) value = value.toLowerCase();
    if (ignoreSpace) value = value.replace(/\s+/g, "");

    return value;
  };

  const compareStrings = () => {

    const a = processText(textA);
    const b = processText(textB);

    const diff =
      mode === "word"
        ? diffWords(a, b)
        : diffChars(a, b);

    let htmlA = "";
    let htmlB = "";

    diff.forEach(part => {

      const value = part.value
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      if (part.added) {

        htmlB += `<span class="bg-success/20 text-success rounded-sm px-0.5">${value}</span>`;

      } else if (part.removed) {

        htmlA += `<span class="bg-error/20 text-error rounded-sm px-0.5">${value}</span>`;

      } else {

        htmlA += value;
        htmlB += value;

      }

    });

    setResultA(htmlA);
    setResultB(htmlB);

  };

  const clear = () => {
    setTextA("");
    setTextB("");
    setResultA("");
    setResultB("");
  };

  const download = () => {

    const content =
      `Text A:\n${textA}\n\nText B:\n${textB}`;

    const blob = new Blob([content], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "string-comparison.txt";

    a.click();

    URL.revokeObjectURL(url);

  };

  return (
    <ToolPageWrapper
      title={t('label.string_comparison_title')}
      description={t('label.string_comparison_desc')}
      breadcrumbs={[
        { label: "Developer Tools", href: "#" },
        { label: t('label.string_comparison_title') }
      ]}
      accentColor="secondary"
    >
      <SEO
        title="String Comparison Tool – Highlight Text Differences Online"
        description="Advanced string comparison tool for developers. Detect differences between two text blocks with word and character level highlighting."
        keywords="string comparison tool, text diff viewer, developer text compare, word diff tool, character diff tool"
      />

      <div className="space-y-8 animate-fade-in">
        
        {/* OPTIONS CABINET */}
        <div className="bg-surface-container-high/40 p-6 rounded-3xl border border-outline-variant/20 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/70">{t('label.compare_mode')}</label>
            <select
               value={mode}
               onChange={(e) => setMode(e.target.value as any)}
               className="bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-secondary/20"
            >
              <option value="word">{t('label.word_compare')}</option>
              <option value="char">{t('label.char_compare')}</option>
            </select>
          </div>

          <div className="h-8 w-px bg-outline-variant/20 hidden md:block" />

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={ignoreCase}
                onChange={() => setIgnoreCase(!ignoreCase)}
                className="w-5 h-5 rounded-md border-outline-variant/30 text-secondary focus:ring-secondary/20 bg-surface-container-high"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface transition-colors">{t('label.ignore_case')}</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={ignoreSpace}
                onChange={() => setIgnoreSpace(!ignoreSpace)}
                className="w-5 h-5 rounded-md border-outline-variant/30 text-secondary focus:ring-secondary/20 bg-surface-container-high"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface transition-colors">{t('label.ignore_spaces')}</span>
            </label>
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
            <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low/50 flex items-center justify-between">
              <span className="font-black uppercase tracking-widest text-xs text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                {t('label.text_a')}
              </span>
            </div>
            <textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className="w-full min-h-[250px] p-6 font-mono text-sm bg-transparent outline-none resize-none leading-relaxed text-on-surface placeholder:text-on-surface-variant/30"
              placeholder={t('label.paste_first_string')}
            />
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-md">
            <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low/50 flex items-center justify-between">
              <span className="font-black uppercase tracking-widest text-xs text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-tertiary" />
                {t('label.text_b')}
              </span>
            </div>
            <textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className="w-full min-h-[250px] p-6 font-mono text-sm bg-transparent outline-none resize-none leading-relaxed text-on-surface placeholder:text-on-surface-variant/30"
              placeholder={t('label.paste_second_string')}
            />
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-wrap items-center justify-center gap-6 p-8 bg-surface-container-lowest rounded-3xl shadow-xl shadow-surface-container-low/10 border border-outline-variant/30 relative overflow-hidden group">
          <div className="absolute -inset-24 bg-secondary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <button
            onClick={compareStrings}
            className="z-10 bg-secondary hover:bg-secondary-container text-on-secondary px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:scale-[1.05] active:scale-95 shadow-lg shadow-secondary/20"
          >
            <GitCompare size={18} />
            {t('action.compare')}
          </button>

          <button
            onClick={clear}
            className="z-10 bg-surface-container-high/60 text-on-surface border border-outline-variant/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:text-error hover:bg-surface-container-high"
          >
            <Trash2 size={18} />
            {t('action.clear')}
          </button>

          <button
            onClick={download}
            className="z-10 bg-surface-container-high/60 text-on-surface border border-outline-variant/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:bg-surface-container-high"
          >
            <Download size={18} />
            {t('action.download')}
          </button>
        </div>

        {/* RESULTS AREA */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest-dark dark:bg-slate-950 rounded-3xl overflow-hidden border border-outline-variant/30 shadow-xl group">
             <div className="px-6 py-4 border-b border-white/10 bg-black/40">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">{t('label.result_a')}</span>
             </div>
             <div
               className="p-8 font-mono text-sm leading-relaxed text-slate-300 min-h-[300px] whitespace-pre-wrap selection:bg-secondary/30"
               dangerouslySetInnerHTML={{
                 __html: resultA || `<span class="italic opacity-30">${t('label.compare_first')}</span>`
               }}
             />
          </div>

          <div className="bg-surface-container-lowest-dark dark:bg-slate-950 rounded-3xl overflow-hidden border border-outline-variant/30 shadow-xl group">
             <div className="px-6 py-4 border-b border-white/10 bg-black/40">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">{t('label.result_b')}</span>
             </div>
             <div
               className="p-8 font-mono text-sm leading-relaxed text-slate-300 min-h-[300px] whitespace-pre-wrap selection:bg-secondary/30"
               dangerouslySetInnerHTML={{
                 __html: resultB || `<span class="italic opacity-30">${t('label.compare_first')}</span>`
               }}
             />
          </div>
        </div>

        {/* INFO SECTION */}
        <section className="bg-surface-container-low/30 p-10 rounded-3xl border border-outline-variant/20">
          <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3 text-on-surface">
            <Info size={20} className="text-primary" />
            {t('label.how_to_compare')}
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              t('label.compare_step_1'),
              t('label.compare_step_2'),
              t('label.compare_step_3')
            ].map((step, i) => (
              <div key={i} className="flex flex-col gap-4">
                 <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-black text-lg shadow-sm">{i+1}</div>
                 <p className="text-sm font-medium text-on-surface-variant leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <div className="mt-16 text-center">
          <Link to="/tools" className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:translate-x-1 transition-transform">
                {t('label.view_all_tools')} <LayoutDashboard className="size-4" />
          </Link>
      </div>
    </ToolPageWrapper>
  );
};
