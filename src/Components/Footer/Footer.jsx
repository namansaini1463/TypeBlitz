import ReactSelect from "react-select";
import { useState } from "react";

import "./Footer.scss";

import { Themes } from "../../Utils/Themes";
import { useMyTheme } from "../../Context/ThemeContext";

function Footer() {
  const [value, setValue] = useState();
  const { setTheme } = useMyTheme();

  const handleSelectChange = (e) => {
    setValue(e.value);
    setTheme(e.value);
  };

  return (
    <div className="footer">
      <div className="links">Links</div>
      <div className="themes-select">
        <ReactSelect
          value={value}
          onChange={handleSelectChange}
          options={Themes}
          menuPlacement="top"
          placeholder="Change Theme"
          isSearchable={false}
        />
      </div>
    </div>
  );
}

export default Footer;
