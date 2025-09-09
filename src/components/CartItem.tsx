'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Check if image is from fakestoreapi.com
  const isExternalImage = item.image.startsWith('https://fakestoreapi.com');

  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <div className="relative h-20 w-20 mr-4 bg-gray-100 rounded-lg flex items-center justify-center">
        {isExternalImage ? (
          // Use regular img tag for external images
          <img
            src={imageError ? '/images/placeholder-product.jpg' : item.image}
            alt={item.title}
            className="object-contain h-16 w-16 p-1"
            onError={handleImageError}
          />
        ) : (
          // Use Next.js Image for local images
          <Image
            src={imageError ? '/images/placeholder-product.jpg' : item.image}
            alt={item.title}
            fill
            className="object-contain p-2"
            sizes="80px"
            onError={handleImageError}
          />
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold line-clamp-2 text-gray-900">{item.title}</h3>
        <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="h-8 w-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors font-bold"
          aria-label="Decrease quantity"
        >
          -
        </button>
        
        <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="h-8 w-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors font-bold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      <div className="ml-4 min-w-[80px] text-right">
        <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      
      <button
        onClick={handleRemove}
        className="ml-4 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
        aria-label="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}