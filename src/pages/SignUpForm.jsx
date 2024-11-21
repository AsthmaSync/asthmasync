import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../assets/images/16920050_5818665.jpg';
import { apiSignup } from '../services/auth';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import React icons for the eye button

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiSignup(formData);
      setTimeout(() => {
        navigate('/signin');
      }, 2000); // Redirect to questionnaire after 2 seconds
    } catch (err) {
      if (err.response?.status === 409) {
        setError('This email is already registered. Please use a different email or sign in.');
      } else {
        setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

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
        <h1 className="text-3xl font-bold text-center text-cyan-500 mb-4">Welcome to AsthmaSync</h1>
        <p className="text-center text-gray-700 mb-6">
          Sign up to track, manage, and control your asthma symptoms.
        </p>

        {error && (
          <div className="text-gray-300 text-center mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
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
              type={showPassword ? 'text' : 'password'} // Toggle input type
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
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
                <span className="loader mr-2"></span> Signing Up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
