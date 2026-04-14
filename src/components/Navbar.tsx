import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Moon, 
  Sun, 
  Settings, 
  UserCircle, 
  Menu, 
  X,
  Sparkles,
  Zap,
  Globe,
  LayoutDashboard,
  ShieldCheck,
  Info,
  CheckCircle2,
  ChevronDown,
  FileText,
  Calculator,
  Code2,
  ImageIcon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import type { SupportedLocale } from '../i18n/locales';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, locale, setLocale, supportedLocales } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const location = useLocation();

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const toolsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setShowToolsDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    { name: 'JSON Laboratory', path: '/', icon: <Code2 size={16} />, desc: 'Format & Validate' },
    { name: 'PDF Studio', path: '/pdf', icon: <FileText size={16} />, desc: 'Merge & Convert' },
    { name: 'Calculator Hub', path: '/calculator', icon: <Calculator size={16} />, desc: 'Financial & Health' },
    { name: 'Image Forge', path: '/image-compressor', icon: <ImageIcon size={16} />, desc: 'Optimize & Batch' },
  ];

  const secondaryLinks = [
    { name: t('nav.security'), path: '/security', icon: <ShieldCheck size={16} /> },
    { name: t('nav.about'), path: '/about', icon: <Info size={16} /> },
    { name: t('nav.contact'), path: '/contact', icon: <UserCircle size={16} /> },
  ];

  const navLinks = [
    { name: 'JSON Laboratory', path: '/', icon: <Code2 size={16} /> },
    { name: 'PDF Studio', path: '/pdf', icon: <FileText size={16} /> },
    { name: 'Calculator Hub', path: '/calculator', icon: <Calculator size={16} /> },
    { name: 'Image Forge', path: '/image-compressor', icon: <ImageIcon size={16} /> },
    ...secondaryLinks
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-500",
        isScrolled 
          ? "py-3 bg-surface/85 dark:bg-surface-dim/90 backdrop-blur-2xl border-b border-outline-variant/20 dark:border-outline-variant/30 shadow-lg dark:shadow-xl" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* LOGO */}
        <Link 
          to="/" 
          className="group flex items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="size-10 rounded-2xl bg-gradient-to-br from-primary via-tertiary to-secondary flex items-center justify-center p-2 shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <Zap className="size-full text-white fill-white/20" />
          </div>
          <span className="text-2xl font-black tracking-tighter kinetic-gradient pb-0.5">
            KooBrain
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Tools Mega Menu Trigger */}
          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setShowToolsDropdown(!showToolsDropdown)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:bg-surface-container-high flex items-center gap-2 group",
                location.pathname === '/' || location.pathname === '/pdf' || location.pathname === '/calculator'
                  ? "text-primary"
                  : "text-on-surface-variant/60 hover:text-on-surface"
              )}
            >
              <LayoutDashboard size={16} />
              {t('nav.tools')}
              <ChevronDown className={cn("size-3 transition-transform duration-300", showToolsDropdown && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showToolsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 mt-3 w-[280px] bg-surface-container-high dark:bg-surface-dim border border-outline-variant/30 rounded-[2rem] shadow-2xl p-3 z-[110]"
                >
                  <div className="grid gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.path}
                        to={cat.path}
                        onClick={() => setShowToolsDropdown(false)}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 group/item transition-colors"
                      >
                        <div className="size-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover/item:text-primary group-hover/item:bg-primary/10 transition-all">
                          {cat.icon}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-on-surface group-hover/item:text-primary transition-colors">{cat.name}</p>
                          <p className="text-[10px] text-on-surface-variant/60 font-medium italic">{cat.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {secondaryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:bg-surface-container-high relative group overflow-hidden",
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-on-surface-variant/60 hover:text-on-surface"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                {link.name}
              </span>
              {location.pathname === link.path && (
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="lang-select group"
            >
              <Globe className="size-4 group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest">{locale}</span>
            </button>
            <AnimatePresence>
              {showLanguageDropdown && (
                 <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-max min-w-[200px] bg-surface-container-high dark:bg-surface-dim border border-outline-variant/30 dark:border-outline-variant/40 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-1.5 z-[110]"
                 >
                   <div className="grid gap-0.5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                     {supportedLocales.map((loc) => (
                       <button
                         key={loc.code}
                         onClick={() => {
                           setLocale(loc.code);
                           setShowLanguageDropdown(false);
                         }}
                         className={cn(
                           "flex items-center justify-between px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                           locale === loc.code 
                             ? "bg-primary text-on-primary shadow-md translate-x-1" 
                             : "text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface hover:bg-surface-container dark:hover:bg-surface-container-high"
                         )}
                       >
                         <div className="flex flex-col items-start leading-tight">
                            <span className="font-black text-[9px]">{loc.label}</span>
                            <span className="text-[7px] opacity-40 italic">{loc.code}</span>
                         </div>
                         {locale === loc.code && <CheckCircle2 className="size-3 ml-2" />}
                       </button>
                     ))}
                   </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            aria-label={t('header.toggle_theme')}
            aria-pressed={theme === 'dark'}
            data-theme={theme}
            className="theme-switch"
            type="button"
          >
            <span className="theme-switch-track" aria-hidden="true">
              <span className="theme-switch-icon theme-switch-icon--sun">
                <Sun className="size-3" />
              </span>
              <span className="theme-switch-icon theme-switch-icon--moon">
                <Moon className="size-3" />
              </span>
              <span className="theme-switch-thumb">
                {theme === 'dark'
                  ? <Moon className="size-4" />
                  : <Sun className="size-4" />
                }
              </span>
            </span>
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 bg-surface-container-low hover:bg-surface-container-high rounded-2xl border border-outline-variant/10 text-on-surface-variant transition-all hover:scale-105 active:scale-95"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-container-low border-b border-outline-variant/10 overflow-hidden"
          >
            <div className="px-6 py-10 grid gap-4">
               {navLinks.map((link) => (
                 <Link
                   key={link.path}
                   to={link.path}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={cn(
                     "flex items-center gap-4 px-6 py-5 rounded-3xl text-sm font-black uppercase tracking-widest transition-all",
                     location.pathname === link.path 
                       ? "bg-primary text-on-primary shadow-xl shadow-primary/20" 
                       : "bg-surface-container-high text-on-surface-variant"
                   )}
                 >
                    {link.icon}
                    {link.name}
                 </Link>
               ))}
               
               <div className="mt-8 pt-8 border-t border-outline-variant/20 flex flex-col gap-6">
                 {/* Mobile language picker */}
                 <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-6 border border-outline-variant/30">
                   <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-on-surface mb-4">
                     <Globe className="size-5 text-primary" />
                     {t('header.lang')}
                   </label>
                   <select
                     value={locale}
                     onChange={(e) => setLocale(e.target.value as SupportedLocale)}
                     className="w-full rounded-2xl border-2 border-primary/30 bg-surface-container-high px-5 py-3.5 text-sm font-bold text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                   >
                     {supportedLocales.map((loc) => (
                       <option key={loc.code} value={loc.code}>
                         {loc.label} ({loc.code})
                       </option>
                     ))}
                   </select>
                 </div>

                 <div className="bg-gradient-to-br from-tertiary to-tertiary-container rounded-3xl p-6 text-on-tertiary shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                       <Sparkles size={20} />
                       <span className="font-extrabold text-lg">KooBrain Premium</span>
                    </div>
                    <p className="text-xs opacity-80 font-medium mb-4 italic">Experience the ultimate toolkit with no limits.</p>
                    <button className="w-full bg-white text-tertiary py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform active:scale-95">
                        Get Early Access
                    </button>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
