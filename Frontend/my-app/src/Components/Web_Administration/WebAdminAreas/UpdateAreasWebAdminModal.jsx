import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateAreaAsync } from '../../../Slices/areaSlice';
import { selectToken } from '../../../Slices/loginSlice'

import {
  MDBBtn, MDBModal, MDBModalDialog,
  MDBModalContent, MDBModalHeader, MDBModalTitle,
  MDBModalBody, MDBModalFooter, MDBInput
} from 'mdb-react-ui-kit';

// This component is a modal that contain a form to update an area's name.
export default function UpdateAreasWebAdminModal(props) {
  // Design functunality related variables
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const [newAreaName, setNewAreaName] = useState("")

  const updateAndCloseModalWindow = () => {
    dispatch(updateAreaAsync({ token: token, area_id: props._id, newAreaName: { areaName: newAreaName } }))
    toggleShow()
    setNewAreaName("")
  }

  return (
    <>
      <MDBBtn onClick={toggleShow}>Update Area's Name</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{props.areaName.charAt(0).toUpperCase() + props.areaName.slice(1)}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form >
                <p>Type the area's new name:<br />
                  <MDBInput
                    type="text"
                    placeholder={`Current Name: ${props.areaName}`}
                    id="newCategoryName"
                    onChange={e => setNewAreaName(e.target.value)}
                  ></MDBInput>
                </p>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => dispatch(updateAndCloseModalWindow())}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}