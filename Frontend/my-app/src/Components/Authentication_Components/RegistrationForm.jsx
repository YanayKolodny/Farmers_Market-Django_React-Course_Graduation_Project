import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { // Package that provide designs for this component
  MDBBtn, MDBContainer, MDBRow,
  MDBCol, MDBCard, MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

import { registerUserAsync } from '../../Slices/registrationSlice';

// This component uses as the registration page.
export default function RegistrationForm() {
  const dispatch = useDispatch();

  // All the states for the registration form:
  const [newuUserName, setNewUserName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [area_id, setArea_id] = useState(0)


  return (

    <div className="registrationPageContainer" >
      <div >
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ position: "relative", top: "-20px" }}>
          <MDBRow>  {/* This tag represents the Written labels on the left side of the page */}
            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center' >
              <div style={{ position: "relative", top: "-30px" }}>
                <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                  <div className="H1_DIV_ALIGN">
                    <span className="REG_PAGE_TITLE" >Welcome to the</span>
                    <br />
                    <span className="FMO_REG_PAGE_TITLE">Farmer's Market Online</span>
                  </div>
                </h1>

                <p className="SMALL_TITLE_MAIN"><b>
                  <span className="SMALL_TITLE_WHITE">
                    Where the</span>
                  <span className="SMALL_TITLE_RED"> Best Quality</span>
                  <br />
                  <span className="SMALL_TITLE_WHITE"> Meets the </span>
                  <span className="SMALL_TITLE_RED">Best Price</span></b></p>
              </div>
            </MDBCol>


            <MDBCol md='6' className='position-relative' >   {/* This tag represents the form on the right side of the screen */}
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <MDBCard className='my-5 bg-glass' style={{ backgroundColor: " rgba(135, 206, 250, 0.5)" }}>
                <MDBCardBody className='p-5' >
                  {/* Inputs of the username, email and password */}
                  <MDBInput wrapperClass='mb-3' label='Username' id='form1' type='text' onChange={e => setNewUserName(e.target.value)} />
                  <MDBInput wrapperClass='mb-3' label='Email' id='form2' type='email' onChange={e => setNewEmail(e.target.value)} />
                  <MDBInput wrapperClass='mb-3' label='Password' id='form3' type='password' onChange={e => setNewPassword(e.target.value)} />
                  <MDBInput wrapperClass='mb-3' label='FullName' id='form3' type='text' onChange={e => setFullName(e.target.value)} />
                  {/* Inputs of the phone and address */}
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='Phone Number' id='form6' type='text' onChange={e => setNewPhone(e.target.value)} />
                    </MDBCol>

                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='Address' id='form7' type='text' onChange={e => setNewAddress(e.target.value)} />
                    </MDBCol>
                  </MDBRow>

                  {/* Selecting an area will provide it's area_id */}
                  <select id="area" name="areaslist" style={{ display: "flex", justifyContent: "center" }} onChange={e => setArea_id(e.target.value)} >
                    <option value='' disabled selected hidden>Select Area</option>
                    <option value="1">North</option>
                    <option value="2">Center</option>
                    <option value="3">South</option>
                  </select><br />

                  <br />
                  {/* The button to execute the registration action using the registerUserAsync method */}
                  <MDBBtn className='w-100 mb-4' size='md'
                    onClick={() => dispatch(registerUserAsync({
                      username: newuUserName,
                      email: newEmail,
                      password: newPassword,
                      fullName: fullName,
                      phone: newPhone,
                      address: newAddress,
                      area_id: area_id,
                      credit: ""
                    }))}>Sign Up</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer >
      </div>
    </div>
  );
}
