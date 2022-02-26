import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <ul>
        <Link to={"/"}>
          <li>Zone Management</li>
        </Link>
        <Link to={"/register-food"}>
          <li>Register Food</li>
        </Link>
        <Link to={"search-food"}>
          <li>Search Foods</li>
        </Link>
        <li>Shopping List</li>
      </ul>
    </div>
  );
}
