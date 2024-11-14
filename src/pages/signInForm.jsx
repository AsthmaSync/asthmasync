import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

   
    if (email === 'test@example.com' && password === 'password') {
      navigate('/questionnaire');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('src/assets/images/16920051_5811528.jpg')", 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white  shadow-md rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center text-cyan-500">Welcome to AsthmaSync</h1>
        <p className="text-gray-600 mb-8 text-center">Please sign in to continue</p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
