import React from 'react';
import { Zap, Mail, Sparkles } from 'lucide-react';
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
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
              <Sparkles size={11} aria-hidden="true" /> 100% Free
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20">
              Privacy First
            </span>
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
            <Link to="/guides" className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary transition-all text-sm font-bold flex items-center gap-3 w-fit group footer-3d-link">
               <div className="size-1.5 bg-secondary/60 dark:bg-secondary/80 rounded-full group-hover:scale-[2.5] transition-transform shadow-sm" />
               Guides
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

        {/* CONTACT CTA */}
        <div className="space-y-6 footer-3d-card animate-entrance-3d-4" style={{borderRadius: '16px', padding: '16px', background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(249, 115, 22, 0.03))' }}>
          <h4 className="text-on-surface dark:text-on-surface px-4 py-1 bg-tertiary/10 dark:bg-tertiary/20 inline-block rounded-lg font-black text-[10px] uppercase tracking-[0.2em] border border-tertiary/30 dark:border-tertiary/40">
            Get In Touch
          </h4>
          <p className="text-on-surface-variant font-medium text-xs leading-relaxed pr-4 opacity-75 dark:opacity-70">
            Have a question, found a bug, or want to request a new tool? We'd love to hear from you.
          </p>
          <a
            href="mailto:nsnathan15@yahoo.com"
            className="flex items-center gap-3 px-5 py-4 bg-tertiary text-on-tertiary rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-tertiary/20 w-full justify-center"
          >
            <Mail className="size-4" aria-hidden="true" /> Email Us
          </a>
          <Link to="/contact" className="flex items-center gap-3 px-5 py-4 bg-surface-container-high text-on-surface rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-surface-variant transition-all w-full justify-center border border-outline-variant/20">
            Contact Form
          </Link>
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
