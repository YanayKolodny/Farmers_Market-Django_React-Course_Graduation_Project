import React from "react";
import { Link } from "react-router-dom";
import "../../StyleSheets/AuthFilter.css";

// This component is the navigation bar between the login and registrations components
export default function AuthFilter() {
  return (
    <div className="filter_container_2">
      <div className="filter_btnBox_2">

        <Link to={"/auth"} className="link">
          <button                               // the button uses as link to navigate to the registration component
            onClick={() => console.log("Works")}
            className="filter_btn_area">
            Register
          </button>
        </Link>

        <Link to={"/auth/login"} className="link">
          <button                               // the button uses as link to navigate to the login component
            onClick={() => console.log("Works")} className="filter_btn_area">
            Login
          </button>
        </Link>

      </div>
    </div>
  );
}
