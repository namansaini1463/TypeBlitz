import { createContext, useContext, useState } from "react";
import { Themes } from "../Utils/Themes";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(Themes[0].value);

  const values = { theme, setTheme };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useMyTheme = () => {
  return useContext(ThemeContext);
};
