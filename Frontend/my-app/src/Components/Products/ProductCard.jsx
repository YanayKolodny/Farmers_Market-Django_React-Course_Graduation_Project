import React, { useState } from "react";
import { URL } from '../../API/server_urls'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from '../../Slices/standCartSlice'
import { selectUser_id, selectLogged } from '../../Slices/loginSlice'

// This component is the card to present a product:
export default function ProductCard(props) {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(1)
  const user_id = useSelector(selectUser_id)
  const logged = useSelector(selectLogged)
  // console.log("${URL}${props}", props)
  const logeinToBuy = () => toast("Please Register/Login if you wish to add products to the cart", { className: 'toast-message' });

  return (
    <div>
      <div>
        <ToastContainer
          autoClose={3000}
          closeOnClick
          theme="colored"
          style={{ position: "fixed", right: "35%", top: "20%", width: "500px", fontSize: "24px" }} />
      </div>

      <div key={props.id} className="box" style={{ minHeight: "400px" }}>
        <div>
          <img className="product_img"
            style={{ maxWidth: "250px", maxHeight: "200px", minHeight: "200px" }}
            src={`${URL}${props.image}`}
            alt="product" />
        </div>

        <div className="content" style={{ fontFamily: "monospace" }}>

          <div className="standTitle" style={{ textDecoration: "none", fontSize: "22px", fontWeight: "bold" }}>
            <span>{props.prodName}</span>
          </div>

          <div className="info" >
            <span>{props.price} ₪</span>
          </div>

          <div className="desc" >
            <span>{props.desc}</span>
          </div>

          {props.inStock && (
            <div>
              <span>How Many: <input type="number" placeholder={1} style={{ width: "40px" }} onChange={(e) => setAmount(parseInt(e.target.value))}></input>{"   "}</span>
            </div>
          )}

        </div>

        {/* If the user is logged the "add to cart" button will add the product to the cart,
        else it will open a toast that asks to register/login in order to add to the cart  */}
        {logged ? (<div className="boxBtn">
          {/* If the product is in stock the add to cart button will appear
          else an unfunctional out of stock button will appear                   */}
          {props.inStock == true ? (<button
            onClick={() => dispatch(addToCart(
              {
                newProd: {
                  prodName: props.prodName,
                  price: props.price,
                  amount: amount,
                  desc: props.desc,
                  id: props._id,
                  image: props.image,
                  stand_id: props.stand_id
                }
                , user_id: user_id
              }))}
            className="products_button buy_button" >
            Add to Cart
            <FiShoppingCart className="buy_icon" />
          </button>) : (
            <button className="products_button buy_button" style={{ backgroundColor: "#a5a998", cursor: "not-allowed" }}>Out Of Stock</button>
          )}
        </div>
        )
          :
          (<div className="boxBtn">
            <button className="products_button buy_button" onClick={logeinToBuy}>
              Add to Cart
              <FiShoppingCart className="buy_icon" />
            </button>
          </div>)}

      </div>
    </div>
  );
}
