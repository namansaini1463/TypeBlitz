import { createContext, useContext, useState } from "react";
import { Themes } from "../Utils/Themes";

const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeContextProvider = ({ children }) => {
  const defaultTheme =
    JSON.parse(localStorage.getItem("theme")) || Themes[0].value;

  const [theme, setTheme] = useState(defaultTheme);

  const values = { theme, setTheme };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useMyTheme = () => {
  return useContext(ThemeContext);
};
