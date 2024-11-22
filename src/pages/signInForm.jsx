import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../assets/images/16920050_5818665.jpg';
import { apiLogin } from '../services/auth';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await apiLogin(formData);
      console.log('Login response:', response); 

      if (response.data && response.data.accessToken) {
       
        localStorage.setItem('token', response.data.accessToken);
        console.log('Token stored:', localStorage.getItem('token')); 

        
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

        
        navigate('/dashboard');
      } else {
        setError('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Signing you in..." />;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 relative z-10">
        <h1 className="text-3xl font-bold text-center text-cyan-500 mb-4">Welcome Back</h1>
        <p className="text-center text-gray-700 mb-6">
          Sign in to manage your asthma symptoms effectively.
        </p>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <div
              onClick={handlePasswordToggle}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 ${
              loading ? 'bg-cyan-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400'
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="loader mr-2"></span> Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-cyan-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
