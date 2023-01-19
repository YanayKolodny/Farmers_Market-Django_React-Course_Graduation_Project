import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logOutUser, getProfile, updateProfile, updUserStatus } from '../API/loginAPI'
import jwt_decode from "jwt-decode";

// All the initial states to be used for the login and profile proccess
const initialState = {
  userName: "",
  email: "",
  token: "",
  user_id: "",
  is_staff: false,
  is_superuser: false,
  logged: false,
  fullName: "",
  phone: "",
  address: "",
  area_id: ""
};

// Method to initial the login process:
// 1) Provides data from the Loginform to the api method.
// 2) Saves the received token on the local storage.
// 3) Send the responded token to the extraReducer to update the initial states.
export const loginUserAsync = createAsyncThunk(
  'login/loginUser',
  async (UserCreds) => {
    const response = await loginUser(UserCreds);
    localStorage.setItem("authTokens", JSON.stringify(response.data)) // Saving the token to the local storage
    return response.data;
  })

// Method to initial the login process:
// 1) sends the logged user token to logout on the server.
// 2) activating the extraReducer to nullify the initial states to its orginal values.
export const logOutUserAsync = createAsyncThunk(
  'login/logOutUser',
  async (token) => {
    const response = await logOutUser(token);
    localStorage.removeItem("authTokens") // Removing the token from the local storage
    return response.data;
  })

export const getProfileAsync = createAsyncThunk(
  'login/getProfile',
  async (user_id) => {
    const response = await getProfile(user_id);
    return response.data[0];
  })

export const updateProfileAsync = createAsyncThunk(
  'registration/updateProfile',
  async (cred) => {
    const response = await updateProfile(cred.user_id, cred.update_data);
    return cred.update_data;
  })

// Update user status START 
// this method is used to update the is_staff to acnowledge the user now own a stand by giving it the value 1 
export const updUserStatusAsync = createAsyncThunk(
  'stands/updUserStatus',
  async (cred) => {
    const response = await updUserStatus(cred.token, cred.is_staff, cred.user_id);
    return response.data;
  })
// Update user status END

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // method to allow login right away if the token in the storage is valid
    loginOnArrival: (state) => {
      if (localStorage.getItem("authTokens") !== null) {
        state.token = JSON.parse(localStorage.getItem("authTokens")).access
        state.userName = jwt_decode(state.token).username
        state.email = jwt_decode(state.token).email
        state.user_id = jwt_decode(state.token).user_id
        state.is_staff = jwt_decode(state.token).is_staff
        state.is_superuser = jwt_decode(state.token).is_superuser
        state.logged = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // The extra reducer for the login proccess - updates the inisial states after login
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        if (action.payload.access) {
          state.token = action.payload.access
          state.logged = true;
          state.userName = jwt_decode(action.payload.access).username
          state.email = jwt_decode(action.payload.access).email
          state.user_id = jwt_decode(action.payload.access).user_id
          state.is_staff = jwt_decode(action.payload.access).is_staff
          state.is_superuser = jwt_decode(action.payload.access).is_superuser
          alert("Your now logged in, enjoy your time in the matket!")
          window.location.href = "https://farmersmarketonline.netlify.app/"
        }
      })
      // The extra reducer for the logout proccess - nullify the initial states data.
      .addCase(logOutUserAsync.fulfilled, (state, action) => {
        state.logged = false
        state.user_id = ""
        state.token = ""
        localStorage.removeItem(`authTokens`)
        state.userName = ""
        state.email = ""
        state.is_staff = false
        state.is_superuser = false
        state.fullName = ""
        state.phone = ""
        state.address = ""
        state.area_id = ""
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName
        state.phone = action.payload.phone
        state.address = action.payload.address
        state.area_id = action.payload.area_id
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName
        state.phone = action.payload.phone
        state.address = action.payload.address
        state.area_id = action.payload.area_id
      })
      .addCase(updUserStatusAsync.fulfilled, (state, action) => {
        state.is_staff = true
        localStorage.removeItem(`authTokens`)
        alert("Amazing, your stand is ready! \n Please login again to start managing it!")
        window.location.replace("https://farmersmarketonline.netlify.app/")
      })
  },
});

// All the exports of states and methods of the Login Slice
export const { loginOnArrival } = loginSlice.actions;
export const selectLogged = (state) => state.login.logged;
export const selectEmail = (state) => state.login.email;
export const selectUserName = (state) => state.login.userName;
export const selectUser_id = (state) => state.login.user_id;
export const selectIsStaff = (state) => state.login.is_staff;
export const selectIsSuperuser = (state) => state.login.is_superuser;
export const selectToken = (state) => state.login.token;
export const selectfullName = (state) => state.login.fullName;
export const selectphone = (state) => state.login.phone;
export const selectaddress = (state) => state.login.address;
export const selectarea_id = (state) => state.login.area_id;


export default loginSlice.reducer;
