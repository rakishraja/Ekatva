import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const TeacherLogin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/teacher/login', { name, password });
            if (response.status === 200) {
                login(response); 
                console.log("zzzress ",response.data);
                
                localStorage.setItem('teacherName', name);
                console.log("iiiii",localStorage.getItem("teacherName"));
                // Navigate to Teacher Home Page on success
                navigate('/TeacherHome', { state: { name } });
            }
        } catch (error) {
            alert('Error: ' + (error.response ? error.response.data.message : 'Login failed'));
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
            {/* <Navbar /> */}
            <div style={styles.card}>
                <h2 style={styles.title}>Teacher Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label style={styles.label}>Name:</label>
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherLogin;
