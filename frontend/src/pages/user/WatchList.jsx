import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { asyncupdateuser } from "../../store/Actions/UserActions";

const WatchList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const watchListDeleteHandler = (index) => {
    const copyuser = { ...user, watchList: [...user.watchList] };
    copyuser.watchList.splice(index, 1);
    dispatch(asyncupdateuser(user.id, copyuser));
  };

  return (
    <div className="p-4 sm:p-6">
      <button
        className="flex items-center  font-semibold gap-2 hover:underline mb-4"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack className="text-xl" />
        <span>Back</span>
      </button>

      <div className="flex flex-col gap-5">
        {user.watchList.map((ci, i) => (
          <div
            className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md gap-4"
            key={i}
          >
            <img
              className="w-[120px] h-[120px] object-contain"
              src={ci.product.image}
              alt={ci.product.title}
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-lg sm:text-xl font-medium">{ci.product.title}</h1>
              <p className="text-red-500 font-semibold">${ci.product.price}</p>
            </div>

            <button
              onClick={() => watchListDeleteHandler(i)}
              className="text-3xl text-red-500 hover:scale-110 transition"
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
