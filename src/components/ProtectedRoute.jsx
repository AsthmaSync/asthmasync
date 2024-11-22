import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const questionnaireCompleted = localStorage.getItem('questionnaireCompleted');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!questionnaireCompleted && window.location.pathname !== '/questionnaire') {
        return <Navigate to="/questionnaire" replace />;
    }

    return children;
};

export default ProtectedRoute; 