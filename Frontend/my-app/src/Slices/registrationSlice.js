import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, updateProfile } from '../API/registrationAPI'
import jwt_decode from "jwt-decode";

// All the initial states to be used for the registration proccess 
const initialState = {
  messege: 'Registration completed successfully',
};

// Method to initial the registration process:
// Provides the data from the RegistrationForm to the api method.
export const registerUserAsync = createAsyncThunk(
  'registration/registerUser',
  async (newUser) => {
    const response = await registerUser(newUser);
    return response.data;
  })



export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        alert("We are very Happy you chose to register! \n Enjoy and let us know if you need anything ;)")
        window.location.href = "http://localhost:3000/auth/login"
        console.log(state.messege)
      })
  },
});

// All the exports of states and methods of the Registration Slice
export const { } = registrationSlice.actions;
export const selectMessege = (state) => state.registration.messege;

export default registrationSlice.reducer;
