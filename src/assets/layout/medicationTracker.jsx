// 

import React, { useState } from 'react';

const MedicationTracking = () => {
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [purpose, setPurpose] = useState('');
  const [taken, setTaken] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dosageTaken, setDosageTaken] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Add or save edited medication
  const handleSave = () => {
    if (!name || !dosage || !frequency || !purpose || !taken || !startDate || !endDate || !dosageTaken) {
      alert("Please fill out all fields.");
      return;
    }

    if (editMode) {
      // Update the edited medication
      setMedications(medications.map((med) =>
        med.id === editingId
          ? { id: med.id, name, dosage, frequency, purpose, taken, startDate, endDate, dosageTaken }
          : med
      ));
      setEditMode(false);
      setEditingId(null);
    } else {
      // Add a new medication
      const newMedication = { id: Date.now(), name, dosage, frequency, purpose, taken, startDate, endDate, dosageTaken };
      setMedications([...medications, newMedication]);
    }

    // Clear the form fields
    setName('');
    setDosage('');
    setFrequency('');
    setPurpose('');
    setTaken('');
    setStartDate('');
    setEndDate('');
    setDosageTaken('');
  };

  // Delete a medication
  const handleDelete = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  // Edit a medication
  const handleEdit = (med) => {
    setEditMode(true);
    setEditingId(med.id);
    setName(med.name);
    setDosage(med.dosage);
    setFrequency(med.frequency);
    setPurpose(med.purpose);
    setTaken(med.taken);
    setStartDate(med.startDate);
    setEndDate(med.endDate);
    setDosageTaken(med.dosageTaken);
  };

  return (
    // <div className="min-h-screen bg-gray-100 p-6">
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('src/assets/images/3585204_66161 (1).jpg')", // Replace with your image URL
      }}
    >
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10 mb-10">
        <h1 className="text-2xl font-semibold text-cyan-500 mb-4">Medication Tracking</h1>
        
        {/* Medication Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Medication Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className={`w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              frequency === '' ? 'text-gray-400' : 'text-black'
            }`}
          >
            <option value="" disabled hidden>Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className={`w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              purpose === '' ? 'text-gray-400' : 'text-black'
            }`}
          >
            <option value="" disabled hidden>Purpose</option>
            <option value="Preventive">Preventive</option>
            <option value="Reliever">Reliever</option>
          </select>
          <select
            value={taken}
            onChange={(e) => setTaken(e.target.value)}
            className={`w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              taken === '' ? 'text-gray-400' : 'text-black'
            }`}
          >
            <option value="" disabled hidden>Taken</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400"
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400"
          />
          <input
            type="text"
            placeholder="Dosage Taken"
            value={dosageTaken}
            onChange={(e) => setDosageTaken(e.target.value)}
            className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleSave}
            className={`w-full ${editMode ? 'bg-cyan-400' : 'bg-cyan-500'} text-white py-2 px-4 rounded-lg hover:bg-cyan-400`}
          >
            {editMode ? 'Save Changes' : 'Add Medication'}
          </button>
        </div>

        {/* Medication List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Medication List</h2>
          {medications.length > 0 ? (
            <ul>
              {medications.map((med) => (
                <li key={med.id} className="mb-4 p-4 bg-white rounded-md shadow flex justify-between items-center">
                  <div>
                    <p className="text-gray-700"><strong>Name:</strong> {med.name}</p>
                    <p className="text-gray-700"><strong>Dosage:</strong> {med.dosage}</p>
                    <p className="text-gray-700"><strong>Frequency:</strong> {med.frequency}</p>
                    <p className="text-gray-700"><strong>Purpose:</strong> {med.purpose}</p>
                    <p className="text-gray-700"><strong>Taken:</strong> {med.taken}</p>
                    <p className="text-gray-700"><strong>Start Date:</strong> {med.startDate}</p>
                    <p className="text-gray-700"><strong>End Date:</strong> {med.endDate}</p>
                    <p className="text-gray-700"><strong>Dosage Taken:</strong> {med.dosageTaken}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(med)}
                      className="bg-cyan-500 text-white py-1 px-3 rounded-lg hover:bg-cyan-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(med.id)}
                      className="bg-cyan-500 text-white py-1 px-3 rounded-lg hover:bg-cyan-400"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No medications added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationTracking;
