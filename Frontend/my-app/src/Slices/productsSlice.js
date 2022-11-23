import { createSlice } from '@reduxjs/toolkit';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../API/productsAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';

// Products states - being used and updated by the methods in this slice:
const initialState = {
  AllProds: [],
  StandProducts: [],
  FilteredStandProducts: [],
  DeletedProdId: 0
};

// GET Products Start
// 1. calling the getProducts method from the productsAPI.
// 2. send the response to the extraReducer to update the AllProds state.
export const getProductsAsync = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await getProducts();
    return response.data;
  });// GET Products ENDS

// ADD Product Start
// 1. calling the addProduct method from the productsAPI.
// 2. send the response to the extraReducer to update the AllProds and StandProducts states.
export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (cred) => {
    const response = await addProduct(cred.token, cred.form_data);
    return response;
  })// ADD Product ENDS

// DELETE Product Start
// 1. calling the deleteProduct method from the productsAPI.
// 2. send the products id to the extraReducer to update the AllProds and StandProducts states.
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (cred) => {
    const response = await deleteProduct(cred.token, cred.id);
    console.log("cred.id", cred.id)
    return cred.id;
  })
// DELETE Product ENDS

// UPDATE Product Start
// 1. calling the updateProduct method from the productsAPI.
// 2. send the updated product's data to the extraReducer to update it in the AllProds and StandProducts states.
export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (cred) => {
    const response = await updateProduct(cred.token, cred.updProd);
    return cred.updProd
  })// UPDATE Product ENDS

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducer to update the StandProducts and FilteredStandProducts states with the received
    // products from the response:
    StandProductsProvider: (state, action) => {
      console.log("action.payloadddddd", action.payload)

      state.StandProducts = state.AllProds.filter((prod) => prod.stand_id._id == action.payload);
      console.log("state.StandProducts", state.StandProducts)
      state.FilteredStandProducts = state.StandProducts
    },
    productsCategoryFilter: (state, action) => {
      // Reducer to update the FilteredStandProducts to have 
      // only the requested categorie's products:
      action.payload == 0 ? (state.FilteredStandProducts = state.StandProducts) :
        (state.FilteredStandProducts = state.StandProducts.filter((prod) => prod.category_id._id == action.payload))
    },
  },
  extraReducers: (builder) => {
    builder
      // exteraReducer to update the AllProds state with the recived products from the server:
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.AllProds = action.payload
      })
      // exteraReducer to update the AllProds and StandProducts states with the newly crated category:
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.AllProds.push(action.payload[0])
        state.StandProducts.push(action.payload[0])
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        // exteraReducer to delete a product from the AllCats and AdminStandCats states:
        state.AllProds = JSON.parse(JSON.stringify(state.AllProds.filter(prod => prod._id !== action.payload)))
        state.StandProducts = JSON.parse(JSON.stringify(state.StandProducts.filter(prod => prod._id !== action.payload)))
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        // exteraReducer to update a product's data in the AllCats and AdminStandCats states:
        state.AllProds = JSON.parse(JSON.stringify(state.AllProds))
        let index = state.AllProds.findIndex((prod) => { return prod._id == action.payload.id })
        state.AllProds[index]["prodName"] = action.payload.prodName;
        state.AllProds[index]["inStock"] = action.payload.inStock;
        state.AllProds[index]["price"] = action.payload.price;
        state.AllProds[index]["desc"] = action.payload.desc;

        console.log(JSON.parse(JSON.stringify(state.StandProducts)))
        index = state.StandProducts.findIndex((prod) => { return prod._id == action.payload.id })
        state.StandProducts[index]["prodName"] = action.payload.prodName;
        state.StandProducts[index]["price"] = action.payload.price;
        state.StandProducts[index]["desc"] = action.payload.desc;
        if (action.payload.inStock == 1) { state.StandProducts[index]["inStock"] = true }
        else { state.StandProducts[index]["inStock"] = false }
      })
  },
});

// exports of the states and reducers:
export const { StandProductsProvider, productsCategoryFilter } = productsSlice.actions;
export const selectProds = (state) => state.products.AllProds;
export const selectStandProducts = (state) => state.products.StandProducts;
export const selectFilteredStandProducts = (state) => state.products.FilteredStandProducts;
export default productsSlice.reducer;

