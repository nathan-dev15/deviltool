import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileUp, PenLine, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { TOOLS } from '../constants';
import { useI18n } from '../i18n/I18nContext';
import { ToolPageWrapper } from '../components/ToolPageWrapper';
import { SEO } from '../components/SEO';

export const PdfHome: React.FC = () => {
  const { t } = useI18n();
  
  const pdfTools = TOOLS.filter(t => t.category === 'pdf').map(tool => ({
    ...tool,
    name: t(`tools.${tool.id}.name`),
    description: t(`tools.${tool.id}.description`)
  }));

  const groups = [
    {
      title: "Document Utilities",
      ids: ['merge-pdf', 'split-pdf', 'compress-pdf', 'rotate-pdf', 'delete-pdf-pages', 'extract-pdf-pages', 'rearrange-pdf-pages'],
      icon: <FileText className="size-5 text-tertiary" />
    },
    {
      title: "Editing & Markup",
      ids: ['edit-pdf', 'annotate-pdf', 'highlight-pdf', 'esign-pdf', 'fill-pdf'],
      icon: <PenLine className="size-5 text-tertiary" />
    },
    {
      title: "PDF Conversion",
      ids: pdfTools.filter(t => t.id.includes('to-pdf') || t.id.includes('pdf-to')).map(t => t.id),
      icon: <FileUp className="size-5 text-tertiary" />
    }
  ];

  return (
    <ToolPageWrapper
      title="PDF Studio"
      description="Every tool you need to use PDFs, at your fingertips. 100% free and easy to use."
      breadcrumbs={[{ label: "Tools", href: "/" }, { label: "PDF Studio" }]}
      accentColor="tertiary"
    >
      <SEO 
        title="Online PDF Tools - Merge, Split, Compress & Convert PDF"
        description="A comprehensive suite of PDF tools. Merge, split, compress, and convert PDFs entirely in your browser. No registration required."
      />

      <div className="space-y-16 animate-fade-in mt-8">
        {groups.map((group, idx) => (
          <section key={idx} className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="p-2.5 rounded-xl bg-tertiary/10">
                {group.icon}
              </div>
              <h2 className="text-xl font-black uppercase tracking-widest text-on-surface">{group.title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pdfTools.filter(tool => group.ids.includes(tool.id)).map(tool => (
                <Link 
                  key={tool.id} 
                  to={tool.path} 
                  className="glass-card home-tile-3d p-6 rounded-[2rem] transition-all flex flex-col items-start gap-4 group h-full border border-outline-variant/10 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center shrink-0 group-hover:bg-tertiary group-hover:text-on-tertiary transition-all duration-300">
                    <FileText className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-sm text-on-surface uppercase tracking-tight">{tool.name}</h3>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2 font-medium italic opacity-70">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 w-full border-t border-outline-variant/5">
                     <span className="text-[10px] font-black uppercase tracking-widest text-tertiary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        Open Tool <ArrowRight className="size-3" />
                     </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Trust Badge Section */}
        <div className="bg-surface-container-low/30 rounded-[2.5rem] p-8 sm:p-12 border border-outline-variant/20 flex flex-col md:flex-row items-center gap-10">
           <div className="size-20 bg-tertiary/10 rounded-3xl flex items-center justify-center shrink-0 border border-tertiary/20">
              <ShieldCheck className="size-10 text-tertiary" />
           </div>
           <div className="text-center md:text-left space-y-2">
              <h3 className="text-xl font-black text-on-surface uppercase tracking-tighter">Private & Secure Processing</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic max-w-2xl">
                Your PDF files are processed 100% locally in your browser. We never upload your documents to our servers, ensuring your sensitive data stays on your device.
              </p>
           </div>
           <div className="md:ml-auto">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => <div key={i} className="size-10 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center"><Zap size={14} className="text-tertiary" /></div>)}
              </div>
           </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
};