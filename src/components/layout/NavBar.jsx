import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/"><p>Home</p></NavLink>
        </li>
        <li>
          <NavLink to="/create"><p>Create</p></NavLink>
        </li>
        <li>
          <NavLink to="/read"><p>Read</p></NavLink>
        </li>
        <li>
          <NavLink to="/search"><p>Search</p></NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;