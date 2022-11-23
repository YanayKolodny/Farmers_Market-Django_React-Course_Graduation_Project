import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import "../../StyleSheets/Products.css";
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { Grid } from '@mui/material';

import { selectStandProducts, selectFilteredStandProducts } from '../../Slices/productsSlice'
import { updStandCart, selectStandCartProds } from '../../Slices/standCartSlice'
import { selectUser_id } from '../../Slices/loginSlice'

// This product is presenting the products and the navBar between the categories:
const StandProductsPage = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const standProds = useSelector(selectStandProducts)
  const FilteredStandProducts = useSelector(selectFilteredStandProducts)
  const standCartProds = useSelector(selectStandCartProds)
  const user_id = useSelector(selectUser_id)
  const stand_id = params.stand_id

  console.log("standProds", standProds)

  useEffect(() => {
    dispatch(updStandCart({ stand_id: stand_id, user_id: user_id }))
  }, [standCartProds.length, standCartProds.value])

  return (
    <div>
      <div >
        <div className="animate__animated animate__fadeIn" style={{ animationDuration: "1.8s" }}>
          <CategoryFilter stand_id={{ stand_id }} />
        </div>

        <div className="animate__animated animate__fadeIn" style={{ animationDuration: "2s", marginTop: "20px" }}>
          <Grid container spacing={0} >
            <Grid item md={12} alignItems="center">
              <div className="product_container">
                {standProds && (
                  FilteredStandProducts.map((product, key) => <><ProductCard key={product.id} {...product} /></>)
                )}
              </div>
            </Grid>
          </Grid>
        </div>

      </div >
    </div>
  )
}

export default StandProductsPage