import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  
  // Navigate
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  }

  //  get redux cart count 
  const cartCount = useSelector(state => state.cart);

  // Navlist data
  const navlist = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {/* All Product */}
      <li>
        <Link to={"/allproduct"}>All Product</Link>
      </li>
      {/* Sign up */}
      {!user ? (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}
      {/* Login */}
      {!user ? 
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
       : 
        ""
      }
      {/* user */}
      {user?.role == "user" && 
        <li>
        <Link to={"/user-dashboard"}>{user.name}</Link>
      </li>
      }
      {/* Admin */}
      {user?.role == "admin" &&
        <li>
        <Link to={"/admin-dashboard"}>{user.name}</Link>
      </li> 
      }
      {/* Logout */}
      {user && <li onClick={logout}>
          <Link>Logout</Link>
      </li>}
      {/* cart */}
      <li>
        <Link to={"/cart"}>Cart({cartCount.length})</Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-pink-600 sticky top-0 z-50">
      {/* Main */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
        {/* left */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-white text-2xl text-center">
              Desi Mart
            </h2>
          </Link>
        </div>
        {/* Right menu */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navlist}</div>
        {/* Search bar */}
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
