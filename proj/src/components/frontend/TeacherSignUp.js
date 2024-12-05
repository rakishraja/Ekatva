import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const TeacherSignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/teacher/signup', {
                name,
                email,
                password
            });
            alert(response.data.message);
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    // Inline styles
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f8ff', // Light blue background
        },
        card: {
            backgroundColor: '#ffffff', // White background for the card
            borderRadius: '0.5rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
        },
        title: {
            textAlign: 'center',
            color: '#007bff', // Bootstrap primary color
            marginBottom: '1.5rem',
        },
        label: {
            marginBottom: '0.5rem',
            fontWeight: 'bold',
        },
        input: {
            borderRadius: '0.25rem',
            borderColor: '#ced4da', // Light gray border
            marginBottom: '1rem',
        },
        button: {
            backgroundColor: '#007bff', // Primary button color
            color: '#ffffff',
            padding: '0.75rem',
            borderRadius: '0.25rem',
            width: '100%',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3', // Darker blue for hover effect
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Teacher Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label style={styles.label}>Teacher Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            style={styles.input} 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label style={styles.label}>Teacher Email ID:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            style={styles.input} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label style={styles.label}>Password:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            style={styles.input} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    >
                        Sign Up
                    </button>
                    <div style={styles.linkContainer}>
                    <p className="text-muted">Already have an account? <a href="/TeacherLogin" style={styles.link}>Login here</a></p>
                </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherSignUp;
