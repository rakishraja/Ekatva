import React from 'react';
import Navbar from './Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <>
            
            <div
                className="bg-dark text-center d-flex flex-column justify-content-center align-items-center"
                style={{
                    height: '100vh',
                    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff'
                }}
            >
                <div className="container text-center">
                    <h1 className="display-1 fw-bold mb-4 text-white">EKATVA</h1>
                    <p className="lead text-light mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Unity starts here.
                    </p>
                    <button
                        className="btn btn-primary btn-lg rounded-pill shadow"
                        style={{ padding: '12px 30px' }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
