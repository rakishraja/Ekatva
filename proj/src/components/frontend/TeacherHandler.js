import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

const TeacherHandler = () => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div
            className="teacher-handler-container d-flex flex-column justify-content-center align-items-center"
            style={{
                height: '100vh',
                backgroundColor: '#f0f4f8', // Light gray background
                padding: '20px',
            }}
        >
            <h2 className="display-4 mb-4" style={{ color: '#333' }}>Teacher Handler</h2>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => handleTabChange('login')}
                        style={{ cursor: 'pointer' }}
                    >
                        Login
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'signup-student' ? 'active' : ''}`}
                        onClick={() => handleTabChange('signup-student')}
                        style={{ cursor: 'pointer' }}
                    >
                        Sign Up Student
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'signup-teacher' ? 'active' : ''}`}
                        onClick={() => handleTabChange('signup-teacher')}
                        style={{ cursor: 'pointer' }}
                    >
                        Sign Up Teacher
                    </a>
                </li>
            </ul>

            {activeTab === 'login' && (
                <div className="card w-50 border-0 shadow">
                    <div className="card-body">
                        <h3 className="card-title">Teacher Login</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="loginEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="loginEmail" placeholder="Enter your email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="loginPassword" placeholder="Enter your password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'signup-student' && (
                <div className="card w-50 border-0 shadow">
                    <div className="card-body">
                        <h3 className="card-title">Sign Up Student</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="studentName" className="form-label">Student Name</label>
                                <input type="text" className="form-control" id="studentName" placeholder="Enter student's name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="studentEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="studentEmail" placeholder="Enter student's email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="studentPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="studentPassword" placeholder="Enter password" required />
                            </div>
                            <button type="submit" className="btn btn-success">Sign Up Student</button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'signup-teacher' && (
                <div className="card w-50 border-0 shadow">
                    <div className="card-body">
                        <h3 className="card-title">Sign Up Teacher</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="teacherName" className="form-label">Teacher Name</label>
                                <input type="text" className="form-control" id="teacherName" placeholder="Enter teacher's name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="teacherEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="teacherEmail" placeholder="Enter teacher's email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="teacherPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="teacherPassword" placeholder="Enter password" required />
                            </div>
                            <button type="submit" className="btn btn-warning">Sign Up Teacher</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherHandler;
