import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { selectToken } from '../../Slices/loginSlice'
import { selectAdminStand, updateStandAsync } from '../../Slices/standsSlice'

import {
  MDBBtn, MDBInput, MDBCol, MDBCard,
} from 'mdb-react-ui-kit';   // Package that provide designs for this component



// This component uses the logged user to update his profile
const StandInfo = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken)
  const adminStand = useSelector(selectAdminStand)

  const [standName, setStandName] = useState(adminStand.standName)
  const [desc, setDesc] = useState(adminStand.desc)
  const [phone, setPhone] = useState(adminStand.phone)
  const [address, setAddress] = useState(adminStand.address)
  const [area_id, setArea_id] = useState(adminStand.area_id._id)
  const [areaName, setAreaName] = useState(adminStand.area_id.areaName)



  return (

    <div >
      <MDBCard className='my-5 bg-glass' style={{ backgroundColor: "rgba(135, 206, 250, 0.5)", alignItems: "center" }}>
        <MDBCol md='6' className='p-5 '>
          <MDBInput wrapperClass='mb-4' label='Full Name' placeholder={standName} id='form1' onChange={e => setStandName(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Full Name' placeholder={desc} id='form1' onChange={e => setDesc(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='phone' placeholder={phone} id='form3' onChange={e => setPhone(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='address' placeholder={address} id='form3' onChange={e => setAddress(e.target.value)} />

          <div>
            <select id="area" name="areaslist"
              style={{ display: "flex", justifyContent: "center" }}
              onChange={e => setArea_id(e.target.value)} >
              <option value='' disabled selected hidden>{areaName}</option>
              <option value="1">North</option>
              <option value="2">Center</option>
              <option value="3">South</option>
            </select>
            area
          </div>
          <br />

          {/* The button to execute the login action using the loginUserAsync method */}
          <MDBBtn className='w-100 mb-4' size='md'
            onClick={() => dispatch(updateStandAsync(
              {
                stand_id: adminStand._id,
                token: token,
                update_data: {
                  standName: standName,
                  desc: desc,
                  phone: phone,
                  address: address,
                  area_id: area_id
                }
              }
            ))}>Update Stand</MDBBtn>

        </MDBCol>
      </MDBCard>
    </div>

  )
}

export default StandInfo