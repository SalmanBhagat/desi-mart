import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { toast } from "react-toastify";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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

  // user login btn function
  const userLoginFunction = async () => {
    const { email, password } = userLogin;

    // validation
    if (!email && !password) {
      return toast.error("All feild are required");
    }

    setLoading(true);

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password,
      )
      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users.user.uid)
        )
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          })
          toast.success("Login successfully");

          setLoading(false);

          if (user.role == "user") {
            navigate("/user-dashboard")
          }else{
            navigate("/admin-dashboard");
          }
        })

        return () => data;
        
      } catch (error) {
        toast.error(error)
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 px-4">
      {/* loader component */}
      {/* {loading && <Loader/>} */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login your account
        </h2>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-1">
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
            <label className="block text-md font-medium text-gray-700 mb-1">
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

          {/* Signup Button */}
          <button
  type="button"
  onClick={userLoginFunction}
  disabled={loading}
  className={`w-full mt-2 py-2 rounded-lg text-white font-semibold transition
    ${loading 
      ? "bg-pink-400 cursor-not-allowed" 
      : "bg-pink-600 hover:bg-pink-700 cursor-pointer"}
  `}
>
  {loading ? "Logging in..." : "Login"}
</button>

        </form>

        {/* Login Redirect */}
        <p className="text-md text-center text-gray-600 mt-4">
          Dont have an account?
          <Link
            to={"/signup"}
            className="ml-1 text-pink-600 font-medium hover:underline cursor-pointer"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
