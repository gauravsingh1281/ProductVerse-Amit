import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { asyncupdateuser } from "../store/Actions/UserActions";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState } from "react";

const ProductTemplate = ({ p }) => {
  const { user } = useSelector((state) => state.userReducer);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const [isInCart, setIsInCart] = useState(() =>
    user?.cart?.some((ci) => ci.product.id === p.id)
  );;
  const [isInWatchList, setIsInWatchList] = useState(() =>
    user?.watchList?.some((ci) => ci.product.id === p.id)
  );;

  const addCartHandler = () => {
    if (!user) return nevigate("/signin");
    const copyuser = { ...user, cart: [...(user.cart || [])] };
    setIsInCart(!isInCart);

    const index = copyuser.cart.findIndex((ci) => ci.product.id == p.id);

    if (index == -1) {
      copyuser.cart.push({ product: p, quantity: 1 });
    } else {
      // copyuser.cart[index] = {
      //   ...copyuser.cart[index],
      //   quantity: copyuser.cart[index].quantity + 1,
      // };
      copyuser.cart.splice(index, 1);
    }

    dispatch(asyncupdateuser(user.id, copyuser));
  };

  const addWatchListHandler = () => {
    if (!user) return nevigate("/signin");
    const copyuser = { ...user, watchList: [...(user.watchList || [])] };
    setIsInWatchList(!isInWatchList);

    const index = copyuser.watchList.findIndex((ci) => ci.product.id == p.id);

    if (index == -1) {
      copyuser.watchList.push({ product: p, quantity: 1 });
    } else {
      // copyuser.cart[index] = {
      //   ...copyuser.cart[index],
      //   quantity: copyuser.cart[index].quantity + 1,
      // };
      copyuser.watchList.splice(index, 1);
    }

    dispatch(asyncupdateuser(user.id, copyuser));
  };
  return (
    <div
      title={p.title}
      key={p.id}
      className="w-[350px]  mb-5 shadow-[0px_0pX_5px_2px] shadow-gray-500 px-2 py-3 rounded"
    >
      <div className='px-2'>
        <img className="h-[30vh] mx-auto block" src={p.image} alt="" />
        <h1 className=" mt-3 text-2xl">{p.title.slice(0, 15)}...</h1>
        <p className="text-red-400 font-bold">${p.price}</p>
        <p className='h-[10vh]'>{p.description.slice(0, 80)}...</p>
        <div className="mt-2 p-2 w-full flex justify-between items-center">
          <div className="flex gap-5">
            <button onClick={addCartHandler} className={`text-[22px] cursor-pointer ${isInCart ? "text-blue-500" : "text-black"}`}><FaCartShopping /></button>
            <button onClick={addWatchListHandler} className={`text-[25px] cursor-pointer ${isInWatchList ? "text-blue-500" : "text-black"} `}><IoEye /></button>
          </div>
          <Link className='text-[22px] cursor-pointer hover:text-blue-500' to={`/product-info/${p.id}`}><IoMdInformationCircleOutline /></Link>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
