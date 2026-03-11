import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bolt, ArrowRight, CodeXml, Lock, Image as ImageIcon, Type, Database, Calculator, Clock, FileImage } from 'lucide-react';
import { TOOLS } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';

const iconMap: Record<string, any> = {
  'code-xml': CodeXml,
  'lock': Lock,
  'image': ImageIcon,
  'type': Type,
  'database': Database,
  'calendar': Calculator,
  'clock': Clock,
  'file-image': FileImage,
};

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative overflow-hidden">
      <SEO 
        title="ToolNest - Free Online Developer Tools & Utilities"
        description="The ultimate suite of free online tools for developers and everyone. JSON Formatter, Password Generator, Image Compressor, and more. Fast, secure, and private."
        keywords="online tools, developer tools, json formatter, password generator, image compressor, word counter, age calculator, free utilities"
      />
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8"
          >
            <Bolt className="size-4" />
            <span>The Web's Ultimate Utility Suite</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight"
          >
            Free Online Tools for <br />
            <span className="gradient-text">Developers & Everyone</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10"
          >
            Simplified web utilities for your daily workflow. Format, compress, generate, and calculate in seconds. No sign-up required.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-purple rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-white dark:bg-slate-900 rounded-xl shadow-xl p-2 gap-2">
              <Search className="ml-4 text-slate-400 size-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white px-4 py-3 placeholder:text-slate-400" 
                placeholder="Search 200+ tools (e.g. JSON, Password, PDF...)"
              />
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all w-full sm:w-auto">
                Search
              </button>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span>Trending:</span>
            <Link to="/json-formatter" className="hover:text-primary transition-colors underline decoration-primary/30">JSON Formatter</Link>
            <Link to="/password-generator" className="hover:text-primary transition-colors underline decoration-primary/30">Password Generator</Link>
            <Link to="/word-counter" className="hover:text-primary transition-colors underline decoration-primary/30">Word Counter</Link>
          </div>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {searchQuery ? 'Search Results' : 'Popular Tools'}
            </h2>
            <p className="text-slate-500 mt-2">
              {searchQuery ? `Found ${filteredTools.length} tools matching your search.` : 'The most used utilities by our community this week.'}
            </p>
          </div>
          {!searchQuery && (
            <Link to="/tools" className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline">
              View All Tools <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => {
              const Icon = iconMap[tool.icon] || CodeXml;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    to={tool.path}
                    className="group block h-full bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                      tool.category === 'security' ? "bg-accent-purple/10 text-accent-purple" : "bg-primary/10 text-primary"
                    )}>
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search className="size-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">No tools found</h3>
              <p className="text-slate-500">We couldn't find any tools matching "{searchQuery}". Try a different search term.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Explore by Category</h2>
            <p className="text-slate-500 mt-2">Browse our massive collection of tools organized by function.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: 'Developer Tools', icon: CodeXml, color: 'text-primary' },
              { name: 'Image Tools', icon: ImageIcon, color: 'text-accent-purple' },
              { name: 'Text Tools', icon: Type, color: 'text-primary' },
              { name: 'Calculators', icon: Calculator, color: 'text-accent-purple' },
            ].map((cat, i) => (
              <Link key={i} to={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="flex flex-col items-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center mb-4 group-hover:-translate-y-2 transition-transform border border-slate-100 dark:border-slate-700">
                  <cat.icon className={cn("size-8 sm:size-10", cat.color)} />
                </div>
                <span className="font-bold text-sm sm:text-base text-center text-slate-800 dark:text-slate-200">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
