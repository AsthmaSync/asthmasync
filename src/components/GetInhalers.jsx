import React, { useState, useEffect } from 'react';
import { getInhalers, recordPuffsUsed } from '../services/puff';
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
            console.log('Fetched inhalers response:', response);
            
            const inhalersData = response.data.inhalers || response.data;
            console.log('Inhalers data:', inhalersData);
            
            setInhalers(Array.isArray(inhalersData) ? inhalersData : []);
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
        if (!puffsUsed || puffsUsed <= 0) {
            showErrorAlert('Please enter a valid number of puffs used');
            return;
        }

        try {
            const response = await recordPuffsUsed(inhalerId, Number(puffsUsed));
            console.log('Record puffs response:', response);
            
            const remainingPuffs = response.data.inhaler.remainingPuffs;
            const originalTotal = response.data.inhaler.oriTotal;
            
            showSuccessAlert(`Successfully recorded ${puffsUsed} puffs. ${remainingPuffs} puffs remaining out of ${originalTotal}.`);
            setPuffsUsed('');
            setSelectedInhaler(null);
            
            setInhalers(prevInhalers => 
                prevInhalers.map(inhaler => 
                    inhaler._id === inhalerId 
                        ? { ...inhaler, remainingPuffs } 
                        : inhaler
                )
            );
        } catch (err) {
            console.error('Error recording puffs:', err);
            showErrorAlert('Failed to record puffs. Please try again.');
        }
    };

    if (loading) {
        return <LoadingSpinner text="Loading Inhalers..." />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                    <div className="flex items-center gap-3">
                        <FaSprayCan className="text-2xl sm:text-3xl text-cyan-500" />
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Inhalers Log</h2>
                            <p className="text-gray-600 text-sm sm:text-base">Track and manage your inhalers</p>
                        </div>
                    </div>
                    <Link 
                        to="/addInhaler" 
                        className="w-full sm:w-auto bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-center"
                    >
                        Add New Inhaler
                    </Link>
                </div>
            </div>

            {/* Inhalers Grid */}
            {inhalers.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <FaSprayCan className="text-4xl sm:text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-base sm:text-lg">No inhalers recorded yet.</p>
                    <Link 
                        to="/addInhaler"
                        className="text-cyan-500 hover:text-cyan-600 mt-2 inline-block"
                    >
                        Add your first inhaler
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                                    <p>Total Puffs: {inhaler.oriTotal}</p>
                                    <p className="font-medium">
                                        Remaining: {inhaler.remainingPuffs || inhaler.oriTotal} puffs
                                    </p>
                                    <p>Used: {inhaler.oriTotal - (inhaler.remainingPuffs || inhaler.oriTotal)} puffs</p>
                                    
                                    {/* Progress Bar */}
                                    <div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div>
                                                <span className="text-xs font-semibold inline-block text-cyan-600">
                                                    {Math.round(((inhaler.remainingPuffs || inhaler.oriTotal) / inhaler.oriTotal) * 100)}% remaining
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                            <div 
                                                style={{ width: `${((inhaler.remainingPuffs || inhaler.oriTotal) / inhaler.oriTotal) * 100}%` }}
                                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300 ${
                                                    ((inhaler.remainingPuffs || inhaler.oriTotal) / inhaler.oriTotal) <= 0.2 
                                                    ? 'bg-red-500' 
                                                    : 'bg-cyan-500'
                                                }`}
                                            ></div>
                                        </div>
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
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
            <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
                <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-lg text-sm sm:text-base"
                >
                    <FiArrowLeft className="text-lg" />
                    <span className="hidden sm:inline">Back to Dashboard</span>
                    <span className="sm:hidden">Back</span>
                </Link>
            </div>
        </div>
    );
};

export default GetInhalers; 