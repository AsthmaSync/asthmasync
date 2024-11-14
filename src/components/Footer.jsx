import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cyan-500 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Asthmasync</h2>
            <p className="mt-2 text-sm max-w-xs">
              Asthmasync is an intuitive asthma tracking tool designed to help users manage symptoms, track medication, and maintain optimal respiratory health.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-start items-center space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/tracker" className="hover:text-gray-200">
              Tracker
            </Link>
            <Link to="/reminders" className="hover:text-gray-200">
              Reminders
            </Link>
            <Link to="/settings" className="hover:text-gray-200">
              Settings
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.43 9.88v-7H7v-2.88h3.43V9.38c0-3.1 1.87-4.8 4.64-4.8 1.35 0 2.77.24 2.77.24v3.04h-1.56c-1.54 0-2.02.96-2.02 1.95v2.19H17l-.55 2.88h-3.43v7C18.34 21.12 22 17 22 12z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-gray-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 5.94c-.77.35-1.59.59-2.44.69a4.16 4.16 0 0 0 1.82-2.29 8.3 8.3 0 0 1-2.63 1.01A4.15 4.15 0 0 0 11.44 8c0 .32.04.63.11.93A11.77 11.77 0 0 1 3 5.88a4.13 4.13 0 0 0-.56 2.08c0 1.44.74 2.7 1.86 3.45a4.12 4.12 0 0 1-1.88-.52v.05a4.15 4.15 0 0 0 3.33 4.06 4.17 4.17 0 0 1-1.87.07A4.16 4.16 0 0 0 8 17.94a8.32 8.32 0 0 1-5.13 1.77c-.33 0-.66-.02-.98-.06a11.76 11.76 0 0 0 6.38 1.87c7.66 0 11.85-6.35 11.85-11.85l-.01-.54a8.32 8.32 0 0 0 2.04-2.13z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.055 1.97.248 2.42.42a4.6 4.6 0 0 1 1.62 1.02c.4.4.77.9 1.02 1.62.17.45.365 1.25.42 2.42.06 1.26.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.055 1.17-.248 1.97-.42 2.42a4.6 4.6 0 0 1-1.02 1.62c-.4.4-.9.77-1.62 1.02-.45.17-1.25.365-2.42.42-1.26.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.055-1.97-.248-2.42-.42a4.6 4.6 0 0 1-1.62-1.02c-.4-.4-.77-.9-1.02-1.62-.17-.45-.365-1.25-.42-2.42-.06-1.26-.07-1.65-.07-4.85s.01-3.58.07-4.85c.055-1.17.248-1.97.42-2.42a4.6 4.6 0 0 1 1.02-1.62c.4-.4.9-.77 1.62-1.02.45-.17 1.25-.365 2.42-.42 1.26-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.332.012 7.053.07c-1.4.065-2.34.3-3.16.63a6.44 6.44 0 0 0-2.4 1.55A6.44 6.44 0 0 0 .63 5.5c-.33.82-.565 1.76-.63 3.16C.012 8.332 0 8.74 0 12s.012 3.668.07 4.947c.065 1.4.3 2.34.63 3.16a6.44 6.44 0 0 0 1.55 2.4 6.44 6.44 0 0 0 2.4 1.55c.82.33 1.76.565 3.16.63 1.28.058 1.687.07 4.947.07s3.668-.012 4.947-.07c1.4-.065 2.34-.3 3.16-.63a6.44 6.44 0 0 0 2.4-1.55 6.44 6.44 0 0 0 1.55-2.4c.33"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-200">
          © {new Date().getFullYear()} Asthmasync. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
