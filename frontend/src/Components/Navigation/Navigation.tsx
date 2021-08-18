import React from "react";
import { Link } from "react-router-dom";
// import "./Navigation.scss";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/articles">Articles</Link>
    </div>
  );
}

export default Navigation;