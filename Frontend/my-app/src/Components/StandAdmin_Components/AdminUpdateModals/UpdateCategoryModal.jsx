import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput
} from 'mdb-react-ui-kit';

import styles from '../../../StyleSheets/UpdateCategoryModal.module.css';
import { updateCategoryAsync } from '../../../Slices/categoriesSlice';
import { selectToken } from '../../../Slices/loginSlice'

// This component is a modal that contain a form to update categorys of a stand - used by the stand owner.
export default function UpdateCategoryModal(props) {
  // Design functunality related variables
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const [newCatName, setNewCatName] = useState("")

  const updateAndCloseModalWindow = (cred) => {
    dispatch(updateCategoryAsync({ category_id: cred.category_id, newCatName: cred.newCatName, token: cred.token }))
    toggleShow()
    setNewCatName("")
  }

  return (
    <>
      <MDBBtn onClick={toggleShow}>Update This Category</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{props.categoryName}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form >
                <p>Type the category's new name:<br />
                  <MDBInput
                    type="text"
                    placeholder={props.categoryName}
                    id="newCategoryName"
                    onChange={e => setNewCatName(e.target.value)}
                  ></MDBInput>
                </p>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => dispatch(updateAndCloseModalWindow({ category_id: props._id, newCatName: { categoryName: newCatName }, token: token }))}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}