import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon, CodeXml, Lock, Image, Type, Calculator } from 'lucide-react';

interface CategorySectionProps {
  categories: Array<{
    name: string;
    icon: LucideIcon;
    category: string;
    color: string;
    count: number;
  }>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore our comprehensive collection of tools organized by category for easy discovery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link
                to={`/category/${category.category}`}
                className="block bg-white dark:bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 dark:border-slate-800/50 dark:border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <category.icon className="size-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {category.count} tools available
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};