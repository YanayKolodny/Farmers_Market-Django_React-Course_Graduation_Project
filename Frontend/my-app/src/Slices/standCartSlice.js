import { createSlice } from '@reduxjs/toolkit';

// StandCart states - being used and updated by the methods in this slice:
const initialState = {
  StandCartProds: [],
  TotalPrice: 0
};

export const standCartSlice = createSlice({
  name: 'standCart',
  initialState,
  reducers: {
    // updCart Reducer is in charge of keeping the "CartProds" in sync with the local storage cart data.
    // It's also updates the total price of the cart.
    updStandCart: (state, action) => {
      let user_id = action.payload.user_id
      let stand_id = action.payload.stand_id

      if (JSON.parse(localStorage.getItem(`cart/user${user_id}/stand${stand_id}`)) == null) { state.StandCartProds = [] }
      else {
        let localStandCart = JSON.parse(localStorage.getItem(`cart/user${user_id}/stand${stand_id}`))
        localStandCart = Object.values(localStandCart)
        state.StandCartProds = localStandCart

        // Calculating the total price of the products in the cart and assigning it to the total price state.
        let sumTotal = 0
        state.StandCartProds.forEach(prod => sumTotal += prod.price * prod.amount)
        state.TotalPrice = sumTotal
      }
    },
    // addToCart Reducer is adding product to the cart on the local storage and to "CartProds"
    addToCart: (state, action) => {
      if (action.payload.newProd.amount < 1) { return }       // Check to see the added amount is more than 0

      let addedProd = action.payload.newProd          // Assigning addedProd as variable of the received product
      let stand_id = addedProd.stand_id._id               // Assigning the stand id from the added prod
      let user_id = action.payload.user_id            // Assigning the user id - to save the cart according to the user

      let localStandCart = JSON.parse(localStorage.getItem(`cart/user${user_id}/stand${stand_id}`))     // Assigning localStandCart as variable of the cart from the local storage
      if (localStandCart == null) {                   // Checking if the cart exist in the local storage - if not, creating it and add the received product to it                             
        localStorage.setItem(`cart/user${user_id}/stand${stand_id}`, JSON.stringify([addedProd]))
        state.StandCartProds = [addedProd]            // Updating the StandCartProds with the received product
        return
      }
      let check = false                               // Creating a flag for a check if the product is already exist in the cart
      localStandCart.forEach(prod => {                // Iterating the existing cart
        if (prod.id == addedProd.id) {                // Checking if each product id equals to the received product id
          prod["amount"] = addedProd["amount"]        // If it is so, updating the existing product amount to the received product amount
          check = true                                // Updating the flag - the product was already in the cart
        }
      });
      if (check == true) {                            // If the check happened, updating the cart: 
        localStorage.setItem(`cart/user${user_id}/stand${stand_id}`, JSON.stringify(localStandCart))    // Update the cart in the local storage
        state.StandCartProds = localStandCart         // Update the StandCartProds state
        return
      }
      localStandCart.push(addedProd)       // Adding the received product to the cart in both the local storage and the StandCartProds state:
      localStorage.setItem(`cart/user${user_id}/stand${stand_id}`, JSON.stringify(localStandCart))
      state.StandCartProds = localStandCart
      // The amount of the product is not yet being updated in the GUI - needs to be solved
    },
    // delFromCart Reducer is removing product from the stand-cart on the local storage and from StandCartProds state:
    delFromCart: (state, action) => {       // the method recives the product id and the stand id 
      let user_id = action.payload.user_id
      let stand_id = action.payload.stand_id
      let del_prod_id = action.payload.prod_id

      let localStandCart = JSON.parse(localStorage.getItem(`cart/user${user_id}/stand${stand_id}`))   // Assigning localStandCart as variable of the cart from the local storage
      localStandCart = localStandCart.filter((prod) => prod.id !== del_prod_id)                // Filter the deleted product out of the cart
      localStorage.setItem(`cart/user${user_id}/stand${stand_id}`, JSON.stringify(localStandCart))    // Updating the cart in the local storage 
      state.StandCartProds = localStandCart                                                               // Updating the StandCartProds state
    },
    // updProdInCart Reducer is updating the amount of a product in the local storage and on the StandCartProds state:
    updProdInCart: (state, action) => {     // the method recives the product id, the new amount and the stand id
      // Assinining all the attrebutes from the Payload:
      let user_id = action.payload.user_id
      let stand_id = action.payload.stand_id
      let upd_prod_id = action.payload.prod_id
      let newAmount = action.payload.newAmount


      let localStandCart = JSON.parse(localStorage.getItem(`cart/user${user_id}/stand${stand_id}`))   // Assigning localStandCart as variable of the cart from the local storage
      const index = localStandCart.findIndex(prod => { return prod.id == upd_prod_id })        // Finding and assigning the index of the product to be updated 

      if (newAmount < 1) {                                                       // Check if the updated amount is smaller than 0?
        localStandCart = localStandCart.filter((prod) => prod.id !== upd_prod_id)    // If so, erasing the product by filtering it out
        localStorage.setItem(`cart/user${user_id}/stand${stand_id}`, JSON.stringify(localStandCart))    // Updating the cart in the local storage
        state.StandCartProds = localStandCart                                                               // Updating the cart in the StandCartProds state
        return
      }
      localStandCart[index]["amount"] = newAmount  // Updating the amount of the product and than the cart in the local storage and the StandCartProds state
      localStorage.setItem(`cart/user${user_id}/stand${stand_id}`, JSON.stringify(localStandCart))
      state.StandCartProds = localStandCart
    },
    emptyCart: (state) => {
      state.StandCartProds = []
      state.TotalPrice = 0
    }

  },
});

// exports of the states and reducers:
export const { addToCart, updStandCart, delFromCart, updProdInCart, emptyCart } = standCartSlice.actions;
export const selectStandCartProds = (state) => state.standCart.StandCartProds;      // The cart of a stand
export const selectTotalPrice = (state) => state.standCart.TotalPrice;              // The total price of the products in the cart
export default standCartSlice.reducer;






