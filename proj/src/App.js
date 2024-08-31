import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/frontend/Home';
import Navbar from './components/frontend/Navbar';
import Login from './components/frontend/Login';
import SignUp from './components/frontend/SignUp';
import Welcome from './components/frontend/Welcome';
import { AuthContext } from './components/AuthContext';
import { AuthProvider } from './components/AuthContext';
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
