// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './Navbar';
// const TeacherHome = () => {
//     const [posts, setPosts] = useState([]);
//     const [filter, setFilter] = useState('All');
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { name } = location.state || {};

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/teacher/posts');
//                 setPosts(response.data.posts);
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//                 alert('Error fetching posts');
//             }
//         };

//         fetchPosts();
//     }, []);

//     const handleDelete = async (postId) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/teacher/post/${postId}`);
//             setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
//             alert('Post deleted successfully');
//         } catch (error) {
//             console.error('Error deleting post:', error);
//             alert('Error deleting post');
//         }
//     };

//     const filteredPosts = filter === 'Me'
//         ? posts.filter((post) => post.teacherName === name)
//         : posts;

//     return (
        
//         <div className="d-flex" style={{ minHeight: '100vh', flexDirection: 'column', overflowY: 'auto' }}>
//             <Navbar/>
//             {/* Hamburger Menu Button */}
//             <button
//                 className="hamburger-btn"
//                 data-bs-toggle="offcanvas"
//                 data-bs-target="#sidebar"
//                 aria-controls="sidebar"
//             >
//                 <div className="hamburger-icon">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                 </div>
//             </button>

//             {/* Offcanvas Sidebar */}
//             <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
//                 <div className="offcanvas-header">
//                     <h5 className="offcanvas-title" id="sidebarLabel">Dashboard</h5>
//                     <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                 </div>
//                 <div className="offcanvas-body">
//                     <ul className="nav flex-column">
//                         <li className="nav-item">
//                             <button
//                                 className="btn btn-link nav-link"
//                                 onClick={() => navigate('/TeacherPostPage', { state: { name } })}
//                             >
//                                 Create New Post
//                             </button>
//                         </li>
//                         <li className="nav-item">
//                             <select
//                                 className="form-select my-3"
//                                 value={filter}
//                                 onChange={(e) => setFilter(e.target.value)}
//                             >
//                                 <option value="All">All Posts</option>
//                                 <option value="Me">My Posts</option>
//                             </select>
//                         </li>
//                         <li className="nav-item">
//                             <button
//                                 className="btn btn-link nav-link"
//                                 onClick={() => navigate('/ChatPage', { state: { name } })}
//                             >
//                                 Chat Page
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="container my-5">
//                 <h2 className="mb-4 text-center">Welcome to Teacher Dashboard</h2>
//                 <div className="row">
//                     {filteredPosts.length === 0 ? (
//                         <div className="col-12 text-center">
//                             <p className="text-muted">No posts available. Start creating your first post!</p>
//                         </div>
//                     ) : (
//                         filteredPosts.map((post) => (
//                             <div key={post._id} className="col-md-6 col-lg-4 mb-4">
//                                 <div className="card h-100 shadow-sm">
//                                     {post.imageUrl && (
//                                         <img
//                                             src={`http://localhost:5000/${post.imageUrl}`}
//                                             alt="Post"
//                                             className="card-img-top"
//                                             style={{ maxHeight: '200px', objectFit: 'cover' }}
//                                         />
//                                     )}
//                                     <div className="card-body">
//                                         <h6 className="card-title">Posted by: {post.teacherName || "Unknown"}</h6>
//                                         <p className="card-text">{post.text}</p>
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             <small className="text-muted">
//                                                 Posted on: {new Date(post.createdAt).toLocaleDateString()}
//                                             </small>
//                                             <button
//                                                 className="btn btn-danger btn-sm"
//                                                 onClick={() => handleDelete(post._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* CSS for Hamburger Icon */}
//             <style jsx>{`
//                 .hamburger-btn {
//                     background: none;
//                     border: none;
//                     outline: none;
//                     margin: 1rem;
//                     cursor: pointer;
//                     position: absolute;
//                     top: 1px;
//                     left: 10px;
//                 }

//                 .hamburger-icon {
//                     width: 30px;
//                     height: 22px;
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: space-between;
//                 }

//                 .hamburger-icon span {
//                     display: block;
//                     width: 100%;
//                     height: 4px;
//                     background-color: #333;
//                     border-radius: 2px;
//                     transition: background 0.1s;
//                 }

//                 .hamburger-btn:hover .hamburger-icon span {
//                     background-color: #007bff;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default TeacherHome;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

const TeacherHome = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [name, setName] = useState(''); // Initialize name as state
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teacher/posts');
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                alert('Error fetching posts');
            }
        };

        fetchPosts();
        const storedName = localStorage.getItem('teacherName');
        console.log("tgtggtgtg ",localStorage.getItem('teacherName'));
        if (storedName) {
            setName(storedName);
        } else {
            alert('You are not logged in. Redirecting to Role Selection.');
            navigate('/RoleSelection'); // Redirect only if no storedName
        }
    }, [navigate]);

        

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/api/teacher/post/${postId}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            alert('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post');
        }
    };

    const filteredPosts = filter === 'Me'
        ? posts.filter((post) => post.teacherName === name)
        : posts;

    return (
        <div className="d-flex" style={{ minHeight: '100vh', flexDirection: 'column', overflowY: 'auto' }}>
            <Navbar/>
            {/* Hamburger Menu Button */}
            <button
                className="hamburger-btn"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebar"
                aria-controls="sidebar"
            >
                <div className="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            {/* Offcanvas Sidebar */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarLabel">Dashboard</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button
                                className="btn btn-link nav-link"
                                onClick={() => navigate('/TeacherPostPage', { state: { name } })}
                            >
                                Create New Post
                            </button>
                        </li>
                        <li className="nav-item">
                            <select
                                className="form-select my-3"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All Posts</option>
                                <option value="Me">My Posts</option>
                            </select>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn btn-link nav-link"
                                onClick={() => navigate('/ChatPage', { state: { name } })}
                            >
                                Chat Page
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="container my-5">
                <h2 className="mb-4 text-center">Welcome to Teacher Dashboard</h2>
                <div className="row">
                    {filteredPosts.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-muted">No posts available. Start creating your first post!</p>
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    {post.imageUrl && (
                                        <img
                                            src={`http://localhost:5000/${post.imageUrl}`}
                                            alt="Post"
                                            className="card-img-top"
                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h6 className="card-title">Posted by: {post.teacherName || "Unknown"}</h6>
                                        <p className="card-text">{post.text}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">
                                                Posted on: {new Date(post.createdAt).toLocaleDateString()}
                                            </small>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(post._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* CSS for Hamburger Icon */}
            <style jsx>{`
                .hamburger-btn {
                    background: none;
                    border: none;
                    outline: none;
                    margin: 1rem;
                    cursor: pointer;
                    position: absolute;
                    top: 1px;
                    left: 10px;
                }

                .hamburger-icon {
                    width: 30px;
                    height: 22px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .hamburger-icon span {
                    display: block;
                    width: 100%;
                    height: 4px;
                    background-color: #333;
                    border-radius: 2px;
                    transition: background 0.1s;
                }

                .hamburger-btn:hover .hamburger-icon span {
                    background-color: #007bff;
                }
            `}</style>
        </div>
    );
};

export default TeacherHome;

