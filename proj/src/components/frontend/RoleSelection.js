import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleSelection = (role) => {
        // Navigate to the corresponding page based on role
        if (role === "teacher") {
            navigate('/TeacherLogin'); // Navigate to TeacherHandler page
        } else if (role === "student") {
            navigate('/StudentLogin'); // Navigate to StudentLogin page
        }
    };

    return (
        <div
            className="role-selection-container d-flex flex-column justify-content-center align-items-center"
            style={{
                height: '100vh',
                backgroundColor: '#e0f7fa', // Light blue background color
                padding: '20px',
            }}
        >
            <h2 className="display-4 mb-4" style={{ color: '#333' }}>Choose Your Role</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div
                        className="col-md-4 col-sm-12 mb-4"
                        onClick={() => handleSelection("teacher")}
                    >
                        <div
                            className="card text-center border-0 shadow"
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                backgroundColor: '#4c9aff',
                                color: '#fff',
                            }}
                        >
                            <div className="card-body">
                                <h3 className="card-title" style={{ fontSize: '1.5rem' }}>Teacher</h3>
                                <p className="card-text">Access tools and resources for teaching.</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-md-4 col-sm-12 mb-4"
                        onClick={() => handleSelection("student")}
                    >
                        <div
                            className="card text-center border-0 shadow"
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                backgroundColor: '#34c759',
                                color: '#fff',
                            }}
                        >
                            <div className="card-body">
                                <h3 className="card-title" style={{ fontSize: '1.5rem' }}>Student</h3>
                                <p className="card-text">Access resources and connect with peers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional styling for hover effects */}
            <style>
                {`
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.2);
                    }
                `}
            </style>
        </div>
    );
};

export default RoleSelection;
