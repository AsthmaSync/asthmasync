import React, { useState } from 'react';
import { addTrigger } from '../services/triggers';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

const AddTrigger = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
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
            const payload = {
                title: formData.name,
                notes: formData.description,
                date: formData.date
            };

            await addTrigger(payload);
            showSuccessAlert('Trigger added successfully!');
            navigate('/triggers');
        } catch (err) {
            console.error('Error adding trigger:', err);
            const errorMessage = err.response?.data?.message || 'Failed to add trigger. Please try again.';
            showErrorAlert(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h2 className="text-2xl font-bold text-cyan-500 mb-6">Add New Trigger</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Trigger Name*
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter trigger name"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Describe the trigger and its effects"
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
                        onClick={() => navigate('/triggers')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Adding...' : 'Add Trigger'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTrigger; 