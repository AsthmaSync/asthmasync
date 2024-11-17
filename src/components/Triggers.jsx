import React, { useState } from 'react';

const Triggers = () => {
  const [triggers, setTriggers] = useState([]);
  const [triggerName, setTriggerName] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    console.log('Trigger Name:', triggerName);
    console.log('Notes:', notes);
    console.log('Date:', date);

    if (!triggerName.trim()) {
      alert('Please provide a trigger name.');
      return;
    }

    if (!date || isNaN(new Date(date).getTime())) {
      alert('Please provide a valid date.');
      return;
    }

    if (editMode) {
      setTriggers(
        triggers.map((trigger) =>
          trigger.id === editingId
            ? { id: trigger.id, triggerName, notes, date }
            : trigger
        )
      );
      setEditMode(false);
      setEditingId(null);
    } else {
      const newTrigger = {
        id: Date.now(),
        triggerName,
        notes,
        date,
      };
      setTriggers([...triggers, newTrigger]);
    }

    setTriggerName('');
    setNotes('');
    setDate('');
  };

  const handleEdit = (trigger) => {
    setEditMode(true);
    setEditingId(trigger.id);
    setTriggerName(trigger.triggerName);
    setNotes(trigger.notes);
    setDate(trigger.date);
  };

  const handleDelete = (id) => {
    setTriggers(triggers.filter((trigger) => trigger.id !== id));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-cyan-500">Triggers Log</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Trigger Name"
          value={triggerName}
          onChange={(e) => setTriggerName(e.target.value)}
          className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleSave}
          className={`w-full ${editMode ? 'bg-cyan-400' : 'bg-cyan-500'} text-white py-2 px-4 rounded-lg hover:bg-cyan-400`}
        >
          {editMode ? 'Save Changes' : 'Add Trigger'}
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Trigger History</h3>
        {triggers.length > 0 ? (
          <ul>
            {triggers.map((trigger) => (
              <li key={trigger.id} className="mb-4 p-4 bg-white rounded-md shadow">
                <p className="text-gray-700">
                  <strong>Trigger:</strong> {trigger.triggerName}
                </p>
                <p className="text-gray-700">
                  <strong>Notes:</strong> {trigger.notes}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {trigger.date}
                </p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(trigger)}
                    className="bg-cyan-500 text-white py-1 px-3 rounded-lg hover:bg-cyan-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trigger.id)}
                    className="bg-cyan-500 text-white py-1 px-3 rounded-lg hover:bg-cyan-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No triggers logged yet.</p>
        )}
      </div>
    </div>
  );
};

export default Triggers;
