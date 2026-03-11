import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ToolCard } from './ToolCard';
import { Tool } from '../constants';

interface ToolGridProps {
  tools: Tool[];
  title: string;
  category: string;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ tools, title, category }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {tools.length} tools available
            </p>
          </div>
          <Link to={`/category/${category}`} className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
            View All <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.slice(0, 8).map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};