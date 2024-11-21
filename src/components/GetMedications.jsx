import React, { useState, useEffect } from 'react';
import { getMedications, deleteMedication } from '../services/medications';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert, showDeleteConfirmation } from '../utils/alerts';

const GetMedications = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMedications = async () => {
        try {
            const response = await getMedications();
            console.log('Medications response:', response.data);
            setMedications(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching medications:', err);
            setError('Failed to load medications. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedications();
    }, []);

    const handleDelete = async (id) => {
        try {
            const result = await showDeleteConfirmation();
            if (result.isConfirmed) {
                await deleteMedication(id);
                showSuccessAlert('Medication deleted successfully!');
                fetchMedications();
            }
        } catch (err) {
            console.error('Error deleting medication:', err);
            showErrorAlert('Failed to delete medication. Please try again.');
            setError('Failed to delete medication. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-cyan-500">Loading medications...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-500">Your Medications</h2>
                <Link 
                    to="/medications/add" 
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                    Add New Medication
                </Link>
            </div>
            
            {medications.length === 0 ? (
                <p className="text-gray-500 text-center">No medications recorded yet.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {medications.map((medication) => (
                        <div 
                            key={medication.id} 
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                                {medication.name}
                            </h3>
                            <div className="text-gray-600 mb-4">
                                <p>Dosage: {medication.dosage}</p>
                                <p>Frequency: {medication.frequency}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p>Start Date: {format(new Date(medication.startDate), 'PPP')}</p>
                                {medication.endDate && (
                                    <p>End Date: {format(new Date(medication.endDate), 'PPP')}</p>
                                )}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Link
                                    to={`/medications/${medication.id}`}
                                    className="px-3 py-1 text-sm text-cyan-500 hover:text-cyan-700"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(medication.id)}
                                    className="px-3 py-1 text-sm text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetMedications;