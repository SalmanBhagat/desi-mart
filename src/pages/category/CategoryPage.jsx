import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { SkeletonLoader } from "../../components/loader/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFormCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Context
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;



  const filterProduct = getAllProduct?.filter((obj) =>
    obj.category.includes(categoryname),
  );

  const skeletonCount = 4;

  // add to cart Function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("add to Cart");
  };

  // delete from cart
  const deleteCart = (item) => {
    dispatch(deleteFormCart(item));
    toast.success("Delete form Cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  },[cartItems])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 mt-14.25">
        <div className="flex flex-wrap justify-center gap-6">
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={i} className="w-73.5">
                  <SkeletonLoader type="product-card" />
                </div>
              ))
            : filterProduct.map((item, index) => {
                const { id, title, price, productImageUrl } = item;
                return (
                  <div
                    key={index}
                    className="
                bg-white rounded-xl shadow-md hover:shadow-xl
                transition duration-300 overflow-hidden
                w-73.5
              "
                  >
                    {/* Image */}
                    <div className="h-56 flex items-center justify-center bg-white transform transition-all duration-300 ease-out hover:scale-105">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        src={productImageUrl}
                        alt={title}
                        className="h-50 object-contain cursor-pointer"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 bg-[#FAF9F6]">
                      <h2 className="text-sm text-gray-400 mb-1">E-bharat</h2>

                      <h3 className="font-semibold truncate">
                        {title.substring(0, 35)}
                      </h3>

                      <p className="text-lg font-bold text-green-600 mt-2">
                        ₹{price}
                      </p>

                      {/* Buttons */}
                      {cartItems?.some((p) => p.id === item.id) ? (
                        <button
                          onClick={() => deleteCart(item)}
                          className="mt-4 w-full bg-pink-400 text-white py-2 rounded-lg hover:bg-pink-500 transition"
                        >
                          Delete to Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(item)}
                          className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-800 transition"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
