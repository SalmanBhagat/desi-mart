import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { SkeletonLoader } from "../loader/SkeletonLoader";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, orderDelete, loading, getAllProductFunction } = context;

  let rowNo = 1;

  const [showAll, setShowAll] = useState(false);

  const visibleOrders = showAll
  ? getAllOrder
  : getAllOrder.slice(0, 8);

  return (
    <div className="mt-6">
      {/* Main Card */}
      <div className="rounded-xl border border-pink-200 overflow-hidden bg-pink-50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-pink-400">
          <h2 className="text-xl font-semibold text-white">Order Details</h2>

          <button onClick={() => setShowAll(!showAll)} className="bg-white text-pink-500 font-medium px-4 py-2 rounded-lg shadow hover:bg-pink-50 transition cursor-pointer">
             {showAll ? "Show Less" : "View All Orders"}
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto scrollbar-pink border border-pink-200 bg-white shadow">
          {!loading && getAllOrder.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 m-10 text-center bg-pink-400 text-white rounded-2xl shadow-lg">
                      <div className="">
                        {/* Icon */}
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="h-8 w-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-2.293 2.293a1 1 0 01-.707.293H7a1 1 0 01-.707-.293L4 13m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
                            />
                          </svg>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-semibold">
                          No Orders Found
                        </h2>

                        {/* Description */}
                        <p className="mt-2 text-sm text-pink-100">
                          Looks like there are no orders available right now. 
                          Once a customer places an order, <br /> it will appear here.
                        </p>

                        {/* Action Button (optional) */}
                        <button onClick={() => getAllOrderFunctiom()} className="mt-6 rounded-lg bg-white px-5 py-2 text-sm font-medium text-pink-500 hover:bg-pink-50 transition cursor-pointer">
                          Refresh Orders
                        </button>
                      </div>
                    </div>
          ): (
            <table className="min-w-450 text-sm text-left">
            <thead className="bg-pink-100 text-pink-700">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Qty</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Address</th>
                <th className="px-4 py-3 font-semibold">Pincode</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-pink-100">
              {loading ? (
                Array.from({ length: getAllOrder.length }).map((_, i) => (
                  <SkeletonLoader key={i} type="order-table" />
                ))
              ) : 
                visibleOrders.map((order, orderIndex) =>
                  order.cartItems.map((item, itemIndex) => {
                    const {
                      id,
                      productImageUrl,
                      title,
                      category,
                      price,
                      quantity,
                    } = item;

                    const { id: orderId, status, addressInfo, date } = order;

                    const { name, address, pincode, mobileNumber } =
                      addressInfo;

                    return (
                      <tr key={id} className="hover:bg-pink-50 transition">
                        {/* 1. No */}
                        <td className="px-4 py-3">{rowNo++}</td>

                        {/* 2. Order ID */}
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {orderId?.slice(0, 8)}
                        </td>

                        {/* 3. Image */}
                        <td className="px-4 py-3">
                          <img
                            src={productImageUrl}
                            alt={title}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </td>

                        {/* 4. Title */}
                        <td className="px-4 py-3 min-w-45">{title}</td>

                        {/* 5. Category */}
                        <td className="px-4 py-3 capitalize">{category}</td>

                        {/* 6. Price */}
                        <td className="px-4 py-3 font-medium">₹{price}</td>

                        {/* 7. Quantity */}
                        <td className="px-4 py-3 text-center">{quantity}</td>

                        {/* 8. Total Price */}
                        <td className="px-4 py-3 font-semibold text-pink-600">
                          ₹{price * quantity}
                        </td>

                        {/* 9. Status */}
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 capitalize">
                            {status}
                          </span>
                        </td>

                        {/* 10. Name */}
                        <td className="px-4 py-3 capitalize">{name}</td>

                        {/* 11. Address */}
                        <td className="px-4 py-3 min-w-55">{address}</td>

                        {/* 12. Pincode */}
                        <td className="px-4 py-3">{pincode}</td>

                        {/* 13. Phone */}
                        <td className="px-4 py-3">{mobileNumber}</td>

                        {/* 14. Email */}
                        <td className="px-4 py-3">{order?.email}</td>

                        {/* 15. Date */}
                        <td className="px-4 py-3 whitespace-nowrap">{date}</td>

                        {/* 16. Delete */}
                        <td className="px-4 py-3 text-center">
                          <button
                            className="rounded-md border border-pink-400 text-pink-400 bg-transparent hover:bg-pink-400 hover:text-white px-3 py-1 text-sm  cursor-pointer"
                            onClick={() => orderDelete(orderId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }),
                
              )}
            </tbody>
          </table>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
