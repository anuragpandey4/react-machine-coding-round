import React, { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cart')
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                <span className="font-medium text-gray-800">{item.title}</span>
                <span className="font-semibold text-gray-600">${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="p-4 bg-gray-50 rounded-b-lg border-t border-gray-200 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-gray-900">${total}</span>
          </div>
          <div className="p-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}