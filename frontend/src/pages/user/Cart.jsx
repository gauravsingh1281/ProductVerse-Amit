import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../../store/Actions/UserActions";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const IncreaseQuantity = (index) => {
    const copyuser = { ...user, cart: [...user.cart] };
    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1,
    };
    dispatch(asyncupdateuser(user.id, copyuser));
  };

  const DecreaseQuantity = (index) => {
    const copyuser = { ...user, cart: [...user.cart] };
    if (copyuser.cart[index].quantity === 1) {
      copyuser.cart.splice(index, 1);
    } else {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    }
    dispatch(asyncupdateuser(user.id, copyuser));
  };

  const cartDeleteHandler = (index) => {
    const copyuser = { ...user, cart: [...user.cart] };
    copyuser.cart.splice(index, 1);
    dispatch(asyncupdateuser(user.id, copyuser));
  };

  const total = user.cart.reduce(
    (acc, ci) => acc + ci.product.price * ci.quantity,
    0
  ).toFixed(2);

  return (
    <div className="p-4 sm:p-6">
      <button
        className="flex items-center font-bold text-lg mb-4 gap-1  hover:underline"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack />
        <span>Back</span>
      </button>

      <h1 className="text-right text-xl sm:text-2xl text-red-500 mb-4">
        <span className="text-black">Total Amount - </span>${total}
      </h1>

      <div className="flex flex-col gap-5">
        {user.cart.map((ci, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <img
              className="w-[120px] h-[120px] object-contain"
              src={ci.product.image}
              alt=""
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-lg sm:text-xl font-semibold">{ci.product.title}</h1>
              <p className="text-red-500 font-bold text-base">${ci.product.price}</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-lg sm:text-xl">
                <button
                  onClick={() => IncreaseQuantity(i)}
                  className="px-2 font-bold text-gray-700 bg-white border border-gray-300 rounded"
                >
                  +
                </button>
                <span>{ci.quantity}</span>
                <button
                  onClick={() => DecreaseQuantity(i)}
                  className="px-2 font-bold text-gray-700 bg-white border border-gray-300 rounded"
                >
                  -
                </button>
              </div>
              <button
                onClick={() => cartDeleteHandler(i)}
                className="text-red-500 text-3xl"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
