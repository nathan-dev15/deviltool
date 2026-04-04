import React from 'react';
import { ShieldCheck, Lock, EyeOff, Code, CheckCircle, Info, ChevronRight, Home as HomeIcon, AlertTriangle, ShieldAlert, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '@/src/components/SEO';
import { useI18n } from "@/src/i18n/I18nContext";
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';

export const Security: React.FC = () => {
  const { t } = useI18n();

  const securityFeatures = [
    {
      icon: <Lock className="size-8 text-primary group-hover:scale-110 transition-transform" />,
      title: t('label.security_feature_1_title'),
      description: t('label.security_feature_1_desc'),
      status: t('label.verified'),
      accent: 'border-primary/20 bg-primary/2'
    },
    {
      icon: <EyeOff className="size-8 text-tertiary group-hover:scale-110 transition-transform" />,
      title: t('label.security_feature_2_title'),
      description: t('label.security_feature_2_desc'),
      status: t('label.verified'),
      accent: 'border-tertiary/20 bg-tertiary/2'
    },
    {
      icon: <Code className="size-8 text-secondary group-hover:scale-110 transition-transform" />,
      title: t('label.security_feature_3_title'),
      description: t('label.security_feature_3_desc'),
      status: t('label.auditable'),
      accent: 'border-secondary/20 bg-secondary/2'
    },
    {
      icon: <ShieldCheck className="size-8 text-warning group-hover:scale-110 transition-transform" />,
      title: t('label.security_feature_4_title'),
      description: t('label.security_feature_4_desc'),
      status: t('label.verified'),
      accent: 'border-warning/20 bg-warning/2'
    }
  ];

  return (
    <ToolPageWrapper
      title={t('label.security_center_title')}
      description={t('label.security_center_desc')}
      breadcrumbs={[{ label: "Trust", href: "#" }, { label: t('nav.security') }]}
      accentColor="primary"
    >
      <SEO 
        title="Security Center - Koobrain Privacy & Security"
        description="Learn how Koobrain ensures high security and privacy for all users. Client-side processing, secure randomness, and transparent code."
        keywords="security, privacy, data protection, client-side processing, secure tools"
      />

      <div className="space-y-16 animate-fade-in sm:mt-12 mt-6">
        
        {/* BIG HERO ICON */}
        <div className="flex justify-center flex-col items-center">
             <div className="size-24 bg-primary/10 rounded-[2rem] flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/10 animate-pulse">
                <ShieldCheck className="size-12 text-primary" />
             </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ perspective: 900 }}
              whileHover={{ rotateX: -4, rotateY: 4, translateZ: 10, scale: 1.01 }}
              className={`p-10 rounded-[2.5rem] border border-outline-variant/30 bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all group relative overflow-hidden will-change-transform`}
            >
              <div className="absolute -inset-12 bg-primary/2 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between mb-10 relative z-10">
                <div className={`p-5 rounded-2xl bg-surface-container-high`}>
                  {feature.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-success/10 text-success rounded-full border border-success/20">
                  {feature.status}
                </span>
              </div>
              <h3 className="text-2xl font-black mb-4 text-on-surface uppercase tracking-widest">{feature.title}</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed italic opacity-85 text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* COMMITMENT CARD */}
        <motion.div
          style={{ perspective: 1200 }}
          whileHover={{ rotateX: -3, rotateY: 5, translateZ: 12, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-black text-white rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl shadow-slate-900/40 group border border-slate-800/60 will-change-transform"
        >
          <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <ShieldAlert size={300} />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl font-black mb-10 flex items-center gap-5 uppercase tracking-tighter">
              <AlertTriangle className="text-warning size-10" />
              {t('label.security_commitment_title')}
            </h2>
            <p className="text-slate-200 text-xl mb-12 leading-relaxed font-medium italic opacity-95 border-l-4 border-primary/50 pl-8">
              {t('label.security_commitment_p1')}
            </p>
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h4 className="font-black text-primary uppercase tracking-widest text-sm">Zero Storage</h4>
                <p className="text-sm text-slate-200 font-medium opacity-85 leading-relaxed italic">We don't store your input data, passwords, or files. Everything is transient.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-primary uppercase tracking-widest text-sm">Zero Tracking</h4>
                <p className="text-sm text-slate-200 font-medium opacity-85 leading-relaxed italic">No cookies are used to track your personal behavior. We prioritize anonymity.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTAS */}
        <div className="text-center pt-8">
            <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-on-surface">{t('label.want_more_security')}</h3>
            <div className="flex flex-wrap justify-center gap-6">
                <motion.div whileHover={{ rotateX: -2, rotateY: 4, scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ perspective: 800 }}>
                  <Link to="/password-generator" className="group flex items-center gap-3 bg-primary text-on-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-primary/25 transition-all">
                      <Lock className="size-4" />
                      {t('label.generate_secure_password')}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ rotateX: -2, rotateY: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ perspective: 800 }}>
                  <Link to="/about" className="group flex items-center gap-3 bg-surface-container-high border border-outline-variant/10 text-on-surface px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl transition-all">
                      {t('label.learn_more_about_us')}
                  </Link>
                </motion.div>
            </div>
            
        </div>

      </div>
    </ToolPageWrapper>
  );
};
