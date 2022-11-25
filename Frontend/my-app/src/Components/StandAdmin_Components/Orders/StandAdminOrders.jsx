import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import StandAdminOrderProducts from "./StandAdminOrderProducts";

import { getStandOrdersAsync, selectStandOrders } from '../../../Slices/ordersSlice'
import { selectToken } from '../../../Slices/loginSlice'
import { selectAdminStand } from '../../../Slices/standsSlice'

import {
  MDBCard, MDBCardBody, MDBCardFooter,
  MDBCardHeader, MDBCol, MDBContainer,
  MDBRow, MDBTypography
} from "mdb-react-ui-kit";


// This component is the stand admin orders page - it contain all the orders from the stand:
export default function StandAdminOrders() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const standOrders = useSelector(selectStandOrders)
  const admin_stand = useSelector(selectAdminStand)
  const stand_id = admin_stand._id

  useEffect(() => {
    dispatch(getStandOrdersAsync({ token: token, stand_id: stand_id }))
  }, [standOrders.length])

  return (
    <>
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: "rgba(241,229,214,255)" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardBody className="p-4">

                  {standOrders.length < 1 ?
                    (<div>
                      <MDBCardHeader className="px-4 py-5" style={{ backgroundColor: "rgba(245,226,191,255)" }}> </MDBCardHeader>
                      <MDBCardBody>
                        <h5 >There's no orders yet, but were sure it just the calm before the storm.<br /><br />
                          Meanwhile, we have a quote for you:
                          <br /><br />
                          “Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.” – Rumi
                        </h5>
                        <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        />
                      </MDBCardBody>
                    </div>)
                    :
                    (standOrders.map((order) => <div>
                      <MDBCardHeader className="px-4 py-2" style={{ backgroundColor: "rgba(245,226,191,255)" }}>
                        <MDBTypography tag="h5" className="text-muted mb-0">
                          Order From: &nbsp;{order.profile.fullName}
                        </MDBTypography>
                      </MDBCardHeader>

                      <MDBCard className=" border mb-3">
                        <MDBCardBody>

                          <MDBRow style={{ fontSize: "16px" }}>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Order Date:</b>
                            </MDBCol>

                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Address:</b>
                            </MDBCol>

                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Phone:</b>
                            </MDBCol>

                            <MDBCol
                              md="3"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Total Price:</b>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow style={{ fontSize: "20px" }}>
                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p className="text-muted mb-1 small">{order.createdTime.substring(0, 10)} at {order.createdTime.substring(11, 16)}</p>
                            </MDBCol>

                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p className="text-muted mb-1 small">{order.profile.address}</p>
                            </MDBCol>

                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p className="text-muted mb-1 small">{order.profile.phone}</p>
                            </MDBCol>

                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p className="text-muted mb-1 small">{order.totalPrice}</p>
                            </MDBCol>

                            <MDBCol
                              md="3"
                              className="text-center d-flex justify-content-center align-items-center" >
                              <div className="mb-1 small" ><StandAdminOrderProducts key={order._id} {...order} /></div>
                            </MDBCol>

                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </div>))}
                </MDBCardBody>

                <MDBCardFooter
                  className="border-0 px-4 py-5"
                  style={{
                    backgroundColor: "rgba(245,226,191,255)",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}