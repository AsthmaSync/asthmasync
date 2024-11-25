import React, { useState, useEffect } from 'react';
import { getMedications, deleteMedication } from '../services/medications';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert, showDeleteConfirmation } from '../utils/alerts';
import LoadingSpinner from './LoadingSpinner';
import { FiArrowLeft } from 'react-icons/fi';
import { FaPills, FaCalendarAlt, FaTrash, FaEdit } from 'react-icons/fa';

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
        return <LoadingSpinner text="Loading Medications..." />;
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
            {/* Header Section - Made responsive */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                    <div className="flex items-center gap-3">
                        <FaPills className="text-2xl sm:text-3xl text-cyan-500" />
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Medications Log</h2>
                            <p className="text-gray-600 text-sm sm:text-base">Track and manage your medications</p>
                        </div>
                    </div>
                    <Link 
                        to="/medications/add" 
                        className="w-full sm:w-auto bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-center"
                    >
                        Add New Medication
                    </Link>
                </div>
            </div>
            
            {/* Medications Grid - Made responsive */}
            {medications.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <FaPills className="text-4xl sm:text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-base sm:text-lg">No medications recorded yet.</p>
                    <Link 
                        to="/medications/add"
                        className="text-cyan-500 hover:text-cyan-600 mt-2 inline-block"
                    >
                        Record your first medication
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {medications.map((medication) => (
                        <div 
                            key={medication._id} 
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-cyan-500 mb-3">
                                    {medication.name}
                                </h3>
                                <div className="text-gray-600 space-y-2">
                                    <p>Dosage: {medication.dosage}</p>
                                    <p>Frequency: {medication.frequency}</p>
                                    <p>Purpose: {medication.purpose}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                                    <FaCalendarAlt />
                                    <span>Start Date: {format(new Date(medication.startDate), 'PPP')}</span>
                                </div>
                            </div>
                            
                            <div className="border-t px-6 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                                <Link
                                    to={`/medications/${medication._id}`}
                                    className="text-cyan-500 hover:text-cyan-700 font-medium"
                                >
                                    View Details
                                </Link>
                                <div className="flex gap-3">
                                    <Link
                                        to={`/medications/${medication._id}/edit`}
                                        className="text-gray-500 hover:text-cyan-500 transition-colors"
                                    >
                                        <FaEdit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(medication._id)}
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
            <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
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

export default GetMedications;