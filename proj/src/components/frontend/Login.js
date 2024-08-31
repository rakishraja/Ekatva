import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });
            if (response.status === 200) {
                navigate('/welcome'); // Redirect to Welcome page on successful login
            }
        } catch (error) {
            setError('Invalid credentials'); // Set error message on login failure
        }
    };

    return (
        <div className="container">
            <h2>Student Login</h2>
            <form onSubmit={handleLogin} >
                <div className="form-group">
                    <label>Student Email ID:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
