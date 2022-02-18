import React from "react";
import './navbar.css'

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <ul>
        <a href="./Zones">
          <li>Zone Management</li>
        </a>
        <li>Register Food</li>
        <li>Search Foods</li>
        <li>Shopping List</li>
      </ul>
    </div>
  )
}