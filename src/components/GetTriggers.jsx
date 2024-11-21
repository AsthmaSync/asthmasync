import React, { useState, useEffect } from 'react';
import { getTriggers, deleteTrigger } from '../services/triggers';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert, showDeleteConfirmation } from '../utils/alerts';

const GetTriggers = () => {
    const [triggers, setTriggers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTriggers = async () => {
        try {
            const response = await getTriggers();
            console.log('Triggers response:', response.data);
            setTriggers(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching triggers:', err);
            showErrorAlert('Failed to load triggers. Please try again later.');
            setError('Failed to load triggers. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTriggers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const result = await showDeleteConfirmation();
            if (result.isConfirmed) {
                await deleteTrigger(id);
                showSuccessAlert('Trigger deleted successfully!');
                fetchTriggers();
            }
        } catch (err) {
            console.error('Error deleting trigger:', err);
            showErrorAlert('Failed to delete trigger. Please try again.');
            setError('Failed to delete trigger. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-cyan-500">Loading triggers...</div>
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
                <h2 className="text-2xl font-bold text-cyan-500">Your Triggers</h2>
                <Link 
                    to="/triggers/add" 
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                    Add New Trigger
                </Link>
            </div>
            
            {triggers.length === 0 ? (
                <p className="text-gray-500 text-center">No triggers recorded yet.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {triggers.map((trigger) => (
                        <div 
                            key={trigger.id} 
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                                {trigger.title}
                            </h3>
                            <div className="text-gray-600 mb-4">
                                <p>{trigger.description}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p>Date: {format(new Date(trigger.date), 'PPP')}</p>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Link
                                    to={`/triggers/${trigger.id}`}
                                    className="px-3 py-1 text-sm text-cyan-500 hover:text-cyan-700"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(trigger.id)}
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

export default GetTriggers;