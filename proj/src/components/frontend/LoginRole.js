import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRole = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'student') {
            navigate('/StudentLogin'); // Navigate to StudentLogin page
        } else if (role === 'teacher') {
            navigate('/TeacherLogin'); // Navigate to TeacherLogin page
        }
    };

    return (
        <div className="container">
            <h1>Welcome! Please Select Your Role</h1>
            <div className="button-group">
                <button className="btn btn-primary" onClick={() => handleRoleSelection('student')}>
                    I am a Student
                </button>
                <button className="btn btn-secondary" onClick={() => handleRoleSelection('teacher')}>
                    I am a Teacher
                </button>
            </div>
        </div>
    );
};

export default LoginRole;
