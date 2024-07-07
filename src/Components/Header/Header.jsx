import "./Header.scss";

import AccountIcon from "../Account-icon/AccountIcon";

const handleClick = () => {
  window.location.reload();
};

function Header() {
  return (
    <div className="header">
      <div className="name-container" onClick={handleClick}>
        <img src="icon.png" alt="TypeBlitz" />
        <h3>TypeBlitz</h3>
      </div>
      <div className="login">
        <AccountIcon />
      </div>
    </div>
  );
}

export default Header;
