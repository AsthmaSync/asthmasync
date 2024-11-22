import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logoImage-removebg-preview.png';
import { FaInfoCircle, FaListUl, FaMobileAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-cyan-500 p-4">
      <div className="container mx-auto">
        {/* Desktop and Mobile Layout */}
        <div className="flex justify-between items-center">
          {/* Logo - Always visible */}
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="Logo" className="h-12 w-12 object-contain" />
            <span className="ml-2 text-white text-2xl font-bold">AsthmaSync</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-gray-200"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link 
              to="/features" 
              className="text-white hover:text-gray-200 font-bold flex items-center gap-2"
              title="Features"
            >
              <FaListUl className="text-2xl" />
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-gray-200 font-bold flex items-center gap-2"
              title="Contact"
            >
              <FaMobileAlt className="text-2xl" />
            </Link>
            <Link 
              to="/login" 
              className="text-white hover:text-gray-200 font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="flex flex-col space-y-4">
            <Link 
              to="/features" 
              className="text-white hover:text-gray-200 font-bold flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <FaListUl className="text-xl" />
              <span>Features</span>
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-gray-200 font-bold flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <FaMobileAlt className="text-xl" />
              <span>Contact</span>
            </Link>
            <Link 
              to="/login" 
              className="text-white hover:text-gray-200 font-bold flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
