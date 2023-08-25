import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '../../components/common/header/Header.Component'
import FooterComponent from '../../components/common/footer/Footer.Component'
import FeaturedComponent from '../../components/featured/Featured.Component'
import NewProductComponent from '../../components/Products/NewProduct/NewProduct.Component'


const MainLayout:React.FC = () => {
  return (
<>
<HeaderComponent/>
{/* <FeaturedComponent/> */}
{/* <NewProductComponent/> */}
        <Outlet/>
{/* <FooterComponent/> */}
</>

  )
}

export default MainLayout