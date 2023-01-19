import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../API/orderAPI'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrders, getUserOrders, getStandOrders, getOrderProducts } from '../API/orderAPI'

// Orders states - being used and updated by the methods in this slice:
const initialState = {
  AllOrders: [],
  UserOrders: [],
  StandOrders: [],
  OrderProducts: [],
  LastOrderDetails: { createdTime: "updating", standName: "Updating", order_id: "Updating" }
};

// GET AllOrdersAsync Start:
// 1. Sending the request for all the orders to the orders API - for the web administor (only the web admin can receive them).
// 2. send the response to the extraReducer to update the AllOrders state.
export const getOrdersAsync = createAsyncThunk(
  'orders/getOrders',
  async (token) => {
    const response = await getOrders(token);
    return response.data;
  });
// GET getUserOrdersAsync ENDS


// GET getUserOrdersAsync Start:
// 1. Sending the request for the user's orders to the orders API.
// 2. send the response to the extraReducer to update the UserOrders state.
export const getUserOrdersAsync = createAsyncThunk(
  'orders/getUserOrders',
  async (cred) => {
    const response = await getUserOrders(cred.token, cred.user_id);
    return response.data;
  });
// GET getUserOrdersAsync ENDS

// GET getStandOrdersAsync Start:
// 1. Sending the request for the stand's orders to the orders API.
// 2. send the response to the extraReducer to update the StandOrders state.
export const getStandOrdersAsync = createAsyncThunk(
  'orders/getStandOrders',
  async (cred) => {
    const response = await getStandOrders(cred.token, cred.stand_id);
    return response.data;
  });
// GET getStandOrdersAsync ENDS

// GET getOrderProductsAsync Start
// 1. Sending the request for the order's products to the orders API.
// 2. send the response to the extraReducer to update the OrderProducts state.
export const getOrderProductsAsync = createAsyncThunk(
  'orders/getOrderProducts',
  async (cred) => {
    const response = await getOrderProducts(cred.token, cred.order_id);
    return response.data;
  });
// GET getOrderProductsAsync ENDS

// Create Order Start
// 1. Arranging the orders information.
// 2. Sending the request to create an order to the orders API.
// 3. Send the user_id and stand_id to the extraReducer to delete the cart from the local storage.
export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (cred) => {
    let orderProducts = []
    cred.order.forEach(prod => { orderProducts.push({ prod_id: prod.id, amount: prod.amount }) });  // Arranging the products for the order
    const order = { stand_id: cred.stand_id, order: orderProducts }               // Arranging the order data
    const response = await createOrder(cred.token, order);           // sending the order to the api method

    // const createdTime = response.data.createdTime
    // const order_id = response.data.order_id
    // const standName = response.data.standName
    return {
      user_id: cred.user_id,
      stand_id: cred.stand_id,
      createdOrder: response.data
    };
  })
// ADD Create Order ENDS



export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    LastOrderDetailsEraser: (state, action) => {
      state.LastOrderDetails = { createdTime: "updating", standName: "Updating", order_id: "Updating" }
    },
  },
  extraReducers: (builder) => {
    builder
      // extraReducer to update the AllOrders state.
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.AllOrders = action.payload
      })
      // extraReducer to update the UserOrders state.
      .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
        state.UserOrders = action.payload
      })
      // extraReducer to update the StandOrders state.
      .addCase(getStandOrdersAsync.fulfilled, (state, action) => {
        state.StandOrders = action.payload
      })
      // extraReducer to update the OrderProducts state - to show any orders products:
      .addCase(getOrderProductsAsync.fulfilled, (state, action) => {
        state.OrderProducts = action.payload
      })
      // extraReducer to delete the cart from the local storage - after an order is complete:
      .addCase(createOrderAsync.fulfilled, (state, action) => { // Removing the cart from the local storage after order is made:
        localStorage.removeItem(`cart/user${action.payload.user_id}/stand${action.payload.stand_id}`)
        const createdTime = action.payload.createdOrder.createdTime
        const standName = action.payload.createdOrder.stand_id.standName
        const order_id = action.payload.createdOrder._id

        state.LastOrderDetails = { createdTime: createdTime, standName: standName, order_id: order_id }

      })
  },
});

// exports of the states and reducers:
export const { LastOrderDetailsEraser } = ordersSlice.actions;
export const selectOrders = (state) => state.orders.AllOrders;
export const selectUserOrders = (state) => state.orders.UserOrders;
export const selectStandOrders = (state) => state.orders.StandOrders;
export const selectOrderProducts = (state) => state.orders.OrderProducts;
export const selectLastOrderDetails = (state) => state.orders.LastOrderDetails;
export default ordersSlice.reducer;
