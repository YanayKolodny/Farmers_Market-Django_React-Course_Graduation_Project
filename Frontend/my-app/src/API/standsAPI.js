import axios from 'axios'
import { GET_STANDS_URL, ADD_STAND_URL, UPDATE_STAND_URL, DELETE_STAND_URL } from './server_urls'


// GET Stands Start - method that calls the server and receives all the stands in respons:
export function getStands() {
  return new Promise((resolve) =>
    axios(GET_STANDS_URL).then((res) => resolve({ data: res.data })))
}// GET Stands ENDS


// ADD Stand Start - What it does: 
// 1) Receiving the token and form_data of the new stands.
// 2) sending requset to the server to add the new stands data.
export function addStand(token, form_data) {
  return new Promise((resolve) =>
    axios.post(ADD_STAND_URL, form_data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "content-type": "multipart/form-data"
      },
    }).then((res) => resolve({ data: res.data }))
      .catch((err) => console.log(err)))
}
// ADD Stand ENDS



// DELETE Stand Start
export function deleteStand(token, id) {
  return new Promise((resolve) =>
    axios.delete(DELETE_STAND_URL + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// DELETE Stand ENDS

// UPDATE Stand Start
export function updateStand(stand_id, token, update_data) {
  return new Promise((resolve) =>
    axios.patch(UPDATE_STAND_URL + `${stand_id}/`, update_data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// UPDATE Stand ENDS