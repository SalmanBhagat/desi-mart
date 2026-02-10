import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ProductDetail from "../../components/admin/ProductDetail";
import OrderDetail from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDetail";
import { useContext } from "react";
import myContext from "../../context/myContext";


// import { FaBoxOpen, FaUsers } from "react-icons/fa";
// import { GoListOrdered } from "react-icons/go";

const AdminDashboard = () => {
  // admin get data with localStorage
  const admin = JSON.parse(localStorage.getItem("users"));

  const context = useContext(myContext);
  const {getAllProduct, getAllOrder, getAllUser} = context;

  return (
    <div className="min-h-screen bg-p-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ===== Admin Info (Top - Same as User Dashboard) ===== */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlbqK_xTJABkaH3AZVEFqjQ544Xg4SqPvjjVrP8yv0Q&s"
            alt="admin"
            className="w-16 h-16 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-xl font-semibold text-g-800">{admin?.name}</h2>
            <p className="text-sm text-g-500">{admin?.email}</p>
          </div>
        </div>

          {/* ===== Stats Cards as Tabs ===== */}
        <Tabs>
          <TabList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Products */}
            <Tab
              className="bg-white rounded-xl shadow p-6 flex items-center gap-4 
      cursor-pointer hover:scale-[101%] transition hover:shadow-lg 
      focus:outline-none"
            >
              <div className="p-4 rounded-full bg-p-100 text-p-600 text-2xl">
                <FaBoxOpen />
              </div>

              <div>
                <p className="text-sm text-g-500">Total Products</p>
                <h3 className="text-2xl font-bold text-g-800">{getAllProduct.length}</h3>
              </div>
            </Tab>

            {/* Total Orders */}
            <Tab
              className="bg-white rounded-xl shadow p-6 flex items-center gap-4 
      cursor-pointer hover:scale-[101%] transition hover:shadow-lg 
      focus:outline-none"
            >
              <div className="p-4 rounded-full bg-p-100 text-p-600 text-2xl">
                <GoListOrdered />
              </div>

              <div>
                <p className="text-sm text-g-500">Total Orders</p>
                <h3 className="text-2xl font-bold text-g-800">{getAllOrder.length}</h3>
              </div>
            </Tab>

            {/* Total Users */}
            <Tab
              className="bg-white rounded-xl shadow p-6 flex items-center gap-4 
      cursor-pointer hover:scale-[101%] transition hover:shadow-lg 
      focus:outline-none"
            >
              <div className="p-4 rounded-full bg-p-100 text-p-600 text-2xl">
                <FaUsers />
              </div>

              <div>
                <p className="text-sm text-g-500">Total Users</p>
                <h3 className="text-2xl font-bold text-g-800">{getAllUser.length}</h3>
              </div>
            </Tab>
          </TabList>

          {/* ===== Tab Content ===== */}
          
            <TabPanel>
              <ProductDetail/>
            </TabPanel>

            <TabPanel>
             <OrderDetail/>
            </TabPanel>

            <TabPanel>
              <UserDetail/>
            </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
