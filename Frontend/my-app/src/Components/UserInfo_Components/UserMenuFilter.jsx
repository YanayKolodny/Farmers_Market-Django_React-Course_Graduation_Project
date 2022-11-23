import React, { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import "../../StyleSheets/AdminMenuFilter.css";
import { selectStands, selectFilteredStands, getStandsAsync, standsAreaFilter } from '../../Slices/standsSlice'

import { selectToken, selectUser_id, getProfileAsync } from '../../Slices/loginSlice'
import { getUserOrdersAsync } from '../../Slices/ordersSlice'

// This component is the navigation bar of the user information component.
export default function UserMenufilter() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const user_id = useSelector(selectUser_id)

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
