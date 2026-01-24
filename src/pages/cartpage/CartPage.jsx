// import { Trash2, Plus, Minus } from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import { BsCartX, BsTrash3 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  deleteFormCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
// import toast from "react-toastify"
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const CartPage = () => {
  const navigate = useNavigate();

  // Redux functions
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // delete form cart fuction
  const deleteCart = (item) => {
    dispatch(deleteFormCart(item));
    toast.success("delete to cart");
  };

  // Increment Quentity function
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  // Decrement Quentity function
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  // CartItem total
  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  // Cart Total
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ----------- Buy Now Finction ------------//
  // LocalStorage to get users
  const user = JSON.parse(localStorage.getItem("users"));

  // Address Info state
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  //   Buy now function
  const buyNowFunction = () => {
    const { name, address, pincode, mobileNumber } = addressInfo;
    // validation
    if (!name || !address || !pincode || !mobileNumber) {
      return toast.success("All Feild are required!");
    }

    // Order info obj
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userId: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
    const orderRef = collection(fireDB, "order");
    addDoc(orderRef, orderInfo);
    setAddressInfo({
      name: "",
      address: "",
      pincode: "",
      mobileNumber: "",
    })
    toast.success("Order Placed Successfully");
  } catch (error) {
    console.log(error);
  }

  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

        {cartItems?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT CART ITEMS */}
            <div className="lg:col-span-2 space-y-6 bg-gray-50 rounded-xl p-4">
              {cartItems.map((item) => {
                const {
                  id,
                  title,
                  productImageUrl,
                  category,
                  price,
                  quantity,
                } = item;
                return (
                  <div
                    key={id}
                    className="flex gap-6 border-b pb-6 last:border-none"
                  >
                    {/* Image */}
                    <img
                      src={productImageUrl}
                      alt={title}
                      className="w-33 h-33 object-contain bg-gray-50 rounded-lg"
                    />
                    {/* Info */}
                    <div className="flex-1">
                      
                      <h2 className="font-semibold text-lg">{title}</h2>
                      <p className="text-sm text-gray-500 mt-1"> {category} </p>
                      {/* Price */}
                      <div className="flex items-center gap-3 mt-2">
                        
                        <span className="font-semibold text-lg text-green-600">
                          
                          ₹{price.toLocaleString()}
                        </span>
                        {/* <span className="line-through text-gray-400 text-sm"> ₹{item.originalPrice.toLocaleString()} </span> <span className="text-green-600 text-sm"> {discount} </span> */}
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-6 mt-4">
                        
                        {/* Quantity */}
                        <div className="flex items-center border rounded-md">
                          
                          <button
                            onClick={() => handleDecrement(id)}
                            className="px-3 py-1 cursor-pointer"
                          >
                            
                            <FaMinus size={12} />
                          </button>
                          <span className="px-4">{quantity}</span>
                          {/* <input type="text" value={quantity} className="w-2 mx-4" /> */}
                          <button
                            onClick={() => handleIncrement(id)}
                            className="px-3 py-1 cursor-pointer"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        {/* Remove */}
                        <button
                          onClick={() => deleteCart(item)}
                          className="flex items-center gap-1 text-red-500 text-sm cursor-pointer"
                        >
                          
                          <BsTrash3 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT PRICE DETAILS */}
            <div className="bg-gray-50 rounded-xl p-6 h-fit">
              <h2 className="font-semibold text-lg mb-4">Price Details</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Price ({cartItemTotal} items)</span>
                  <span>₹{cartTotal}</span>
                </div>

                {/* <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹3,431</span>
            </div> */}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-base">
                  <span>Total Amount</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              {user
                ? <BuyNowModal addressInfo={addressInfo} setAddressInfo={setAddressInfo} buyNowFunction={buyNowFunction}/>
                : <Navigate to={"/login"}/>
              }
            </div>
          </div>
        ) : (
          // ✅ EMPTY CART STATE (FULL WIDTH)
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-pink-400/10 rounded-xl border border-pink-200 text-center">
            {/* Icon */}
            <div className="bg-pink-400 text-white rounded-full p-5 mb-4">
              <BsCartX size={36} />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-pink-600">
              Your cart is empty
            </h2>

            {/* Description */}
            <p className="text-gray-600 mt-2 max-w-sm">
              Looks like you haven’t added anything to your cart yet. Start
              shopping to see products here.
            </p>

            {/* Action Button */}
            <button
              className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition"
              onClick={() => navigate("/allproduct")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
