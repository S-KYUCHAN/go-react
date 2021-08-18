import React from "react";
import { Link } from "react-router-dom";
// import "./Header.scss";
import Navigation from "../Navigation/Navigation"

const Header = () => (
  <div className="header">
    <Navigation />
    <h2>My Site</h2>
    <Link to="/create">
      <button>New article</button>
    </Link>
  </div>
);

export default Header;