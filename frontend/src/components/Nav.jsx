import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { FaSearch } from "react-icons/fa";

const Nav = ({ setQuery, query }) => {
  const [isopen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isopen);
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  // 📌 Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate('/');
      setIsOpen(false); // Close mobile menu if open
    }
  };

  return (
    <div>
      {/* Logo (top-left) */}
      <div className="fixed top-0 left-0 z-50 h-[60px] flex items-center px-4 bg-gray-800 w-full md:w-auto">
        <h1 className="text-white font-bold text-xl border p-1 rounded-lg">ProductVerse</h1>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-end items-center h-[60px] bg-gray-800 text-white pr-6 pl-[160px] fixed top-0 right-0 w-full z-40 gap-10">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            className="px-3 py-1 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-0 top-[5px] text-xl border-l text-black px-2 py-[2px] rounded"
          >
            <FaSearch />
          </button>
        </form>

        <NavLink to="/" className={(e) => e.isActive ? "text-yellow-300" : ""}>Home</NavLink>
        {user ? (
          <>
            <NavLink to="/create-product" className={(e) => e.isActive ? "text-yellow-300" : ""}>Create Product</NavLink>
            <NavLink to="/cart" className={(e) => e.isActive ? "text-yellow-300" : ""}>Cart</NavLink>
            <NavLink to="/watchlist" className={(e) => e.isActive ? "text-yellow-300" : ""}>WatchList</NavLink>
            <NavLink to="/settings" className={(e) => e.isActive ? "text-yellow-300" : ""}>My Profile</NavLink>
          </>
        ) : (
          <NavLink to="/signin" className={(e) => e.isActive ? "text-yellow-300" : ""}>Sign In</NavLink>
        )}
        <NavLink to="/about" className={(e) => e.isActive ? "text-yellow-300" : ""}>About</NavLink>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-2 border right-4 z-60 text-white bg-gray-800 px-2 py-1 rounded-md text-3xl"
        aria-label="Toggle menu"
      >
        {isopen ? "✖" : "☰"}
      </button>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed text-center pt-20 top-0 right-0 w-full h-full bg-gray-900 p-8 z-50 transform transition-transform duration-300 ${
          isopen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <h2 className="text-3xl font-bold mb-12 text-white">Menu</h2>

        {/* ✅ Mobile Search Form with submit handler */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </form>

        <nav className="flex flex-col space-y-6 text-2xl text-white">
          <NavLink onClick={toggleMenu} to="/" className="hover:text-yellow-400">Home</NavLink>
          {user ? (
            <>
              <NavLink onClick={toggleMenu} to="/create-product" className="hover:text-yellow-400">Create Product</NavLink>
              <NavLink onClick={toggleMenu} to="/cart" className="hover:text-yellow-400">Cart</NavLink>
              <NavLink onClick={toggleMenu} to="/watchlist" className="hover:text-yellow-400">WatchList</NavLink>
              <NavLink onClick={toggleMenu} to="/settings" className="hover:text-yellow-400">My Profile</NavLink>
            </>
          ) : ( 
            <NavLink onClick={toggleMenu} to="/signin" className="hover:text-yellow-400">Sign In</NavLink>
          )}
          <NavLink onClick={toggleMenu} to="/about" className="hover:text-yellow-400">About</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
