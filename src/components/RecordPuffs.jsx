import React, { useState, useEffect } from 'react';
import { recordPuffsUsed, getOneInhaler } from '../services/puff';
import { useNavigate, useParams } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import LoadingSpinner from './LoadingSpinner';

const RecordPuffs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inhaler, setInhaler] = useState(null);
    const [puffsUsed, setPuffsUsed] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInhaler = async () => {
            try {
                const response = await getOneInhaler(id);
                setInhaler(response.data);
            } catch (err) {
                console.error('Error fetching inhaler:', err);
                setError('Failed to load inhaler details');
            } finally {
                setLoading(false);
            }
        };

        fetchInhaler();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!puffsUsed || puffsUsed <= 0) {
            showErrorAlert('Please enter a valid number of puffs used');
            return;
        }

        setLoading(true);

        try {
            const response = await recordPuffsUsed(id, Number(puffsUsed));
            console.log('Record puffs response:', response);
            
            showSuccessAlert(`Successfully recorded ${puffsUsed} puffs used.`);
            navigate('/inhalers');
        } catch (err) {
            console.error('Error recording puffs:', err);
            showErrorAlert('Failed to record puffs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner text="Loading Inhaler Details..." />;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h2 className="text-2xl font-bold text-cyan-500 mb-6">Record Puffs Used</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Number of Puffs Used*
                    </label>
                    <input
                        type="number"
                        value={puffsUsed}
                        onChange={(e) => setPuffsUsed(e.target.value)}
                        required
                        min="1"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter number of puffs"
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
                        className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                    >
                        Record Puffs
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecordPuffs; 