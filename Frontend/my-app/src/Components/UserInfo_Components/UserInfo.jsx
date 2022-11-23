import React from 'react'
import { Outlet } from 'react-router-dom'
import UserMenufilter from './UserMenuFilter'




// This is the main component for a user to check his profile information and see his orders history.
const UserInfo = () => {

  return (
    <div>
      <UserMenufilter />
      <Outlet />
    </div>
  )
}

export default UserInfo