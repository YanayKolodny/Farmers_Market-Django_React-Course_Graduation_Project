import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loginOnArrival, getProfileAsync, selectUser_id } from './Slices/loginSlice'
import { getProductsAsync } from './Slices/productsSlice'
import { getStandsAsync, selectStands } from './Slices/standsSlice'
import { getCategoriesAsync } from './Slices/categoriesSlice';

import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  const dispatch = useDispatch()
  const user_id = useSelector(selectUser_id)

  useEffect(() => {
    dispatch(loginOnArrival())
  }, [])

  useEffect(() => {
    dispatch(getStandsAsync())
  }, [])

  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [])

  useEffect(() => {
    dispatch(getProductsAsync())
  }, [])

  const getProfileAfterLogin = () => {
    user_id && dispatch(getProfileAsync(user_id))
  }
  getProfileAfterLogin()

  return (
    <div className="App">
      <Header />
      <div className='MainContainer'>
        <Outlet />
      </div>
      <Footer />
    </div >
  );
}

export default App;
