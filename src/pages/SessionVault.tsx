import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Copy, 
  Clock, 
  ChevronRight, 
  Home as HomeIcon, 
  Lock, 
  FileText, 
  Database, 
  Key, 
  AlertCircle,
  ZapOff
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

interface VaultItem {
  id: string;
  title: string;
  content: string;
  type: 'password' | 'json' | 'text' | 'sql';
  createdAt: any;
  ownerId: string;
}

export const SessionVault: React.FC = () => {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This logic currently depends on Firebase auth for user-isolated data.
    // If authorization is removed globally, you may want to migrate to localStorage.
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
    if (!window.confirm("Are you sure you want to wipe all session data? This cannot be undone.")) return;
    
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
    <div className="px-4 py-12">
      <SEO 
        title="Session Vault - Secure Temporary Storage"
        description="Store your generated passwords and formatted data securely during your session. All data is isolated and ephemeral."
        keywords="secure vault, session storage, private tools, encrypted storage"
      />
      
      <nav className="flex mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">Session Vault</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
            <Lock className="text-primary" />
            Session Vault
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Securely store temporary data. Everything is cleared when your session ends.
          </p>
        </div>
        
        {items.length > 0 && (
          <button 
            onClick={wipeVault}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
          >
            <ZapOff className="size-4" />
            Wipe All Data
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-16 rounded-3xl text-center">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="size-10 text-primary/40" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Vault is Empty</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
            Save items from other tools to see them here. Your data is isolated to this session.
          </p>
          <Link to="/" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Explore Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/5 rounded-lg text-primary">
                      {item.type === 'password' && <Key size={18} />}
                      {item.type === 'json' && <Database size={18} />}
                      {item.type === 'sql' && <FileText size={18} />}
                      {item.type === 'text' && <FileText size={18} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h3>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        <Clock size={10} />
                        {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleTimeString() : 'Just now'}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex-grow bg-slate-50 dark:bg-slate-950 rounded-xl p-4 font-mono text-sm text-slate-600 dark:text-slate-400 break-all mb-4 max-h-32 overflow-y-auto">
                  {item.content}
                </div>

                <button 
                  onClick={() => copyToClipboard(item.content)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all rounded-xl font-bold text-sm"
                >
                  <Copy size={16} />
                  Copy Content
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-16 p-8 bg-primary/5 rounded-3xl border border-primary/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          Privacy Notice
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          The Session Vault uses <strong>Firebase Anonymous Authentication</strong> with <strong>Session Persistence</strong>. This means your data is only accessible as long as your browser tab is open. Once you close the tab or clear your browser data, your unique session ID is lost, making the stored data permanently inaccessible to anyone, including you.
        </p>
      </div>
    </div>
  );
};
