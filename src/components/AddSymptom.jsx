import React, { useState } from 'react';
import { addSymptom } from '../services/symptom';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

const AddSymptom = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        date: new Date().toISOString().split('T')[0], // Today's date as default
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await addSymptom(formData);
            showSuccessAlert('Symptom added successfully!');
            navigate('/symptoms');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to add symptom. Please try again.';
            showErrorAlert(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h2 className="text-2xl font-bold text-cyan-500 mb-6">Add New Symptom</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Symptom Title*
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter symptom title"
                    />
                </div>

                <div>
                    <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Add any additional notes about your symptom"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                        Date*
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/symptoms')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Adding...' : 'Add Symptom'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSymptom; 