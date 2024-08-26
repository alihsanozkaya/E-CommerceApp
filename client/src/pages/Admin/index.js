import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Admin = () => {
  const path = "admin";
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/${path}/orders`}>Orders</Link>
          </li>
          <li>
            <Link to={`/${path}/products`}>Products</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;
