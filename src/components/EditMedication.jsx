import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneMedication, updateMedication } from '../services/medications';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

const EditMedication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
        notes: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedication = async () => {
            try {
                const response = await getOneMedication(id);
                const medication = response.data;
                setFormData({
                    name: medication.name,
                    dosage: medication.dosage,
                    frequency: medication.frequency,
                    startDate: new Date(medication.startDate).toISOString().split('T')[0],
                    endDate: medication.endDate ? new Date(medication.endDate).toISOString().split('T')[0] : '',
                    notes: medication.notes || ''
                });
            } catch (err) {
                console.error('Error fetching medication:', err);
                showErrorAlert('Failed to load medication details');
                setError('Failed to load medication details');
            } finally {
                setLoading(false);
            }
        };

        fetchMedication();
    }, [id]);

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
            await updateMedication(id, formData);
            showSuccessAlert('Medication updated successfully!');
            navigate(`/medications/${id}`);
        } catch (err) {
            console.error('Error updating medication:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update medication';
            showErrorAlert(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-cyan-500">Loading...</div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h2 className="text-2xl font-bold text-cyan-500 mb-6">Edit Medication</h2>
            
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
                    />
                </div>

                <div>
                    <label htmlFor="frequency" className="block text-gray-700 font-medium mb-2">
                        Frequency*
                    </label>
                    <input
                        type="text"
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
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
                    <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                        Notes (Optional)
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/medications/${id}`)}
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
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditMedication; 