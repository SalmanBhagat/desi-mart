import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { FiBox, FiTrash2 } from "react-icons/fi";
import { SkeletonLoader } from "../loader/SkeletonLoader";
import { GrEdit } from "react-icons/gr";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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

  // Pagination Logic
  const getPerPage = () => {
    if (window.innerWidth < 640) return 5; // mobile
    if (window.innerWidth < 1024) return 8; // tablet
    return 10; // desktop
  };

  const [perPage, setPerPage] = useState(getPerPage());

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(getAllProduct.length / perPage);

  const paginatedData = getAllProduct.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  useEffect(() => {
    const handleResize = () => {
      setPerPage(getPerPage());
      setCurrentPage(1); // important: reset page
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-6">
      {/* Card */}
      <div className="rounded-xl border border-pink-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-p-400">
          <h2 className="text-xl font-semibold text-white">Product Details</h2>

          <Link
            to={"/addproduct"}
            className="bg-white text-p-500 font-medium px-4 py-2 rounded-lg shadow hover:shadow-lg hover:scale-[101%] transition"
          >
            + Add Product
          </Link>
        </div>

        {/* Table */}
        <div className="hide-scroll-bar overflow-x-auto bg-white">
          <table className=" w-full text-sm text-left">
            {/* Table Head */}
            <thead className="bg-p-100 text-p-700">
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
              ) : getAllProduct?.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-p-400 text-white">
                        <FiBox size={26} />
                      </div>

                      <p className="text-g-700 text-lg font-semibold">
                        No products found
                      </p>

                      <p className="text-md text-g-500">
                        Add your first product to see it here
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-p-50 transition">
                    {/* S.No */}
                    <td className="px-6 py-4">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>

                    {/* Image */}
                    <td className="px-6 py-4">
                      <img
                        src={item.productImageUrl}
                        alt="product"
                        className="w-16 h-16 object-contain bg-white rounded-lg"
                      />
                    </td>

                    {/* Title */}
                    <td className="px-6 py-4 font-medium">
                      <p className="max-w-[320px] truncate">{item.title}</p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full font-bold bg-p-100 text-p-600 capitalize">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-7 py-4 font-semibold text-g-700 tabular-nums whitespace-nowrap">
                      ₹ {item.price}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-g-500 text-xs whitespace-nowrap">
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

        {/* Pagination */}
        <div className="border-t border-pink-100 bg-white px-4 py-5">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-g-600 hidden sm:block">
              Page <b>{currentPage}</b> of <b>{totalPages}</b>
            </p>

            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                shape="rounded"
                siblingCount={0}
                boundaryCount={1}
                sx={{
                  "& .MuiPaginationItem-root": {
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    borderRadius: "8px",
                  },

                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#fdf2f8",
                  },

                  "& .Mui-selected": {
                    backgroundColor: "#F6339A !important",
                    color: "white",
                    borderColor: "#ec4899",
                  },
                  /* Disabled buttons (Prev / Next) */
                  "& .MuiPaginationItem-root.Mui-disabled": {
                    cursor: "not-allowed",
                    color: "#9ca3af",
                    borderColor: "#e5e7eb",
                    pointerEvents: "auto",
                  },

                  /* Ellipsis (...) styling */
                  "& .MuiPaginationItem-ellipsis": {
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    height: "32px",
                    minWidth: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
