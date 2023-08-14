import React from 'react'

import {Routes,Route} from 'react-router-dom'
import NotFoundPage from '../pages/notFound/NotFound.Page'
import ProductPage from '../pages/product/Product.Page'
import CustomerPage from '../pages/customer/Customer.Page'
import HomePage from '../pages/home/Home.Page'
// import UserPage from '../pages/user/User.Page'
import OrderPage from '../pages/Order/Order.Page'


const Router:React.FC = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage/>}>
        <Route path="customers" element={<CustomerPage/>}/>
        <Route path="products" element={<ProductPage/>}/>
        <Route path="orders" element={<OrderPage/>}/>
        </Route>
        {/* <Route path="/admin" element={<HomePage/>}>
        <Route path="users" element={<UserPage/>}/> */}
        {/* </Route> */}
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default Router