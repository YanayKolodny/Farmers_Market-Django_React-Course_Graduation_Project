import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  MDBBtn, MDBContainer, MDBRow,
  MDBCol, MDBCard, MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';   // Package that provide designs for this component

import { loginUserAsync } from '../../Slices/loginSlice'


// This component uses as the login page.

export default function LoginForm() {
  const dispatch = useDispatch();
  const [UserName, setUserName] = useState("")
  const [Password, setPassword] = useState("")

  return (
    <div>
      <div className={"loginPageContainer"}>
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ position: "relative", top: "-20px" }}>
          <MDBRow className='align-items-center justify-content-center'>

            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

              {/* This div represents the Written labels on the right side of the page */}
              <div className="titlesContainer">
                <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                  <span className="welcomeBackTitle" >Welcome Back to the</span>
                  <br />
                  <span className="farmersMarketTitle">Farmer's Market Online</span>
                </h1>

                <p className="smallTitleContainer"><b>
                  <span className="smallTitleWhite">
                    Where the</span>
                  <span className="SmallTitleRed"> Best Quality</span>
                  <br />
                  <span className="smallTitleWhite"> Meets the </span>
                  <span className="SmallTitleRed">Best Price</span></b></p>
              </div>

            </MDBCol>

            {/* This div represents the form on the left side of the screen */}
            <div className="loginFormContainer">
              <MDBCol md='6' className='position-relative'>
                <div id="radius-shape-1" className="position-relative rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-relative shadow-5-strong"></div>

                <div className="loginCardContainer">
                  <MDBCard className='my-5 bg-glass' style={{ backgroundColor: "rgba(241,229,214,0.7)" }}>
                    <MDBCardBody className='p-5'>
                      <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' className='loginInput' onChange={e => setUserName(e.target.value)} />
                      <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' onChange={e => setPassword(e.target.value)} />

                      {/* The button to execute the login action using the loginUserAsync method */}
                      <MDBBtn className='w-100 ' size='md' style={{ backgroundColor: "rgb(116,108,92)" }}
                        onClick={() => dispatch(loginUserAsync({
                          username: UserName,
                          password: Password
                        }))}>Login</MDBBtn>

                    </MDBCardBody>
                  </MDBCard>
                </div>
              </MDBCol>
            </div>
          </MDBRow>
        </MDBContainer >
      </div>
    </div>
  );
}
