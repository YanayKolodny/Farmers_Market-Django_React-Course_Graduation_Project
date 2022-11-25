import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { getUserOrdersAsync, selectUserOrders } from '../../../Slices/ordersSlice'
import { selectToken, selectUser_id } from '../../../Slices/loginSlice'

import {
  MDBCard, MDBCardBody, MDBCardFooter,
  MDBCardHeader, MDBCol, MDBTypography,
  MDBContainer, MDBRow

} from "mdb-react-ui-kit";
import UserOrderProducts from "./UserOrderProducts";

// This component is the user's orders page - it contain all the orders he/she has made:
export default function UserOrdersPage() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const user_id = useSelector(selectUser_id)
  const userOrders = useSelector(selectUserOrders)


  useEffect(() => {
    dispatch(getUserOrdersAsync({ token: token, user_id: user_id }))
  }, [userOrders.length])

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

                  {userOrders.length < 1 ?
                    (<div>
                      <MDBCardHeader className="px-4 py-5" style={{ backgroundColor: "rgba(245,226,191,255)" }}> </MDBCardHeader>

                      <MDBCardBody>
                        <h5 >You have'nt ordered anything yet, so how about a quote for now:<br />
                          <br />
                          “Life without love is like a tree without blossoms or fruit.” – Kahlil Gibran
                        </h5>
                        <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        />
                      </MDBCardBody>
                    </div>)
                    :
                    (userOrders.map((order) => <div>
                      <MDBCardHeader className="px-4 py-5" style={{ backgroundColor: "rgba(245,226,191,255)" }}>
                        <MDBTypography tag="h5" className="text-muted mb-0">
                          Order From: &nbsp;{order.stand_id.standName}:
                        </MDBTypography>
                      </MDBCardHeader>
                      <MDBCard className=" border mb-3">
                        <MDBCardBody>

                          <MDBRow style={{ fontSize: "20px" }}>
                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Order Date:</b>
                            </MDBCol>

                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <b>Total Price:&nbsp;</b>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow style={{ fontSize: "25px" }}>
                            <MDBCol
                              md="4"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p className="text-muted mb-1">{order.createdTime.substring(0, 10)}  at  {order.createdTime.substring(11, 16)}</p>
                            </MDBCol>

                            <MDBCol
                              md="2"
                              className="text-center d-flex justify-content-left align-items-center">
                              <p className="text-muted mb-1 small">{order.totalPrice}</p>
                            </MDBCol>

                            <MDBCol
                              md="5"
                              className="text-center d-flex justify-content-center align-items-center" >
                              <div className="mb-1 small" ><UserOrderProducts key={order._id} {...order} /></div>
                            </MDBCol>

                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard></div>))
                  }
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