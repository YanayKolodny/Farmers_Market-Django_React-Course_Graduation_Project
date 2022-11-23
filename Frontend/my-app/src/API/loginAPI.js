import axios from 'axios'
import { LOGIN_URL, LOGOUT_URL, GET_PROFILE_URL, UPDATE_PROFILE_URL, UPDATE_USER_URL } from './server_urls'

// Login User - sends the request of username & password 
// to the server and receives token in return.
export function loginUser(UserCreds) {
  return new Promise((resolve) =>
    axios.post(LOGIN_URL, UserCreds)
      .then((res) => resolve({ data: res.data }))
      .catch(() => alert("The username/password details are wrong. \n Please try again:")))
}

// LogOut User - sends the request to the server
// to Log Out the user.
export function logOutUser(token) {
  return new Promise((resolve) =>
    axios(LOGOUT_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}

// GET user profile 
export function getProfile(user_id) {
  return new Promise((resolve) =>
    axios(GET_PROFILE_URL + `${user_id}/`).then((res) => resolve({ data: res.data })))
}


// Update Profile 
export function updateProfile(user_id, update_data) {
  return new Promise((resolve) =>
    axios.patch(UPDATE_PROFILE_URL + `${user_id}/`, update_data).then((res) => resolve({ data: res.data })))
}

// Update User Status START - a method that updates a user is_staff field to to True once he create a stand:
export function updUserStatus(token, is_staff, user_id) {
  return new Promise((resolve) =>
    axios.patch(UPDATE_USER_URL + `${user_id}/`, is_staff, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// Update User Status END