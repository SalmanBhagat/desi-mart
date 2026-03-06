import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { SkeletonLoader } from "../loader/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, deleteFormCart } from "../../redux/cartSlice";
import SearchBar from "../searchBar/SearchBar";

const HomePageProductCard = () => {
  const navigate = useNavigate();

  // Context function
  const context = useContext(myContext);
  const {
    getAllProduct,
    loading,
    searchKey,
    setSearchKey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
  } = context;
  // Redux functions
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // add to Cart Function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.dismiss();
    toast.clearWaitingQueue();
    toast.success("Add to Cart");
  };

  // Delete to cart function
  const deleteCart = (item) => {
    dispatch(deleteFormCart(item));
    toast.dismiss();
    toast.clearWaitingQueue();
    toast.success("delete from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // -------- Filter Logic ---------//
  const filteredProducts = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(searchKey.toLowerCase()))
    .filter((obj) =>
      filterType
        ? obj.category.toLowerCase().includes(filterType.toLowerCase())
        : true,
    )
    .filter((obj) => {
      if (!filterPrice) return true;

      if (filterPrice === "0-500") return obj.price < 500;
      if (filterPrice === "500-1000")
        return obj.price >= 500 && obj.price <= 1000;
      if (filterPrice === "1000-5000")
        return obj.price >= 1000 && obj.price <= 5000;
      if (filterPrice === "5000+") return obj.price > 5000;

      return true;
    });
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-10">
      <SearchBar />

      {/* Section Title */}
      <div className="mb-6 md:mb-8 text-left">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-g-800">
          <span className="border-b-3 border-pink-600">Our La</span>test
          Collection
        </h1>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <SkeletonLoader key={i} type="product-card" />
          ))
        ) : filteredProducts.length === 0 ? (
          <>
            {/* EMPTY STATE */}
            <div className="col-span-full w-full flex justify-center">
              <div className="w-full bg-p-400/10 border border-pink-300 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center shadow-sm">
                {/* ICON */}
                <div className="mx-auto mb-4 sm:mb-6 flex h-12 w-12 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-p-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-6 w-6 sm:h-10 sm:w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 3h13M7 13l1.5 3M10 21a1 1 0 100-2 1 1 0 000 2zm8 1a1 1 0 100-2 1 1 0 000 2"
                    />
                  </svg>
                </div>

                {/* TEXT */}
                <h2 className="text-base sm:text-xl font-semibold text-p-600">
                  No products found
                </h2>

                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-g-600 leading-relaxed">
                  There are no products available for the selected category or
                  price range.
                </p>

                {/* ACTION */}
                <button
                  onClick={() => {
                    setFilterType("");
                    setFilterPrice("");
                    setSearchKey("");
                  }}
                  className="mt-4 sm:mt-6 inline-flex items-center justify-center rounded-lg bg-p-500 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white hover:bg-p-600 transition cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </>
        ) : (
          filteredProducts.slice(0, 16).map((item, index) => {
            const { id, title, price, productImageUrl } = item;
            return (
              <div
                key={index}
                className="bg-white rounded-lg md:rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* Image */}
                <div className="h-44 sm:h-48 md:h-56 flex items-center justify-center bg-white hover:scale-105 transition cursor-pointer">
                  <img
                    onClick={() => navigate(`/productinfo/${id}`)}
                    src={productImageUrl}
                    alt={title}
                    className="h-36 sm:h-40 md:h-44 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 bg-[#FAF9F6]">
                  {/* Tag */}
                  <h2 className="text-[10px] sm:text-xs text-g-400 font-medium mb-0.5">
                    E-bharat
                  </h2>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-g-800 truncate">
                    {title.substring(0, 35)}
                  </h3>

                  {/* Price */}
                  <p className="text-base sm:text-lg font-bold text-green-600 mt-1 sm:mt-2">
                    ₹{price}
                  </p>

                  {/* Button */}
                  {cartItems?.some((p) => p.id === item.id) ? (
                    <button
                      onClick={() => deleteCart(item)}
                      className="mt-3 sm:mt-4 w-full text-sm sm:text-base bg-p-400 text-white py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-p-500 transition cursor-pointer"
                    >
                      Delete from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addCart(item)}
                      className="mt-3 sm:mt-4 w-full text-sm sm:text-base bg-p-600 text-white py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-p-800 transition cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomePageProductCard;
