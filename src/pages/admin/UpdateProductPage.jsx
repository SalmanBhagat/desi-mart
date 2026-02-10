import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useEffect } from "react";

// Category List
const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  // Navigate
  const navigate = useNavigate();

  // UseParams
  const { id } = useParams();

  // Product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: serverTimestamp()
,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // get Single Product function
  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  

  // Update Product function
  const updateProductFunction = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Product updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error.code);
      toast.error("product update failed!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        {/* Main Title */}
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-7">
          Update Product
        </h2>

        <form className="space-y-4">
          {/* Product Title */}
          <input
            type="text"
            placeholder="Product Title"
            value={product.title}
            onChange={(e) => {
              setProduct({
                ...product,
                title: e.target.value,
              });
            }}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none
            placeholder-gray-400
            focus:ring-2 focus:ring-pink-500 focus:border-transparent
            "
          />

          {/* Product Price */}
          <input
            type="number"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => {
              setProduct({
                ...product,
                price: e.target.value,
              });
            }}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none
            placeholder-gray-400
            focus:ring-2 focus:ring-pink-500 focus:border-transparent
            "
          />

          {/* Product Image URL */}
          <input
            type="text"
            placeholder="Product Image URL"
            value={product.productImageUrl}
            onChange={(e) => {
              setProduct({
                ...product,
                productImageUrl: e.target.value,
              });
            }}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none
            placeholder-gray-400
            focus:ring-2 focus:ring-pink-500 focus:border-transparent
            "
          />

          {/* Product Type */}
          <select
            value={product.category}
            onChange={(e) => {
              setProduct({
                ...product,
                category: e.target.value,
              });
            }}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none
            focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-500"
          >
            <option disabled>Select Product Type</option>
            {categoryList?.map((value, index) => {
              const { name } = value;
              return (
                <option
                  className="first-letter:uppercase"
                  key={index}
                  value={name}
                >
                  {name}
                </option>
              );
            })}
          </select>

          {/* Product Description */}
          <textarea
            rows="3"
            placeholder="Product Description"
            value={product.description}
            onChange={(e) => {
              setProduct({
                ...product,
                description: e.target.value,
              });
            }}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none resize-none
            placeholder-gray-400
            focus:ring-2 focus:ring-pink-500 focus:border-transparent
            "
          ></textarea>

          {/* Button */}
          <button
            type="button"
            onClick={updateProductFunction}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-2 rounded-lg font-semibold
  hover:bg-pink-700 transition cursor-pointer
  ${loading && "opacity-70 cursor-not-allowed"}`}
          >
            {loading ? (
              <>
                {/* Circle Loader */}
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Loading...</span>
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
