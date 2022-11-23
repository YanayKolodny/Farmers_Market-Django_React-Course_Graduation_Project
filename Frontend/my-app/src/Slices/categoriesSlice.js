import { createSlice } from '@reduxjs/toolkit';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../API/categoriesAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';


// Categories states - being used and updated by the methods in this slice:
const initialState = {
  AllCats: [],
  AdminStandCats: [],
  DeletedCatId: 0
};

// GET Categories Start: 
// 1. Sending the request for the categoris to the categories API method.
// 2. send the response to the extraReducer to update the AllCats state.
export const getCategoriesAsync = createAsyncThunk(
  'category/getCategories',
  async () => {
    const response = await getCategories();
    return response.data;
  });// GET Categories ENDS

// ADD Category Start:
// 1. Sending the request to the categories API method to create a new ctegory.
// 2. send the response and the stand_id to the extraReducer to update the AllCats and AdminStandCats states.
export const addCategoryAsync = createAsyncThunk(
  'category/addCategory',
  async (cred) => {
    const response = await addCategory(cred.token, cred.form_data);
    return { res_data: response.data, stand_id: cred.stand_id }
  })// ADD Category ENDS

// DELETE Category Start: 
// 1. Sending the request to the categories API method to delete a ctegory.
// 2. send the stand_id to the extraReducer to delete the category from the AllCats and AdminStandCats states.
export const deleteCategoryAsync = createAsyncThunk(
  'category/deleteCategory',
  async (cred) => {
    const response = await deleteCategory(cred.token, cred._id);
    return cred._id;
  })// DELETE Category ENDS


// UPDATE Category Start
// 1. Sending the request to the categories API method to update a ctegory's name.
// 2. send the new name and id of the category to the extraReducer to update the AllCats and AdminStandCats states.
export const updateCategoryAsync = createAsyncThunk(
  'category/updateCategory',
  async (cred) => {
    const response = await updateCategory(cred.token, cred.newCatName, cred.category_id);
    return { newCatName: cred.newCatName["categoryName"], category_id: cred.category_id }
  })// UPDATE Category ENDS

export const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: { // Reducer to update the AdminStandCats state with the categories of his stand's categories:
    setAdminStandCats: (state, action) => {
      state.AdminStandCats = JSON.parse(JSON.stringify(state.AllCats.filter((cat) => cat.stand_id == action.payload)))
    },
  },
  extraReducers: (builder) => {
    builder
      // exteraReducer to update the AllCats state with the recived categories from the server:
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.AllCats = action.payload
      })
      // exteraReducer to update the AllCats and AdminStandCats states with the newly crated category:
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.AllCats = action.payload.res_data
        state.AdminStandCats = state.AllCats.filter(cat => cat._id !== action.payload.stand_id)
      })
      // exteraReducer to delete a category from the AllCats and AdminStandCats states:
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.AllCats = JSON.parse(JSON.stringify(state.AllCats.filter(cat => cat._id !== action.payload)))
        state.AdminStandCats = JSON.parse(JSON.stringify(state.AdminStandCats.filter(cat => cat._id !== action.payload)))
      })
      // exteraReducer to update the category's name in the AdminStandCats state:
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        let oldCat = state.AdminStandCats.find(cat => cat._id === action.payload.category_id);
        oldCat.categoryName = action.payload.newCatName;
      })
  },
});

// exports of the states and reducers:
export const { setAdminStandCats } = categoriesSlice.actions;
export const selectCats = (state) => state.categories.AllCats;
export const selectAdminStandCats = (state) => state.categories.AdminStandCats;
export default categoriesSlice.reducer;
