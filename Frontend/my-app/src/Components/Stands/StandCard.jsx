import React from "react";
import { useDispatch } from 'react-redux';
import { BsShopWindow } from "react-icons/bs";
import { NavLink } from "react-router-dom";

import { StandProductsProvider } from '../../Slices/productsSlice'
import { updStandCart } from '../../Slices/standCartSlice'
import { URL } from '../../API/server_urls'
// This component uses as the card to present a stand by receiving its data as props.
// The StandComponent module sends the stands data here in order to present them. 
export default function StandCard(props) {
  const dispatch = useDispatch()

  const updateStandProductsAndCart = () => {
    dispatch(StandProductsProvider(props._id))
    dispatch(updStandCart(props._id))
  }
  console.log("${URL}${props.image}", `${URL}${props.image}`)

  return (
    <div key={props._id} className="standBox" >

      <img
        style={{ height: "210px" }}
        className="stand_img"
        src={`${URL}${props.image}`} alt="Stand"
      />

      {/* Presenting the title and price: */}
      <div className="standContent">
        <div className="standTitle">
          <b><span>{props.standName}</span></b>
        </div>
        <div>
          <span>{props.desc}</span>
        </div>
      </div>

      {/* The "Go To Stand" button has two uses:
      1. Navigate to the stands products component.
      2. Sending the stand's id to the products slice via the StandProductsProvider method in order to update
         the FilteredStandProducts state which use to present the stand's products. */}

      <NavLink to={`/shoppingprods/${props._id}`} className="link" style={{ width: "100%" }}>
        <div className="btnBox">
          <button
            onClick={() => updateStandProductsAndCart()}
            className="goToStand_button buy_button">
            Go To Stand
            <BsShopWindow className="stand_icon" style={{ fontSize: "22px" }} />
          </button>
        </div>
      </NavLink>

    </div >
  );
}
