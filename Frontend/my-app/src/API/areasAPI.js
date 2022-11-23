import axios from 'axios'
import { GET_AREAS_URL, ADD_AREA_URL, DELETE_AREA_URL, UPDATE_AREA_URL } from './server_urls'


// GET Categories Start - Getting the different stands categories:
export function getAreas(token) {
  return new Promise((resolve) =>
    axios(GET_AREAS_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// GET Categories END


// ADD Area Start - adding a new area:
export function addArea(addAreaRequest) {
  return new Promise((resolve) =>
    axios.post(ADD_AREA_URL, addAreaRequest.newArea, {
      headers: {
        'Authorization': `Bearer ${addAreaRequest.token}`
      },
    }).then((res) => resolve({ data: res.data })))
}
// ADD Categories END

// DELETE Area Start:
export function deleteArea(token, _id) {
  return new Promise((resolve) =>
    axios.delete(DELETE_AREA_URL + _id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// DELETE Area END

// UPDATE Categories Start - Changing a category name:
export function updateArea(token, area_id, newAreaName) {
  return new Promise((resolve) =>
    axios.put(UPDATE_AREA_URL + `${area_id}/`, newAreaName, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// UPDATE Categories END