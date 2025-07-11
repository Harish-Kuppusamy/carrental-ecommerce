import { useEffect, useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSearch } from "../context/SearchContext";

/**
 * Navbar component with responsive menu and authentication handling
 */
const Navbar = () => {
  const location = useLocation(); // Track current route
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // Mobile menu open/close state
  const [firebaseUser, setFirebaseUser] = useState(null); // Store logged-in Firebase user if available
  const { search, setSearch } = useSearch();

  const token = localStorage.getItem("token"); // Local token for normal user (non-Firebase)

  // Listen for Firebase authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setFirebaseUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  // Handle logout for both Firebase user and normal token-based user
  const handleLogout = () => {
    if (firebaseUser) {
      signOut(auth).then(() => navigate("/login"));
    }
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const isLoggedIn = firebaseUser || token; // Check if any user is logged in

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-bordercolor relative transition-all ${
        location.pathname === "/" ? "bg-light" : ""
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="h-8" />
      </Link>

      {/* Navigation Links + Search + Auth Buttons */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-bordercolor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {/* Dynamic Menu Links from assets/menuLinks */}
        {menuLinks.map((link, idx) => (
          <Link to={link.path} key={idx}>
            {link.name}
          </Link>
        ))}

        {/* Search Bar - Visible on large screens */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-bordercolor px-3 rounded-full max-w-56">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                const element = document.getElementById("featured");

                if (element) {
                  element.scrollIntoView({behavior:"smooth"})
                }
              }
               
            }}
          />
          <img src={assets.search_icon} alt="Search" />
          {console.log(search)}
        </div>

        {/* Login/Logout Button */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          {isLoggedIn ? (
            <button
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="Menu Icon"
        />
      </button>
    </div>
  );
};

export default Navbar;
