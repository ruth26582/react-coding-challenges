import { createContext, useEffect, useState } from "react";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const themes = {
  dark: {
    icon: faSun,
    iconColor: "#FFA500"
  },
  light: {
    icon: faMoon,
    iconColor: "#121212"
  }
}

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  if (isDark) {
    document.getElementById('root').classList.add('dark-mode');
  }
  else {
    document.getElementById('root').classList.remove('dark-mode');
  }

  const toggleTheme = () => {
    localStorage.setItem('isDark', JSON.stringify(!isDark));
    setIsDark(!isDark);
  }

  useEffect(() =>{
    const isDark = localStorage.getItem("isDark") === "true";
    setIsDark(isDark);
  }, []);

  return (
    <ThemeContext.Provider value={[{theme, isDark}, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  )
};