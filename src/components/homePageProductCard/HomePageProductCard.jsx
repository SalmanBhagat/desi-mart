import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { SkeletonLoader } from "../loader/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, deleteFormCart } from "../../redux/cartSlice";
import { HiOutlineSearch } from "react-icons/hi";
import SearchBar from "../searchBar/SearchBar";


// Product Data
// const productData = [
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Wireless Bluetooth Headphones",
//     desc: "High-quality wireless headphones with deep bass and long battery life.",
//     price: 1299,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Smart Fitness Band",
//     desc: "Track your steps, heart rate, and sleep with this smart fitness band.",
//     price: 999,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Portable Bluetooth Speaker",
//     desc: "Compact speaker with powerful sound and water-resistant body.",
//     price: 1599,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Fast Charging Power Bank",
//     desc: "10000mAh power bank with fast charging and dual USB output.",
//     price: 1199,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 5,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Noise Cancelling Earbuds",
//     desc: "True wireless earbuds with active noise cancellation feature.",
//     price: 1999,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 6,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Smart LED Desk Lamp",
//     desc: "Touch control LED lamp with adjustable brightness levels.",
//     price: 799,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 7,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Wireless Mouse",
//     desc: "Ergonomic wireless mouse with smooth tracking and long battery life.",
//     price: 599,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 8,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Mechanical Gaming Keyboard",
//     desc: "RGB mechanical keyboard with durable keys for gaming and typing.",
//     price: 2499,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 9,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Laptop Cooling Pad",
//     desc: "High-speed fan cooling pad to prevent laptop overheating.",
//     price: 899,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 10,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "USB Type-C Hub",
//     desc: "Multi-port USB-C hub with HDMI, USB, and SD card slots.",
//     price: 1499,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 11,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Smartphone Tripod Stand",
//     desc: "Flexible tripod stand for mobile photography and video recording.",
//     price: 499,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 12,
//     image:
//       "https://i.pinimg.com/736x/19/19/15/191915c8aab1dcf71bb41312c1ba9c53.jpg",
//     title: "Wireless Charging Pad",
//     desc: "Fast wireless charging pad compatible with all Qi devices.",
//     price: 1099,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
// ];

const HomePageProductCard = () => {
  const navigate = useNavigate();

  // Context function
  const context = useContext(myContext);
  const { getAllProduct, loading, searchKey, setSearchKey, filterType, setFilterType,filterPrice,  setFilterPrice } = context;
  // Redux functions
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // add to Cart Function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Add to Cart");
  };

  // Delete to cart function
  const deleteCart = (item) => {
    dispatch(deleteFormCart(item));
    toast.success("delete from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-10">
      <SearchBar/>

{/* Section Title */}
      <div className="mb-6 md:mb-8 text-left">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">
          <span className="border-b-3 border-pink-600">Our La</span>test Collection
        </h1>
        {/* <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 md:mt-2">
          Discover our best quality products curated just for you
        </p> */}
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonLoader key={i} type="product-card" />
            ))
          : getAllProduct.filter((obj) => obj.title.toLowerCase().includes(searchKey)).filter
          ((obj) => obj.category.toLowerCase().includes(filterType))
          .filter((obj) => {
    if (!filterPrice) return true; // All Prices

    // const price = Number(obj.price);

    if (filterPrice === "0-500") {
      return obj.price < 500;
    }

    if (filterPrice === "500-1000") {
      return obj.price >= 500 && obj.price <= 1000;
    }

    if (filterPrice === "1000-5000") {
      return obj.price >= 1000 && obj.price <= 5000;
    }

    if (filterPrice === "5000+") {
      return obj.price > 5000;
    }

    return true;
  }).map((item, index) => {
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
                    <h2 className="text-[10px] sm:text-xs text-gray-400 font-medium mb-0.5">
                      E-bharat
                    </h2>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
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
                        className="mt-3 sm:mt-4 w-full text-sm sm:text-base bg-pink-400 text-white py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-pink-500 transition"
                      >
                        Delete from Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(item)}
                        className="mt-3 sm:mt-4 w-full text-sm sm:text-base bg-pink-600 text-white py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-pink-800 transition"
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
  );
};

export default HomePageProductCard;