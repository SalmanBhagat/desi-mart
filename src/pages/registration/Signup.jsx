import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // Navigate
  const navigate = useNavigate();

  // User Signup state
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // User Signup function
  const userSignupFunction = async () => {
    // validation
    const { name, email, password } = userSignup;

    if (!name && !email && !password) {
      return toast.error("all feild are required");
    }

    setLoading(true);

    try {
      const users = await createUserWithEmailAndPassword(
      auth,
      userSignup.email,
      userSignup.password,
    );

      // create user object
      const user = {
        name: userSignup.name,
        email: userSignup.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now().toMillis(),
        date: new Date().toLocaleString("en-Us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      console.log(user);

      // Create user refrence
      const userRefrence = collection(fireDB, "user");
      console.log(userRefrence);

      // add user detail
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("user signup successfully");

      setLoading(false);
      navigate("/login");

    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create your account
        </h2>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={userSignup.name}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  name: e.target.value,
                });
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none 
          focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userSignup.email}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
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
              placeholder="Create a password"
              value={userSignup.password}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  password: e.target.value,
                });
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none 
          focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={userSignupFunction}
            type="button"
            className="w-full mt-2 bg-pink-600 text-white py-2 rounded-lg font-semibold 
        hover:bg-pink-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-md text-center text-gray-600 mt-4">
          Already have an account?
          <Link
            to={"/login"}
            className="ml-1 text-pink-600 font-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
