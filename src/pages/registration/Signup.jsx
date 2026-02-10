import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Signup = () => {
  const context = useContext(myContext);
  const { setLoading } = context;

  // Navigate
  const navigate = useNavigate();

  // User Signup state
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // regex rules (single source of truth)
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // User Signup function
  const userSignupFunction = async () => {
    // validation
    const name = userSignup.name.trim();
    const email = userSignup.email.trim();
    const password = userSignup.password.trim();

    // 1️ Empty check
    if (!name && !email && !password) {
      return toast.error("all feild are required");
    }

    // 2️ Name regex
    if (!nameRegex.test(name)) {
      return toast.error("Name should contain only letters and spaces");
    }

    // 3️ Email regex
    if (!emailRegex.test(email)) {
      return toast.error("Enter a Email format is incorrect");
    }

    // 4️ Password regex
    // if (!passwordRegex.test(password)) {
    //   return toast.error("Password is too weak");
    // }

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
        time: serverTimestamp(),
        date: new Date().toLocaleString("en-Us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };


      // Create user refrence
      const userRefrence = collection(fireDB, "user");

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
      if (error.code == "auth/weak-password") {
        console.log("Please Enter minimum 6 characters");
        toast.error("Please Enter passwprd required minimum 6 characters")
      }
      if (error.code == "auth/invalid-email") {
        console.log("Enter a Email format is incorrect");
        toast.error("Enter a Email format is incorrect");
      }
      if (error.code == "auth/network-request-failed") {
        console.log("Network issue releted");
        toast.error("Network issue detected. Please try again after checking your internet.");
      }
      console.log(error.code);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-p-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-g-800">
          Create your account
        </h2>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-md font-medium text-g-700 mb-1">
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
            <label className="block text-md font-medium text-g-700 mb-1">
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
            <label className="block text-md font-medium text-g-700 mb-1">
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
            className="w-full mt-2 bg-p-600 text-white py-2 rounded-lg font-semibold 
        hover:bg-p-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-md text-center text-g-600 mt-4">
          Already have an account?
          <Link
            to={"/login"}
            className="ml-1 text-p-600 font-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
