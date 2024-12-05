import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , useLocation} from 'react-router-dom';
import Navbar from './Navbar';
const TeacherPostPage = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    // const teacherEmail = "teacher@example.com"; // Replace this with actual logged-in teacher email
    const location = useLocation();
    const { name } = location.state || {}; // Retrieve the name from state
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('teacherName', name); // Use teacherEmail instead of teacherId
        formData.append('text', text);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/api/teacher/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            alert(response.data.message);
            navigate('/TeacherHome', { state: { name } }); // Redirect to TeacherHome after posting
        } catch (error) {
            console.error('Error posting content:', error);
            alert('Error posting content');
        }
    };

    return (
        <div className="container">
            <Navbar/>
            <h2>Create a New Post</h2>
            <div className="form-group">
                <label>Text</label>
                <textarea
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Image</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                />
            </div>
            <button className="btn btn-success mt-3" onClick={handlePost}>
                Post
            </button>
        </div>
    );
};

export default TeacherPostPage;
