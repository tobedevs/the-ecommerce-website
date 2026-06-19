import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';

export default function AdminRoute({ children }) {
    const { currentUser, isAdmin} = useAuth();

    if (!currentUser || !isAdmin) {
        console.log("Access denied", currentUser, "isAdmin", isAdmin)
        return <Navigate to= "/Login" />
    }
  return children
}
