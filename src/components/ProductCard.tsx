'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Check if the image URL is from fakestoreapi.com
  const isExternalImage = product.image.startsWith('https://fakestoreapi.com');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-grow flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 w-full bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
          )}
          
          {isExternalImage ? (
            // Use regular img tag for external images not configured in next.config.js
            <img
              src={imageError ? '/images/placeholder-product.jpg' : product.image}
              alt={product.title}
              className="object-contain p-4 w-full h-full"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            // Use Next.js Image for local images
            <Image
              src={imageError ? '/images/placeholder-product.jpg' : product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority={false}
            />
          )}
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14 overflow-hidden text-gray-900">
            {product.title}
          </h3>
          
          {/* Rating (if available) */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      product.rating && i < Math.floor(product.rating.rate)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({product.rating.count})
              </span>
            </div>
          )}
          
          {/* Price and Add to Cart Button */}
          <div className="mt-auto flex justify-between items-center">
            <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              aria-label={`Add ${product.title} to cart`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}