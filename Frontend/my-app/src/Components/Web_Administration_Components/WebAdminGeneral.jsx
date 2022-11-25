import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';


import { selectStands } from '../../Slices/standsSlice'
import { selectProds } from '../../Slices/productsSlice'
import { selectCats } from '../../Slices/categoriesSlice'
import { selectOrders } from '../../Slices/ordersSlice'

import {
  MDBCard, MDBCardBody, MDBCardFooter,
  MDBCardHeader, MDBCol, MDBRow,
  MDBContainer, MDBTypography,
} from "mdb-react-ui-kit";


// This component is the stand admin orders page - it contain all the orders from the stand:
export default function WebAdminGeneral() {
  const stands = useSelector(selectStands)
  const prods = useSelector(selectProds)
  const cats = useSelector(selectCats)
  const orders = useSelector(selectOrders)

  const [totalPayment, setTotalPayment] = useState(0)

  useEffect(() => {
    let totalCalc = 0.0
    orders.forEach(order => { totalCalc += parseFloat(order.totalPrice) });
    setTotalPayment(parseFloat(totalCalc))
  }, [orders])

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

                  <div>
                    <MDBCardHeader className="px-4" style={{ backgroundColor: "rgba(245,226,191,255)" }}>
                      <MDBTypography tag="h5" className="text-muted mb-0 mt-3">

                        <h1>
                          <span className='h1_FarmerMarketOnline'>Farmer's Market
                            <span className='h1_Online '> Online </span></span>
                          <span> - Admin Panel</span>
                        </h1>

                      </MDBTypography>
                    </MDBCardHeader>

                    <MDBCard className=" border mb-3">
                      <MDBCardBody>

                        <MDBRow style={{ fontSize: "20px", textDecoration: "underline" }}>
                          <MDBCol
                            md="12"
                            className="text-center d-flex justify-content-left align-items-center">
                            <p>Stands Information:</p>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow style={{ fontSize: "16px" }}>
                          <MDBCol
                            md="3"
                            className="text-center d-flex justify-content-left align-items-center">
                            <b>Total Stands:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <b>North Stands:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <b>Center Stands:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <b>South Stands:</b>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow style={{ fontSize: "20px" }}>
                          <MDBCol
                            md="3"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">
                              {stands.length}
                            </p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">
                              {stands.filter((stand) => stand.area_id["areaName"] == 'north').length}
                            </p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">
                              {stands.filter((stand) => stand.area_id["areaName"] == 'center').length}
                            </p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">
                              {stands.filter((stand) => stand.area_id["areaName"] == 'south').length}
                            </p>
                          </MDBCol>
                        </MDBRow>

                        <hr />

                        <MDBRow style={{ fontSize: "20px", textDecoration: "underline" }}>
                          <MDBCol
                            md="12"
                            className="text-center d-flex justify-content-left align-items-center">
                            <p>Products Information:</p>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow style={{ fontSize: "16px" }}>
                          <MDBCol
                            md="3"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>Total Products:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>In Stock:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>Out of Stock:</b>
                          </MDBCol>


                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>Total Categories:</b>
                          </MDBCol>


                        </MDBRow>
                        <MDBRow style={{ fontSize: "20px" }}>

                          <MDBCol
                            md="3"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">{prods.length}</p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">{prods.filter((prod) => prod.inStock).length}</p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">{prods.filter((prod) => !prod.inStock).length}</p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small"> {cats.length}</p>
                          </MDBCol>

                        </MDBRow>

                        <hr />

                        <MDBRow style={{ fontSize: "20px", textDecoration: "underline" }}>
                          <MDBCol
                            md="12"
                            className="text-center d-flex justify-content-left align-items-center">
                            <p>Orders Information:</p>
                          </MDBCol>
                        </MDBRow>

                        <MDBRow style={{ fontSize: "16px" }}>
                          <MDBCol
                            md="3"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>Total Orders:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>Total Payments:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>North Orders:</b>
                          </MDBCol>


                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>Center Orders:</b>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-center">
                            <b>South Orders:</b>
                          </MDBCol>

                        </MDBRow>
                        <MDBRow style={{ fontSize: "20px" }}>

                          <MDBCol
                            md="3"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">{orders.length}</p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">{totalPayment}₪</p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small">{orders.filter(order => order.stand_id.area_id == 1).length}</p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small"> {orders.filter(order => order.stand_id.area_id == 2).length}</p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-left d-flex justify-content-left align-items-left">
                            <p className="text-muted mb-1 small"> {orders.filter(order => order.stand_id.area_id == 3).length}</p>
                          </MDBCol>

                        </MDBRow>

                      </MDBCardBody>
                    </MDBCard>
                  </div>
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