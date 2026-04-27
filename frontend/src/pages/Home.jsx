import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = async (product) => {
    await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    alert(`${product.title} added to cart!`);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between">
            <div>
              <img src={p.thumbnail} alt={p.title} className="w-full h-48 object-cover rounded-md mb-4 bg-gray-50" />
              <h3 className="text-lg font-semibold text-gray-800 truncate">{p.title}</h3>
              <p className="text-gray-600 text-xl font-bold mt-2">${p.price}</p>
            </div>
            <button 
              onClick={() => addToCart(p)} 
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}