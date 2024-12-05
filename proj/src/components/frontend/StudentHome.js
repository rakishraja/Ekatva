
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import StudentNavbar from './StudentNavbar';
import { AuthContext } from '../AuthContext'; // Assuming this is your AuthContext file

const StudentHome = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const teacherEmail = "teacher@example.com"; // Replace with actual value
    const location = useLocation();
    const { email } = location.state || {};
    const { logout } = useContext(AuthContext); // Get logout function from AuthContext

    console.log("emm ", email); // Replace with actual logged-in teacher email from context or state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teacher/posts', {
                    params: { teacherEmail }
                });
                setPosts(response.data.posts); // Extract posts from the response
            } catch (error) {
                console.error('Error fetching posts:', error.response ? error.response.data : error.message);
                alert('Error fetching posts');
            }
        };

        fetchPosts();
    }, [teacherEmail]);

    // Function to navigate to chat page
    const handleChatPageNavigation = () => {
        navigate('/chatpage', { state: { email } }); // Change this to your actual route for ChatPage
    };

  

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh', margin: '0px', overflowY: 'auto' }}>
            <StudentNavbar />
            <div className="container my-4">
                <h2 className="mb-4 text-center">Welcome to Your Dashboard</h2>

               

                <div className="row">
                    {posts.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-muted">No posts available. Start creating your first post!</p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-sm rounded">
                                    {post.imageUrl && (
                                        <img
                                            src={`http://localhost:5000/${post.imageUrl}`} // Fixed URL interpolation
                                            alt="Post"
                                            className="card-img-top"
                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h6 className="card-title text-success">Posted by: {post.teacherName || "Unknown"}</h6>
                                        <p className="card-text">{post.text}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">Posted on: {new Date(post.createdAt).toLocaleDateString()}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Floating button to ask doubts */}
            <button 
                className="btn btn-primary rounded-circle position-fixed" 
                style={{ bottom: '20px', right: '20px', width: '60px', height: '60px' }} 
                onClick={handleChatPageNavigation}
            >
                <i className="fas fa-comment" style={{ fontSize: '24px' }}></i>
            </button>
        </div>
    );
};

export default StudentHome;
