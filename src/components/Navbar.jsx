import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logoImage-removebg-preview.png';

const Navbar = () => {
  return (
    <nav className="bg-cyan-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="Logo" className="h-12 w-12 object-contain" />
            <span className="ml-2 text-white text-2xl font-bold">AsthmaSync</span>
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-gray-200 font-bold">
            Sign In
          </Link>
          <Link to="/Reminders" className="text-white hover:text-gray-200 font-bold">
            Reminder
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
