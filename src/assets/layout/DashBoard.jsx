import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle, FaUser, FaCalendarAlt, FaStethoscope, FaMedkit, FaPhoneAlt } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

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

  // Get user profile data
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  if (loading) {
    return <LoadingSpinner text="Loading Dashboard..." />;
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
            Symptoms Log
          </Link>
          <Link to="/medications" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
          Medications Log
          </Link>
          <Link to="/triggers" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Triggers Log
          </Link>
          <Link to="/inhalers" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Get Inhalers
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

      {/* Main Dashboard Content */}
      <main className="flex-1 pl-2 pr-8 pt-4 pb-8">
        <div className="bg-white p-6 shadow-md mb-6">
          <h1 className="text-3xl font-semibold text-cyan-500 mb-2">
            Welcome, {name || 'User'}!
          </h1>
          <p className="text-gray-600">Manage and track your asthma symptoms with ease.</p>
        </div>

        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold text-cyan-500 flex items-center gap-2">
              <FaUser className="text-cyan-400" />
              Your Asthma Profile
            </h2>
          </div>

          <div className="p-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
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

            {/* Medications */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <FaMedkit className="text-cyan-500" />
                <h3 className="text-lg font-semibold text-gray-700">Current Medications</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">{userProfile.currentMedications || 'No medications listed'}</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FaPhoneAlt className="text-cyan-500" />
                <h3 className="text-lg font-semibold text-gray-700">Emergency Contact</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
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
  );
};

export default Dashboard;