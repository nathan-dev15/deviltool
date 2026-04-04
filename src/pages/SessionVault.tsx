import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Copy, 
  Clock, 
  ChevronRight, 
  LayoutDashboard, 
  Lock, 
  FileText, 
  Database, 
  Key, 
  AlertCircle,
  ZapOff,
  Search,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  db, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  setDoc, 
  serverTimestamp 
} from '../firebase';
import { SEO } from '@/src/components/SEO';
import { cn } from '@/src/lib/utils';
import { useI18n } from '@/src/i18n/I18nContext';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';

interface VaultItem {
  id: string;
  title: string;
  content: string;
  type: 'password' | 'json' | 'text' | 'sql';
  createdAt: any;
  ownerId: string;
}

export const SessionVault: React.FC = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: If Firebase Auth is not active, this might return empty or error.
    // Keeping UI skeleton and i18n priority.
    setLoading(false);
  }, []);

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'vault', id));
    } catch (e) {
      console.error("Error deleting item:", e);
    }
  };

  const wipeVault = async () => {
    if (!window.confirm(t('label.wipe_confirmation'))) return;
    
    const deletePromises = items.map(item => deleteDoc(doc(db, 'vault', item.id)));
    try {
      await Promise.all(deletePromises);
    } catch (e) {
      console.error("Error wiping vault:", e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolPageWrapper
      title={t('label.session_vault')}
      description={t('label.session_vault_desc')}
      breadcrumbs={[
        { label: "Security", href: "#" },
        { label: t('label.session_vault') }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="Session Vault - Secure Temporary Storage"
        description="Store your generated passwords and formatted data securely during your session. All data is isolated and ephemeral."
        keywords="secure vault, session storage, private tools, encrypted storage"
      />

      <div className="space-y-12 animate-fade-in">
        
        {/* ACTION HEADER */}
        {items.length > 0 && (
          <div className="flex justify-end">
            <button 
              onClick={wipeVault}
              className="group flex items-center gap-3 px-6 py-3 bg-error/10 text-error border border-error/20 rounded-2xl hover:bg-error hover:text-white transition-all font-black uppercase tracking-widest text-[10px] shadow-lg shadow-error/10"
            >
              <ZapOff className="size-4 group-hover:animate-pulse" />
              {t('label.wipe_all_data')}
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-surface-container-high/40 animate-pulse rounded-[2.5rem] border border-outline-variant/10"></div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/30 py-24 px-8 rounded-[3rem] text-center shadow-xl relative overflow-hidden group">
            <div className="absolute -inset-24 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-surface-container-high rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-outline-variant/10 shadow-inner group-hover:rotate-6 transition-transform">
                <ShieldCheck className="size-12 text-primary/40" />
              </div>
              <h3 className="text-3xl font-black mb-4 text-on-surface uppercase tracking-widest">{t('label.vault_empty')}</h3>
              <p className="text-on-surface-variant font-medium max-w-sm mx-auto mb-12 leading-relaxed italic opacity-80">
                {t('label.vault_empty_desc')}
              </p>
              <Link to="/" className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-on-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                <Search className="size-4" />
                {t('label.explore_tools')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/30 shadow-lg flex flex-col h-full group hover:border-primary/30 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="size-14 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary border border-outline-variant/10 shadow-sm group-hover:scale-110 transition-transform">
                        {item.type === 'password' && <Key size={24} />}
                        {item.type === 'json' && <Database size={24} />}
                        {item.type === 'sql' && <FileText size={24} />}
                        {item.type === 'text' && <FileText size={24} />}
                      </div>
                      <div>
                        <h3 className="font-black text-on-surface uppercase tracking-widest text-sm mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-on-surface-variant/50 font-black uppercase tracking-widest">
                          <History size={12} />
                          {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleTimeString() : 'Just now'}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="size-10 flex items-center justify-center text-on-surface-variant/30 hover:text-error hover:bg-error/10 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-grow bg-surface-container-low/60 dark:bg-slate-950 rounded-[1.5rem] p-6 font-mono text-sm text-on-surface-variant break-all mb-8 max-h-48 overflow-y-auto border border-outline-variant/5 shadow-inner leading-relaxed">
                    {item.content}
                  </div>

                  <button 
                    onClick={() => copyToClipboard(item.content)}
                    className="w-full flex items-center justify-center gap-3 py-5 bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary transition-all rounded-2xl font-black uppercase tracking-widest text-xs relative z-10 group/btn"
                  >
                    <Copy size={18} className="group-hover/btn:rotate-6 transition-transform" />
                    {t('action.copy_content')}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* PRIVACY FOOTER */}
        <div className="bg-surface-container-low/30 p-10 rounded-[2.5rem] border border-outline-variant/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px]" />
           
           <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-4 text-on-surface">
            <ShieldCheck className="text-primary size-6" />
            {t('label.privacy_notice')}
          </h3>
          <p className="text-on-surface-variant font-medium leading-relaxed italic opacity-80 max-w-4xl border-l-4 border-primary/20 pl-8">
            {t('label.privacy_notice_p')}
          </p>
        </div>

      </div>
    </ToolPageWrapper>
  );
};
