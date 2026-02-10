import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { toast } from "react-toastify";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // Login state
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // regex rules (single source of truth)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // user login btn function
  const userLoginFunction = async () => {
    // ----- validation ------ //
    const email = userLogin.email.trim();
    const password = userLogin.password.trim();

    // 1 Empty check
    if (!email && !password) {
      return toast.error("All feild are required");
    }

    // 2 Email regex
    if (!emailRegex.test(email)) {
      return toast.error("Enter a Email format is incorrect");
    }

    // 3 Password regex
    // if (!passwordRegex.test(password)) {
    //   return toast.error("Password is too weak");
    // }

    setLoading(true);

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password,
      );
      try {
        const q = query(
          collection(fireDB, "user"),
          orderBy("time"),
          where("uid", "==", users.user.uid),
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          setLoading(false);

          toast.success("Login successfully");

          if (user.role == "user") {
            navigate("/");
          } else {
            navigate("/admin-dashboard");
          }
        });

        return () => data;
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      if (error.code == "auth/weak-password") {
        console.log("Please Enter minimum 6 characters");
        toast.error("Please Enter passwprd required minimum 6 characters");
      }
      if (error.code == "auth/invalid-email") {
        console.log("Enter a Email format is incorrect");
        toast.error("Enter a Email format is incorrect");
      }
      if (error.code == "auth/network-request-failed") {
        console.log("Network issue releted");
        toast.error(
          "Network issue detected. Please try again after checking your internet.",
        );
      }
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password. Please try again.");
      }
      console.log(error.code);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-p-100 px-4">
      {/* loader component */}
      {/* {loading && <Loader/>} */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-g-800">
          Login your account
        </h2>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-md font-medium text-g-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter login email"
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  email: e.target.value,
                });
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none 
          focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-md font-medium text-g-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter login password"
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value,
                });
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none 
          focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={userLoginFunction}
            disabled={loading}
            className={`w-full mt-2 py-2 rounded-lg text-white font-semibold transition cursor-pointer
    ${
      loading
        ? "bg-p-400 cursor-not-allowed"
        : "bg-p-600 hover:bg-p-700 cursor-pointer"
    }
  `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-md text-center text-g-600 mt-4">
          Dont have an account?
          <Link
            to={"/signup"}
            className="ml-1 text-p-600 font-medium hover:underline cursor-pointer"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
