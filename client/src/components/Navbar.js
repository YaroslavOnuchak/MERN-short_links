import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logOutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
        cut the link
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">create</NavLink>
          </li>
          <li>
            <NavLink to="/links">links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logOutHandler}>
              logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
