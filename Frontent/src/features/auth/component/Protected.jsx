import React from 'react'

import { useAuth } from '../hooks/useAuth.js';
import { Navigate } from 'react-router-dom';
export default function Protected({ children, role }) {
    const { loading, user } = useAuth();
    console.log("Protected component - user:", user, "loading:", loading);

    if (loading) {
        return <div>Loading...</div>;
    }
    if(!user){
        return <Navigate to="/login" replace />;
    }
    if(role && user.role !== role){
        return <Navigate to="/" replace />;
    }
  return children;
}

