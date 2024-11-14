import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('src/assets/images/26232787_7202210.jpg')", 
      }}
    >
      <div className="bg-white  shadow-md rounded-lg w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center text-cyan-500 mb-4">Welcome to AsthmaSync</h1>
        <p className="text-center text-gray-700 mb-6">
          Sign up to track, manage, and control your asthma symptoms.
        </p>

        <form className="space-y-4">
          <input
          
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-cyan-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
