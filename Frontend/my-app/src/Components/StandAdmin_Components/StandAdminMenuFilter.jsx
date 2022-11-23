import React, { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { selectStands, selectFilteredStands, getStandsAsync, standsAreaFilter } from '../../Slices/standsSlice'

// In this Component the navBar between the different pages in the stand admin menu:
export default function StandAdminMenuFilter() {
  const dispatch = useDispatch()
  const allStands = useSelector(selectStands)
  const FilteredStands = useSelector(selectFilteredStands)
  // const { dispath } = useContext(FilterDispath);

  return (
    <div className="filter_container_2">
      <nav>
        <div className="filter_btnBox_2">

          <Link to="" className="link">
            <button
              onClick={() => console.log("first")}
              className="filter_btn">
              Edit Stand
            </button>
          </Link>

          <Link to="productsadmin" className="link">
            <button
              onClick={() => console.log("first")}
              className="filter_btn"
            >
              Manage Products
            </button>
          </Link>

          <Link to="categoriesadmin" className="link">
            <button
              onClick={() => console.log("first")}
              className="filter_btn"
            >
              Manage Categories
            </button>
          </Link>

          <Link to="ordersadmin" className="link">
            <button
              onClick={() => console.log("first")}
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
