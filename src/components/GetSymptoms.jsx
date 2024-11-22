import React, { useState, useEffect } from 'react';
import { getSymptoms, deleteSymptom } from '../services/symptom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert, showDeleteConfirmation } from '../utils/alerts';
import LoadingSpinner from './LoadingSpinner';
import { FiArrowLeft } from 'react-icons/fi';
import { FaThermometerHalf, FaCalendarAlt, FaTrash, FaEdit } from 'react-icons/fa';

const GetSymptoms = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <LoadingSpinner text="Loading Symptoms..." />;
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
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FaThermometerHalf className="text-3xl text-cyan-500" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Symptoms Log</h2>
                            <p className="text-gray-600">Track and manage your asthma symptoms</p>
                        </div>
                    </div>
                    <Link 
                        to="/symptoms/add" 
                        className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                        <span>Add New Symptom</span>
                    </Link>
                </div>
            </div>
            
            {/* Symptoms Grid */}
            {symptoms.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <FaThermometerHalf className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No symptoms recorded yet.</p>
                    <Link 
                        to="/symptoms/add"
                        className="text-cyan-500 hover:text-cyan-600 mt-2 inline-block"
                    >
                        Record your first symptom
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {symptoms.map((symptom) => (
                        <div 
                            key={symptom.id} 
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-cyan-500 mb-3">
                                    {symptom.title}
                                </h3>
                                <div className="text-gray-600 mb-4">
                                    <p className="line-clamp-2">{symptom.notes}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <FaCalendarAlt />
                                    <span>{format(new Date(symptom.date), 'PPP')}</span>
                                </div>
                            </div>
                            
                            <div className="border-t px-6 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                                <Link
                                    to={`/symptoms/${symptom.id}`}
                                    className="text-cyan-500 hover:text-cyan-700 font-medium"
                                >
                                    View Details
                                </Link>
                                <div className="flex gap-3">
                                    <Link
                                        to={`/symptoms/${symptom.id}/edit`}
                                        className="text-gray-500 hover:text-cyan-500 transition-colors"
                                    >
                                        <FaEdit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(symptom.id)}
                                        className="text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Back to Dashboard Button */}
            <div className="fixed bottom-8 right-8">
                <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-lg"
                >
                    <FiArrowLeft className="text-lg" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default GetSymptoms;