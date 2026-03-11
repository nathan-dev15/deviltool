
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CodeXml,
  Lock,
  Image as ImageIcon,
  Type,
  Database,
  Calendar as Calculator,
  Clock,
  FileImage,
  Bolt,
  ArrowRight,
  Search
} from 'lucide-react';
import { TOOLS } from '../constants';
import { SEO } from '../components/SEO';

import { cn } from '../lib/utils';

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

// ...existing code...

      {/* Image Tools Category - Classic Section */}
      <section className="bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-gray-100 via-white to-gray-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 py-20 border-y-2 border-blue-200 dark:border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-blue-700 dark:text-blue-300 drop-shadow">Image Tools</h2>
            <p className="text-blue-800 dark:text-blue-200 mt-2 font-medium">Convert, encode, and resize images with ease.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOOLS.filter(tool => tool.category === 'image').map((tool, index) => {
              const Icon = iconMap[tool.icon] || ImageIcon;
              return (
                <Link 
                  key={tool.id}
                  to={tool.path}
                  className="group block h-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl p-7 rounded-2xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-400/20 cursor-pointer overflow-hidden relative"
                >
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-blue-200 dark:border-blue-700">
                    <Icon className="size-7 text-white drop-shadow filter brightness-110" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-200 group-hover:text-blue-600 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">
                    {tool.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

// Removed duplicate export
export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#f5f7fa] via-[#e0e7ff] to-[#f0f4ff] dark:from-background-dark dark:via-[#1e293b] dark:to-[#232946]">
      <SEO 
        title="ToolNest - Free Online Developer Tools & Utilities"
        description="The ultimate suite of free online tools for developers and everyone. JSON Formatter, Password Generator, Image Compressor, and more. Fast, secure, and private."
        keywords="online tools, developer tools, json formatter, password generator, image compressor, word counter, age calculator, free utilities"
      />
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Layered gradients and blur for hero background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-linear-to-br from-primary/30 to-accent-purple/20 rounded-full blur-[120px] opacity-60 animate-gradient-move"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-linear-to-tr from-accent-purple/30 to-primary/10 rounded-full blur-[100px] opacity-40 animate-gradient-move2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-primary to-accent-purple text-white shadow-xl shadow-primary/10 text-base font-semibold mb-8 backdrop-blur-md"
          >
            <Bolt className="size-4" />
            <span>The Web's Ultimate Utility Suite</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight drop-shadow-xl"
          >
            Free Online Tools for <br />
            <span className="gradient-text animate-gradient-text">Developers & Everyone</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-10 backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 rounded-xl px-6 py-4 shadow-lg"
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
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-accent-purple rounded-2xl blur-xl opacity-30 group-focus-within:opacity-60 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row items-center glass-card shadow-2xl p-2 gap-2">
              <Search className="ml-4 text-slate-400 size-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white px-4 py-3 placeholder:text-slate-400" 
                placeholder="Search 200+ tools (e.g. JSON, Password, PDF...)"
              />
              <button className="bg-linear-to-r from-primary to-accent-purple text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all w-full sm:w-auto shadow-lg shadow-primary/20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    className="group block h-full glass-card p-7 rounded-2xl border border-white/30 dark:border-slate-800/60 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer overflow-hidden relative backdrop-blur-lg"
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-xl bg-linear-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg",
                      tool.category === 'security' ? "from-accent-purple to-primary" : "from-primary to-accent-purple"
                    )}>
                      <Icon className="size-7 text-white drop-shadow" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
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

      {/* JSON Tools Category */}
      <section className="bg-linear-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#e1f5fe] dark:from-[#0e2230] dark:via-[#1e3a4c] dark:to-[#19324a] py-20 border-y-2 border-cyan-200 dark:border-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-cyan-700 dark:text-cyan-300 drop-shadow">JSON Tools</h2>
            <p className="text-cyan-800 dark:text-cyan-200 mt-2 font-medium">Work with JSON: format, validate, convert, and more.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOOLS.filter(tool => tool.category === 'json').map((tool, index) => {
              const Icon = iconMap[tool.icon] || CodeXml;
              return (
                <Link 
                  key={tool.id}
                  to={tool.path}
                  className="group block h-full bg-white/80 dark:bg-cyan-950/80 backdrop-blur-xl p-7 rounded-2xl border-2 border-cyan-300 dark:border-cyan-800 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20 cursor-pointer overflow-hidden relative"
                >
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-cyan-200 dark:border-cyan-700">
                    <Icon className="size-7 text-white drop-shadow filter brightness-110" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-900 dark:text-cyan-200 group-hover:text-cyan-600 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-cyan-800 dark:text-cyan-300 leading-relaxed group-hover:text-cyan-900 dark:group-hover:text-cyan-100 transition-colors duration-300">
                    {tool.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Encoding / Decoding Tools Category */}
      <section className="bg-linear-to-br from-[#fce4ec] via-[#f8bbd0] to-[#f3e5f5] dark:from-[#2a0a2a] dark:via-[#4a154b] dark:to-[#2d1936] py-20 border-y-2 border-fuchsia-200 dark:border-fuchsia-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-fuchsia-700 dark:text-fuchsia-300 drop-shadow">Encoding / Decoding Tools</h2>
            <p className="text-fuchsia-800 dark:text-fuchsia-200 mt-2 font-medium">Encode, decode, and convert text, URLs, HTML, JWT, and more.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOOLS.filter(tool => tool.category === 'encoding').map((tool, index) => {
              const Icon = iconMap[tool.icon] || CodeXml;
              return (
                <Link 
                  key={tool.id}
                  to={tool.path}
                  className="group block h-full bg-white/80 dark:bg-fuchsia-950/80 backdrop-blur-xl p-7 rounded-2xl border-2 border-fuchsia-300 dark:border-fuchsia-800 hover:border-fuchsia-500 transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-400/20 cursor-pointer overflow-hidden relative"
                >
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-fuchsia-200 dark:border-fuchsia-700">
                    <Icon className="size-7 text-white drop-shadow filter brightness-110" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-fuchsia-900 dark:text-fuchsia-200 group-hover:text-fuchsia-600 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-fuchsia-800 dark:text-fuchsia-300 leading-relaxed group-hover:text-fuchsia-900 dark:group-hover:text-fuchsia-100 transition-colors duration-300">
                    {tool.description}
                  </p>
                </Link>
              );
            })}
          </div>
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
