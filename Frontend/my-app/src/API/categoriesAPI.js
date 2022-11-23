import axios from 'axios'
import { GET_CATEGORIES_URL, ADD_CATEGORY_URL, DELETE_CATEGORY_URL, UPDATE_CATEGORY_URL } from './server_urls'


// GET Categories Start - Getting the different stands categories:
export function getCategories() {
  return new Promise((resolve) =>
    axios(GET_CATEGORIES_URL).then((res) => resolve({ data: res.data })))
}// GET Categories END


// ADD Categories Start - adding a new category to a stand:
export function addCategory(token, form_data) {
  return new Promise((resolve) =>
    axios.post(ADD_CATEGORY_URL, form_data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "content-type": "multipart/form-data"
      },
    }).then((res) => resolve({ data: res.data })))
}// ADD Categories END

// DELETE Categories Start:
export function deleteCategory(token, _id) {
  return new Promise((resolve) =>
    axios.delete(DELETE_CATEGORY_URL + _id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}// DELETE Categories END

// UPDATE Categories Start - Changing a category name:
export function updateCategory(token, newCatName, category_id) {
  return new Promise((resolve) =>
    axios.put(UPDATE_CATEGORY_URL + `${category_id}/`, newCatName, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}// UPDATE Categories END