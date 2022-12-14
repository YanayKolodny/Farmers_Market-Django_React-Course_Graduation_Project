import React from "react";
import { Link } from "react-router-dom";


// In this Component the navBar between the different pages in the stand admin menu:
export default function StandAdminMenuFilter() {

  return (
    <div className="filter_container_2">
      <nav>
        <div className="filter_btnBox_2">

          <Link to="" className="link">
            <button
              className="filter_btn">
              Edit Stand
            </button>
          </Link>

          <Link to="productsadmin" className="link">
            <button
              className="filter_btn"
            >
              Manage Products
            </button>
          </Link>

          <Link to="categoriesadmin" className="link">
            <button
              className="filter_btn"
            >
              Manage Categories
            </button>
          </Link>

          <Link to="ordersadmin" className="link">
            <button
              className="filter_btn"
            >
              Manage orders
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
