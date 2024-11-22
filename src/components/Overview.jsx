import React, { useState, useEffect } from 'react';
import { apiData } from '../services/auth';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { FaThermometerHalf, FaPills, FaExclamationTriangle, FaSprayCan } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

const Overview = () => {
    const [userData, setUserData] = useState({
        triggers: [],
        symptoms: [],
        medications: [],
        inhalers: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await apiData();
                console.log('All user data:', response.data);
                setUserData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load your data');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return <LoadingSpinner text="Loading your data..." />;
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
            <h1 className="text-3xl font-bold text-cyan-500 mb-8 flex items-center gap-2">
                Your Health Overview
            </h1>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <FaThermometerHalf className="text-2xl" />
                        <h3 className="text-lg font-semibold">Symptoms</h3>
                    </div>
                    <p className="text-3xl font-bold">{userData.symptoms?.length || 0}</p>
                    <p className="text-sm opacity-80">Total recorded symptoms</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <FaPills className="text-2xl" />
                        <h3 className="text-lg font-semibold">Medications</h3>
                    </div>
                    <p className="text-3xl font-bold">{userData.medications?.length || 0}</p>
                    <p className="text-sm opacity-80">Active medications</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <FaExclamationTriangle className="text-2xl" />
                        <h3 className="text-lg font-semibold">Triggers</h3>
                    </div>
                    <p className="text-3xl font-bold">{userData.triggers?.length || 0}</p>
                    <p className="text-sm opacity-80">Identified triggers</p>
                </div>
            </div>

            {/* Recent Symptoms Section */}
            <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-cyan-500 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FaThermometerHalf className="text-white text-xl" />
                            <h2 className="text-xl font-semibold text-white">Recent Symptoms</h2>
                        </div>
                        <Link to="/symptoms" className="text-white hover:text-cyan-100 text-sm">
                            View All →
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {userData.symptoms && userData.symptoms.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userData.symptoms.slice(0, 3).map((symptom) => (
                                <div key={symptom.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-cyan-500">{symptom.title}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{symptom.notes}</p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        {format(new Date(symptom.date), 'PPP')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No symptoms recorded yet</p>
                    )}
                </div>
            </div>

            {/* Recent Medications Section */}
            <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-cyan-500 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FaPills className="text-white text-xl" />
                            <h2 className="text-xl font-semibold text-white">Recent Medications</h2>
                        </div>
                        <Link to="/medications" className="text-white hover:text-cyan-100 text-sm">
                            View All →
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {userData.medications && userData.medications.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userData.medications.slice(0, 3).map((medication) => (
                                <div key={medication._id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-cyan-500">{medication.name}</h3>
                                    <p className="text-gray-600 text-sm">Dosage: {medication.dosage}</p>
                                    <p className="text-gray-600 text-sm">Frequency: {medication.frequency}</p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Start Date: {format(new Date(medication.startDate), 'PPP')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No medications recorded yet</p>
                    )}
                </div>
            </div>

            {/* Recent Triggers Section */}
            <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-cyan-500 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FaExclamationTriangle className="text-white text-xl" />
                            <h2 className="text-xl font-semibold text-white">Recent Triggers</h2>
                        </div>
                        <Link to="/triggers" className="text-white hover:text-cyan-100 text-sm">
                            View All →
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {userData.triggers && userData.triggers.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userData.triggers.slice(0, 3).map((trigger) => (
                                <div key={trigger.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-cyan-500">{trigger.title}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{trigger.notes}</p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        {format(new Date(trigger.date), 'PPP')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No triggers recorded yet</p>
                    )}
                </div>
            </div>

            {/* Recent Inhalers Section */}
            <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-cyan-500 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FaSprayCan className="text-white text-xl" />
                            <h2 className="text-xl font-semibold text-white">Recent Inhalers</h2>
                        </div>
                        <Link to="/inhalers" className="text-white hover:text-cyan-100 text-sm">
                            View All →
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {userData.inhalers && userData.inhalers.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userData.inhalers.slice(0, 3).map((inhaler) => (
                                <div key={inhaler._id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-cyan-500">{inhaler.inhalerName}</h3>
                                    <div className="text-gray-600 space-y-2">
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
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No inhalers recorded yet</p>
                    )}
                </div>
            </div>

            {/* Add Back to Dashboard Button */}
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

export default Overview;