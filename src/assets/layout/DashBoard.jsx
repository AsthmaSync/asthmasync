// 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Retrieve user data from local storage (assuming name is stored)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.firstName) {
      setFirstName(user.firstName);
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200">
            {/* Placeholder profile image */}
            <img src="src/assets/images/6199474_3190299.jpg" alt="User profile" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-cyan-500">
            {firstName ? firstName : 'User'}
          </h2>
          <p className="text-gray-600">AsthmaSync Member</p>
        </div>

        {/* Sidebar Links */}
        <nav className="space-y-4">
          <Link to="/symptomslog" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Symptoms Log
          </Link>
          <Link to="/medicationTracking" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Medication Tracking
          </Link>
          <Link to="/progressOverview" className="block py-2 px-4 rounded-md bg-cyan-500 text-white text-center hover:bg-cyan-400">
            Progress Overview
          </Link>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8">
        {/* Welcome Section */}
        <div className="bg-white p-6  shadow-md mb-6">
          <h1 className="text-3xl font-semibold text-cyan-500 mb-2">
            Welcome, {firstName ? firstName : 'User'}!
          </h1>
          <p className="text-gray-600">Manage and track your asthma symptoms with ease.</p>
        </div>

        
          

          

       
      </main>
    </div>
  );
};

export default Dashboard;
