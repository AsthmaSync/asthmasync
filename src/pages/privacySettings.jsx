import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import image4 from '../assets/images/26232787_7202210.jpg';

const PrivacySettings = () => {
  const [accepted, setAccepted] = useState(true);
  const navigate = useNavigate();

  const handleAccept = () => {
    setAccepted(true);
    navigate("/signUp"); 
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${image4})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-5"></div>
      
      <div className= "bg-white relative shadow-md rounded-lg w-full max-w-lg p-6 mt-20 opacity-100 z-10">
        <h1 className="text-2xl font-semibold mb-4 text-center text-cyan-500">
          Privacy Settings
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome to AsthmaSync. Please review and accept our privacy settings to continue using the app.
        </p>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
              id="dataUsage"
            />
            <label htmlFor="dataUsage" className="text-gray-700">
              Allow usage data to be collected to improve app performance
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
              id="notifications"
            />
            <label htmlFor="notifications" className="text-gray-700">
              Enable notifications for medication reminders and alerts
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
              id="location"
            />
            <label htmlFor="location" className="text-gray-700">
              Allow location data for emergency alerts in case of high-risk areas
            </label>
          </div>
        </div>

        <button
          onClick={handleAccept}
          className="mt-6 w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          disabled={!accepted}
        >
          Accept and Continue
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;

