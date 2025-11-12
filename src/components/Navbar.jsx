import React, { useState, useEffect, useRef } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false); // mobile menu
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // profile dropdown
  const dropdownRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" ? "bg-light" : "bg-white"
      }`}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

        <div
          className="flex max-sm:flex-col items-start sm:items-center gap-6 relative"
          ref={dropdownRef}
        >
          {currentUser ? (
            <div>
              {/* Profile Image */}
              <img
                src={currentUser.photoURL || "https://via.placeholder.com/40"}
                alt={currentUser.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60  bg-white border border-gray-200 rounded shadow-lg">
                  <div className="px-4 py-2 border-b border-gray-100 text-gray-700 font-medium">
                    {currentUser.displayName || currentUser.email}
                  </div>

                  <div className="px-4 py-2 border-b border-gray-100 text-gray-700 font-medium">
                    {currentUser.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="login"
              onClick={() => setShowLogin(true)}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
            >
              LogIn
            </Link>
          )}
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </div>
  );
};

export default Navbar;
