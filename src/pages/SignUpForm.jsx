import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../assets/images/16920050_5818665.jpg';
import { apiSignup } from '../services/auth';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import LoadingSpinner from '../components/LoadingSpinner';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiSignup(formData);
      console.log('Signup response:', response);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.removeItem('questionnaireCompleted');
        showSuccessAlert('Account created successfully! Please complete your profile.');
        navigate('/questionnaire');
      }
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response?.status === 409) {
        const errorMessage = 'This email is already registered. Please sign in instead.';
        showErrorAlert(errorMessage);
        setError(errorMessage);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        const errorMessage = err.response?.data?.message || 'Failed to create account. Please try again.';
        showErrorAlert(errorMessage);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Creating your account..." />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 relative z-10">
        <h1 className="text-3xl font-bold text-center text-cyan-500 mb-4">Welcome to AsthmaSync</h1>
        <p className="text-center text-gray-700 mb-6">
          Sign up to track, manage, and control your asthma symptoms.
        </p>

        {error && (
          <div className="text-gray-500 text-center mb-4">
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
              type={showPassword ? 'text' : 'password'} 
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
            className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Sign Up
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
