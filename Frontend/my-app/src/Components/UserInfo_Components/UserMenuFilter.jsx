import React from "react";
import { Link } from "react-router-dom";

// This component is the navigation bar of the user information component.
export default function UserMenufilter() {

  return (
    <div className="filter_container_2">
      <nav>
        <div className="filter_btnBox_2">

          <Link to="" className="link">
            <button
              className="filter_btn">
              Personal Details
            </button>
          </Link>

          <Link to="userorders" className="link">
            <button
              // onClick={() => dispatch(getUserOrdersAsync({ token: token, user_id: user_id }))}
              className="filter_btn">
              Orders History
            </button>
          </Link>

        </div>
      </nav>
    </div>
  );
}
