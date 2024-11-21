import React, { useState } from 'react';
import { addMedication } from '../services/medications';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

const AddMedication = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        frequency: 'daily',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        purpose: 'reliever',
        taken: false,
        dosageTaken: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'number' ? Number(value) : 
                    name === 'taken' ? value === 'true' :
                    value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                name: formData.name,
                dosage: formData.dosage,
                frequency: formData.frequency,
                startDate: formData.startDate,
                endDate: formData.endDate || undefined,
                purpose: formData.purpose,
                taken: formData.taken,
                dosageTaken: Number(formData.dosageTaken)
            };

            console.log('Sending medication data:', payload);
            await addMedication(payload);
            showSuccessAlert('Medication added successfully!');
            navigate('/medications');
        } catch (err) {
            console.error('Error adding medication:', err);
            const errorMessage = err.response?.data?.message || 'Failed to add medication. Please try again.';
            showErrorAlert(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h2 className="text-2xl font-bold text-cyan-500 mb-6">Add New Medication</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Medication Name*
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter medication name"
                    />
                </div>

                <div>
                    <label htmlFor="dosage" className="block text-gray-700 font-medium mb-2">
                        Dosage*
                    </label>
                    <input
                        type="text"
                        id="dosage"
                        name="dosage"
                        value={formData.dosage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="e.g., 10mg"
                    />
                </div>

                <div>
                    <label htmlFor="frequency" className="block text-gray-700 font-medium mb-2">
                        Frequency*
                    </label>
                    <select
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="purpose" className="block text-gray-700 font-medium mb-2">
                        Purpose*
                    </label>
                    <select
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="reliever">Reliever</option>
                        <option value="preventive">Preventive</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
                        Start Date*
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                        End Date (Optional)
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="taken" className="block text-gray-700 font-medium mb-2">
                        Medication Taken*
                    </label>
                    <select
                        id="taken"
                        name="taken"
                        value={formData.taken}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="dosageTaken" className="block text-gray-700 font-medium mb-2">
                        Dosages Taken*
                    </label>
                    <input
                        type="text"
                        id="dosageTaken"
                        name="dosageTaken"
                        value={formData.dosageTaken}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter number of dosages taken"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/medications')}
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
                        {loading ? 'Adding...' : 'Add Medication'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMedication;