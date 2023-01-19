import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addStandAsync } from '../../Slices/standsSlice'
import { selectToken, selectUser_id, updUserStatusAsync } from '../../Slices/loginSlice'

import {
  MDBBtn, MDBInput, MDBCol, MDBCard,
} from 'mdb-react-ui-kit';

// This components is the registration page for openning a stand (shop).
// a user can open one stand only.
const StandRegistration = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const user_id = useSelector(selectUser_id)
  const [standName, setStandName] = useState("")
  const [desc, setDesc] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [area_id, setArea_id] = useState("")
  const [image, setImage] = useState(null);



  // Method to update the Stand's Name useState on change from it's input
  const handleStandName = (e) => {
    e.preventDefault();
    setStandName(e.target.value);
  };

  // Method to update the Stand's Description useState on change from it's input
  const handleDesc = (e) => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  // Method to update the Stand's phone number useState on change from it's input
  const handlePhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  // Method to update the Stand's Address useState on change from it's input
  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  // Method to update the Stand's image useState on change from it's input
  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  // a methood to arrange the inputs into a form and submit iy threw the addStandAsync method
  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();                   // Creating the new form and adding all the data into it 
    form_data.append("image", image, image.name);
    form_data.append("standName", standName);
    form_data.append("desc", desc);
    form_data.append("phone", phone);
    form_data.append("address", address);
    form_data.append("area_id", area_id);
    form_data.append("user_id", user_id);

    // Sending the form and token to the async method - from the standSlice module
    dispatch(addStandAsync({ token: token, form_data: form_data }))

    // Resetting all the useStates values
    setStandName("");
    setDesc("")
    setPhone("")
    setAddress("")
    setArea_id("");
    setImage(null);
  };

  return (
    <div className='StandRegContainer'>
      <div className='Stand_Reg_Title' >
        <h1>
          We're very excited you decided join the
          <span>&nbsp;</span>
          <span className='h1_FarmerMarketOnline'>Farmer's Market
            <span className='h1_Online '> Online</span></span><br />
          Please enter your stand's details here:
        </h1>
      </div>

      <div >
        <MDBCard className='my-5 bg-glass' style={{ backgroundColor: "rgba(245, 226, 191)", alignItems: "center" }}>
          <MDBCol md='6' className='p-5 '>
            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass='mb-4'
                id="standName"
                placeholder="Type your Stand's Name"
                label='Stand Name'
                onChange={handleStandName}
              />

              <MDBInput
                wrapperClass='mb-4'
                id="desc"
                placeholder="Write a description of your stand"
                label='About The Stand'
                onChange={handleDesc}
              />

              <MDBInput
                wrapperClass='mb-4'
                id="phone"
                placeholder="Type the stand phone Number"
                label='Phone'
                onChange={handlePhone}
              />

              <MDBInput
                wrapperClass='mb-4'
                id="address"
                placeholder="Type the stand address"
                label='Address'
                onChange={handleAddress}
              />

              <p>
                <select id="area" name="areaslist" style={{ display: "flex", justifyContent: "center" }} onChange={e => setArea_id(e.target.value)} >
                  <option value='' disabled selected hidden>Select Area</option>
                  <option value="1">North</option>
                  <option value="2">Center</option>
                  <option value="3">South</option>
                </select>
              </p>

              <p>
                <input
                  type="file"
                  id="image"
                  accept="image/png,image/jpeg, image/jpg"
                  onChange={handleImage}
                  required
                >
                </input>
              </p>

              {/* The button to execute the login action using the loginUserAsync method */}
              <MDBBtn className='w-100 mb-4' size='md' style={{ backgroundColor: "rgb(116,108,92)" }}
                type="submit" onClick={() => dispatch(updUserStatusAsync({ token: token, is_staff: { is_staff: 1 }, user_id: user_id }))}
              >Create Stand</MDBBtn>
            </form>
          </MDBCol>
        </MDBCard>
      </div >
    </div >
  )
}

export default StandRegistration
