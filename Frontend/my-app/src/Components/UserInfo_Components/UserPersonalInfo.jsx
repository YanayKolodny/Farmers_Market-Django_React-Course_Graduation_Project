import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { getProfileAsync, updateProfileAsync, selectUser_id, selectfullName, selectphone, selectaddress, selectarea_id } from '../../Slices/loginSlice'

import {
  MDBBtn, MDBInput, MDBCol, MDBCard,
} from 'mdb-react-ui-kit';   // Package that provide designs for this component



// This component uses the logged user to update his profile
const UserPersonalInfo = () => {
  const dispatch = useDispatch();
  const user_id = useSelector(selectUser_id)

  const [fullName, setFullName] = useState(useSelector(selectfullName))
  const [phone, setPhone] = useState(useSelector(selectphone))
  const [address, setAddress] = useState(useSelector(selectaddress))
  const [area_id, setArea_id] = useState(useSelector(selectarea_id))

  const setAreaName = () => {
    area_id == 1 && setArea_id("north")
    area_id == 2 && setArea_id("center")
    area_id == 3 && setArea_id("south")
  }
  setAreaName()

  return (

    <div>
      <MDBCard className=' bg-glass' style={{ backgroundColor: "rgba(241,229,214,0.7)", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <MDBCol md='6' className='p-5 '>

          <MDBInput wrapperClass='mb-4' label='Full Name' placeholder={fullName} id='form1' onChange={e => setFullName(e.target.value)} />

          <MDBInput wrapperClass='mb-4' label='phone' placeholder={phone} id='form3' onChange={e => setPhone(e.target.value)} />

          <MDBInput wrapperClass='mb-4' label='address' placeholder={address} id='form3' onChange={e => setAddress(e.target.value)} />

          <select id="area" name="areaslist"
            style={{ display: "flex", justifyContent: "center" }}
            onChange={e => setArea_id(e.target.value)} >
            <option value='' disabled selected hidden>{area_id}</option>
            <option value="1">North</option>
            <option value="2">Center</option>
            <option value="3">South</option>
          </select><br />

          {/* The button to execute the login action using the loginUserAsync method */}
          <MDBBtn
            className='w-100 mb-4'
            size='md'
            style={{ backgroundColor: "rgb(116,108,92)" }}
            onClick={() => dispatch(updateProfileAsync(
              {
                user_id: user_id,
                update_data: {
                  fullName: fullName,
                  phone: phone,
                  address: address,
                  area_id: area_id
                }
              }
            ))}>Update Profile</MDBBtn>

        </MDBCol>
      </MDBCard>
    </div>

  )
}

export default UserPersonalInfo