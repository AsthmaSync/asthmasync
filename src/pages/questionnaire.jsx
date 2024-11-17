import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/images/198566533_5603ab5d-dec1-48ed-945e-1533217c33bc.jpg';

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    trigger: '',
    frequency: '',
    medication: '',
    severity: '',
    additionalNotes: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Navigate to the dashboard after submitting the form
    navigate('/dashboard');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6 mb-6 mt-10 relative z-10">
        <h1 className="text-2xl font-semibold mb-6 text-center text-cyan-500">Tell Us About Your Symptoms</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="trigger" className="block text-gray-700 mb-2">What usually triggers your asthma symptoms?</label>
            <input
              type="text"
              name="trigger"
              value={formData.trigger}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="e.g., dust, pollen, smoke"
              required
            />
          </div>

          <div>
            <label htmlFor="frequency" className="block text-gray-700 mb-2">How often do you experience symptoms?</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            >
              <option value="" disabled>Select frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>

          <div>
            <label htmlFor="medication" className="block text-gray-700 mb-2">Are you currently on any asthma medication?</label>
            <input
              type="text"
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="e.g., inhaler, steroids"
            />
          </div>

          <div>
            <label htmlFor="severity" className="block text-gray-700 mb-2">How would you rate the severity of your symptoms?</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            >
              <option value="" disabled>Select severity</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block text-gray-700 mb-2">Additional notes or observations:</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Share any other details..."
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Questionnaire;
