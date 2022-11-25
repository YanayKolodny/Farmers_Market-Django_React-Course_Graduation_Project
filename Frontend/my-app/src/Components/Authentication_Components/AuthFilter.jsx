import React from "react";
import { Link } from "react-router-dom";

// This component is the navigation bar between the login and registrations components
export default function AuthFilter() {
  return (
    <div className="filter_container_2">
      <div className="filter_btnBox_2">

        <Link to={"/auth"} className="link">
          <button                               // the button uses as link to navigate to the registration component
            className="filter_btn_area">
            Register
          </button>
        </Link>

        <Link to={"/auth/login"} className="link">
          <button                               // the button uses as link to navigate to the login component
            className="filter_btn_area">
            Login
          </button>
        </Link>

      </div>
    </div>
  );
}
