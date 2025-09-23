import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router";
import { asyncdeleteproduct, asyncupdatepoduct } from "../../store/Actions/ProductActions";
import { toast } from "react-toastify";
import { FaCartShopping } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { asyncupdateuser } from "../../store/Actions/UserActions";

const DetailsProduct = () => {
  const { products } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = products?.find((p) => p.id == id);

  const [isInCart , setIsInCart] = useState(()=>
    user?.cart?.some((ci)=>ci.product.id == product.id)
  )
  const [isInWatchList , setisInWatchList] = useState(()=>
    user?.watchList?.some((ci)=>ci.product.id == product.id)
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: product?.title,
      image: product?.image,
      description: product?.description,
      price: product?.price,
      category: product?.category,
    },
  });

  const updateProductHandler = (updatedProduct) => {
    dispatch(asyncupdatepoduct(product.id, updatedProduct));
    toast.success("Product updated successfully!");
    navigate("/");
  };

  const deleteProductHandler = () => {
    dispatch(asyncdeleteproduct(id));
    toast.success("Product Deleted successfully!");
    navigate("/");
  };

  const addCartHandler = ()=>{
    const copyuser = {...user , cart:[...user.cart]};
    setIsInCart(!isInCart);

    const index = copyuser.cart.findIndex((ci)=>ci.product.id == product.id);


    if (index == -1) {
      copyuser.cart.push({product:product,quantity:1});
    }else{
      copyuser.cart.splice(index, 1);
    }

    dispatch(asyncupdateuser(user.id , copyuser));
  }

  const addWatchListHandler = ()=>{
    const copyuser = {...user , watchList:[...user.watchList]};
    setisInWatchList(!isInWatchList);

    const index = copyuser.watchList.findIndex((ci)=>ci.product.id == product.id);


    if (index == -1) {
      copyuser.watchList.push({product:product,quantity:1});
    }else{
      copyuser.watchList.splice(index, 1);
    }

    dispatch(asyncupdateuser(user.id , copyuser));
  }

  return product ? (
    <div className="container mx-auto px-4 py-11">
      <button className='flex items-center fixed top-[8%] left-[1%] font-bold cursor-pointer' onClick={()=>navigate(-1)}><IoMdArrowRoundBack /><span>Back</span></button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-[2px_0px_5px] shadow-gray-500 p-6 hover:shadow-[2px_0px_6px_1px] transition-all duration-300">
          <img
            className="h-64 w-full object-contain mb-4 rounded"
            src={product?.image}
            alt={product?.title}
          />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product?.title}</h1>
          <p className="text-red-500 text-lg font-semibold mb-2">${product?.price}</p>
          <p className="text-gray-600 mb-4 leading-relaxed">{product?.description}</p>
          <div className="flex gap-8">
            <button onClick={addCartHandler} className={`text-[30px] cursor-pointer ${isInCart? "text-blue-500":"text-black"}`}>
              <FaCartShopping />
            </button>
            <button onClick={addWatchListHandler} className={`text-[30px] cursor-pointer ${isInWatchList? "text-blue-500":"text-black"}`}>
              <IoEye />
            </button>
          </div>
        </div>

        {/* Update Form */}
        {/* {user?.isAdmin &&( */}
        <form
          onSubmit={handleSubmit(updateProductHandler)}
          className="bg-white rounded-2xl shadow-[2px_0px_5px] shadow-gray-500 p-8 space-y-4 hover:shadow-[2px_0px_6px_1px] transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Product</h2>

          <div>
            <input
              {...register("image", { required: "Image is required" })}
              type="text"
              placeholder="Image URL"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-red-500 text-sm mt-1">{errors?.image?.message}</p>
          </div>

          <div>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Product Title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-red-500 text-sm mt-1">{errors?.title?.message}</p>
          </div>

          <div>
            <input
              {...register("price")}
              type="text"
              placeholder="Product Price"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              {...register("category")}
              type="text"
              placeholder="Product Category"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="Product Description"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 shadow cursor-pointer"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={deleteProductHandler}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 shadow cursor-pointer"
          >
            Delete Product
          </button>
        </form>

        {/* )} */}

      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>
  );
};

export default DetailsProduct;
