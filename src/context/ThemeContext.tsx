import React, { createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  theme: 'light';
  themeLabel: string;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: 'light',
  themeLabel: 'Warm Travertine Plaster',
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      localStorage.removeItem('trupaintz_theme_mode');
      localStorage.removeItem('trupaintz_theme');
    } catch {
      // ignore
    }
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
    document.body.classList.remove('bg-[#0B0D11]', 'text-neutral-100');
    document.body.classList.add('bg-[#F8F5EE]', 'text-neutral-900');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: false, theme: 'light', themeLabel: 'Warm Travertine Plaster' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
