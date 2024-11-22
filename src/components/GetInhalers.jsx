import React, { useState, useEffect } from 'react';
import { getInhalers, recordPuffsUsed, trackInhalerPuffs } from '../services/puff';
import { Link } from 'react-router-dom';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import LoadingSpinner from './LoadingSpinner';
import { FiArrowLeft } from 'react-icons/fi';
import { FaSprayCan } from 'react-icons/fa';

const GetInhalers = () => {
    const [inhalers, setInhalers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedInhaler, setSelectedInhaler] = useState(null);
    const [puffsUsed, setPuffsUsed] = useState('');

    const fetchInhalers = async () => {
        try {
            const response = await getInhalers();
            setInhalers(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching inhalers:', err);
            setError('Failed to load inhalers. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInhalers();
    }, []);

    const handleRecordPuffs = async (inhalerId) => {
        if (!puffsUsed) {
            showErrorAlert('Please enter the number of puffs used');
            return;
        }

        try {
            const response = await recordPuffsUsed(inhalerId, Number(puffsUsed));
            showSuccessAlert(`Successfully recorded ${puffsUsed} puffs. ${response.data.remainingPuffs} puffs remaining.`);
            setPuffsUsed('');
            setSelectedInhaler(null);
            fetchInhalers(); // Refresh the list
        } catch (err) {
            showErrorAlert('Failed to record puffs used. Please try again.');
        }
    };

    if (loading) {
        return <LoadingSpinner text="Loading Inhalers..." />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FaSprayCan className="text-3xl text-cyan-500" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Inhalers Log</h2>
                            <p className="text-gray-600">Track and manage your inhalers</p>
                        </div>
                    </div>
                    <Link 
                        to="/addInhaler" 
                        className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                        <span>Add New Inhaler</span>
                    </Link>
                </div>
            </div>

            {/* Inhalers Grid */}
            {inhalers.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <FaSprayCan className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No inhalers recorded yet.</p>
                    <Link 
                        to="/addInhaler"
                        className="text-cyan-500 hover:text-cyan-600 mt-2 inline-block"
                    >
                        Add your first inhaler
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {inhalers.map((inhaler) => (
                        <div 
                            key={inhaler._id} 
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-cyan-500 mb-3">
                                    {inhaler.inhalerName}
                                </h3>
                                <div className="space-y-2 text-gray-600">
                                    <p>Original Total: {inhaler.oriTotal} puffs</p>
                                    <p>Remaining: {inhaler.remainingPuffs || inhaler.oriTotal} puffs</p>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-cyan-500 h-2.5 rounded-full"
                                            style={{ 
                                                width: `${((inhaler.remainingPuffs || inhaler.oriTotal) / inhaler.oriTotal) * 100}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Record Puffs Section */}
                                {selectedInhaler === inhaler._id ? (
                                    <div className="mt-4 space-y-2">
                                        <input
                                            type="number"
                                            value={puffsUsed}
                                            onChange={(e) => setPuffsUsed(e.target.value)}
                                            placeholder="Enter puffs used"
                                            className="w-full px-3 py-2 border rounded-lg"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRecordPuffs(inhaler._id)}
                                                className="flex-1 bg-cyan-500 text-white px-3 py-1 rounded-lg hover:bg-cyan-600"
                                            >
                                                Record
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedInhaler(null);
                                                    setPuffsUsed('');
                                                }}
                                                className="flex-1 bg-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setSelectedInhaler(inhaler._id)}
                                        className="mt-4 w-full bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                                    >
                                        Record Usage
                                    </button>
                                )}
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

export default GetInhalers; 