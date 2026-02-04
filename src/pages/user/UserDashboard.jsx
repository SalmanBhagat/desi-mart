import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { BsBoxSeam, BsCartX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  // user get data with localstorage
  const user = JSON.parse(localStorage.getItem("users"));

  const context = useContext(myContext);
  const { loading, getAllOrder } = context;


  

  const userOrders = getAllOrder?.filter((obj) => obj.userId === user?.uid);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-68px)] bg-pink-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6 mt-14.25">
          {/* ===== User Info ===== */}
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/024/183/502/small/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
              alt="user"
              className="w-16 h-16 rounded-full object-cover "
            />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="bg-pink-400 p-5 rounded-xl shadow space-y-6">
            {/* ===== Order Details Box ===== */}
            {getAllOrder.length > 0 ? (
              userOrders.length === 0 ? (
                // user Empty box
                <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300 
  p-6 sm:p-8 md:p-10 text-center shadow-sm"
>
  {/* Icon */}
  <div
    className="mb-4 sm:mb-5 flex items-center justify-center rounded-full bg-pink-100
    h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
  >
    <BsCartX className="text-pink-500 text-2xl sm:text-3xl md:text-4xl" />
  </div>

  {/* Text */}
  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
    No Orders Yet
  </h2>

  <p className="mt-1.5 sm:mt-2 max-w-md text-xs sm:text-sm text-gray-600">
    You haven’t placed any orders yet. Start shopping to see your orders here.
  </p>

  {/* CTA */}
  <button
    onClick={() => navigate("/allproduct")}
    className="mt-4 sm:mt-6 rounded-lg bg-pink-500 
    px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm 
    font-medium text-white transition hover:bg-pink-600"
  >
    Start Shopping
  </button>
</div>

              ) : (
                map((order, index) => {
                  const { status, cartItems } = order;
                  return (
                    <div
                      key={order.id || index}
                      className="bg-white rounded-xl shadow p-5 space-y-5"
                    >
                      {/* ===== Order Header (ONLY ONCE) ===== */}
                      <div className="flex flex-wrap gap-4 justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Order ID</p>
                          <p className="font-medium text-gray-800">
                            {order.id}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Order Date</p>
                          <p className="font-medium text-gray-800">
                            {order.date}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 capitalize">
                            {status}
                          </span>
                        </div>
                      </div>

                      <hr />

                      {/* ===== Products Inside Order ===== */}
                      <div className="space-y-4">
                        {cartItems?.map((item, idx) => {
                          const {
                            id,
                            quantity,
                            price,
                            title,
                            productImageUrl,
                            category,
                          } = item;

                          return (
                            <div
                              key={id || idx}
                              className="flex gap-3 sm:gap-4 items-start"
                            >
                              <img
                                src={productImageUrl}
                                alt={title}
                                className="h-18 w-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg object-cover"
                              />

                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                  Category:{" "}
                                  <span className="font-medium">
                                    {category}
                                  </span>
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                  Quantity:{" "}
                                  <span className="font-medium">
                                    {quantity}
                                  </span>
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-lg font-semibold text-gray-800">
                                  ₹ {price}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              // Empty UI Box
              <div className="flex min-h-[60vh] items-center justify-center">
                <div className="w-full  rounded-2xl border border-pink-200 bg-white p-8 text-center shadow-sm">
                  {/* Icon */}
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-pink-400 text-white">
                    <BsBoxSeam size={36} />
                  </div>

                  {/* Heading */}
                  <h2 className="text-2xl font-semibold text-gray-800">
                    No Orders Yet
                  </h2>

                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-600">
                    You haven’t placed any orders yet. Once you do, they’ll
                    appear here.
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => navigate("/allproduct")}
                    className="mt-6 w-full rounded-lg bg-pink-500 px-6 py-3 text-sm font-medium text-white hover:bg-pink-600 transition"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
