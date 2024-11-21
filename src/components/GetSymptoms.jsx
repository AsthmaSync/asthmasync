import React, { useState, useEffect } from 'react';
import { getSymptoms, deleteSymptom } from '../services/symptom';
import { format } from 'date-fns'; // Install with: npm install date-fns
import { Link } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert, showDeleteConfirmation } from '../utils/alerts';

const GetSymptoms = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch symptoms
    const fetchSymptoms = async () => {
        try {
            const response = await getSymptoms();
            console.log('Symptoms response:', response.data);
            setSymptoms(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching symptoms:', err);
            setError('Failed to load symptoms. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSymptoms();
    }, []);

    // Handle symptom deletion
    const handleDelete = async (id) => {
        try {
            const result = await showDeleteConfirmation();
            if (result.isConfirmed) {
                await deleteSymptom(id);
                showSuccessAlert('Symptom deleted successfully!');
                fetchSymptoms();
            }
        } catch (err) {
            showErrorAlert('Failed to delete symptom. Please try again.');
            setError('Failed to delete symptom. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-cyan-500">Loading symptoms...</div>
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
                <h2 className="text-2xl font-bold text-cyan-500">Your Symptoms History</h2>
                <Link 
                    to="/symptoms/add" 
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                    Add New Symptom
                </Link>
            </div>
            
            {symptoms.length === 0 ? (
                <p className="text-gray-500 text-center">No symptoms recorded yet.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {symptoms.map((symptom) => (
                        <div 
                            key={symptom.id} 
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                                {symptom.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{symptom.notes}</p>
                            <div className="text-sm text-gray-500">
                                <p>Date: {format(new Date(symptom.date), 'PPP')}</p>
                                <p>Created: {format(new Date(symptom.createdAt), 'PPP')}</p>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Link
                                    to={`/symptoms/${symptom.id}`}
                                    className="px-3 py-1 text-sm text-cyan-500 hover:text-cyan-700"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(symptom.id)}
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

export default GetSymptoms;