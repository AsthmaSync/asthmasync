import React from 'react';
import { Link } from 'react-router-dom';
import { FaThermometerHalf, FaPills, FaExclamationTriangle, FaSprayCan, FaChartLine, FaBell } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

const Features = () => {
    const features = [
        {
            icon: <FaThermometerHalf className="text-4xl text-cyan-500" />,
            title: "Symptom Tracking",
            description: "Log and monitor your asthma symptoms over time to identify patterns and triggers."
        },
        {
            icon: <FaPills className="text-4xl text-cyan-500" />,
            title: "Medication Management",
            description: "Keep track of your medications, dosages, and schedules in one convenient place."
        },
        {
            icon: <FaExclamationTriangle className="text-4xl text-cyan-500" />,
            title: "Trigger Identification",
            description: "Record and analyze what triggers your asthma symptoms to better avoid them."
        },
        {
            icon: <FaSprayCan className="text-4xl text-cyan-500" />,
            title: "Inhaler Usage Tracking",
            description: "Monitor your inhaler usage and track remaining puffs to ensure you never run out."
        },
        {
            icon: <FaChartLine className="text-4xl text-cyan-500" />,
            title: "Progress Monitoring",
            description: "View detailed reports and track your asthma management progress over time."
        },
        {
            icon: <FaBell className="text-4xl text-cyan-500" />,
            title: "Emergency Contact",
            description: "Quick access to your emergency contact information when you need it most."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-cyan-500 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">AsthmaSync</h1>
                    <p className="text-xl">Everything you need to manage your asthma effectively</p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action - Updated Link */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Ready to Take Control of Your Asthma?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Join AsthmaSync today and start managing your asthma more effectively.
                    </p>
                    <Link 
                        to="/privacySettings" 
                        className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors inline-block"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Add Back Button */}
            <div className="fixed bottom-8 right-8">
                <Link 
                    to="/" 
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-lg"
                >
                    <FiArrowLeft className="text-lg" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Features; 