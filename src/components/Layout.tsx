import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid3X3, Menu, X, Search, User, ShieldCheck, LogOut, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { ScrollToTop } from './ScrollToTop';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  // scroll to top whenever the route changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg">
                  <Grid3X3 className="text-white size-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Tool<span className="text-primary">Nest</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={cn("text-sm font-medium hover:text-primary transition-colors", location.pathname === '/' && "text-primary")}>Home</Link>
              <Link to="/tools" className="text-sm font-medium hover:text-primary transition-colors">Tools</Link>
              <Link to="/vault" className={cn("text-sm font-medium hover:text-primary transition-colors flex items-center gap-1", location.pathname === '/vault' && "text-primary")}>
                <Lock className="size-3" /> Vault
              </Link>
              <Link to="/security" className="text-sm font-medium hover:text-primary transition-colors">Security</Link>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</Link>
                <Link to="/tools" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Tools</Link>
                <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Categories</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">About</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary p-1.5 rounded-lg">
                  <Grid3X3 className="text-white size-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ToolNest</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                The ultimate open-source online tools platform. Built for speed, privacy, and productivity.
              </p>
            </div>
            <div className="col-span-1">
              <h4 className="font-bold mb-6">Popular</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/json-formatter" className="hover:text-primary transition-colors">JSON Formatter</Link></li>
                <li><Link to="/password-generator" className="hover:text-primary transition-colors">Password Generator</Link></li>
                <li><Link to="/word-counter" className="hover:text-primary transition-colors">Word Counter</Link></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/security" className="hover:text-primary transition-colors font-semibold text-primary/80">Security Center</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">© 2026 ToolNest. Designed for the future of the web.</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};
