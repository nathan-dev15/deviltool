import { useLocation, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useI18n } from "@/src/i18n/I18nContext";

export const NotFound = () => {
  const location = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-9xl font-black kinetic-gradient mb-4 leading-none"
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-bold text-on-surface mb-3"
        >
          {t('notfound.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-on-surface-variant mb-8 leading-relaxed"
        >
          {t('notfound.desc_1', { path: location.pathname })}<br />
          {t('notfound.desc_2')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25"
          >
            <Home className="size-4" />
            {t('notfound.back_home')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
