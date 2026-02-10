import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { FiShoppingCart } from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";
import MyContext from "../../context/myContext";


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
    setOpen(false);
  };

  const cartCount = useSelector((state) => state.cart);

  // 🔹 Nav Items
  const navlist = (
    <ul className="flex flex-col lg:flex-row gap-1 text-white font-medium text-md">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <li className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3">
          Home
        </li>
      </NavLink>

      {/* All Product */}
      <NavLink to="/allproduct" onClick={() => setOpen(false)}>
        <li className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3">
          All Product
        </li>
      </NavLink>

      {/* Signup */}
      {!user && (
        <NavLink to="/signup" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3">
            Signup
          </li>
        </NavLink>
      )}

      {/* Login */}
      {!user && (
        <NavLink to="/login" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3">
            Login
          </li>
        </NavLink>
      )}

      {/* User */}
      {user?.role === "user" && (
        <NavLink to="/user-dashboard" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3">
            {user.name}
          </li>
        </NavLink>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <li className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3">
          <Link to="/admin-dashboard" onClick={() => setOpen(false)}>
            {user.name}
          </Link>
        </li>
      )}

      {/* Logout */}
      {user && (
        <li
          onClick={logout}
          className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3"
        >
          Logout
        </li>
      )}
      
      {/* Cart */}
      <NavLink to="/cart" onClick={() => setOpen(false)}>
        <li
          className="relative cursor-pointer 
               lg:hover:bg-p-600 hover:bg-p-800 
               py-2 px-3 rounded-md"
        >
          <FiShoppingCart className="text-xl" />
          <span
            className="absolute top-1/3 left-1/1 
                   -translate-x-1/1 -translate-y-1/2
                   bg-white text-p-600
                   text-xs font-bold
                   w-4 h-4
                   flex items-center justify-center
                   rounded-full mb-1"
          >
            {cartCount.length}
          </span>
        </li>
      </NavLink>
    </ul>
  );

  return (
    <nav className="bg-p-600 fixed w-full top-0 z-50">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between px-3 py-3 lg:px-6">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <h2 className="font-bold text-white text-[22px] lg:text-2xl">
            Desi Mart
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:block">{navlist}</div>

        {/* Desktop Search */}
        {/* <div className="hidden lg:block lg:w-80">
          <SearchBar />
        </div> */}

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white text-2xl shrink-0 cursor-pointer"
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setOpen(true)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ================= MOBILE TOGGLE MENU ================= */}
      {open && (
        <div className="absolute top-full right-0 w-full bg-p-700 shadow-lg lg:hidden">
          {/* 🔍 Mobile Search Bar (MENU KE ANDAR, TOP PE) */}
          {/* <div className="px-3 py-3 border-b border-pink-400">
            <SearchBar />
          </div> */}

          {/* Menu Items */}
          <div className="py-2">{navlist}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
