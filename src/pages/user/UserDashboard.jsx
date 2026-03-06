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
  const { getAllOrder } = context;

  const userOrders = getAllOrder?.filter((obj) => obj.userId === user?.uid);
  console.log(userOrders);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-125px)] bg-p-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6 mt-14.25">
          {/* ===== User Info ===== */}
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/024/183/502/small/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
              alt="user"
              className="w-16 h-16 rounded-full object-cover "
            />

            <div>
              <h2 className="text-xl font-semibold text-g-800">{user?.name}</h2>
              <p className="text-sm text-g-500">{user?.email}</p>
            </div>
          </div>

          <div className="bg-p-400 p-5 rounded-xl shadow space-y-6">
            {/* ===== Order Details Box ===== */}
            {
              userOrders?.length === 0 ? (
                // user Empty box
                <div
                  className="flex flex-col items-center justify-center bg-white rounded-xl border-gray-300 
  p-4 md:p-6 text-center shadow-sm"
                >
                  {/* Icon */}
                  <div
                    className="mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-p-100
    h-14 w-14 md:h-14 md:w-14"
                  >
                    <BsCartX className="text-p-500 text-2xl md:text-2xl" />
                  </div>

                  {/* Text */}
                  <h2 className="text-lg sm:text-xl font-semibold text-g-800">
                    No Orders
                  </h2>

                  <p className="mt-1.5 sm:mt-2 max-w-md text-xs sm:text-sm text-g-600">
                    Start shopping to see your orders here.
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => navigate("/allproduct")}
                    className="mt-4 sm:mt-5 rounded-lg bg-p-500 
    px-4 sm:px-6 py-2 text-xs sm:text-sm 
    font-medium text-white transition hover:bg-p-600 cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                userOrders?.map((order, index) => {
                  const { status, cartItems } = order;
                  return (
                    <div
                      key={order.id || index}
                      className="bg-white rounded-xl shadow p-5 space-y-5"
                    >
                      {/* ===== Order Header (ONLY ONCE) ===== */}
                      <div className="flex flex-wrap gap-4 justify-between">
                        <div>
                          <p className="text-xs text-g-500">Order ID</p>
                          <p className="font-medium text-g-800">{order.id}</p>
                        </div>

                        <div>
                          <p className="text-xs text-g-500">Order Date</p>
                          <p className="font-medium text-g-800">{order.date}</p>
                        </div>

                        <div>
                          <p className="text-xs text-g-500">Status</p>
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
                              className="flex gap-3 sm:gap-4 items-start pb-3 last:pb-0 border-dashed border-b border-g-300 last:border-none"
                            >
                              <img
                                src={productImageUrl}
                                alt={title}
                                className="h-18 w-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg object-cover"
                              />

                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-g-800">
                                  {title}
                                </h3>

                                <p className="mt-2 text-sm text-g-600">
                                  Category:{" "}
                                  <span className="font-medium">
                                    {category}
                                  </span>
                                </p>

                                <p className="mt-2 text-sm text-g-600">
                                  Quantity:{" "}
                                  <span className="font-medium">
                                    {quantity}
                                  </span>
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-g-500">Price</p>
                                <p className="text-lg font-semibold text-g-800">
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
}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
