import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectToken } from '../../../Slices/loginSlice'
import { getOrderProductsAsync, selectOrderProducts } from '../../../Slices/ordersSlice'
import { URL } from '../../../API/server_urls'

import {
  MDBCol, MDBRow, MDBTypography,
  MDBCard, MDBModal, MDBModalBody,
  MDBModalContent, MDBModalDialog, MDBCardBody,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";

// This component is the a modal that shows the products of an order that was made from the stand by different users.
export default function StandAdminOrderProducts(props) {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const orderProducts = useSelector(selectOrderProducts)

  // Modal objects:
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  // A function to reveal the order products modal and update its products:
  const toggleShowAndAddOrderProducts = (cred) => {
    toggleShow()
    dispatch(getOrderProductsAsync(cred))
  }

  return (
    <>
      <section >
        <MDBRow className="justify-content-center align-items-center h-100 text-center">
          <MDBCol>

            <Button className="goToOrderProds_button"
              onClick={() => toggleShowAndAddOrderProducts({ token: token, order_id: props._id })}>
              Order Details
            </Button>

            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
              <MDBModalDialog class="modal-dialog modal-dialog-scrollable modal-xl">
                <MDBModalContent>

                  <MDBModalBody className="text-start text-black p-4">

                    <MDBTypography
                      tag="h4"
                      className="mb-5"
                      style={{ color: "#35558a" }}
                    >
                      <span style={{ fontStyle: "oblique" }}>Order no. {props._id}</span><br />
                      From: {props.profile.fullName}
                    </MDBTypography>
                    <div className="">
                      {orderProducts.map((prod) => <div>
                        <div className="ProductsDetails" >
                          <div >
                            <MDBCard className="border mb-3" >
                              <MDBCardBody >

                                <MDBRow style={{ fontSize: "18px" }}>
                                  <div class="col-md-1">
                                    <img src={`${URL}${prod.prod_id.image}`}
                                      class="img-fluid width-10px" alt="Phone" style={{ maxWidth: "50px" }} />
                                  </div>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-left align-items-center">
                                    <b>{`${prod.prod_id.prodName}`}</b>
                                  </MDBCol>

                                  <MDBCol
                                    md="3"
                                    className="text-center d-flex justify-content-left align-items-center">
                                    <b>price:&nbsp; {prod.prod_id.price} ₪</b>
                                  </MDBCol>

                                  <MDBCol
                                    md="3"
                                    className="text-center d-flex justify-content-left align-items-center">
                                    <b>Amount:&nbsp; {prod.amount}</b>
                                  </MDBCol>

                                  <MDBCol
                                    md="3"
                                    className="text-center d-flex justify-content-left align-items-center">
                                    <b>Total:&nbsp; {prod.totalProdPrice} ₪</b>
                                  </MDBCol>
                                </MDBRow>

                              </MDBCardBody>
                            </MDBCard></div>
                        </div>
                      </div>)}
                    </div>

                    <p className="mb-0" style={{ color: "#35558a" }}>
                      Payment summary
                    </p>
                    <hr
                      className="mt-2 mb-4"
                      style={{
                        height: "0",
                        backgroundColor: "transparent",
                        opacity: ".75",
                        borderTop: "2px dashed #9e9e9e",
                      }}
                    />

                    <div className="d-flex justify-content-between">
                      <p className="fw-bold mb-0">Order Price:</p>
                      <p className="text-muted mb-0">{props.totalPrice - 20}₪</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="small mb-0">Shipping</p>
                      <p className="small mb-0">20.00₪</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="fw-bold">Total</p>
                      <p className="fw-bold" style={{ color: "#35558a" }}>
                        {props.totalPrice}₪
                      </p>
                    </div>
                  </MDBModalBody>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </MDBCol>
        </MDBRow>
      </section>
    </>
  );
}