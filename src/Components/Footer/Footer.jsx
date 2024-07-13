import ReactSelect from "react-select";

import "./Footer.scss";

import { Themes } from "../../Utils/Themes";
import { useMyTheme } from "../../Context/ThemeContext";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Footer() {
  const { theme, setTheme } = useMyTheme();

  const handleSelectChange = (e) => {
    setTheme(e.value);

    // Storing the theme in the local storage to prevent the theme from changing when the page reloads
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  const openGithubProfile = () => {
    const redirect = document.createElement("a");
    redirect.href = "https://github.com/namansaini1463";
    redirect.target = "_blank";
    redirect.click();

    return;
  };

  const openLinkedInProfile = () => {
    const redirect = document.createElement("a");
    redirect.href = "https://www.linkedin.com/in/namansaini1463/";
    redirect.target = "_blank";
    redirect.click();
    return;
  };

  return (
    <div className="footer">
      <div className="links">
        <div className="github-link">
          <IconButton onClick={openGithubProfile}>
            <GitHub
              sx={{
                fontSize: "2rem",
                color: theme.textColor,
              }}
            />
          </IconButton>
        </div>
        <div className="linkedin-link">
          <IconButton onClick={openLinkedInProfile}>
            <LinkedIn
              sx={{
                fontSize: "2rem",
                color: theme.textColor,
              }}
            />
          </IconButton>
        </div>
        <div>
          <h6>Made with ❤️ by Naman Saini</h6>
        </div>
      </div>
      <div className="themes-select">
        <ReactSelect
          onChange={handleSelectChange}
          options={Themes}
          menuPlacement="top"
          placeholder="Change Theme"
          isSearchable={false}
          defaultValue={{ label: theme.label, value: theme.value }}
          styles={{
            width: "fit-content",
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
        />
      </div>
    </div>
  );
}

export default Footer;
