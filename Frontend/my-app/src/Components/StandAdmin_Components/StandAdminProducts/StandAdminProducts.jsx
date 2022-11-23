import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { selectProds, addProductAsync, StandProductsProvider, selectStandProducts } from '../../../Slices/productsSlice'
import { selectAdminStand } from '../../../Slices/standsSlice'
import { selectToken } from '../../../Slices/loginSlice'
import { setAdminStandCats, selectAdminStandCats, getCategoryNameFromId } from '../../../Slices/categoriesSlice';

import {
  MDBBtn, MDBRow,
  MDBCol, MDBCard, MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

import StandAdminProductsCard from './StandAdminProductsCard';

// This component is showes the products a stand owner have in his/her stand.
const StandAdminProducts = () => {
  const dispatch = useDispatch()
  const allProds = useSelector(selectProds)
  const adminStand = useSelector(selectAdminStand)
  const adminStandCats = useSelector(selectAdminStandCats)
  const adminStandprods = useSelector(selectStandProducts)
  const token = useSelector(selectToken)
  const [prodName, setProdName] = useState("")
  const [price, setPrice] = useState(null)
  const [desc, setDesc] = useState("")
  const [inStock, setInStock] = useState(1)
  const [category, setCategory] = useState(null)
  const [image, setImage] = useState(null);


  useEffect(() => {
    dispatch(setAdminStandCats(adminStand["_id"]))
  }, [])

  useEffect(() => {
    dispatch(StandProductsProvider(adminStand["_id"]))
  }, [allProds.length, allProds.value])

  console.log("adminStandprods", adminStandprods)


  const handleProdName = (e) => {
    e.preventDefault();
    setProdName(e.target.value);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const handleDesc = (e) => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  const handleInStock = (e) => {
    e.preventDefault();
    setInStock(e.target.value);
  };

  const handleCategory = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    console.log(e.target.value)
  };

  const handleImage = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("image", image, image.name);
    form_data.append("prodName", prodName);
    form_data.append("price", (+price));
    form_data.append("desc", desc);
    form_data.append("inStock", inStock);
    form_data.append("category_id", (+category));
    form_data.append("stand_id", adminStand["_id"]);

    // Sending the form and token to the async method
    dispatch(addProductAsync({ token: token, form_data: form_data }))

    setProdName("");
    // setPrice("")
    // setDesc("")
    // setInStock(1)
    // setCategory("");
    setImage(null);
  };

  return (
    <div style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
      <MDBCard className='my-5 bg-glass' style={{ position: "relative", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(135, 206, 250, 0.5)" }}>
        <MDBCardBody className='p-5'>
          <form onSubmit={handleSubmit}>

            <MDBRow>
              <MDBCol col='6' >
                <MDBInput
                  type="text"
                  placeholder="Product Name"
                  id="prodName"
                  onChange={handleProdName}
                  required
                /></MDBCol>
              <MDBCol col='6' >
                <p>
                  <select style={{ width: "203px", height: "38px", position: "relative", borderRadius: "5px", borderColor: "lightGrey" }} id="category" onChange={handleCategory}>
                    <option value='' disabled selected hidden><span >Select Category</span></option>
                    {adminStandCats.map((cat) => <option value={cat._id}>{cat.categoryName}</option>)}
                  </select>
                </p>
              </MDBCol>
            </MDBRow>
            <p>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput
                    type="text"
                    placeholder="Price"
                    id="price"
                    onChange={handlePrice}
                    required
                  ></MDBInput>
                </MDBCol>

                <MDBCol col='6' >
                  <p>
                    <select style={{ width: "203px", height: "38px", position: "relative", borderRadius: "5px", borderColor: "lightGrey" }} id="category" onChange={handleInStock}>
                      <option value={1} disabled selected hidden>Product in stock?</option>
                      <option value={1}>Yes - in stock</option>
                      <option value={0}>No - out of stock</option>
                    </select>
                  </p>
                </MDBCol>
              </MDBRow>
            </p>

            <p>
              <MDBInput
                type="text"
                placeholder="Product Description"
                id="desc"
                onChange={handleDesc}
                required
              ></MDBInput>
            </p>



            <p>
              Choose Image:
              <MDBInput
                type="file"
                id="image"
                accept="image/png,image/jpeg, image/jpg"
                onChange={handleImage}
                required
              ></MDBInput>
            </p>

            <MDBBtn style={{ position: "relative", left: "33%" }} type="submit">Add New Product</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>

      <hr />

      <h3 style={{ position: "relative", left: "40%" }}>Your Products:</h3>
      <div className='ProdsView'>
        {adminStandprods.length < 1 ? (
          <div>
            <h3>We're exited to add your products to the stand.<br />
              Before we continue please make sure you added categories on the "Manage Categories" page so we can assign your products properly.
            </h3>
          </div>)
          :
          (<div className="product_container">
            {adminStandprods.map((product, key) => <><StandAdminProductsCard key={product.id} {...product} /></>)}
          </div>)}


      </div>
      <hr />
    </div >
  )
}

export default StandAdminProducts