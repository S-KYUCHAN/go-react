import React from "react";
import "./Header.scss";
import Navigation from "../Navigation/Navigation"

const Header = () => (
  <div className="header">
    <Navigation />
    <h2>My Site</h2>
  </div>
);

export default Header;