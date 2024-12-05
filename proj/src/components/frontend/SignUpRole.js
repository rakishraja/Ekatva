import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const SignUpRole = () => {
    const navigate = useNavigate();

    const handleUserTypeChange = (type) => {
        if (type === 'student') {
            navigate('/StudentSignUp'); // Navigate to StudentSignUp page
        } else if (type === 'teacher') {
            navigate('/TeacherSignUp'); // Navigate to TeacherSignUp page
        }
    };

    // Inline styles
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa', // Light background color
        },
        card: {
            backgroundColor: '#ffffff',
            border: 'none',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '0.5rem', // Rounded corners
        },
        title: {
            textAlign: 'center',
            color: '#007bff',
            marginBottom: '1rem',
        },
        subtitle: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#6c757d',
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '0.5rem',
            fontSize: '1.2rem',
        },
        primaryButton: {
            backgroundColor: '#007bff',
            color: '#ffffff',
        },
        secondaryButton: {
            backgroundColor: '#6c757d',
            color: '#ffffff',
        },
        link: {
            textDecoration: 'none',
            color: '#007bff',
        },
        linkContainer: {
            textAlign: 'center',
            marginTop: '1rem',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Select Your Role</h2>
                <p style={styles.subtitle}>Please choose whether you want to register a student or a teacher to continue.</p>
                <div className="d-flex flex-column align-items-center">
                    <button 
                        onClick={() => handleUserTypeChange('student')} 
                        style={{ ...styles.button, ...styles.primaryButton }}
                    >
                        Student
                    </button>
                    <button 
                        onClick={() => handleUserTypeChange('teacher')} 
                        style={{ ...styles.button, ...styles.secondaryButton }}
                    >
                        Teacher
                    </button>
                </div>
                <div style={styles.linkContainer}>
                    <p className="text-muted">Already have an account? <a href="/TeacherLogin" style={styles.link}>Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignUpRole;
