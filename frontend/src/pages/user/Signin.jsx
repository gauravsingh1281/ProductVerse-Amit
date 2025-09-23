import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncsigninuser } from "../../store/Actions/UserActions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Signin = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useSelector((state) => state.userReducer);

  const signInHandler = (user) => {
    dispatch(asyncsigninuser(user));
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

      {/* Image Section - Visible on all screen sizes, stacked on mobile */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
          alt="Sign In Illustration"
          className="w-[90%] max-w-[400px] rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(signInHandler)}
        className="h-auto w-full max-w-[400px] bg-gray-100 rounded-[15px] flex flex-col overflow-hidden shadow-md shadow-zinc-600 border"
      >
        <h1 className="text-[40px] text-center text-white bg-blue-500 py-[20px] rounded-b-[100px]">
          Sign In
        </h1>

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
              message: "minimum 4 digit password is required"
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
          Sign In
        </button>

        <p className="font-thin text-black mt-[10px] text-center mb-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 cursor-pointer">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
