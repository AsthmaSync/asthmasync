import React from 'react';

const LoadingSpinner = ({ text = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="relative">
                {/* Main spinner circle */}
                <div className="w-20 h-20 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
                
                {/* Pulsing overlay */}
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-cyan-500 rounded-full animate-pulse opacity-30"></div>
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                </div>
            </div>
            
            {/* Loading text */}
            <div className="mt-4 text-cyan-500 text-lg font-medium animate-pulse">
                {text}
            </div>
        </div>
    );
};

export default LoadingSpinner; 