import React from 'react';

function Triggers() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-cyan-500 mb-6">Asthma Triggers</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-cyan-500 mb-3">Environmental Triggers</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Pollen</li>
                        <li>Dust mites</li>
                        <li>Mold</li>
                        <li>Pet dander</li>
                        <li>Air pollution</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-cyan-500 mb-3">Physical Triggers</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Exercise</li>
                        <li>Cold air</li>
                        <li>Respiratory infections</li>
                        <li>Strong emotions and stress</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-cyan-500 mb-3">Chemical Triggers</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Tobacco smoke</li>
                        <li>Strong odors</li>
                        <li>Chemical fumes</li>
                        <li>Air fresheners</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-cyan-500 mb-4">Tips for Managing Triggers</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-3">
                    <li>Keep your home clean and dust-free</li>
                    <li>Use air purifiers in your home</li>
                    <li>Check local air quality reports</li>
                    <li>Avoid known triggers when possible</li>
                    <li>Keep windows closed during high pollen days</li>
                    <li>Use hypoallergenic bedding</li>
                    <li>Keep pets out of bedrooms</li>
                </ul>
            </div>
        </div>
    );
}

export default Triggers;
