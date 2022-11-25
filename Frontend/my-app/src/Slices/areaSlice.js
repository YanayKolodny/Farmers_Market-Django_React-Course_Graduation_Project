import { createSlice } from '@reduxjs/toolkit';
import { getAreas, addArea, deleteArea, updateArea } from '../API/areasAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';


// Areas states - being used and updated by the methods in this slice:
const initialState = {
  AllAreas: [],
};


// GET Areas Start: 
// 1. Sending the request for the areas to the areas API method.
// 2. send the response to the extraReducer to update the Allareas state.
export const getAreasAsync = createAsyncThunk(
  'area/getAreas',
  async (token) => {
    const response = await getAreas(token);
    return response.data;
  });// GET Areas ENDS


// ADD Area Start:
// 1. Sending the request to the areas API method to create a new area.
// 2. send the new area data to the extraReducer to update the AllAreas state.
export const addAreaAsync = createAsyncThunk(
  'area/addArea',
  async (cred) => {
    const response = await addArea({ token: cred.token, newArea: { areaName: cred.areaName } });
    return response.data
  })
// ADD Area ENDS


// DELETE Area Start: 
// 1. Sending the request to the areas API method to delete a area.
// 2. send the area_id to the extraReducer to delete the area from the AllAreas state.
export const deleteAreaAsync = createAsyncThunk(
  'area/deleteArea',
  async (cred) => {
    const response = await deleteArea(cred.token, cred._id);
    return cred._id;
  })// DELETE Area ENDS


// UPDATE Area Start
// 1. Sending the request to the areas API method to update a ctegory's name.
// 2. send the new name and id of the Area to the extraReducer to update the AllAreas and AdminStandCats states.
export const updateAreaAsync = createAsyncThunk(
  'area/updateArea',
  async (cred) => {
    const response = await updateArea(cred.token, cred.area_id, cred.newAreaName);
    return { newAreaName: cred.newAreaName["areaName"], area_id: cred.area_id }
  })// UPDATE Area ENDS

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  extraReducers: (builder) => {
    builder
      // exteraReducer to update the AllAreas state with the recived areas from the server:
      .addCase(getAreasAsync.fulfilled, (state, action) => {
        state.AllAreas = action.payload
      })
      // exteraReducer to update the AllAreas state with the newly created Area:
      .addCase(addAreaAsync.fulfilled, (state, action) => {
        state.AllAreas.push(action.payload)
      })
      // exteraReducer to delete an area from the AllAreas state:
      .addCase(deleteAreaAsync.fulfilled, (state, action) => {
        state.AllAreas = JSON.parse(JSON.stringify(state.AllAreas.filter(area => area._id !== action.payload)))
      })
      // exteraReducer to update the area's name in the AllAreas state:
      .addCase(updateAreaAsync.fulfilled, (state, action) => {
        let area_id = action.payload.area_id
        let newAreaName = action.payload.newAreaName

        state.AllAreas = (JSON.parse(JSON.stringify(state.AllAreas)))
        state.AllAreas.find(area => area._id == area_id)["areaName"] = newAreaName
      })
  },
});

// exports of the states and reducers:
export const { } = areaSlice.actions;
export const selectAreas = (state) => state.areas.AllAreas;
export default areaSlice.reducer;
