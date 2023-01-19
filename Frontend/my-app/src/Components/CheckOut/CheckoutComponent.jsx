import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, Link } from "react-router-dom";
import { URL } from "../../API/server_urls";

import {
  MDBBtn, MDBCard, MDBCardBody,
  MDBCardImage, MDBCol, MDBContainer,
  MDBIcon, MDBInput, MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { BsTrash } from "react-icons/bs";
import { FaCcPaypal, FaCcMastercard, FaCcVisa } from "react-icons/fa"

import { selectToken, selectUser_id, selectLogged } from '../../Slices/loginSlice'
import { selectStandCartProds, delFromCart, updProdInCart, emptyCart } from '../../Slices/standCartSlice'
import { setSellingStandData, selectStandCart } from '../../Slices/standsSlice'
import { createOrderAsync } from '../../Slices/ordersSlice'


// This component is the checkout page - from here the user can update the cart and execute the checkout process
export default function CheckoutComponent() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const user_id = useSelector(selectUser_id)
  const logged = useSelector(selectLogged)
  const cartProds = useSelector(selectStandCartProds)   // The products in the cart.
  const standCart = useSelector(selectStandCart)        // The stand from which the purches is being made.
  const params = useParams()
  const stand_id = params.stand_id                      // The id of the stand from which the purches is being made.

  useEffect(() => {
    dispatch(setSellingStandData(stand_id))
  }, [])

  const sumTotalCartPrice = () => {
    let totalPrice = 0
    cartProds.forEach(prod => {
      let prodTotal = parseInt(prod.price) * prod.amount
      totalPrice += prodTotal
    })
    return totalPrice
  }

  const checkOutAndUpdates = () => {
    dispatch(createOrderAsync({ stand_id: stand_id, order: cartProds, token, user_id }))
    dispatch(emptyCart())
  }

  return (
    <section className=" h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-4" >
        <MDBRow className="justify-content-center align-items-center ">
          <MDBCol >
            <MDBCard>
              <MDBCardBody >
                <MDBRow >
                  <MDBCol lg="7">

                    <MDBTypography tag="h5">
                      Your order from <b>{standCart.standName}:</b>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-0">{`There's ${cartProds.length} items in your cart:`}</p>
                      </div>

                    </div>

                    {cartProds.map(prod =>
                      <MDBCard className="mb-3" style={{ width: "520px" }}>
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">

                              <div>
                                <MDBCardImage
                                  src={`${URL}${prod.image}`}
                                  fluid className="rounded-3" style={{ width: "65px" }}
                                  alt="Shopping item" />
                              </div>

                              <div className="ms-3" style={{ width: "150px", textAlign: "left" }}>
                                <MDBTypography tag="h5">
                                  {prod.prodName}
                                </MDBTypography>
                                <p className="small mb-0">{prod.desc}</p>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "105px", textAlign: "left" }}>

                                {/* Product's Amount */}
                                <MDBTypography tag="h5" className="fw-normal mb-0">
                                  <input type="number" defaultValue={prod.amount} className="ProductAmountInput"
                                    onChange={(e) => dispatch(updProdInCart({
                                      prod_id: prod.id,
                                      newAmount: parseInt(e.target.value),
                                      stand_id: stand_id,
                                      user_id: user_id
                                    }))}></input>
                                </MDBTypography>
                              </div>

                              {/* Product's Price */}
                              <div style={{ width: "100px", textAlign: 'left' }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  {prod.price}{" "}₪
                                </MDBTypography>
                              </div>

                              {/* Trash Button - erase from cart */}
                              <button
                                onClick={() => dispatch(delFromCart({ user_id: user_id, stand_id: stand_id, prod_id: prod.id }))}
                                className="TrashButton">
                                <BsTrash />
                              </button>

                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>)}

                    {/* Link to continue shopping - going back to the stand  !!NOT DONE!!*/}
                    <MDBTypography tag="h5">
                      <NavLink to={`/shoppingprods/${stand_id}`} className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" />
                        Continue Shopping
                      </NavLink>
                    </MDBTypography>
                  </MDBCol>

                  <MDBCol lg="5" >
                    <MDBCard className=" text-black " >
                      <MDBCardBody style={{ backgroundColor: "rgba(245, 226, 191)" }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5">
                            Card details
                          </MDBTypography>
                        </div>

                        <div className="cardDetailsContainer" >
                          <p style={{ marginTop: "-1.5rem", marginBottom: "0.5rem", fontStyle: "italic" }}>* There's no need for read details to complete the purchase proccess.</p>
                          <div >
                            <p >Card type:</p>
                            <a href="#!">
                              <MDBBtn
                                className="CardTypeBtns"
                                style={{ backgroundColor: "rgba(245, 226, 191)", borderColor: "transparent" }}>
                                <FaCcMastercard />
                              </MDBBtn>
                            </a>
                            <a href="#!">
                              <MDBBtn
                                className="CardTypeBtns"
                                style={{ backgroundColor: "rgba(245, 226, 191)", borderColor: "transparent" }}>
                                <FaCcVisa />
                              </MDBBtn>
                            </a>
                            <a href="#!">
                              <MDBBtn
                                className="CardTypeBtns"
                                style={{ backgroundColor: "rgba(245, 226, 191)", borderColor: "transparent" }}>
                                <FaCcPaypal />
                              </MDBBtn>
                            </a>
                          </div>

                          <form className="mt-1">
                            <div className="CardInputContainer">
                              <p>Cardholder's Name:</p>
                              <MDBInput className="mb-3" type="text" size="lg"
                                placeholder="Cardholder's Name" contrast />
                            </div>

                            <div className="CardInputContainer">
                              <p>Card Number:</p>
                              <MDBInput className="mb-3" type="text" size="lg"
                                minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />
                            </div>


                            <MDBRow className="mb-4">
                              <MDBCol md="6">
                                <div className="CardInputContainer">
                                  <p>Expiration</p>
                                  <MDBInput className="mb-2" type="text" size="lg"
                                    minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                                </div>
                              </MDBCol>
                              <MDBCol md="6">

                                <div className="CardInputContainer">
                                  <p>Cvv</p>
                                  <MDBInput className="mb-2" type="text" size="lg" minLength="3"
                                    maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                                </div>
                              </MDBCol>
                            </MDBRow>
                          </form>

                          <hr />

                          <div className="d-flex justify-content-between">
                            <p className="mb-1">Subtotal</p>
                            <p className="mb-1">{`${sumTotalCartPrice()} ₪`}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-1">Shipping</p>
                            <p className="mb-1">20.00 ₪</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">{`${sumTotalCartPrice() + 20} ₪`}</p>
                          </div>

                          {logged ? (
                            <NavLink to={'/checkoutcomplete'}>
                              <MDBBtn
                                block size="lg"
                                style={{ backgroundColor: "#39739d" }}
                                onClick={() => checkOutAndUpdates()}>
                                Checkout
                              </MDBBtn>
                            </NavLink>)
                            :
                            <Link to="/auth">
                              <MDBBtn color="info" block size="lg">
                                Register/Login to complete the order
                              </MDBBtn>
                            </Link>}
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
