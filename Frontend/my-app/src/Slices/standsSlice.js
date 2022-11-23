import { createSlice } from '@reduxjs/toolkit';
import { addStand, getStands, updUserStatus, updateStand, deleteStand } from '../API/standsAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';

// All the initial states to be used for the stands proccess
const initialState = {
  AllStands: [],
  FilteredStands: [],
  AdminStand: {},
  StandCart: {},
  DeletedProdId: 0
};

// GET Stands Start - What it does:
// 1) intiate the request to receive the stands data from the server by calling the getStands method (standsAPI)..
// 2) sending the response to the extraReducer to updates the AllStands and FilteredStands states.
export const getStandsAsync = createAsyncThunk(
  'stands/getStands',
  async () => {
    const response = await getStands();
    return response.data;
  });// GET Stands ENDS

// ADD Stand Start - What it does:
// 1) intiate the request to add a new stand to the server by calling the addStand method (standsAPI).
// 2) Sends the data to the extraReducer to updtates the AllStands state.
export const addStandAsync = createAsyncThunk(
  'stands/addStand',
  async (cred) => {
    const response = await addStand(cred.token, cred.form_data);
    return response.data;
  })// ADD Stand ENDS


// DELETE Stand Start
// 1) intiate the request to delete s stand from the server by calling the deleteStand method (standsAPI).
// 2) Sends the stand id to the extraReducer to delete it from the AllStands state. 
export const deleteStandAsync = createAsyncThunk(
  'products/deleteStand',
  async (cred) => {
    console.log("cred", cred)
    const response = await deleteStand(cred.token, cred.id);
    return cred.id;
  })
// DELETE Stand ENDS

//  UPDATE Stand Start 
export const updateStandAsync = createAsyncThunk(
  'stands/updateStand',
  async (cred) => {
    const response = await updateStand(cred.stand_id, cred.token, cred.update_data);
    console.log("response.data", response.data)
    return response.data
  })
//  UPDATE Stand ENDS

export const standsSlice = createSlice({
  name: 'stands',
  initialState,
  reducers: {
    // The standsAreaFilter reducer uses to update the FilteredStands state by receiving an area_id.
    // Its use is to show only the stands from the requested area on the AreaFilter component (nav bar).
    standsAreaFilter: (state, action) => {
      action.payload == 0 ? (state.FilteredStands = state.AllStands) :
        (state.FilteredStands = state.AllStands.filter((stand) => stand.area_id._id == action.payload))
    },
    // The setAdminStand receives the current logged in user id and extarcts its stands data object.
    setAdminStand: (state, action) => {
      let adminInArray = JSON.parse(JSON.stringify(state.AllStands)).filter((stand) => stand.user_id == action.payload)
      state.AdminStand = adminInArray[0]
      console.log("state.AdminStand", state.AdminStand)
    },
    // The setSellingStandData receives the current stand_id of the stand which is being purchesed from and returnes its data.
    setSellingStandData: (state, action) => {
      let standInArray = JSON.parse(JSON.stringify(state.AllStands)).filter((stand) => stand._id == action.payload)
      state.StandCart = standInArray[0]
    },
  },
  extraReducers: (builder) => {
    builder
      // Updating the AllStands and FilteredStands with the data that been recived from the getStandsAsync method.
      .addCase(getStandsAsync.fulfilled, (state, action) => {
        state.AllStands = action.payload
        state.FilteredStands = action.payload
      })
      // Updating the AllStands with the data that been recived from the addStandsAsync method (a new stand).
      .addCase(addStandAsync.fulfilled, (state, action) => {
        console.log("AAAAACCCCCTTTTIIIOOONNN", action.payload)
        state.AllStands = JSON.parse(JSON.stringify(state.AllStands.push(action.payload)))
        state.FilteredStands = JSON.parse(JSON.stringify(state.FilteredStands.push(action.payload)))
        state.AdminStand = action.payload
        console.log("AllStands", state.AllStands)
        console.log("FilteredStands", state.FilteredStands)
        console.log("AdminStand", state.AdminStand)
      })
      //  Delete Stand from the AllStands state.
      .addCase(deleteStandAsync.fulfilled, (state, action) => {
        state.AllStands = state.AllStands.filter(stand => stand._id !== action.payload)
      })
  },
});

// All the exports of states and methods of the Stands Slice
export const { standsAreaFilter, setAdminStand, setSellingStandData } = standsSlice.actions;
export const selectStands = (state) => state.stands.AllStands;
export const selectFilteredStands = (state) => state.stands.FilteredStands;
export const selectAdminStand = (state) => state.stands.AdminStand;
export const selectStandCart = (state) => state.stands.StandCart;
export default standsSlice.reducer;
