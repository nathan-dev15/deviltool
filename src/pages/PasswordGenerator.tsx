import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, RefreshCw, Copy, Info, ShieldCheck, Key, Database, QrCode, ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { useAuth } from '../context/AuthContext';
import { db, collection, doc, setDoc, serverTimestamp } from '../firebase';

export const PasswordGenerator: React.FC = () => {
  const { user } = useAuth();
  const [length, setLength] = React.useState(16);
  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeLowercase, setIncludeLowercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

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
  };

  const saveToVault = async () => {
    if (!user || !password) return;
    setIsSaving(true);
    try {
      const itemId = crypto.randomUUID();
      await setDoc(doc(db, 'vault', itemId), {
        id: itemId,
        title: `Password (${length} chars)`,
        content: password,
        type: 'password',
        createdAt: serverTimestamp(),
        ownerId: user.uid
      });
      alert("Saved to Session Vault!");
    } catch (e) {
      console.error("Error saving to vault:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const getStrength = () => {
    if (length < 8) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    if (length < 12) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/4' };
    return { label: 'Strong', color: 'bg-green-500', width: 'w-3/4' };
  };

  const strength = getStrength();

  return (
    <div className="w-full px-4 py-8 md:py-12">
      <SEO 
        title="Password Generator - Create Secure Random Passwords"
        description="Generate strong, secure, and random passwords instantly. Customize length, include symbols, numbers, and more. 100% private and browser-based."
        keywords="password generator, secure password, random password, strong password, password creator"
      />
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Password Generator</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Generate strong, secure, and random passwords instantly to keep your online accounts safe.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Result Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="relative group">
                <div className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-10 flex items-center justify-center">
                  <span data-testid="password-display" className="text-2xl md:text-4xl font-mono font-bold tracking-wider break-all text-center text-primary py-4">
                    {password || 'Select options'}
                  </span>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={generatePassword}
                    data-testid="refresh-password"
                    className="p-2 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:text-primary transition-colors"
                  >
                    <RefreshCw className="size-5" />
                  </button>
                </div>
              </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-500">Strength: <span className={cn("font-bold uppercase tracking-wider", strength.label === 'Strong' ? 'text-green-500' : strength.label === 'Medium' ? 'text-yellow-500' : 'text-red-500')}>{strength.label}</span></span>
                      <span className="text-xs text-slate-400">{length} characters</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1">
                      <div className={cn("h-full rounded-full transition-all duration-500", strength.width, strength.color)}></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <button 
                      onClick={saveToVault}
                      disabled={isSaving}
                      className="flex-grow sm:flex-grow-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary text-slate-700 dark:text-slate-200 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      <Lock className="size-5" />
                      {isSaving ? 'Saving...' : 'Save to Vault'}
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="flex-grow sm:flex-grow-0 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                    >
                      <Copy className="size-5" />
                      Copy Password
                    </button>
                  </div>
                </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Settings className="text-primary size-5" />
                Customize Password
              </h3>
            </div>
            <div className="p-6 space-y-8">
              {/* Length Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Password Length</label>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-md font-bold text-lg">{length}</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="64" 
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-400 px-1">
                  <span>4</span>
                  <span>16</span>
                  <span>32</span>
                  <span>48</span>
                  <span>64</span>
                </div>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Uppercase Letters', sub: 'ABC...', state: includeUppercase, setState: setIncludeUppercase },
                  { label: 'Lowercase Letters', sub: 'abc...', state: includeLowercase, setState: setIncludeLowercase },
                  { label: 'Numbers', sub: '123...', state: includeNumbers, setState: setIncludeNumbers },
                  { label: 'Special Symbols', sub: '@#$...', state: includeSymbols, setState: setIncludeSymbols },
                ].map((opt, i) => (
                  <label key={i} className="flex items-center justify-between p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 cursor-pointer hover:border-primary/30 transition-all active:scale-[0.98]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{opt.label}</span>
                      <span className="text-xs text-slate-400">{opt.sub}</span>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={opt.state}
                        onChange={(e) => opt.setState(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Info className="text-primary size-5" />
              How to use the Password Generator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                <h4 className="font-bold">Set Length</h4>
                <p className="text-sm text-slate-500">Drag the slider to choose the length. 12+ characters is recommended for high security.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                <h4 className="font-bold">Choose Complexity</h4>
                <p className="text-sm text-slate-500">Toggle uppercase, numbers, and symbols to meet specific website requirements.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                <h4 className="font-bold">Copy & Use</h4>
                <p className="text-sm text-slate-500">Click the copy button and paste your new secure password into your app or service.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Related Tools */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <ShieldCheck className="text-primary size-5" />
              <h3 className="font-bold">Security Tools</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <Link to="/password-strength" className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Key className="size-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold">Strength Tester</h4>
                  <p className="text-xs text-slate-400">Check how secure your password is.</p>
                </div>
              </Link>
              <Link to="/json-formatter" className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Database className="size-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold">JSON Formatter</h4>
                  <p className="text-xs text-slate-400">Clean and beautify your JSON data.</p>
                </div>
              </Link>
              <Link to="/qr-generator" className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <QrCode className="size-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold">QR Code Generator</h4>
                  <p className="text-xs text-slate-400">Create QR codes for URLs and text.</p>
                </div>
              </Link>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/20">
              <Link to="/tools" className="text-primary text-sm font-bold flex items-center justify-center gap-1 hover:underline">
                View all tools
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
