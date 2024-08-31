import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                rollNumber,
                email,
                password
            });
            alert(response.data.message);
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    return (
        <div className="container">
            <h2>Student Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-group">
                    <label>Student Roll Number:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={rollNumber} 
                        onChange={(e) => setRollNumber(e.target.value)} 
                        required 
                    />
                </div>
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
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
