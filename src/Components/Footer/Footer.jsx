import ReactSelect from "react-select";
import { useState } from "react";

import "./Footer.scss";

import { Themes } from "../../Utils/Themes";
import { useMyTheme } from "../../Context/ThemeContext";

function Footer() {
  const { theme, setTheme } = useMyTheme();

  const handleSelectChange = (e) => {
    setTheme(e.value);

    // Storing the theme in the local storage to prevent the theme from changing when the page reloads
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  console.log(theme);

  return (
    <div className="footer">
      <div className="links">Links</div>
      <div className="themes-select">
        <ReactSelect
          onChange={handleSelectChange}
          options={Themes}
          menuPlacement="top"
          placeholder="Change Theme"
          isSearchable={false}
          defaultValue={{ label: theme.label, value: theme.value }}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: theme.background,
              color: theme.textColor,
              border: `1px solid ${theme.textColor}`,
              cursor: "pointer",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: theme.background,
              color: theme.textColor,
            }),
            option: (baseStyles, { isFocused }) => {
              return {
                ...baseStyles,
                backgroundColor: !isFocused ? theme.background : theme.cursor,
                color: theme.textColor,
                cursor: "pointer",
              };
            },
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: theme.textColor,
            }),
          }}

          // styles={{
          //   control: (baseStyles) => ({
          //     ...baseStyles,
          //     backgroundColor: theme.background,
          //   }),
          //   option: (provided) => ({
          //     ...provided,
          //     color: theme.correct,
          //   }),
          //   singleValue: (provided) => ({
          //     ...provided,
          //     color: "red",
          //   }),
          // }}
        />
      </div>
    </div>
  );
}

export default Footer;
