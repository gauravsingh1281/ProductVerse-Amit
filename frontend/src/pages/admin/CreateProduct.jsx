import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { asynccreateproduct } from "../../store/Actions/ProductActions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nevigate = useNavigate();

  const createProductHandler = (product) => {
    product.id = nanoid();
    dispatch(asynccreateproduct(product));
    toast.success("Product Added Successfully!");
    nevigate('/');
  };

  return (
    <div className="min-h-[93vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 py-6">

      {/* Back Button */}
      <button
        className="flex items-center absolute top-[7%] left-[1%] font-bold cursor-pointer"
        onClick={() => nevigate(-1)}
      >
        <IoMdArrowRoundBack />
        <span>Back</span>
      </button>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
        <img
          src="https://img.freepik.com/free-vector/new-product-concept-illustration_114360-7031.jpg?semt=ais_hybrid&w=740"
          alt="Add Product Illustration"
          className="w-[90%] max-w-[400px] rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(createProductHandler)}
        className="pb-5 w-full max-w-[400px] bg-gray-100 rounded-[15px] flex flex-col overflow-hidden shadow-md shadow-zinc-600 border"
      >
        <h1 className="text-[40px] text-center text-white bg-blue-500 py-[20px] rounded-b-[100px]">
          Create Product
        </h1>

        {/* Fields */}
        <input
          {...register("image", { required: "Image is Required" })}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="text"
          placeholder="Image URL"
        />
        <p className="text-red-500 ml-[30px]">{errors?.image?.message}</p>

        <input
          {...register("title", { required: "Title is Required" })}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="text"
          placeholder="Product Title"
        />
        <p className="text-red-500 ml-[30px]">{errors?.title?.message}</p>

        <input
          {...register("price")}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="text"
          placeholder="Product Price"
        />

        <input
          {...register("category")}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="text"
          placeholder="Product Category"
        />

        <textarea
          {...register("description")}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          placeholder="Product Description"
        ></textarea>

        <button
          className="bg-blue-500 mt-[20px] px-[10px] py-[10px] rounded-[5px] mx-[30px] font-bold text-[20px] text-white cursor-pointer"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
