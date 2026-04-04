import React from 'react';
import { Send, Zap, Twitter, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-surface-container-lowest dark:bg-black w-full py-24 px-8 border-t border-outline-variant/10 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        
        {/* BRAND & TAGLINE */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
             <div className="size-10 rounded-2xl bg-gradient-to-br from-primary via-tertiary to-secondary flex items-center justify-center p-2 shadow-lg shadow-primary/20">
                <Zap className="size-full text-white fill-white/20" />
             </div>
             <span className="text-2xl font-black tracking-tighter text-on-surface">
                Koobrain
             </span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed italic pr-4 opacity-60">
             {t('footer.tagline_1') || 'Designed for the future of the web.'}
             <br />
             <span className="text-primary not-italic font-black uppercase tracking-[0.2em] text-[10px] block mt-4">
                {t('footer.tagline_2') || 'Free · Open-source · Privacy-first'}
             </span>
          </p>
          <div className="flex items-center gap-4">
             <a href="#" className="p-3 bg-on-surface/5 hover:bg-on-surface/10 rounded-xl text-on-surface-variant hover:text-on-surface transition-all hover:scale-110 active:scale-95"><Twitter size={18} /></a>
             <a href="#" className="p-3 bg-on-surface/5 hover:bg-on-surface/10 rounded-xl text-on-surface-variant hover:text-on-surface transition-all hover:scale-110 active:scale-95"><Github size={18} /></a>
             <a href="#" className="p-3 bg-on-surface/5 hover:bg-on-surface/10 rounded-xl text-on-surface-variant hover:text-on-surface transition-all hover:scale-110 active:scale-95"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-8">
          <h4 className="text-on-surface px-4 py-1 bg-on-surface/5 inline-block rounded-lg font-black text-[10px] uppercase tracking-[0.2em] border border-outline-variant/10">
             {t('footer.navigation') || 'Navigation'}
          </h4>
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-on-surface-variant hover:text-primary transition-all text-sm font-bold flex items-center gap-3 w-fit group">
               <div className="size-1 bg-primary/40 rounded-full group-hover:scale-[3] transition-transform" />
               {t('nav.tools')}
            </Link>
            <Link to="/security" className="text-on-surface-variant hover:text-secondary transition-all text-sm font-bold flex items-center gap-3 w-fit group">
               <div className="size-1 bg-secondary/40 rounded-full group-hover:scale-[3] transition-transform" />
               {t('nav.security')}
            </Link>
            <Link to="/about" className="text-on-surface-variant hover:text-tertiary transition-all text-sm font-bold flex items-center gap-3 w-fit group">
               <div className="size-1 bg-tertiary/40 rounded-full group-hover:scale-[3] transition-transform" />
               {t('nav.about')}
            </Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-all text-sm font-bold flex items-center gap-3 w-fit group">
               <div className="size-1 bg-primary/40 rounded-full group-hover:scale-[3] transition-transform" />
               {t('nav.contact')}
            </Link>
          </div>
        </div>

        {/* RESOURCES */}
        <div className="space-y-8">
          <h4 className="text-on-surface px-4 py-1 bg-on-surface/5 inline-block rounded-lg font-black text-[10px] uppercase tracking-[0.2em] border border-outline-variant/10">
             {t('footer.resources') || 'Resources'}
          </h4>
          <div className="flex flex-col space-y-4 text-on-surface-variant font-bold text-sm">
            <Link to="/privacy" className="hover:text-primary transition-all flex items-center gap-3 w-fit group">
                {t('footer.privacy') || 'Privacy Policy'}
            </Link>
            <Link to="/terms" className="hover:text-primary transition-all flex items-center gap-3 w-fit group">
                {t('footer.terms') || 'Terms & Conditions'}
            </Link>
            <Link to="/disclaimer" className="hover:text-primary transition-all flex items-center gap-3 w-fit group">
                {t('footer.disclaimer') || 'Disclaimer'}
            </Link>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="space-y-8">
          <h4 className="text-on-surface px-4 py-1 bg-on-surface/5 inline-block rounded-lg font-black text-[10px] uppercase tracking-[0.2em] border border-outline-variant/10">
             {t('footer.newsletter') || 'Newsletter'}
          </h4>
          <p className="text-on-surface-variant font-medium text-xs leading-relaxed pr-4 opacity-60">
             Get the latest tool updates and security patches directly in your inbox.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input 
                className="bg-on-surface/5 border border-outline-variant/20 rounded-2xl text-xs w-full focus:ring-2 focus:ring-primary outline-none px-6 py-4 text-on-surface placeholder:text-on-surface-variant/40 font-bold transition-all focus:bg-on-surface/10" 
                placeholder={t('footer.email_placeholder') || 'Email Address'} 
                type="email"
              />
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant/20" />
            </div>
            <button className="bg-primary text-on-primary p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Send className="size-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 italic">
             <Sparkles size={10} className="text-warning" />
             Joins 4,000+ modern creators
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 font-bold text-xs uppercase tracking-widest text-on-surface-variant/40">
        <p>© 2026 Koobrain Eng Tech. All rights reserved.</p>
        <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 group cursor-help"><div className="size-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover:scale-150 transition-transform" /> All Systems Online</span>
            <span className="opacity-50">Local Time: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </footer>
  );
};
