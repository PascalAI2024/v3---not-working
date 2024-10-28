import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function MainNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Phone className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">ViciNext</span>
            </Link>
            <div className="hidden md:flex md:space-x-8 md:ml-10">
              <Link 
                to="/about" 
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/about') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/contact') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Contact
              </Link>
              <Link 
                to="/pricing"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/pricing') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Pricing
              </Link>
              <Link 
                to="/blog"
                className={`px-3 py-2 text-sm font-medium ${
                  isActive('/blog') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/contact"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}