import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteStandAsync } from '../../../Slices/standsSlice'
import { selectToken } from '../../../Slices/loginSlice'

import '../../../StyleSheets/AdminStands.css'
import { MDBBtn, } from 'mdb-react-ui-kit';

// This component is the card that contains a product from a stand - for the stand owner uses.
export default function WebAdminStandsCard(props) {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)

  return (
    <div >
      <div key={props._id} className="box" >

        <img className="product_img" src={`http://127.0.0.1:8000${props.image}`} alt="product" />
        <div className="content">

          <div className="standTitle">
            <span><b>{props.standName}</b></span>
          </div>

          <div className="info">
            <b>Description:</b><span> {props.desc}</span>
          </div>

          <div className="info">
            <b> Phone:</b><span> {props.phone}₪</span>
          </div>

          <div className="info">
            <b>  Area:</b><span> {props.area_id.areaName}</span>
          </div>

          <div className="info">
            <b>  Address:</b><span> {props.address}</span>
          </div>

          <div className="info">
            <b>  Created On:</b><span> {props.createdTime.substring(0, 10)}</span>
          </div>

        </div>
      </div>

      <MDBBtn style={{ width: "290px", borderRadius: "20px", border: "2px solid", borderColor: "white" }}
        onClick={() => dispatch(deleteStandAsync({ token: token, id: props._id }))}>
        Delete Stand</MDBBtn>
    </div>
  );
}
