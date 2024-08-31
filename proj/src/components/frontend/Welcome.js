import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Update the path if needed

const Welcome = () => {
    const { authState } = useContext(AuthContext);
    console.log("in welcomeee",authState);
    // Redirect to login page if not authenticated
    // if (!authState.isAuthenticated) {
    //     return <Navigate to="/login" />;
    // }

    return (
        <div>
            <h1>Welcome to the Welcome Page</h1>
            <p>Only accessible if logged in.</p>
        </div>
    );
};

export default Welcome;
