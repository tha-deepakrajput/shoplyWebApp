'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32">
              <Image
                src="/images/logo.svg"
                alt="Shoply"
                fill
                className="object-contain"
                priority
                sizes="128px"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Cart
            </Link>
          </nav>
          
          {/* Cart Icon */}
          <Link 
            href="/cart" 
            className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            
            {getCartItemsCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemsCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
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
          <nav className="md:hidden mt-4 pb-2 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/cart" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({getCartItemsCount()})
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}