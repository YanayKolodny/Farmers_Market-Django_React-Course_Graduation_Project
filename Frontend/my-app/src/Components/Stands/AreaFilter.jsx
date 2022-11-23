import React, { useContext } from "react";
import { useDispatch } from 'react-redux';
import { standsAreaFilter } from '../../Slices/standsSlice'
import "../../StyleSheets/AreaFilter.css";

// In this Component the filter represent the different areas of stands to be presented.
// It serves as the nav bar in the StandsComponent.
export default function AreaFilter() {
  const dispatch = useDispatch()

  // The GUI contains buttons that sends the requested area_id of the button's title to the 
  // standsAreaFilter method to update the FilteredStands state on the standsSlice.
  // It then updtes the GUI of the stands that are presented on the StandsComponent.
  return (
    <div className="filter_container_2">
      <div className="filter_btnBox_2">
        <button onClick={() => dispatch(standsAreaFilter(0))}
          className="filter_btn_area">
          All Stands
        </button>
        <button
          onClick={() => dispatch(standsAreaFilter(1))}
          className="filter_btn_area"
        >
          North Stands
        </button>
        <button
          onClick={() => dispatch(standsAreaFilter(2))}
          className="filter_btn_area"
        >
          Center Stands
        </button>
        <button
          onClick={() => dispatch(standsAreaFilter(3))}
          className="filter_btn_area"
        >
          South Stands
        </button>
      </div>
    </div>
  );
}
