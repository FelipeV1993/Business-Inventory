import React from "react";
import "./styles/navbar.css";

export const navbar = () => {
  const usuario = "nombre usuario" 
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand text-light">Business Inventory</a>
        <form className="d-flex" role="search">
          <div className="name_user">
            <p>{usuario}</p>
          </div>
            <i className="off fa-solid fa-power-off" />         
        </form>
      </div>
    </nav>
  );
};

export default navbar
