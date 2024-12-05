// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const StudentNavbar = () => {
//     const navigate = useNavigate();
    
//     const handleChatPageNavigation = () => {
//         navigate('/chatpage'); // Navigate to the ChatPage
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//             <div className="container">
//                 <Link className="navbar-brand" to="/">EKATVA</Link>
//                 <button 
//                     className="navbar-toggler" 
//                     type="button" 
//                     data-toggle="collapse" 
//                     data-target="#navbarNav" 
//                     aria-controls="navbarNav" 
//                     aria-expanded="false" 
//                     aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav ml-auto">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/StudentLogin">Login</Link>
//                         </li>
                        
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default StudentNavbar;
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import your AuthContext

const StudentNavbar = () => {
    const { authState, logout } = useContext(AuthContext); // Get authState and logout function
    const navigate = useNavigate();

  

    const handleLogout = () => {
        logout(); // Call logout function from context
        localStorage.removeItem('studentEmail'); 
        navigate('/StudentLogin'); // Redirect to login page after logout
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
                        {/* Conditionally render Login or Logout based on authentication state */}
                        {!authState.isAuthenticated ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/StudentLogin">Login</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link btn" style={{ background: 'none', color: 'white', border: 'none' }} onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                                
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default StudentNavbar;
