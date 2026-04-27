import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    alert(data.message);
    if (data.token) {
      setToken(data.token);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="mt-2 bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p 
        onClick={() => setIsLogin(!isLogin)} 
        className="mt-6 text-center text-sm text-blue-600 cursor-pointer hover:underline"
      >
        {isLogin ? 'Need an account? Register here.' : 'Already have an account? Login here.'}
      </p>
    </div>
  );
}