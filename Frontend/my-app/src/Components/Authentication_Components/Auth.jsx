import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthFilter from './AuthFilter'


// This component is the main authentication page.
// The login and registration can be accessed from here and are presented in the Outlet.  
// It uses to AuthFilter component as navigation bar.

const Auth = () => {
  return (
    <div style={{ backgroundColor: "rgba(241,229,214,255)" }}>
      <AuthFilter />
      <Outlet />
    </div>
  )
}

export default Auth