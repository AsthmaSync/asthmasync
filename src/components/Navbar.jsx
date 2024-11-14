// 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/Asthmasync__4_-removebg-preview.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-cyan-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="Asthmasync Logo" className="h-20 w-auto" />
              </Link>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-white hover:text-cyan-700 font-bold">
              Dashboard
            </Link>
            <Link to="/tracker" className="text-white hover:text-cyan-700 font-bold">
              Tracker
            </Link>
            <Link to="/reminders" className="text-white hover:text-cyan-700 font-bold">
              Reminders
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link to="/" className="block text-white px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/tracker" className="block text-white px-3 py-2 rounded-md">
              Tracker
            </Link>
            <Link to="/reminders" className="block text-white px-3 py-2 rounded-md">
              Reminders
            </Link>
            <Link to="/settings" className="block text-white px-3 py-2 rounded-md">
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
