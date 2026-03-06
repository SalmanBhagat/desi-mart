import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollTop from "./components/scrolltop/ScrollTop";
import MyState from "./context/myState";
import { ToastContainer } from "react-toastify";
import { ProtectedRouteForUser } from "./pages/protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./pages/protectedRoute/ProtectedRouteForAdmin";

// 👇 Lazy Imports
const HomePage = lazy(() => import("./pages/home/HomePage"));
const NoPage = lazy(() => import("./pages/noPage/NoPage"));
const ProductInfo = lazy(() => import("./pages/productInfo/ProductInfo"));
const CartPage = lazy(() => import("./pages/cartpage/CartPage"));
const AllProduct = lazy(() => import("./pages/allProduct/AllProduct"));
const Signup = lazy(() => import("./pages/registration/Signup"));
const Login = lazy(() => import("./pages/registration/Login"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AddProductPage = lazy(() => import("./pages/admin/AddProductPage"));
const UpdateProductPage = lazy(() => import("./pages/admin/UpdateProductPage"));
const CategoryPage = lazy(() => import("./pages/category/CategoryPage"));

const App = () => {
  const withSuspense = (Component) => (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );

  return (
    <MyState>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={withSuspense(HomePage)} />
          <Route path="/*" element={withSuspense(NoPage)} />
          <Route path="/productinfo/:id" element={withSuspense(ProductInfo)} />
          <Route path="/cart" element={withSuspense(CartPage)} />
          <Route path="/allproduct" element={withSuspense(AllProduct)} />
          <Route path="/signup" element={withSuspense(Signup)} />
          <Route path="/login" element={withSuspense(Login)} />
          <Route
            path="/category/:categoryname"
            element={withSuspense(CategoryPage)}
          />

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                {withSuspense(UserDashboard)}
              </ProtectedRouteForUser>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                {withSuspense(AdminDashboard)}
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                {withSuspense(AddProductPage)}
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/updateProduct/:id"
            element={
              <ProtectedRouteForAdmin>
                {withSuspense(UpdateProductPage)}
              </ProtectedRouteForAdmin>
            }
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          limit={1}
        />
      </BrowserRouter>
    </MyState>
  );
};

export default App;
