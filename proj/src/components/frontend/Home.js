import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); 
    const handleGetStarted = () => {
        
        navigate('/RoleSelection'); // Navigate to the role selection page
    };
    return (
        <>
            {/* <Navbar /> */}
            <div
                className="home-container text-center d-flex flex-column justify-content-center align-items-center"
                style={{
                    height: '100vh',
                    backgroundImage: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
                    color: '#fff',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <div className="container text-center" style={{ animation: 'fadeIn 1.5s ease-in-out' }}>
                    <h1 className="display-1 fw-bold mb-4" style={{ fontSize: '4rem', color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        EKATVA
                    </h1>
                    <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem' }}>
                        Unity starts here.
                    </p>
                    <button
                        className="get-started-btn"
                        onClick={handleGetStarted} // Call the function on click
                        style={{
                            padding: '12px 30px',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#0072ff',
                            backgroundColor: '#ffffff',
                            border: 'none',
                            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* CSS for animations and button hover */}
            <style>
                {`
                    /* Fade-in animation */
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }

                    /* Button hover effect */
                    .get-started-btn:hover {
                        background-color: #0072ff;
                        color: #ffffff;
                        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
                        transform: translateY(-2px);
                    }

                    /* Add smooth transition to button */
                    .get-started-btn:active {
                        transform: translateY(1px);
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    /* Responsive adjustments */
                    @media (max-width: 768px) {
                        .display-1 {
                            font-size: 2.5rem;
                        }
                        .lead {
                            font-size: 1rem;
                        }
                        .get-started-btn {
                            padding: 10px 20px;
                            font-size: 1rem;
                        }
                    }

                    /* Optional: Background animation for more dynamism */
                    @keyframes gradientAnimation {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    .home-container {
                        animation: gradientAnimation 10s ease infinite;
                        background-size: 200% 200%;
                    }
                `}
            </style>
        </>
    );
};

export default Home;
