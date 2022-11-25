import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { selectToken, selectUser_id } from '../../Slices/loginSlice'

// This component is the navigation bar of the user information component.
export default function UserMenufilter() {

  return (
    <div className="filter_container_2">
      <nav>
        <div className="filter_btnBox_2">

          <Link to="" className="link">
            <button
              className="filter_btn">
              Personal Information
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
