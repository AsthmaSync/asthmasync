import React, { useState } from 'react';
import { addInhaler } from '../services/puff';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

const AddInhaler = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inhalerName: '',
        oriTotal: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'oriTotal' ? value : value.trim()
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                inhalerName: formData.inhalerName,
                oriTotal: Number(formData.oriTotal)
            };

            const response = await addInhaler(payload);
            console.log('Inhaler added:', response);
            showSuccessAlert('Inhaler added successfully!');
            navigate('/inhalers');
        } catch (err) {
            console.error('Error adding inhaler:', err);
            const errorMessage = err.response?.data?.message || 'Failed to add inhaler. Please try again.';
            showErrorAlert(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h2 className="text-2xl font-bold text-cyan-500 mb-6">Add New Inhaler</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                <div>
                    <label htmlFor="inhalerName" className="block text-gray-700 font-medium mb-2">
                        Inhaler Name*
                    </label>
                    <input
                        type="text"
                        id="inhalerName"
                        name="inhalerName"
                        value={formData.inhalerName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter inhaler name"
                    />
                </div>

                <div>
                    <label htmlFor="oriTotal" className="block text-gray-700 font-medium mb-2">
                        Original Total Quantity*
                    </label>
                    <input
                        type="text"
                        id="oriTotal"
                        name="oriTotal"
                        value={formData.oriTotal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Enter total quantity"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/inhalers')}
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
                        {loading ? 'Adding...' : 'Add Inhaler'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddInhaler; 