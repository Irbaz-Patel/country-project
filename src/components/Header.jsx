import React, { useContext } from "react";
import useTheme, { ThemeContext } from "./custom/Theme";

const Header = () => {
  const { isDark, toggle } = useContext(ThemeContext);
  return (
    <header className="header-container">
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p className="theme-changer" onClick={toggle}>
          <i className={`fa-regular fa-${isDark ? "sun" : "moon"}`} />
          &nbsp;&nbsp;{isDark ? "Light" : "Dark"} Mode
        </p>
      </div>
    </header>
  );
};

export default Header;
