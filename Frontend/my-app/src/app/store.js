import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../Slices/registrationSlice'
import loginReducer from '../Slices/loginSlice'
import productsReducer from '../Slices/productsSlice';
import standCartReducer from '../Slices/standCartSlice';
import categoriesReducer from '../Slices/categoriesSlice';
import standsReducer from '../Slices/standsSlice'
import ordersReducer from '../Slices/ordersSlice'
import areaReducer from '../Slices/areaSlice'


// Assigning all the app's Reducers/Slicers:
export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
    products: productsReducer,
    standCart: standCartReducer,
    categories: categoriesReducer,
    stands: standsReducer,
    orders: ordersReducer,
    areas: areaReducer
  },
});
