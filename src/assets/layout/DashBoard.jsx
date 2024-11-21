import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiUser();
        console.log('User data response:', response);
        if (response && response.data && response.data.name) {
          setName(response.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-cyan-500">Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="textgray-300">Error: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col relative">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto flex items-center justify-center">
            <FaUserCircle className="w-full h-20 text-cyan-500" />
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-cyan-500">
            {name || 'User'}
          </h2>
          <p className="text-gray-600">AsthmaSync Member</p>
        </div>

        {/* Sidebar Links */}
        <nav className="space-y-4">
          <Link to="/overview" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Overview
          </Link>
          <Link to="/symptoms" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Get Symptoms
          </Link>
          <Link to="/medications" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Get Medications
          </Link>
          <Link to="/triggers" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Get Triggers
          </Link>
        </nav>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-400 text-sm transition-colors"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </aside>

      {/* Main Dashboard Content - reduced top padding from py-8 to pt-4 */}
      <main className="flex-1 pl-2 pr-8 pt-4 pb-8">
        <div className="bg-white p-6 shadow-md mb-6">
          <h1 className="text-3xl font-semibold text-cyan-500 mb-2">
            Welcome, {name || 'User'}!
          </h1>
          <p className="text-gray-600">Manage and track your asthma symptoms with ease.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;