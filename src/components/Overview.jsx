import React, { useState, useEffect } from 'react';
import { apiGetData } from '../services/auth';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Overview = () => {
    const [userData, setUserData] = useState({
        symptoms: [],
        medications: [],
        triggers: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiGetData();
                console.log('User dashboard data:', response.data);
                setUserData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load your data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-cyan-500">Loading your dashboard...</div>
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
            <h1 className="text-3xl font-bold text-cyan-500 mb-8">Your Health Overview</h1>

            {/* Recent Symptoms Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Recent Symptoms</h2>
                    <Link to="/symptoms" className="text-cyan-500 hover:text-cyan-600">
                        View All →
                    </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {userData.symptoms && userData.symptoms.length > 0 ? (
                        userData.symptoms.slice(0, 3).map((symptom) => (
                            <div key={symptom.id} className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="font-semibold text-cyan-500">{symptom.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{symptom.notes}</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {format(new Date(symptom.date), 'PPP')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3">No symptoms recorded yet</p>
                    )}
                </div>
            </div>

            {/* Recent Medications Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Recent Medications</h2>
                    <Link to="/medications" className="text-cyan-500 hover:text-cyan-600">
                        View All →
                    </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {userData.medications && userData.medications.length > 0 ? (
                        userData.medications.slice(0, 3).map((medication) => (
                            <div key={medication.id} className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="font-semibold text-cyan-500">{medication.name}</h3>
                                <p className="text-gray-600 text-sm mt-1">Dosage: {medication.dosage}</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {format(new Date(medication.date), 'PPP')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3">No medications recorded yet</p>
                    )}
                </div>
            </div>

            {/* Recent Triggers Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Recent Triggers</h2>
                    <Link to="/triggers" className="text-cyan-500 hover:text-cyan-600">
                        View All →
                    </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {userData.triggers && userData.triggers.length > 0 ? (
                        userData.triggers.slice(0, 3).map((trigger) => (
                            <div key={trigger.id} className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="font-semibold text-cyan-500">{trigger.name}</h3>
                                <p className="text-gray-600 text-sm mt-1">{trigger.description}</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {format(new Date(trigger.date), 'PPP')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3">No triggers recorded yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overview;