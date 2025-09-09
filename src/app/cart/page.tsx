'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

export default function Cart() {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
    // In a real application, this would redirect to a checkout page
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Clear Cart
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-green-800 font-semibold">Order Summary</h2>
          <p className="text-2xl font-bold text-blue-600">${getCartTotal().toFixed(2)}</p>
        </div>
        
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-4"
        >
          Proceed to Checkout
        </button>
        
        <Link
          href="/"
          className="block text-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}