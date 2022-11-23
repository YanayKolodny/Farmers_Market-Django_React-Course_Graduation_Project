import React, { useEffect, useState } from 'react';
import {
  MDBBtn, MDBModal, MDBModalDialog,
  MDBModalContent, MDBModalHeader, MDBModalTitle,
  MDBModalBody, MDBModalFooter, MDBInput,
} from 'mdb-react-ui-kit';

import styles from '../../../StyleSheets/UpdateProductModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductAsync } from '../../../Slices/productsSlice';
import { selectToken } from '../../../Slices/loginSlice';

// This component is a modal that contain a form to update a product of a stand - used by the stand owner.
export default function UpdateProductModal(props) {
  // Design functunality related variables
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const [prodName, setProdName] = useState(props.prodName)
  const [price, setPrice] = useState(parseInt(props.price))
  const [desc, setDesc] = useState(props.desc)
  const [inStock, setInStock] = useState(props.inStock)


  const updateAndCloseModalWindow = () => {
    dispatch(updateProductAsync({
      token: token,
      updProd: {
        id: props._id,
        prodName: prodName,
        price: price,
        desc: desc,
        inStock: inStock
      },
    }))
    toggleShow()
  }


  return (
    <>
      <div >
        <MDBBtn style={{ width: "290px", borderRadius: "20px", border: "2px solid", borderColor: "white" }} onClick={toggleShow}>Update This Product</MDBBtn>
      </div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update Product - Please type only in the fields of the details you wish to update:</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form >
                <p className={styles.IntructionsText}>Fill this field to set a new product name:<br />
                  <MDBInput
                    type="text"
                    defaultValue={prodName}
                    placeholder="Type Your New Product's Name Here"
                    id="newProdName"
                    onChange={e => setProdName(e.target.value)}
                  ></MDBInput>
                </p>
                <p className={styles.IntructionsText}>Fill this field to set a new price:<br />
                  <MDBInput
                    type="number"
                    defaultValue={parseInt(price)}
                    placeholder="Type Your New Product's Price Here"
                    id="newPrice"
                    onChange={e => setPrice(parseInt(e.target.value))}
                  ></MDBInput>
                </p>
                <p className={styles.IntructionsText}>Fill this field to set a new description of the product:<br />
                  <MDBInput
                    type="text"
                    defaultValue={desc}
                    placeholder="Type Your New Product's Description Here"
                    id="newProdDesc"
                    onChange={e => setDesc(e.target.value)}
                  ></MDBInput>
                </p>
                <p className={styles.IntructionsText}>Is this product in stock:<br />
                  <select id="area" name="areaslist" style={{ display: "flex", justifyContent: "center" }} onChange={e => setInStock(e.target.value)} >
                    {inStock === true ?
                      (<option value={1} disabled selected hidden>Yes - in stock</option>)
                      :
                      (<option value={0} disabled selected hidden>No - out of stock</option>)}
                    <option value={1}>Yes - in stock</option>
                    <option value={0}>No - out of stock</option>
                  </select><br />
                </p>

              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => updateAndCloseModalWindow()}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}