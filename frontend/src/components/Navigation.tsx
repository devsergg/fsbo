'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-blue-600 font-bold text-2xl">
              FSBO Platform
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Browse Homes
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Sell Your Home
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Resources
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/signin" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/list-home" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              List Your Home
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/browse" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Homes
              </Link>
              <Link 
                href="/sell" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell Your Home
              </Link>
              <Link 
                href="/resources" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <Link 
                  href="/signin" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/list-home" 
                  className="block px-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors mx-3 mt-3 text-center shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  List Your Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 