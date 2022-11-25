import React from 'react'
import { useSelector } from 'react-redux';

import { selectProds } from '../../../Slices/productsSlice'

import WebAdminProductsCard from './WebAdminProductsCard';

// This component is showes the products a stand owner have in his/her stand.
const WebAdminProducts = () => {
  const allProds = useSelector(selectProds)

  return (
    <div style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>

      <h3 style={{ position: "relative", left: "35%" }}>The Farmers Market Products:</h3>
      <div className='ProdsView'>
        {allProds.length < 1 ? (
          <div>
            <h3>
              It's the beggining of a new day! Let's see which products will be added...
            </h3>
          </div>)
          :
          (<div className="product_container">
            {allProds.map((product, key) => <><WebAdminProductsCard key={product.id} {...product} /></>)}
          </div>)}

      </div>
      <hr />
    </div >
  )
}

export default WebAdminProducts