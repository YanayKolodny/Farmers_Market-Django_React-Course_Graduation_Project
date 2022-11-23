import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { selectCats, getCategoriesAsync, addCategoryAsync, deleteCategoryAsync, updateCategoryAsync, setAdminStandCats, selectAdminStandCats } from '../../Slices/categoriesSlice'
import { selectToken } from '../../Slices/loginSlice'
import { selectAdminStand } from '../../Slices/standsSlice'
import UpdateCategoryModal from './AdminUpdateModals/UpdateCategoryModal';

// This component is the stand admin categories management page:
const CategoriesAdmin = () => {
  const dispatch = useDispatch()
  const allCats = useSelector(selectCats)
  const adminStandCats = useSelector(selectAdminStandCats)
  const adminStand = useSelector(selectAdminStand) // as a single "dictionary" object
  const token = useSelector(selectToken)
  const [newCatName, setNewCatName] = useState("")

  useEffect(() => {
    dispatch(setAdminStandCats(adminStand["_id"]))
  }, [allCats.length])

  const handleCategoryName = (e) => {
    e.preventDefault();
    setNewCatName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("categoryName", newCatName);
    form_data.append("stand_id", adminStand["_id"]);

    // Sending the form and token to the async method
    dispatch(addCategoryAsync({ token: token, form_data: form_data, stand_id: adminStand["_id"] }))

    setNewCatName("");
  };

  console.log("allCats", allCats)
  console.log("adminStandCats", adminStandCats)
  console.log("adminStand", adminStand)

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
                  placeholder="New Category Name"
                  id="categoryName"
                  onChange={handleCategoryName}
                  required
                ></MDBInput>
              </p>

              <MDBBtn type="submit">Add New Category</MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </div>
      {/* <button onClick={() => updAfterAddCat(token)}>Add New Category</button>{"      "} */}<hr />
      <div style={{ position: "relative", left: "38%", width: "500px", textAlign: "left" }}>
        <h2>Your shop's categories: </h2><br />
        {
          adminStandCats.length < 1 ? (<div><h3>Let's make some categoris so we can assign your products.</h3></div>) :
            adminStandCats.map((cat) => (
              <div key={cat._id}>
                <h4>Category Name:  {cat.categoryName}</h4>
                <MDBBtn onClick={() => dispatch(deleteCategoryAsync({ token: token, _id: cat._id }))}>
                  Delete Category
                </MDBBtn>&emsp;
                <UpdateCategoryModal {...cat} />
              </div>))
        }
      </div>
    </div >
  )
}

export default CategoriesAdmin