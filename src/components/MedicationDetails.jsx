import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOneMedication, deleteMedication } from '../services/medications';
import { format } from 'date-fns';
import LoadingSpinner from './LoadingSpinner';
import { showSuccessAlert, showErrorAlert, showDeleteConfirmation } from '../utils/alerts';

const MedicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [medication, setMedication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedicationDetails = async () => {
            try {
                const response = await getOneMedication(id);
                setMedication(response.data);
            } catch (err) {
                console.error('Error fetching medication details:', err);
                setError('Failed to load medication details');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicationDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            const result = await showDeleteConfirmation();
            if (result.isConfirmed) {
                await deleteMedication(id);
                showSuccessAlert('Medication deleted successfully!');
                navigate('/medications');
            }
        } catch (err) {
            console.error('Error deleting medication:', err);
            showErrorAlert('Failed to delete medication. Please try again.');
        }
    };

    if (loading) {
        return <LoadingSpinner text="Loading Medication Details..." />;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-red-500">{error}</div>
        </div>;
    }

    if (!medication) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-gray-500">Medication not found</div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-cyan-500">Medication Details</h2>
                    <div className="space-x-2">
                        <Link
                            to={`/editMedication/${id}`}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => navigate('/medications')}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Back
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Name</h3>
                        <p className="text-gray-600">{medication.name}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Dosage</h3>
                        <p className="text-gray-600">{medication.dosage}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Frequency</h3>
                        <p className="text-gray-600">{medication.frequency}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Start Date</h3>
                        <p className="text-gray-600">
                            {format(new Date(medication.startDate), 'PPP')}
                        </p>
                    </div>

                    {medication.endDate && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">End Date</h3>
                            <p className="text-gray-600">
                                {format(new Date(medication.endDate), 'PPP')}
                            </p>
                        </div>
                    )}

                    {medication.notes && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
                            <p className="text-gray-600">{medication.notes}</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 border-t pt-4">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-red-500 hover:text-red-700"
                    >
                        Delete Medication
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicationDetails; 