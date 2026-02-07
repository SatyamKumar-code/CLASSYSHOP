import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenValid = (token) => {
    if (!token) return false;
    
    try {
        // Decode JWT payload (base64)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Check if token is expired
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            // Token expired, clear storage
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");
            return false;
        }
        
        return true;
    } catch (error) {
        // Invalid token format
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accesstoken");

    if (!isTokenValid(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
