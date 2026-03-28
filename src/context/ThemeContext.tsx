import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('tn-theme') as Theme | null;
    if (saved) return saved;
    return 'dark';
  });
  const switchTimeoutsRef = React.useRef<number[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Safety: never allow the transition overlay to persist.
    root.classList.remove('tn-theme-fade');
    localStorage.setItem('tn-theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      for (const t of switchTimeoutsRef.current) window.clearTimeout(t);
      switchTimeoutsRef.current = [];
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    // Clear any previous in-flight switch timers (double-toggles).
    for (const t of switchTimeoutsRef.current) window.clearTimeout(t);
    switchTimeoutsRef.current = [];

    // Cross-fade to avoid a visible "blink" when large backgrounds/gradients swap.
    root.classList.add('tn-theme-fade');

    // Give the overlay a moment to paint, then flip the theme.
    switchTimeoutsRef.current.push(
      window.setTimeout(() => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
      }, 70)
    );

    // Remove the overlay after the new theme has settled.
    switchTimeoutsRef.current.push(
      window.setTimeout(() => {
        root.classList.remove('tn-theme-fade');
      }, 260)
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
