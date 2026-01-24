import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { FiBox, FiTrash2 } from "react-icons/fi";
import { SkeletonLoader } from "../loader/SkeletonLoader";
import { GrEdit } from "react-icons/gr";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const context = useContext(myContext);

  const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
  // Navigate
  const navigate = useNavigate();

  // Delete product function
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product deleted successfully");
      getAllProductFunction();
      setLoading(false);
    } catch (error) {
      toast.error("deleted product failed!");
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {/* Card */}
      <div className="rounded-xl border border-pink-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-pink-400">
          <h2 className="text-xl font-semibold text-white">Product Details</h2>
          <Link
            to={"/addproduct"}
            className="bg-white text-pink-500 font-medium px-4 py-2 rounded-lg shadow hover:shadow-lg hover:scale-[101%] transition"
          >
            + Add Product
          </Link>
        </div>
        {/* Table */}
        <div className="overflow-x-auto  relative">
          <table className="w-full text-sm text-left">
            {/* Table Head */}
            <thead className="bg-pink-100 text-pink-700">
              <tr>
                <th className="px-6 py-3 font-semibold">S.No</th>
                <th className="px-6 py-3 font-semibold">Image</th>
                <th className="px-6 py-3 font-semibold">Product Name</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Price</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-pink-100">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : // Empty data design
              getAllProduct?.lenght === 0 ? (
                <tr>
                  <td colSpan={8} className="py-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-400 text-white">
                        <FiBox size={26} />
                      </div>
                      <p className="text-gray-700 text-lg font-semibold">
                        No products found
                      </p>
                      <p className="text-md text-gray-500">
                        Add your first product to see it here
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                // Products list Show for UI
                getAllProduct.map((item, index) => (
                  <tr key={index} className="hover:bg-pink-50 transition">
                    {/* S.No */}
                    <td className="px-6 py-4">{index + 1}</td>
                    {/* Image */}
                    <td className="px-6 py-4">
                      <img
                        src={item.productImageUrl}
                        alt="product"
                        className="w-16 h-16 object-contain bg-gray-100 rounded-lg"
                      />
                    </td>
                    {/* Title */}
                    <td className="px-6 py-4 font-medium">
                      <p className="max-w-[320px] truncate">{item.title}</p>
                    </td>
                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full font-bold bg-pink-100 text-pink-600">
                        {item.category}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-7 py-4 font-semibold text-gray-700 tabular-nums whitespace-nowrap">
                      ₹ {item.price}
                    </td>
                    {/* Date */}
                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                      {item.date}
                    </td>
                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => navigate(`/updateProduct/${item.id}`)}
                          className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                          title="Edit"
                        >
                          <GrEdit size={18} />
                        </button>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="p-2 rounded-full text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
