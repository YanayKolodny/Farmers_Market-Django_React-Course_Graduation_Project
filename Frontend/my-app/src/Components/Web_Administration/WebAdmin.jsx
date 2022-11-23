import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectUser_id, selectToken } from '../../Slices/loginSlice'
import { getOrdersAsync, selectOrders } from '../../Slices/ordersSlice'
import { getAreasAsync, selectAreas } from '../../Slices/areaSlice'
import WebAdminMenuFilter from './WebAdminMenuFilter';



// This component uses as administration component for the stand owners.
// From here they can access the other admin components threw the AdminMenuFilter navBar.
const WebAdmin = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const orders = useSelector(selectOrders)


  useEffect(() => {
    dispatch(getOrdersAsync(token))
  }, [orders.length])

  useEffect(() => {
    dispatch(getAreasAsync(token))
  }, [])

  return (
    <div>
      <WebAdminMenuFilter />
      <Outlet />
    </div>
  )
}

export default WebAdmin