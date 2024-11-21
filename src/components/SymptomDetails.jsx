import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOneSymptom, deleteSymptom } from '../services/symptom';
import { format } from 'date-fns';

const SymptomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [symptom, setSymptom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSymptomDetails = async () => {
            try {
                const response = await getOneSymptom(id);
                setSymptom(response.data);
            } catch (err) {
                console.error('Error fetching symptom details:', err);
                setError('Failed to load symptom details');
            } finally {
                setLoading(false);
            }
        };

        fetchSymptomDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this symptom?')) {
            try {
                await deleteSymptom(id);
                navigate('/symptoms');
            } catch (err) {
                console.error('Error deleting symptom:', err);
                setError('Failed to delete symptom');
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

    if (!symptom) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-gray-500">Symptom not found</div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-cyan-500">Symptom Details</h2>
                    <div className="space-x-2">
                        <Link
                            to={`/symptoms/${id}/edit`}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => navigate('/symptoms')}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Back
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Title</h3>
                        <p className="text-gray-600">{symptom.title}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
                        <p className="text-gray-600">{symptom.notes || 'No notes provided'}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Date</h3>
                        <p className="text-gray-600">
                            {format(new Date(symptom.date), 'PPP')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Created</h3>
                        <p className="text-gray-600">
                            {format(new Date(symptom.createdAt), 'PPP')}
                        </p>
                    </div>

                    {symptom.updatedAt && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Last Updated</h3>
                            <p className="text-gray-600">
                                {format(new Date(symptom.updatedAt), 'PPP')}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8 border-t pt-4">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-red-500 hover:text-red-700"
                    >
                        Delete Symptom
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SymptomDetails; 