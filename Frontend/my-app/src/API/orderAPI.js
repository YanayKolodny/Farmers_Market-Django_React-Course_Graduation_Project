import axios from 'axios'
import { GET_ORDERS_URL, GET_USER_ORDERS_URL, GET_STAND_ORDERS_URL, GET_ORDER_PRODUCTS_URL, ADD_ORDER_URL } from './server_urls'


// GET userOrders Start - Get the orders that were made by a particular user:
export function getOrders(token) {
  return new Promise((resolve) =>
    axios(GET_ORDERS_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// GET userOrders ENDS


// GET userOrders Start - Get the orders that were made by a particular user:
export function getUserOrders(token, user_id) {
  return new Promise((resolve) =>
    axios(GET_USER_ORDERS_URL + `${user_id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// GET userOrders ENDS


// GET standOrders Start - Get the order that were made from a particular stand: 
export function getStandOrders(token, stand_id) {
  return new Promise((resolve) =>
    axios(GET_STAND_ORDERS_URL + `${stand_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// GET standOrders ENDS


// GET OrderProducts Start - Get the products of a particular order:
export function getOrderProducts(token, order_id) {
  return new Promise((resolve) =>
    axios(GET_ORDER_PRODUCTS_URL + `${order_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}
// GET OrderProducts ENDS

// Create Order Start - Ordering from a stand:
export function createOrder(token, order) {
  return new Promise((resolve) =>
    axios.post(ADD_ORDER_URL, order, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => resolve({ data: res.data })))
}// Create Order ENDS

// DELETE Order Start - Deleting an order - can be used by the superuser only:
// export function deleteOrder(token, id) {
//   return new Promise((resolve) =>
//     axios.delete(URL_SERVER + "delete/" + id, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }).then((res) => resolve({ data: res.data })))
//} 
// DELETE Order ENDS
