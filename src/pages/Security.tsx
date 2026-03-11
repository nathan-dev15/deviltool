import React from 'react';
import { ShieldCheck, Lock, EyeOff, Code, CheckCircle, Info, ChevronRight, Home as HomeIcon, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '@/src/components/SEO';

export const Security: React.FC = () => {
  const securityFeatures = [
    {
      icon: <Lock className="size-6 text-primary" />,
      title: "Cryptographically Secure",
      description: "Our password generator uses the Web Crypto API (window.crypto.getRandomValues) to ensure true randomness and maximum security.",
      status: "Verified"
    },
    {
      icon: <EyeOff className="size-6 text-primary" />,
      title: "Client-Side Processing",
      description: "All text formatting, JSON parsing, and image compression happens entirely in your browser. Your data never touches our servers.",
      status: "Verified"
    },
    {
      icon: <Code className="size-6 text-primary" />,
      title: "Open Source Transparency",
      description: "Our code is open and transparent. Anyone can audit how we handle data to ensure there are no hidden backdoors or tracking.",
      status: "Auditable"
    },
    {
      icon: <ShieldCheck className="size-6 text-primary" />,
      title: "No Third-Party Tracking",
      description: "We don't use invasive tracking scripts or sell your data. Your privacy is our top priority.",
      status: "Verified"
    }
  ];

  return (
    <div className="px-4 py-12">
      <SEO 
        title="Security Center - ToolNest Privacy & Security"
        description="Learn how ToolNest ensures high security and privacy for all users. Client-side processing, secure randomness, and transparent code."
        keywords="security, privacy, data protection, client-side processing, secure tools"
      />
      
      <nav className="flex mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">Security Center</li>
        </ol>
      </nav>

      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6"
        >
          <ShieldCheck className="size-10 text-primary" />
        </motion.div>
        <h1 className="text-4xl font-black mb-4">Security & Privacy Center</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          We believe high security shouldn't be a luxury. Here's how we ensure your data stays yours.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {securityFeatures.map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/5 rounded-xl">
                {feature.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                {feature.status}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <ShieldAlert size={200} />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="text-yellow-500" />
            Security Commitment
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            ToolNest is designed with a "Privacy First" architecture. By performing all computations locally in your browser, we eliminate the risk of data breaches during transit or storage on our servers.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-primary">Zero Storage</h4>
              <p className="text-sm text-slate-400">We don't store your input data, passwords, or files.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-primary">Zero Tracking</h4>
              <p className="text-sm text-slate-400">No cookies are used to track your personal behavior.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-xl font-bold mb-8">Want even more security?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/password-generator" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Generate Secure Password
          </Link>
          <Link to="/about" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
};
