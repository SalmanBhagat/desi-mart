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
      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {loading ? (
            <SkeletonLoader type="product-info" />
          ) : (
            <>
              {/* LEFT IMAGE */}
              <div className="bg-gray-100 flex items-center justify-center ">
                <img
                  src={product?.productImageUrl}
                  alt={product?.title}
                  className="w-100 h-100 object-contain hover:scale-105 transition duration-300"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="px-10 py-7 flex flex-col gap-5">
                {/* TITLE */}
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {product?.title}
                </h1>

                {/* RATING */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    <FaStar fill="currentColor" size={22} />
                    <FaStar fill="currentColor" size={22} />
                    <FaStar fill="currentColor" size={22} />
                    <FaStarHalfStroke fill="currentColor" size={22} />
                    <FaRegStar fill="currentColor" size={22} />
                  </div>
                  <span className="text-gray-500 text-sm">(4.5 rating)</span>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-semibold text-green-600">
                    ₹ {product?.price}
                  </span>
                  {/* <span className="text-gray-400 line-through text-lg">
              ₹3,499
            </span> */}
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-lg h-30 leading-relaxed">
                  {product?.description}
                </p>
                {/* BUTTON */}
                {
                    cartItems?.some((p) => p.id === product?.id)
                    ?
                     <button onClick={() => deleteCart(product)} className="mt-4 w-full bg-pink-400 text-white py-2 rounded-lg hover:bg-pink-500 transition">
                      Delete to Cart
                    </button>
                    : 
                     <button onClick={() => addCart(product)} className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-800 transition">
                      Add to Cart
                    </button>
                   }
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
