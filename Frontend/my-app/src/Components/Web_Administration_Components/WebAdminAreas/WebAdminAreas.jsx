import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { selectToken } from '../../../Slices/loginSlice'
import { selectAreas, addAreaAsync, deleteAreaAsync } from '../../../Slices/areaSlice'
import WebAdminUpdateAreasModal from './WebAdminUpdateAreasModal';

import { MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';


// This component is the WEB admin areas management page:
const WebAdminAreas = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const areas = useSelector(selectAreas)
  const [newAreaName, setNewAreaName] = useState("")

  const handleAreaName = (e) => {
    e.preventDefault();
    setNewAreaName(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending the new area name and token to the async method
    dispatch(addAreaAsync({ token: token, areaName: newAreaName }))
    setNewAreaName("");
  };


  return (
    <div >
      <br />
      <div style={{ position: "relative", textAlign: "center" }}>
        <MDBCard className='my-5 bg-glass' style={{ position: "relative", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(135, 206, 250, 0.5)" }}>
          <MDBCardBody className='p-5'>
            <form onSubmit={handleSubmit}>
              <p>
                <MDBInput
                  type="text"
                  placeholder="New Area Name"
                  id="areaName"
                  onChange={handleAreaName}
                  required
                ></MDBInput>
              </p>

              <MDBBtn type="submit">Add New Area</MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </div>

      <div style={{ position: "relative", left: "35%", width: "500px", textAlign: "left" }}>
        <h2>The Farmer's Market Areas: </h2><br />
        {
          areas.length < 1 ? (<div><h3>Let's set the areas we work in.</h3></div>) :
            areas.map((area) => (
              <div key={area._id}>
                <h4>Area Name:  {area.areaName.charAt(0).toUpperCase() + area.areaName.slice(1)}</h4>

                <MDBBtn
                  onClick={() => dispatch(deleteAreaAsync({ token: token, _id: area._id }))}
                >
                  Delete Area
                </MDBBtn>&emsp;
                <WebAdminUpdateAreasModal {...area} />
              </div>))
        }
      </div>
    </div >
  )
}

export default WebAdminAreas