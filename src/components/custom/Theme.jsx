import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const Theme = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark")) || false;
  });

  const toggle = () => {
    setIsDark((prevstate) => {
      const newTheme = !prevstate;
      localStorage.setItem("isDark", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default Theme;
