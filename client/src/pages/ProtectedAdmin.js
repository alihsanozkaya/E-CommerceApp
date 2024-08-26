import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./../contexts/AuthContext";

function ProtectedAdmin({ children }) {
    const { loggedIn, user } = useAuth();
    return loggedIn && user.role === "admin" ? children : <Navigate to="/" />
}

export default ProtectedAdmin;