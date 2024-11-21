import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOneTrigger, deleteTrigger } from '../services/triggers';
import { format } from 'date-fns';

function TriggerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trigger, setTrigger] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTriggerDetails = async () => {
            try {
                const response = await getOneTrigger(id);
                setTrigger(response.data);
            } catch (err) {
                console.error('Error fetching trigger details:', err);
                setError('Failed to load trigger details');
            } finally {
                setLoading(false);
            }
        };

        fetchTriggerDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this trigger?')) {
            try {
                await deleteTrigger(id);
                navigate('/triggers');
            } catch (err) {
                console.error('Error deleting trigger:', err);
                setError('Failed to delete trigger');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-cyan-500">Loading...</div>
        </div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-red-500">{error}</div>
        </div>;
    }

    if (!trigger) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-gray-500">Trigger not found</div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-cyan-500">Trigger Details</h2>
                    <div className="space-x-2">
                        <Link
                            to={`/triggers/${id}/edit`}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => navigate('/triggers')}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Back
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Name</h3>
                        <p className="text-gray-600">{trigger.title}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                        <p className="text-gray-600">{trigger.notes || 'No description provided'}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Date</h3>
                        <p className="text-gray-600">
                            {format(new Date(trigger.date), 'PPP')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Created</h3>
                        <p className="text-gray-600">
                            {format(new Date(trigger.createdAt), 'PPP')}
                        </p>
                    </div>

                    {trigger.updatedAt && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Last Updated</h3>
                            <p className="text-gray-600">
                                {format(new Date(trigger.updatedAt), 'PPP')}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8 border-t pt-4">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-red-500 hover:text-red-700"
                    >
                        Delete Trigger
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TriggerDetails; 