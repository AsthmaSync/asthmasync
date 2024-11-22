import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../utils/alerts';
import LoadingSpinner from '../components/LoadingSpinner';

const Questionnaire = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        asthmaType: '',
        diagnosisDate: '',
        currentMedications: '',
        emergencyContact: {
            name: '',
            phone: '',
            relationship: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('emergency')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                emergencyContact: {
                    ...prev.emergencyContact,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Store the questionnaire data in localStorage
            localStorage.setItem('userProfile', JSON.stringify(formData));
            // Set a flag to indicate questionnaire completion
            localStorage.setItem('questionnaireCompleted', 'true');
            
            showSuccessAlert('Profile completed successfully! Redirecting to dashboard...');
            
            // Direct navigation to dashboard
            navigate('/dashboard', { replace: true });
            
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner text="Saving your profile..." />;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold text-cyan-500 mb-6">Complete Your Asthma Profile</h1>
            <p className="text-gray-600 mb-8">
                Please provide information about your asthma to help us personalize your experience.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                {/* Personal Information */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Age*</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Enter your age"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender*</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Asthma Information */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Type of Asthma*</label>
                    <select
                        name="asthmaType"
                        value={formData.asthmaType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="">Select type</option>
                        <option value="allergic">Allergic Asthma</option>
                        <option value="nonallergic">Non-allergic Asthma</option>
                        <option value="exerciseInduced">Exercise-induced Asthma</option>
                        <option value="occupational">Occupational Asthma</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Diagnosis Date*</label>
                    <input
                        type="date"
                        name="diagnosisDate"
                        value={formData.diagnosisDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Current Medications</label>
                    <textarea
                        name="currentMedications"
                        value={formData.currentMedications}
                        onChange={handleChange}
                        placeholder="List any medications you're currently taking"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        rows="3"
                    />
                </div>

                {/* Emergency Contact */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Emergency Contact</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Name*</label>
                            <input
                                type="text"
                                name="emergency.name"
                                value={formData.emergencyContact.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone Number*</label>
                            <input
                                type="tel"
                                name="emergency.phone"
                                value={formData.emergencyContact.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Relationship*</label>
                            <input
                                type="text"
                                name="emergency.relationship"
                                value={formData.emergencyContact.relationship}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                        Complete Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Questionnaire;
