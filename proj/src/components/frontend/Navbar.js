import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import your AuthContext



const Navbar = () => {
    const { authState, logout } = useContext(AuthContext); // Get authState and logout function
    const navigate = useNavigate();

    const handleLogout = () => {
    
        logout(); // Call logout function from context
        localStorage.removeItem('teacherName'); 
        navigate('/TeacherLogin'); // Redirect to login page after logout
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">EKATVA</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/TeacherLogin">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/SignUpRole">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                                    <button className="nav-link btn" style={{ background: 'none', color: 'white', border: 'none' }} onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
