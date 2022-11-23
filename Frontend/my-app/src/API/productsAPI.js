import axios from 'axios'
import { GET_PRODUCTS_URL, ADD_PRODUCT_URL, DELETE_PRODUCT_URL, UPDATE_PRODUCT_URL } from './server_urls'


// All the products related request to the server are for a user who's a stand owener or the superuser:

// GET Products Start - Get all the market's products:
export function getProducts() {
  return new Promise((resolve) =>
    axios(GET_PRODUCTS_URL).then((res) => resolve({ data: res.data })))
}// GET Products ENDS


// ADD Product Start - Add a product to a stand:
export function addProduct(token, form_data) {
  return new Promise((resolve) =>
    axios.post(ADD_PRODUCT_URL, form_data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "content-type": "multipart/form-data"
      },
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => console.log(err)))
}
// ADD Product ENDS


// DELETE Product Start - Delete product:
export function deleteProduct(token, id) {
  return new Promise((resolve) =>
    axios.delete(DELETE_PRODUCT_URL + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}// DELETE Product ENDS


// UPDATE Product Start - Update values of product:
export function updateProduct(token, updProd) {
  console.log("APi", updProd.id)
  return new Promise((resolve) =>
    axios.patch(UPDATE_PRODUCT_URL + `${updProd.id}/`, updProd, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}// UPDATE Product ENDS