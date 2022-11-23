import React from 'react'
import { useSelector } from 'react-redux';

import { selectStands } from '../../../Slices/standsSlice'
import WebAdminStandsCard from './WebAdminStandsCard';

// This component is showes the products a stand owner have in his/her stand.
const WebAdminStands = () => {
  const stands = useSelector(selectStands)
  console.log("stands", stands)

  return (
    <div style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>

      <h3 style={{ position: "relative", left: "35%" }}>The Farmers Market Products:</h3>
      <div className='ProdsView'>

        <div className="product_container">
          {stands.map((stand, key) => <><WebAdminStandsCard key={stand.id} {...stand} /></>)}
        </div>

      </div>
      <hr />
    </div >
  )
}

export default WebAdminStands