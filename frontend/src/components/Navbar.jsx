
import { NavLink } from 'react-router-dom';

export default function Navbar({ token, setToken }) {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">E-Shop</div>
      
      <div className="flex gap-6 items-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "text-blue-400 font-bold" : "hover:text-gray-300 transition"
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            isActive ? "text-blue-400 font-bold" : "hover:text-gray-300 transition"
          }
        >
          Cart
        </NavLink>

        {!token ? (
          <NavLink 
            to="/login" 
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login / Register
          </NavLink>
        ) : (
          <button 
            onClick={() => setToken(null)} 
            className="text-red-400 hover:text-red-300 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}