import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { asyncsignupuser } from "../../store/Actions/UserActions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const nevigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  const signUpHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    user.watchList = [];
    dispatch(asyncsignupuser(user));
    toast.success("User Registered Successfully!");
    nevigate('/signin');
  };

  return (
    <div className="min-h-[93vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 py-6">

      {/* Back Button */}
      <button
        className="flex items-center absolute top-[8%] left-[1%] font-bold cursor-pointer"
        onClick={() => nevigate(-1)}
      >
        <IoMdArrowRoundBack />
        <span>Back</span>
      </button>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
        <img
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
          alt="Sign Up Illustration"
          className="w-[90%] max-w-[400px] rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(signUpHandler)}
        className="h-auto w-full max-w-[400px] bg-gray-100 rounded-[15px] flex flex-col overflow-hidden shadow-md shadow-zinc-600 border"
      >
        <h1 className="text-[40px] text-center text-white bg-blue-500 py-[20px] rounded-b-[100px]">
          Sign Up
        </h1>

        <input
          {...register("imageURL", { required: "Image is Required" })}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="url"
          placeholder="imageURL"
          autoComplete="imageURL"
        />
        <p className="text-red-500 ml-[30px]">{errors?.imageURL?.message}</p>

        <input
          {...register("name", { required: "Name is Required" })}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="text"
          placeholder="name"
          autoComplete="name"
        />
        <p className="text-red-500 ml-[30px]">{errors?.name?.message}</p>

        <input
          {...register("email", { required: "Email is Required" })}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="email"
          placeholder="email"
          autoComplete="email"
        />
        <p className="text-red-500 ml-[30px]">{errors?.email?.message}</p>

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Minimum 4 digit password is required"
            } 
          })}
          className="bg-white px-[10px] py-[10px] rounded-[5px] mx-[30px] mt-[20px] border"
          type="password"
          placeholder="password"
          autoComplete="new-password"
        />
        <p className="text-red-500 ml-[30px]">{errors?.password?.message}</p>

        <button
          className="bg-blue-500 mt-[20px] px-[10px] py-[10px] rounded-[5px] mx-[30px] font-bold text-[20px] text-white cursor-pointer"
        >
          Sign Up
        </button>

        <p className="font-thin text-black mt-[10px] text-center mb-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 cursor-pointer">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
