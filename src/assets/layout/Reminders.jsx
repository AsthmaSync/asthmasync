import React, { useState, useEffect } from 'react';

const Reminders = () => {
  const [medications, setMedications] = useState([]);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  // Load saved medications from localStorage
  useEffect(() => {
    const savedMedications = JSON.parse(localStorage.getItem('medications')) || [];
    setMedications(savedMedications);
  }, []);

  // Save medications to localStorage when list changes
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  // Function to add new reminder
  const addReminder = () => {
    const newReminder = { medicationName, dosage, time, id: Date.now() };
    setMedications([...medications, newReminder]);
    setMedicationName('');
    setDosage('');
    setTime('');
  };

  // Function to remove a reminder
  const removeReminder = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  // Check for reminders at specified times
  useEffect(() => {
    const checkReminders = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      medications.forEach((med) => {
        if (med.time === now) {
          alert(`It's time to take your medication: ${med.medicationName} (${med.dosage})`);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(checkReminders);
  }, [medications]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-cyan-500 mb-4">Medication Reminders</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Medication Name"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={addReminder}
          className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-400"
        >
          Add Reminder
        </button>
      </div>

      <h3 className="text-xl font-semibold text-cyan-500 mb-2">Scheduled Reminders</h3>
      <ul className="space-y-2">
        {medications.map((med) => (
          <li key={med.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-700">{med.medicationName}</p>
              <p className="text-gray-600">{med.dosage}</p>
              <p className="text-gray-500">Time: {med.time}</p>
            </div>
            <button
              onClick={() => removeReminder(med.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
