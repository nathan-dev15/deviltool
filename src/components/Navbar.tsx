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
  Info
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, locale, setLocale, supportedLocales } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const location = useLocation();

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: t('nav.tools'), path: '/', icon: <LayoutDashboard size={16} /> },
    { name: t('nav.security'), path: '/security', icon: <ShieldCheck size={16} /> },
    { name: t('nav.about'), path: '/about', icon: <Info size={16} /> },
    { name: t('nav.contact'), path: '/contact', icon: <UserCircle size={16} /> },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-500",
        isScrolled 
          ? "py-3 bg-surface/80 backdrop-blur-2xl border-b border-outline-variant/10 shadow-lg" 
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
            Koobrain
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
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
                <motion.div 
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                />
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
                  className="absolute right-0 mt-3 w-max min-w-[200px] bg-white dark:bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden p-1.5 z-[110]"
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
                             ? "bg-primary text-white shadow-md translate-x-1" 
                             : "text-slate-500 hover:text-black hover:bg-slate-50"
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
               
               <div className="mt-8 pt-8 border-t border-outline-variant/10 flex flex-col gap-6">
                 <div className="bg-gradient-to-br from-tertiary to-tertiary-container rounded-3xl p-6 text-on-tertiary shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                       <Sparkles size={20} />
                       <span className="font-extrabold text-lg">Koobrain Premium</span>
                    </div>
                    <p className="text-xs opacity-80 font-medium mb-4 italic">Experience the ultimate toolkit with no limits.</p>
                    <button className="w-full bg-white text-tertiary py-3 rounded-2xl font-black uppercase tracking-widest text-[10px]">
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

const CheckCircle2 = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
);
