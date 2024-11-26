// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for the theme
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // default theme

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
