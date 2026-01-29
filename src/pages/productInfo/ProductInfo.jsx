import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import { FaStarHalfStroke } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/MyContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { SkeletonLoader } from "../../components/loader/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFormCart } from "../../redux/cartSlice";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { getAllProduct, loading, setLoading } = context;
  // state
  const [product, setProduct] = useState("");

  // useParams
  const { id } = useParams();

  // GetProduct Function
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({...productTemp.data(), id : productTemp.id});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // redux toolkit functions
   const cartItems = useSelector(state => state.cart);
   const dispatch = useDispatch();

  //  Add to cart
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Add to cart");
  }

  // delete from cart function
  const deleteCart = (item) => {
    dispatch(deleteFormCart(item));
    toast.success("Delete form Cart");
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    getProductData();
  }, [cartItems]);

  return (
    <Layout>
      <div className="max-w-5xl mx-6 lg:mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden mt-20 mb-6 sm:mt-20 sm:mb-6 md:mt-28">
  <div className="grid grid-cols-1 md:grid-cols-2">
    {loading ? (
      <SkeletonLoader type="product-info" />
    ) : (
      <>
        {/* LEFT IMAGE */}
        <div className="border-b md:border-b-0 md:border-r border-gray-200 flex items-center justify-center p-4 sm:p-6">
          <img
            src={product?.productImageUrl}
            alt={product?.title}
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 
                       object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="px-5 sm:px-7 md:px-10 py-6 md:py-7 flex flex-col gap-3 sm:gap-4 md:gap-5">
          
          {/* TITLE */}
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900 leading-snug">
            {product?.title}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStarHalfStroke size={16} />
              <FaRegStar size={16} />
            </div>
            <span className="text-xs sm:text-sm text-gray-500">
              (4.5 rating)
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600">
              ₹ {product?.price}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          {/* BUTTON */}
          {cartItems?.some((p) => p.id === product?.id) ? (
            <button
              onClick={() => deleteCart(product)}
              className="mt-3 sm:mt-4 w-full text-sm sm:text-base 
                         bg-pink-400 text-white py-1.5 sm:py-2 
                         rounded-md sm:rounded-lg hover:bg-pink-500 transition"
            >
              Delete from Cart
            </button>
          ) : (
            <button
              onClick={() => addCart(product)}
              className="mt-3 sm:mt-4 w-full text-sm sm:text-base 
                         bg-pink-600 text-white py-1.5 sm:py-2 
                         rounded-md sm:rounded-lg hover:bg-pink-800 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </>
    )}
  </div>
</div>

    </Layout>
  );
};

export default ProductInfo;
