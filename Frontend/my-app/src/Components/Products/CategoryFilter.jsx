import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCats } from '../../Slices/categoriesSlice'
import { productsCategoryFilter } from '../../Slices/productsSlice'

// In this Component the filter represent the different products categories navBar
export default function CategoryFilter(props) {
  const dispatch = useDispatch()
  const allCats = useSelector(selectCats)
  const standCats = allCats.filter((cat) => cat.stand_id == props.stand_id["stand_id"])

  return (
    <div className="filter_container_2">
      {standCats.length > 1 &&
        <div className="filter_btnBox_2">
          <button onClick={() => dispatch(productsCategoryFilter(0))}
            className="filter_btn_area">
            All products
          </button>
          {standCats.map((cat) =>
            <button
              onClick={() => dispatch(productsCategoryFilter(cat._id))}
              className="filter_btn_area"
            >
              {cat.categoryName}
            </button>)}
        </div>}
    </div>
  );
}
