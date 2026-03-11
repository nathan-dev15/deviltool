import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CodeXml,
  Lock,
  Image,
  Type,
  Database,
  Calendar,
  Clock,
  FileImage,
  GitCompare,
  LucideIcon,
} from "lucide-react";
import { Tool } from "../constants";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

const iconMap: { [key: string]: LucideIcon } = {
  "code-xml": CodeXml,
  lock: Lock,
  image: Image,
  type: Type,
  database: Database,
  calendar: Calendar,
  clock: Clock,
  "file-image": FileImage,
  "git-compare": GitCompare,
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, index = 0 }) => {
  const Icon = iconMap[tool.icon] ?? CodeXml;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "developer":
        return "from-blue-500 to-cyan-500";
      case "image":
        return "from-green-500 to-emerald-500";
      case "text":
        return "from-purple-500 to-pink-500";
      case "calculator":
        return "from-orange-500 to-red-500";
      case "security":
        return "from-red-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link
        to={tool.path}
        className="block h-full glass-card p-7 rounded-2xl border border-white/30 dark:border-slate-800/60 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer overflow-hidden relative backdrop-blur-lg"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/50 to-transparent dark:from-slate-900/50 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className={`w-14 h-14 rounded-xl bg-linear-to-br ${getCategoryColor(
            tool.category
          )} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <Icon className="size-7 text-white" />
        </div>

        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
          {tool.name}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
          {tool.description}
        </p>

        {tool.trending && (
          <div className="absolute top-4 right-4 bg-linear-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
            🔥 Trending
          </div>
        )}
      </Link>
    </motion.div>
  );
};