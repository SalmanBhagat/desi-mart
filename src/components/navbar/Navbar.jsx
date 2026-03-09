import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

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
        <NavLink to="/admin-dashboard" onClick={() => setOpen(false)}>
          <li className="cursor-pointer lg:hover:bg-p-600 hover:bg-p-800 py-2 px-3">
            {user.name}
          </li>
        </NavLink>
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
        <li className="relative cursor-pointer py-2 px-3 rounded-md lg:hover:bg-p-600 hover:bg-p-800">
          <FiShoppingCart className="text-xl" />
          <span className="absolute top-1.25 left-6.25 bg-p-50 text-p-600 text-[11px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full border border-p-600">
            {cartCount.length}
          </span>
        </li>
      </NavLink>
    </ul>
  );

  return (
    <nav className="bg-p-600 fixed w-full top-0 z-50">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between px-3 py-3 lg:px-6 h-14">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <div class="flex items-center gap-1.5 sm:gap-2 text-xl sm:text-2xl font-bold">
            <span class="text-xl sm:text-2xl">🛍️</span>
            <span class="text-white">DESI</span>
            <span class="relative text-[#FDB046]">
              MART
              <span class="absolute left-0 -bottom-0.5 sm:-bottom-0.7 h-0.5 lg:h-0.70 w-full bg-linear-to-r from-transparent via-[#FDB046] to-white rounded"></span>
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:block">{navlist}</div>

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
          {/* Menu Items */}
          <div className="py-2">{navlist}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
