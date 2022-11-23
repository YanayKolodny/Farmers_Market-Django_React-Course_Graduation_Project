import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

import StandAdminMenuFilter from './StandAdminMenuFilter'

// This component uses as administration component for the stand owners.
// From here they can access the other admin components threw the AdminMenuFilter navBar.
const StandAdmin = () => {

  return (
    <div>
      <StandAdminMenuFilter />
      <Outlet />
    </div>
  )
}

export default StandAdmin