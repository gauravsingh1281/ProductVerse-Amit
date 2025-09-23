import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import CreateProduct from '../pages/admin/CreateProduct';
import DetailsProduct from '../pages/admin/DetailsProduct';
import Cart from '../pages/user/Cart';
import WatchList from '../pages/user/WatchList';

const Unauth = lazy(() => import("./Unauth"));
const Auth = lazy(() => import("./Auth"));
const Signup = lazy(() => import("../pages/user/Signup"));
const Settings = lazy(() => import("../pages/user/Settings"));
const Product = lazy(() => import("../pages/Product"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const About = lazy(() => import("../pages/About"));
const Signin = lazy(() => import("../pages/user/Signin"));


const MainRoutes = ({ query , setQuery }) => {
  return (
    <Routes>
      <Route path='/' element={<Product query={query} setQuery={setQuery} />} />

      <Route path='/about' element={<About />} />
      <Route path='*' element={<PageNotFound />} />

      <Route path='/signin' element={
        <Unauth>
          <Signin />
        </Unauth>
      } />
      <Route path='/signup' element={
        <Unauth>
          <Signup />
        </Unauth>
      } />

      <Route path='/settings' element={
        <Auth>
          <Settings />
        </Auth>
      } />

      <Route path='/create-product' element={
        <Auth>
          <CreateProduct />
        </Auth>
      } />

      <Route path='/product-info/:id' element={
        <Auth>
          <DetailsProduct />
        </Auth>
      } />

      <Route path='/cart' element={
        <Auth>
          <Cart />
        </Auth>
      } />

      <Route path='/watchlist' element={
        <Auth>
          <WatchList />
        </Auth>
      } />

    </Routes>
  )
}

export default MainRoutes
