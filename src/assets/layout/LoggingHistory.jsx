import React from 'react';
import { format } from 'date-fns';

function LoggingHistory() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-cyan-500 mb-6">Logging History</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="space-y-4">
                    {/* You can add your logging history content here */}
                    <p className="text-gray-600">Your logging history will appear here.</p>
                </div>
            </div>
        </div>
    );
}

export default LoggingHistory;
