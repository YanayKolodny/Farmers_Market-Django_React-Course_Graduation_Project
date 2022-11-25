import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectProds, getProductsAsync } from '../../Slices/productsSlice'
import { selectToken } from '../../Slices/loginSlice'
import { selectStands, selectFilteredStands, getStandsAsync } from '../../Slices/standsSlice'
import StandCard from './StandCard';
import AreaFilter from './AreaFilter';
import { Outlet } from 'react-router-dom';


// This component shows and allow to choose any stand the user wish to see it's products and information.
const StandsComponent = () => {
  const dispatch = useDispatch()
  const allStands = useSelector(selectStands)
  const FilteredStands = useSelector(selectFilteredStands)  // The stands objects according to the selected area
  const token = useSelector(selectToken)

  // useEffect to get all the stands data:
  useEffect(() => {
    dispatch(getStandsAsync())
  }, [])

  // useEffect to get all the products data:
  useEffect(() => {
    dispatch(getProductsAsync())
  }, [])

  return (
    <div>

      <div className="animate__animated animate__fadeIn" style={{ animationDuration: "1.8s", height: "10%" }}>
        <AreaFilter />
      </div>

      <div className="animate__animated animate__fadeIn" style={{ animationDuration: "2s" }}>
        <div className="stand_container">
          {/* If there's stands data in the FilteredStands list, itirationg threw it and presenting each stand via the StandCard component */}
          {FilteredStands.length > 0 && (
            FilteredStands.map((stand) => <StandCard key={stand._id} {...stand} />)
          )}
        </div>

        {/* Presenting the selected stand's page on the outlet: */}
        <div><Outlet /></div>
      </div >
    </div>
  )
}

export default StandsComponent