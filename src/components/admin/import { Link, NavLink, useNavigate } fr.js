import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

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
        <li className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3">
          Home
        </li>
      </NavLink>

      <NavLink to="/allproduct" onClick={() => setOpen(false)}>
        <li className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3">
          All Product
        </li>
      </NavLink>

      {!user && (
        <NavLink to="/signup" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3">
            Signup
          </li>
        </NavLink>
      )}

      {!user && (
        <NavLink to="/login" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3">
            Login
          </li>
        </NavLink>
      )}

      {user?.role === "user" && (
        <NavLink to="/user-dashboard" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3">
            {user.name}
          </li>
        </NavLink>
      )}

      {user?.role === "admin" && (
        <NavLink to="/admin-dashboard" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3">
            {user.name}
          </li>
        </NavLink>
      )}

      {user && (
        <li
          onClick={logout}
          className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3"
        >
          Logout
        </li>
      )}

      <NavLink to="/cart" onClick={() => setOpen(false)}>
        <li className="cursor-pointer lg:hover:bg-pink-600 hover:bg-pink-800 py-2 px-3">
          Cart({cartCount.length})
        </li>
      </NavLink>
    </ul>
  );

  return (
    <nav className="bg-pink-600 fixed w-full top-0 z-50 relative">
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
        <div className="hidden lg:block lg:w-80">
          <SearchBar />
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white text-2xl shrink-0 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ================= MOBILE TOGGLE MENU ================= */}
      {open && (
        <div className="absolute top-full right-0 w-full bg-pink-700 shadow-lg lg:hidden">
          {/* 🔍 Mobile Search Bar (MENU KE ANDAR, TOP PE) */}
          <div className="px-3 py-3 border-b border-pink-500">
            <SearchBar />
          </div>

          {/* Menu Items */}
          <div className="py-2">{navlist}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
