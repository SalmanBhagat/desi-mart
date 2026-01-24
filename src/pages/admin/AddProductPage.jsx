import { useContext, useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

// Category List
const categoryList = [
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
    name: "books",
  },
  {
    name : "watch",
  }
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // Navigate
  const navigate = useNavigate();

  // Product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time : Timestamp.now().toMillis(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProductFunction = async () => {
    // product state varieble se value destructure kiya direct
    const { title, price, productImageUrl, category, description } = product;

    // Validation
    if (!title || !price || !productImageUrl || !category || !description) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add Product Successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
      toast.error("Add Product Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        {/* Main Title */}
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-7">
          Add New Product
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
            <option disabled value="elect Product Type">Select Product Type</option>
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
            onClick={addProductFunction}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-2 rounded-lg font-semibold
  hover:bg-pink-700 transition
  ${loading && "opacity-70 cursor-not-allowed"}`}
          >
            {loading ? (
              <>
                {/* Circle Loader */}
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Loading...</span>
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
