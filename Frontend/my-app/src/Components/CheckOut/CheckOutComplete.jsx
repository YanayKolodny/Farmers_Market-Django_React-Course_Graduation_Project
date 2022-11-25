import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { selectLastOrderDetails } from '../../Slices/ordersSlice'


const CheckOutComplete = () => {
  const orderDetails = useSelector(selectLastOrderDetails)

  return (

    <div id='checkoutSuccessContainer' >
      {orderDetails && (
        <div id='card'>
          <div id='upper-side'>
            <svg version="1.1" id="checkmark"  >
              <path d="M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65
	c-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382
	c0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209
	c0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091
	c0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027
	c0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865
	C131.967,94.755,132.296,93.271,131.583,92.152z" />
              <circle fill="none" stroke="rgba(245,226,191,255)" stroke-width="5" cx="109.486" cy="104.353"
                r="32.53" />
            </svg>
            <h3 id='status'>
              Success
            </h3>
          </div>
          <div id='lower-side'>
            <p id='message'>
              Congratulations, your Order from <b>{orderDetails.standName}</b> has been successfully created.
            </p>
            <p>
              <b>Order Number: {orderDetails.order_id}</b>
            </p>
            <p>
              <b>Creted Time: {orderDetails.createdTime.substring(0, 10)} at {orderDetails.createdTime.substring(11, 16)}</b>
            </p>
            <NavLink to={'/allstands'} id="contBtn">Continue Shopping</NavLink>
          </div>
          <div style={{
            position: "relative", textAlign: 'center', textShadow: "2px 2px 10px #868879"
          }}>
            <div>
              <h4> Thank You Very Much!<br /> We hope to see you again soon!</h4>
            </div>
            <div >
              <span className='h1_FarmerMarketOnline' style={{ textShadow: "0px 5px 5px #868879" }}>Farmer's Market
                <span className='h1_Online' style={{ textShadow: "0px 5px 5px  #868879" }}> Online </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckOutComplete