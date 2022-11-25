import React from "react";
import { useSelector } from 'react-redux';

import { selectOrders } from '../../../Slices/ordersSlice'
import WebAdminOrderProducts from "./WebAdminOrderProducts";

import {
  MDBCard, MDBCardBody, MDBCardFooter,
  MDBCardHeader, MDBCol, MDBContainer,
  MDBRow, MDBTypography
} from "mdb-react-ui-kit";


// This component is the stand admin orders page - it contain all the orders from the stand:
export default function WebAdminOrders() {
  const orders = useSelector(selectOrders)

  return (
    <div>
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: "rgba(241,229,214,255)" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardBody className="p-4">

                  {orders.length < 1 ?
                    (<div>
                      <MDBCardHeader className="px-4 py-5" style={{ backgroundColor: "rgba(245,226,191,255)" }}> </MDBCardHeader>
                      <MDBCardBody>
                        <h5 >Here We Go!</h5> <hr />
                      </MDBCardBody>
                    </div>)
                    :
                    (orders.map((order) => <div>
                      <MDBCardHeader className="px-4" style={{ backgroundColor: "rgba(245,226,191,255)" }}>
                        <MDBTypography tag="h5" className="text-muted mb-0 mt-3">

                          <MDBRow>
                            <MDBCol
                              md="4">
                              <p>From: <b>{order.stand_id.standName}</b></p>
                              <p>Ordered By: &nbsp; <b>{order.profile.fullName}</b><br /></p>
                            </MDBCol>

                            <MDBCol
                              md="4">
                              <p>Order Date: &nbsp; <b>{order.createdTime.substring(0, 10)} at {order.createdTime.substring(11, 16)}</b></p>
                              <p>Total Price: &nbsp; <b>{order.totalPrice}</b></p>
                            </MDBCol>

                            <MDBCol
                              md="3"><br />
                              <WebAdminOrderProducts key={order._id} {...order} />
                            </MDBCol>
                          </MDBRow>
                        </MDBTypography>
                      </MDBCardHeader>

                      <MDBCard className=" border mb-3">
                        <MDBCardBody>

                          <MDBRow style={{ fontSize: "20px", textDecoration: "underline" }}>
                            <MDBCol
                              md="12"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p>Seller Information:</p>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow style={{ fontSize: "16px" }}>
                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Stand Name:</b>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Phone:</b>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Address:</b>
                            </MDBCol>


                          </MDBRow>

                          <MDBRow style={{ fontSize: "20px" }}>

                            <MDBCol
                              md="4"
                              className="text-left d-flex justify-content-left align-items-left">
                              <p className="text-muted mb-1 small">{order.stand_id.standName}</p>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-left d-flex justify-content-left align-items-left">
                              <p className="text-muted mb-1 small">{order.stand_id.phone}</p>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-left d-flex justify-content-left align-items-left">
                              <p className="text-muted mb-1 small">{order.stand_id.address}</p>
                            </MDBCol>
                          </MDBRow>

                          <hr />

                          <MDBRow style={{ fontSize: "20px", textDecoration: "underline" }}>
                            <MDBCol
                              md="12"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p>Costumer Information:</p>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow style={{ fontSize: "16px" }}>
                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Name:</b>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Phone:</b>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Address:</b>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow style={{ fontSize: "20px" }}>

                            <MDBCol
                              md="4"
                              className="text-left d-flex justify-content-left align-items-left">
                              <p className="text-muted mb-1 small">{order.profile.fullName}</p>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-left d-flex justify-content-left align-items-left">
                              <p className="text-muted mb-1 small">{order.profile.phone}</p>
                            </MDBCol>

                            <MDBCol
                              md="4"
                              className="text-left d-flex justify-content-left align-items-left">
                              <p className="text-muted mb-1 small">{order.profile.address}</p>
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
    </div>
  );
}