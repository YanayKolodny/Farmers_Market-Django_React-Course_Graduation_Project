import React from "react";
import { Link } from "react-router-dom";


// In this Component the navBar between the different pages in the stand admin menu:
export default function WebAdminMenuFilter() {

  return (
    <div className="filter_container_2">
      <nav>
        <div className="filter_btnBox_2">

          <Link to="" className="link">
            <button
              className="filter_btn">
              General Information
            </button>
          </Link>

          <Link to="areaswebadmin" className="link">
            <button
              className="filter_btn">
              Manage Areas
            </button>
          </Link>

          <Link to="standswebadmin" className="link">
            <button
              className="filter_btn">
              Manage Stands
            </button>
          </Link>

          <Link to="productswebadmin" className="link">
            <button
              className="filter_btn">
              Manage Products
            </button>
          </Link>

          <Link to="orderswebadmin" className="link">
            <button
              className="filter_btn">
              Manage Orders
            </button>
          </Link>

        </div>
      </nav>
    </div>
  );
}
