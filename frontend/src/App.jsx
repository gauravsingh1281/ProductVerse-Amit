import { useEffect, useState } from 'react';
import Nav from './components/Nav'
import MainRoutes from './routes/MainRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { asynccurrentuser } from './store/Actions/UserActions';
import { asyncloadpoducts } from './store/Actions/ProductActions';

const App = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.userReducer);
  const {products} = useSelector((state)=>state.productReducer);
  const [query , setQuery] = useState('');
  
  useEffect(()=>{
    !user && dispatch(asynccurrentuser());
  },[user]);

  useEffect(()=>{
    products.length == 0 && dispatch(asyncloadpoducts());
  },[]);

  return (
    <div className="py-10 font-thin ">
      <Nav setQuery={setQuery} query={query} />
      <MainRoutes  query={query} setQuery={setQuery} />
    </div>
  )
}

export default App
