import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  RefreshCw, 
  Copy, 
  Info, 
  ShieldCheck, 
  Key, 
  Database, 
  QrCode, 
  ArrowRight, 
  Lock, 
  Sparkles,
  Zap,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { useI18n } from '@/src/i18n/I18nContext';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from "@/src/components/AdSense";
export const PasswordGenerator: React.FC = () => {
  const { t } = useI18n();
  const [length, setLength] = React.useState(16);
  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeLowercase, setIncludeLowercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generatePassword = React.useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      setPassword('');
      return;
    }

    let generatedPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += charset[array[i] % charset.length];
    }
    setPassword(generatedPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  React.useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthLabels = () => {
    if (length < 8)  return { label: t('label.weak'),   color: 'bg-error',   width: 'w-1/4' };
    if (length < 12) return { label: t('label.medium'), color: 'bg-warning', width: 'w-2/4' };
    return { label: t('label.strong'), color: 'bg-success', width: 'w-3/4' };
  };

  const strength = getStrengthLabels();

  return (
    <ToolPageWrapper
      title={t('label.password_generator')}
      description={t('home.section_encoding_desc')}
      breadcrumbs={[
        { label: t('label.security_tools'), href: "#" },
        { label: t('label.password_generator') }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="Password Generator - Create Secure Random Passwords"
        description="Generate strong, secure, and random passwords instantly. Customize length, include symbols, numbers, and more. 100% private and browser-based."
        keywords="password generator, secure password, random password, strong password, password creator"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in sm:mt-8 mt-4">
        <div className="lg:col-span-8 space-y-10">
          
          {/* RESULT PANEL */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] shadow-xl overflow-hidden relative group">
            <div className="absolute -inset-24 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="p-8 sm:p-12 text-center relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary font-black uppercase tracking-widest text-[10px] mb-8">
                 <ShieldCheck className="size-3" />
                 {t('label.cryptographically_secure') || 'Cryptographically Secure'}
              </div>
              
              <div className="bg-surface-container-low/50 dark:bg-black/40 rounded-3xl border border-outline-variant/20 p-8 sm:p-12 mb-10 shadow-inner group/pass">
                <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-black tracking-[0.1em] break-all text-primary block min-h-[1.5em] leading-relaxed selection:bg-primary/30">
                  {password || '••••••••••••'}
                </span>
                
                <div className="mt-8 flex justify-center gap-6">
                    <button 
                      onClick={generatePassword}
                      className="p-4 bg-surface-container-high rounded-2xl border border-outline-variant/10 text-on-surface-variant/60 hover:text-primary hover:border-primary/30 transition-all hover:bg-primary/5 active:scale-95"
                    >
                      <RefreshCw className="size-6" />
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className={cn(
                        "flex-1 max-w-[280px] py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl",
                        copied ? "bg-success text-on-success shadow-success/20" : "bg-primary text-on-primary shadow-primary/20 hover:scale-[1.02]"
                      )}
                    >
                      {copied ? <CheckCircle2 className="size-5" /> : <Copy className="size-5" />}
                      {copied ? t('action.copied') : t('action.copy_password')}
                    </button>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                 <div className="flex items-center justify-between mb-3 px-1">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                      {t('label.strength')}: <span className={cn("font-black", strength.label === t('label.strong') ? 'text-success' : strength.label === t('label.medium') ? 'text-warning' : 'text-error')}>{strength.label}</span>
                   </span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/30">{length} {t('label.v_characters') || 'characters'}</span>
                 </div>
                 <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex p-1 border border-outline-variant/10">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: strength.width.split('-')[1] }}
                     className={cn("h-full rounded-full transition-all duration-500", strength.color)}
                   />
                 </div>
              </div>
            </div>
          </div>

          {/* CONFIGURATION PANEL */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] shadow-sm overflow-hidden">
             <div className="px-8 py-6 border-b border-outline-variant/10 bg-surface-container-low/50 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface flex items-center gap-3">
                    <Settings className="size-4 text-primary" />
                    {t('label.customize_password')}
                </h3>
             </div>
             
             <div className="p-8 sm:p-10 space-y-12">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">{t('label.password_length')}</label>
                        <span className="bg-primary text-on-primary px-4 py-1.5 rounded-xl font-black text-lg shadow-lg shadow-primary/20">{length}</span>
                    </div>
                    <div className="relative pt-6">
                         <input 
                          type="range" 
                          min="4" 
                          max="64" 
                          value={length}
                          onChange={(e) => setLength(parseInt(e.target.value))}
                          className="w-full h-3 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/30 mt-4 px-1 uppercase tracking-tighter">
                          <span>4</span>
                          <span>16</span>
                          <span>32</span>
                          <span>48</span>
                          <span>64</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: t('label.uppercase_letters'), sub: 'ABC...', state: includeUppercase, setState: setIncludeUppercase, icon: 'A' },
                      { label: t('label.lowercase_letters'), sub: 'abc...', state: includeLowercase, setState: setIncludeLowercase, icon: 'a' },
                      { label: t('label.numbers'), sub: '123...', state: includeNumbers, setState: setIncludeNumbers, icon: '1' },
                      { label: t('label.special_symbols'), sub: '@#$...', state: includeSymbols, setState: setIncludeSymbols, icon: '#' },
                    ].map((opt, i) => (
                      <label 
                        key={i} 
                        className={cn(
                            "flex items-center justify-between p-6 rounded-3xl border transition-all cursor-pointer group/opt active:scale-95",
                            opt.state 
                                ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/5" 
                                : "bg-surface-container-low border-outline-variant/10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
                        )}
                      >
                        <div className="flex items-center gap-5">
                            <div className={cn("size-10 rounded-xl flex items-center justify-center font-black text-lg transition-colors border-2", opt.state ? "bg-primary text-on-primary border-primary/20" : "bg-surface-container-high text-on-surface-variant/40 border-outline-variant/10")}>
                                {opt.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-black text-on-surface text-xs uppercase tracking-widest">{opt.label}</span>
                              <span className="text-[10px] font-bold text-on-surface-variant/40 mt-1">{opt.sub}</span>
                            </div>
                        </div>
                        <input 
                            type="checkbox" 
                            checked={opt.state}
                            onChange={(e) => opt.setState(e.target.checked)}
                            className="sr-only" 
                        />
                        <div className={cn("w-12 h-6 rounded-full relative transition-colors duration-300", opt.state ? "bg-primary" : "bg-outline-variant/20")}>
                            <motion.div 
                                animate={{ x: opt.state ? 24 : 4 }}
                                className="absolute top-1 size-4 bg-white rounded-full shadow-md"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </div>
                      </label>
                    ))}
                </div>
             </div>
          </div>

          {/* HOW TO USE */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm group">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-4 text-on-surface uppercase tracking-widest">
              <Info className="text-primary size-6" />
              {t('label.how_to_use_gen')}
            </h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl shadow-lg shadow-primary/10">1</div>
                <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">{t('label.set_length')}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic opacity-85">{t('label.set_length_desc')}</p>
              </div>
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl shadow-lg shadow-primary/10">2</div>
                <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">{t('label.choose_complexity')}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic opacity-85">{t('label.choose_complexity_desc')}</p>
              </div>
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl shadow-lg shadow-primary/10">3</div>
                <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">{t('label.copy_and_use')}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic opacity-85">{t('label.copy_use_desc')}</p>
              </div>
            </div>
          </section>
        </div>
   <div className="rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm">
             <AdSense slot="8156203131"/>
          </div>
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-surface-container-low/30 rounded-[2.5rem] p-8 border border-outline-variant/20 shadow-sm sticky top-24">
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-on-surface flex items-center gap-3">
               <Sparkles className="size-5 text-warning" />
               {t('label.security_tools')}
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'Strength Tester', path: '/password-strength', icon: <Key className="size-4" />, desc: 'Check security level' },
                { name: 'JSON Formatter', path: '/json-formatter', icon: <Database className="size-4" />, desc: 'Beautify data' },
                { name: 'QR Generator', path: '/qr-generator', icon: <QrCode className="size-4" />, desc: 'Convert text to QR' },
              ].map((tool) => (
                <Link 
                  key={tool.path}
                  to={tool.path} 
                  className="group block p-4 rounded-2xl border border-outline-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-surface-container-high text-on-surface-variant/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <p className="font-black text-on-surface text-xs uppercase tracking-widest group-hover:text-primary transition-colors">{tool.name}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant/50 mt-1">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
                <Link to="/tools" className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:translate-x-1 transition-transform">
                    {t('label.view_all_tools')}
                    <LayoutDashboard className="size-4" />
                </Link>
            </div>
          </div>

          <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Zap size={100} />
            </div>
            <h4 className="font-black text-on-primary text-lg mb-4 flex items-center gap-3 uppercase tracking-tighter italic">
               <Sparkles className="size-5" /> 
               {t('label.ultra_private') || 'Ultra Private'}
            </h4>
            <p className="text-sm text-on-primary/80 leading-relaxed font-medium italic opacity-90">
              Your passwords never leave your computer. All processing happens 100% locally in your browser memory via the Web Crypto API.
            </p>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
