import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaQuestionCircle, FaBug, FaComments } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

const Contact = () => {
    const contactReasons = [
        {
            icon: <FaQuestionCircle className="text-4xl text-cyan-500" />,
            title: "Technical Support",
            description: "Get help with app features, account issues, or technical difficulties."
        },
        {
            icon: <FaBug className="text-4xl text-cyan-500" />,
            title: "Report Issues",
            description: "Report any bugs or problems you encounter while using AsthmaSync."
        },
        {
            icon: <FaComments className="text-4xl text-cyan-500" />,
            title: "Feedback & Suggestions",
            description: "Share your ideas on how we can improve AsthmaSync to better serve your needs."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-cyan-500 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl">We're here to help you manage your asthma better</p>
                </div>
            </div>

            {/* Contact Reasons */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid gap-8 md:grid-cols-3">
                    {contactReasons.map((reason, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {reason.title}
                                </h3>
                                <p className="text-gray-600">
                                    {reason.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-center gap-3">
                                <FaEnvelope className="text-cyan-500 text-xl" />
                                <a href="mailto:support@asthmasync.com" className="text-gray-600 hover:text-cyan-500">
                                    support@asthmasync.com
                                </a>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <FaPhone className="text-cyan-500 text-xl" />
                                <a href="tel:+1234567890" className="text-gray-600 hover:text-cyan-500">
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>
                    </div>
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

export default Contact; 