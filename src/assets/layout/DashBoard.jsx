import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaUserCircle, FaUser, FaCalendarAlt, FaStethoscope, FaMedkit, FaPhoneAlt } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Get user profile data
  const userEmail = localStorage.getItem('userEmail');
  const userProfile = userEmail ? JSON.parse(localStorage.getItem(`profile_${userEmail}`)) : null;

  const handleLogout = () => {
    // Clear all necessary storage items
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isNewUser');
    
    // Navigate to landing page
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiUser();
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
    return <LoadingSpinner text="Loading Dashboard..." />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-300">Error: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-cyan-500 text-white rounded-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:relative
          w-64 h-full
          bg-white shadow-md
          transition-transform duration-300 ease-in-out
          z-50 md:z-auto
          overflow-y-auto
          flex flex-col
        `}>
          <div className="p-6 flex-1">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <FaUserCircle className="w-full h-20 text-cyan-500" />
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-cyan-500">
                {name || 'User'}
              </h2>
              <p className="text-gray-600">AsthmaSync Member</p>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4">
              <Link 
                to="/overview" 
                className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-600 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                Overview
              </Link>
              <Link 
                to="/symptoms" 
                className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-600 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                Symptoms Log
              </Link>
              <Link 
                to="/medications" 
                className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-600 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                Medications Log
              </Link>
              <Link 
                to="/triggers" 
                className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-600 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                Triggers Log
              </Link>
              <Link 
                to="/inhalers" 
                className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-600 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
              Log Inhalers
              </Link>
            </nav>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="m-6 flex items-center justify-center gap-2 px-2 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="bg-white p-6 shadow-md rounded-lg mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-cyan-500 mb-2">
              Welcome, {name || 'User'}!
            </h1>
            <p className="text-gray-600">Manage and track your asthma symptoms with ease.</p>
          </div>

          {/* User Profile Section */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-500 flex items-center gap-2">
                <FaUser className="text-cyan-400" />
                Your Asthma Profile
              </h2>
            </div>

            <div className="p-4 md:p-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FaUser className="text-cyan-500" />
                    <h3 className="text-lg font-semibold text-gray-700">Personal Details</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Age:</span> {userProfile.age} years
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Gender:</span> {userProfile.gender}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCalendarAlt className="text-cyan-500" />
                    <h3 className="text-lg font-semibold text-gray-700">Diagnosis Information</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Diagnosis Date:</span> {userProfile.diagnosisDate}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Asthma Type:</span> {userProfile.asthmaType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FaPhoneAlt className="text-cyan-500" />
                  <h3 className="text-lg font-semibold text-gray-700">Emergency Contact</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Name</p>
                    <p className="text-gray-600">{userProfile.emergencyContact?.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <p className="text-gray-600">{userProfile.emergencyContact?.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Relationship</p>
                    <p className="text-gray-600">{userProfile.emergencyContact?.relationship}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
