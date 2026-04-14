import React from 'react';
import { Send, Zap, Twitter, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-12 sm:py-16 px-4 sm:px-8 border-t border-outline-variant/20 dark:border-outline-variant/30 relative overflow-hidden footer-3d-container">
      {/* 3D backdrop */}
      <div className="footer-3d-backdrop" />
      
      {/* background glow */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/8 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 relative z-10" style={{perspective: '1000px'}}>
        
        {/* BRAND & TAGLINE */}
        <div className="space-y-6 footer-3d-card animate-entrance-3d-1" style={{borderRadius: '16px', padding: '16px', background: 'linear-gradient(135deg, rgba(4, 184, 194, 0.05), rgba(88, 212, 255, 0.03))' }}>
          <div className="flex items-center gap-3">
             <div className="size-10 rounded-2xl bg-gradient-to-br from-primary via-tertiary to-secondary flex items-center justify-center p-2 shadow-lg shadow-primary/20">
                <Zap className="size-full text-white fill-white/20" />
             </div>
             <span className="text-2xl font-black tracking-tighter text-on-surface">
                KooBrain
             </span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed italic pr-4 opacity-60">
             {t('footer.tagline_1') || 'Designed for the future of the web.'}
             <br />
             <span className="text-primary not-italic font-black uppercase tracking-[0.2em] text-[10px] block mt-3">
                {t('footer.tagline_2') || 'Free · Open-source · Privacy-first'}
             </span>
          </p>
          <div className="flex items-center gap-4">
             <a href="#" className="p-3 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-xl text-primary hover:text-primary transition-all hover:scale-110 active:scale-95 shadow-sm dark:shadow-md"><Twitter size={18} /></a>
             <a href="#" className="p-3 bg-secondary/10 hover:bg-secondary/20 dark:bg-secondary/20 dark:hover:bg-secondary/30 rounded-xl text-secondary hover:text-secondary transition-all hover:scale-110 active:scale-95 shadow-sm dark:shadow-md"><Github size={18} /></a>
             <a href="#" className="p-3 bg-tertiary/10 hover:bg-tertiary/20 dark:bg-tertiary/20 dark:hover:bg-tertiary/30 rounded-xl text-tertiary hover:text-tertiary transition-all hover:scale-110 active:scale-95 shadow-sm dark:shadow-md"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-6 footer-3d-card animate-entrance-3d-2" style={{borderRadius: '16px', padding: '16px', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05), rgba(88, 212, 255, 0.03))' }}>
          <h4 className="text-on-surface dark:text-on-surface px-4 py-1 bg-primary/10 dark:bg-primary/20 inline-block rounded-lg font-black text-[10px] uppercase tracking-[0.2em] border border-primary/30 dark:border-primary/40">
             {t('footer.navigation') || 'Navigation'}
          </h4>
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-on-surface-variant hover:text-primary dark:hover:text-primary transition-all text-sm font-bold flex items-center gap-3 w-fit group footer-3d-link">
               <div className="size-1.5 bg-primary/60 dark:bg-primary/80 rounded-full group-hover:scale-[2.5] transition-transform shadow-sm" />
               {t('nav.tools')}
            </Link>
            <Link to="/security" className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary transition-all text-sm font-bold flex items-center gap-3 w-fit group footer-3d-link">
               <div className="size-1.5 bg-secondary/60 dark:bg-secondary/80 rounded-full group-hover:scale-[2.5] transition-transform shadow-sm" />
               {t('nav.security')}
            </Link>
            <Link to="/about" className="text-on-surface-variant hover:text-tertiary dark:hover:text-tertiary transition-all text-sm font-bold flex items-center gap-3 w-fit group footer-3d-link">
               <div className="size-1.5 bg-tertiary/60 dark:bg-tertiary/80 rounded-full group-hover:scale-[2.5] transition-transform shadow-sm" />
               {t('nav.about')}
            </Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary dark:hover:text-primary transition-all text-sm font-bold flex items-center gap-3 w-fit group footer-3d-link">
               <div className="size-1.5 bg-primary/60 dark:bg-primary/80 rounded-full group-hover:scale-[2.5] transition-transform shadow-sm" />
               {t('nav.contact')}
            </Link>
          </div>
        </div>

        {/* RESOURCES */}
        <div className="space-y-6 footer-3d-card animate-entrance-3d-3" style={{borderRadius: '16px', padding: '16px', background: 'linear-gradient(135deg, rgba(88, 212, 255, 0.05), rgba(251, 191, 36, 0.03))' }}>
          <h4 className="text-on-surface dark:text-on-surface px-4 py-1 bg-secondary/10 dark:bg-secondary/20 inline-block rounded-lg font-black text-[10px] uppercase tracking-[0.2em] border border-secondary/30 dark:border-secondary/40">
             {t('footer.resources') || 'Resources'}
          </h4>
          <div className="flex flex-col space-y-3 text-on-surface-variant font-bold text-sm">
            <Link to="/privacy" className="hover:text-secondary dark:hover:text-secondary transition-all flex items-center gap-3 w-fit group footer-3d-link">
                {t('footer.privacy') || 'Privacy Policy'}
            </Link>
            <Link to="/terms" className="hover:text-secondary dark:hover:text-secondary transition-all flex items-center gap-3 w-fit group footer-3d-link">
                {t('footer.terms') || 'Terms & Conditions'}
            </Link>
            <Link to="/disclaimer" className="hover:text-secondary dark:hover:text-secondary transition-all flex items-center gap-3 w-fit group footer-3d-link">
                {t('footer.disclaimer') || 'Disclaimer'}
            </Link>
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-secondary dark:hover:text-secondary transition-all flex items-center gap-3 w-fit group text-xs opacity-75 footer-3d-link">
                Google AdSense Policy
            </a>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="space-y-6 footer-3d-card animate-entrance-3d-4" style={{borderRadius: '16px', padding: '16px', background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(249, 115, 22, 0.03))' }}>
          <h4 className="text-on-surface dark:text-on-surface px-4 py-1 bg-tertiary/10 dark:bg-tertiary/20 inline-block rounded-lg font-black text-[10px] uppercase tracking-[0.2em] border border-tertiary/30 dark:border-tertiary/40">
             {t('footer.newsletter') || 'Newsletter'}
          </h4>
          <p className="text-on-surface-variant font-medium text-xs leading-relaxed pr-4 opacity-75 dark:opacity-70">
             Get the latest tool updates and security patches directly in your inbox.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input 
                className="bg-surface-container-highest dark:bg-surface-container-high border border-outline-variant/30 dark:border-outline-variant/40 rounded-2xl text-xs w-full focus:ring-2 focus:ring-primary dark:focus:ring-primary outline-none px-6 py-4 text-on-surface dark:text-on-surface placeholder:text-on-surface-variant/50 dark:placeholder:text-on-surface-variant/40 font-bold transition-all focus:bg-surface-container-highest dark:focus:bg-surface-container-high" 
                placeholder={t('footer.email_placeholder') || 'Email Address'} 
                type="email"
              />
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant/40 dark:text-on-surface-variant/50" />
            </div>
            <button className="bg-tertiary text-on-tertiary p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-tertiary/30 dark:shadow-tertiary/20">
              <Send className="size-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-on-surface-variant/50 dark:text-on-surface-variant/40 italic">
             <Sparkles size={10} className="text-warning dark:text-warning" />
             Joins 4,000+ modern creators
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-outline-variant/20 dark:border-outline-variant/30 flex flex-col gap-4 sm:gap-3 sm:flex-row sm:items-center sm:justify-between relative z-10 font-bold text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant/60 dark:text-on-surface-variant/50">
        <p>© 2026 KooBrain Eng Tech. All rights reserved.</p>
        <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 group cursor-help"><div className="size-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)] dark:shadow-[0_0_15px_rgba(34,197,94,0.7)] group-hover:scale-150 transition-transform" /> All Systems Online</span>
            <span className="opacity-70 dark:opacity-60">Local Time: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </footer>
  );
};
