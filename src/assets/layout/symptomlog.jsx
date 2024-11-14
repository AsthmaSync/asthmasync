import React, { useState, useEffect } from 'react';

const SymptomsLog = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const storedSymptoms = JSON.parse(localStorage.getItem('symptoms')) || [];
    setSymptoms(storedSymptoms);
  }, []);

  const handleAddOrUpdateSymptom = () => {
    if (!newSymptom || !description || !date) {
      alert("Please fill out all fields to log a symptom.");
      return;
    }

    let updatedSymptoms;
    if (isEditing && currentIndex !== null) {
      updatedSymptoms = symptoms.map((symptom, index) =>
        index === currentIndex ? { symptom: newSymptom, description, date } : symptom
      );
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      updatedSymptoms = [...symptoms, { symptom: newSymptom, description, date }];
    }

    setSymptoms(updatedSymptoms);
    localStorage.setItem('symptoms', JSON.stringify(updatedSymptoms));
    setNewSymptom('');
    setDescription('');
    setDate('');
  };

  const handleEditSymptom = (index) => {
    const symptomToEdit = symptoms[index];
    setNewSymptom(symptomToEdit.symptom);
    setDescription(symptomToEdit.description);
    setDate(symptomToEdit.date);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleDeleteSymptom = (index) => {
    const updatedSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptoms(updatedSymptoms);
    localStorage.setItem('symptoms', JSON.stringify(updatedSymptoms));
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-CA', options).replace(/\//g, '-'); // Format as yyyy-mm-dd
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('src/assets/images/16920050_5818665.jpg')", // Replace with your image URL
      }}
    >
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-cyan-500 mb-4">Symptoms Log</h1>

        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Symptom"
            value={newSymptom}
            onChange={(e) => setNewSymptom(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            style={{ textAlign: 'top' }}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-4 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows="3"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 text-gray-400 focus:ring-cyan-500"
          />
          <button
            onClick={handleAddOrUpdateSymptom}
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-400"
          >
            {isEditing ? 'Update Symptom' : 'Add Symptom'}
          </button>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold text-cyan-500 mb-4">Logged Symptoms</h2>
          {symptoms.length > 0 ? (
            <ul>
              {symptoms.map((symptom, index) => (
                <li key={index} className="mb-4 p-4 bg-white rounded-md shadow">
                  <p className="text-gray-500"><strong>Symptom:</strong> {symptom.symptom}</p>
                  <p className="text-gray-500"><strong>Description:</strong> {symptom.description}</p>
                  <p className="text-gray-500"><strong>Date:</strong> {formatDate(symptom.date)}</p>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleEditSymptom(index)}
                      className="bg-cyan-500 text-white py-1 px-3 rounded-lg hover:bg-cyan-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSymptom(index)}
                      className="bg-cyan-500 text-white py-1 px-3 rounded-lg hover:bg-cyan-400"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No symptoms logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomsLog;
