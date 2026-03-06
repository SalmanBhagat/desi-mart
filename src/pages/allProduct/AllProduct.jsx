import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { SkeletonLoader } from "../../components/loader/SkeletonLoader";
import { addToCart, deleteFormCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaginationLogic from "../../components/pagination/Pagination";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

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
    toast.success("delete to cart");
  };

  // Pagination Logic
  const getPerPage = () => {
    if (window.innerWidth < 640) return 10; // mobile
    if (window.innerWidth < 1024) return 12; // tablet
    return 16; // desktop
  };

  const [perPage, setPerPage] = useState(getPerPage());

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(getAllProduct.length / perPage);

  const paginatedProducts = getAllProduct.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  useEffect(() => {
    const handleResize = () => {
      setPerPage(getPerPage());
      setCurrentPage(1); // important: reset page
    };

    localStorage.setItem("cart", JSON.stringify(cartItems));

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cartItems]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-10 mt-14">
        {/* Section Title */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-g-800">
            All Products
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-g-500 mt-1 md:mt-2">
            Discover our best quality products curated just for you
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonLoader key={i} type="product-card" />
              ))
            : paginatedProducts?.map((item, index) => {
                const { id, title, price, productImageUrl } = item;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg md:rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                  >
                    {/* Image */}
                    <div className="h-44 sm:h-48 md:h-56 flex items-center justify-center bg-white hover:scale-105 transition">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        src={productImageUrl}
                        alt={title}
                        className="h-36 sm:h-40 md:h-44 object-contain cursor-pointer"
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
              })}
        </div>
        {/* Pagination Bar */}
        <div className="px-4 mt-8">
          <PaginationLogic
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          >
            {({
              pages,
              currentPage,
              canGoPrev,
              canGoNext,
              goPrev,
              goNext,
              goToPage,
            }) => (
              <div className="flex items-cente p-3 justify-center gap-2 flex-wrap">
                {/* Prev */}
                <button
                  onClick={goPrev}
                  disabled={!canGoPrev}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition
    ${
      !canGoPrev
        ? "bg-pink-100 text-pink-300 cursor-not-allowed border border-p-100"
        : "bg-white border border-p-200 text-p-400 hover:bg-p-100 hover:text-black/60 cursor-pointer"
    }`}
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition cursor-pointer
              ${
                currentPage === page
                  ? "bg-p-400 text-white shadow"
                  : "bg-p-100 text-g-700 hover:bg-p-200"
              }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={goNext}
                  disabled={!canGoNext}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition
            ${
              !canGoNext
                ? "bg-pink-100 text-pink-300 cursor-not-allowed border border-p-100"
                : "bg-white border border-p-200 text-p-400 hover:bg-p-100 hover:text-black/60 cursor-pointer"
            }`}
                >
                  Next
                </button>
              </div>
            )}
          </PaginationLogic>
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
