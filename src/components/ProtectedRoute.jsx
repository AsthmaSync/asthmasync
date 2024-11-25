import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const userProfile = userEmail ? localStorage.getItem(`profile_${userEmail}`) : null;
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If no profile and not on questionnaire page, redirect to questionnaire
    if (!userProfile && location.pathname !== '/questionnaire') {
        return <Navigate to="/questionnaire" replace />;
    }

    return children;
};

export default ProtectedRoute;