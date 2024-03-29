import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { URL } from "../../API/server_urls";

import CartCounter from "../Header/CartCounter";
import { selectStandCartProds, delFromCart, updProdInCart } from "../../Slices/standCartSlice";

import { selectUser_id } from "../../Slices/loginSlice";
import {
  MDBBtn, MDBCol, MDBModal,
  MDBModalBody, MDBModalContent, MDBModalDialog,
  MDBRow, MDBCard, MDBCardBody
} from "mdb-react-ui-kit";
import { BsTrash } from "react-icons/bs";

// This component shows the cart and is presented in a modal form.
export default function ModalCart() {
  const dispatch = useDispatch();
  const [basicModal, setBasicModal] = useState(false);
  const standCartProds = useSelector(selectStandCartProds)
  const user_id = useSelector(selectUser_id);
  const toggleShow = () => setBasicModal(!basicModal);

  const sumTotalCartPrice = () => {
    let totalPrice = 0
    standCartProds.forEach(prod => {
      let prodTotal = parseInt(prod.price) * prod.amount
      totalPrice += prodTotal
    })
    return totalPrice
  }

  return (
    <>
      <MDBRow className="justify-content-center align-items-center h-100 text-center">
        <MDBCol>
          {/* The modal is presented as a button, by clicking it the cart view is being shown */}
          <button className="invisible-button" onClick={toggleShow}>
            <CartCounter />
          </button>

          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog class="modal-dialog modal-dialog-scrollable modal-xl">
              <MDBModalContent>
                <MDBModalBody className="text-start text-black p-4">

                  <div className="">
                    {standCartProds.length > 0 &&
                      (standCartProds.map((prod) => (
                        <div>
                          <div className="ProductsDetails">
                            <div>
                              <MDBCard className="border mb-3">
                                <MDBCardBody>
                                  <MDBRow style={{ fontSize: "18px" }}>
                                    <div class="col-md-2">
                                      &emsp;{" "}
                                      <img
                                        src={`${URL}${prod.image}`}
                                        class="img-fluid width-10px"
                                        alt="Phone"
                                        style={{ maxWidth: "50px" }}
                                      />
                                    </div>
                                    <MDBCol
                                      md="2"
                                      className="text-center d-flex justify-content-left align-items-center"
                                    >
                                      <b>{`${prod.prodName}`}</b>

                                    </MDBCol>

                                    <MDBCol
                                      md="2"
                                      className="text-center d-flex justify-content-left align-items-center"
                                    >
                                      <b>price:&nbsp; {`${prod.price}`} ₪</b>
                                    </MDBCol>

                                    <MDBCol
                                      md="2"
                                      className="text-center d-flex justify-content-left align-items-center"
                                    >
                                      <b>Amount:
                                        &nbsp;<input
                                          type="number"
                                          defaultValue={prod.amount}
                                          className="ProductAmountInput"
                                          onChange={(e) =>
                                            dispatch(
                                              updProdInCart({
                                                prod_id: prod.id,
                                                newAmount: parseInt(e.target.value),
                                                stand_id: prod.stand_id._id,
                                                user_id: user_id,
                                              })
                                            )
                                          }
                                        ></input></b>
                                    </MDBCol>

                                    <MDBCol
                                      md="2"
                                      className="text-center d-flex justify-content-left align-items-center"
                                    >
                                      <b>Total:&nbsp; {`${prod.price * prod.amount}`} ₪</b>
                                    </MDBCol>

                                    <MDBCol md="2"
                                      className="text-center d-flex justify-content-left align-items-center">
                                      <MDBBtn
                                        onClick={() =>
                                          dispatch(
                                            delFromCart({
                                              user_id: user_id,
                                              stand_id: prod.stand_id._id,
                                              prod_id: prod.id,
                                            })
                                          )
                                        }
                                        className="TrashButton">
                                        <BsTrash />
                                      </MDBBtn>
                                    </MDBCol>
                                  </MDBRow>

                                </MDBCardBody>
                              </MDBCard>
                            </div>
                          </div>
                        </div>)
                      ))}
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
                    <p className="fw-bold">Total</p>
                    <p className="fw-bold" style={{ color: "#35558a" }}>
                      {sumTotalCartPrice()} ₪
                    </p>
                  </div>
                  {standCartProds.length > 0 &&
                    <Link
                      to={`/checkoutpage/${standCartProds[0].stand_id._id}`}>
                      <MDBBtn
                        style={{ backgroundColor: "rgb(116,108,92)" }}>
                        CheckOut
                      </MDBBtn>
                    </Link>}

                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </MDBCol>
      </MDBRow>
    </>
  );
}
