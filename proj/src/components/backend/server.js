const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, sessions)
}));

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to filenames
    }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const upload = multer({ storage: storage });

// MongoDB Atlas connection
const MONGODB_URI = 'mongodb+srv://pushpalavandhitha:gQLVr5TERt9x8PK5@iomp-pro.iyd9c.mongodb.net/?retryWrites=true&w=majority&appName=iomp-pro';
const SESSION_SECRET = 'y1A9tV89bM9U5z1yN0m1L2s3P4q5R6k7S8T9U0vW';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Teacher Schema
const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // Added email field
    password: { type: String, required: true },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);


// Post Schema
const PostSchema = new mongoose.Schema({
    teacherName: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);

const StudentSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

const Student = mongoose.model('Student', StudentSchema);


app.post('/api/teacher/post', upload.single('image'), async (req, res) => {
    const { teacherName, text } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get the path of the uploaded image

    try {
        const newPost = new Post({
            teacherName,
            text,
            imageUrl,
        });
        console.log("zzzz",newPost);
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'Error creating post' });
    }
});

// Route to get posts for a teacher
app.get('/api/teacher/posts', async (req, res) => {
    // const { name } = req.query; // Get the name from query parameters
    try {
        const posts = await Post.find(); // Replace with your field for filtering
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});


// Session setup
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day expiration
}));

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

// Sign Up Route for Students
app.post('/api/student/signup', async (req, res) => {
    const { rollNumber, email, password } = req.body;

    try {
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            rollNumber,
            email,
            password: hashedPassword
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully' });
    } catch (err) {
        console.error('Error creating student:', err);
        res.status(500).json({ message: 'Error creating student' });
    }
});
// Delete Post Route
app.delete('/api/teacher/post/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the post by ID
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Delete the image file if it exists
        if (post.imageUrl) {
            const imagePath = path.join(__dirname, post.imageUrl); // Construct the absolute path to the image

            // Check if the file exists before attempting to delete it
            fs.access(imagePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    // File exists, delete it
                    fs.unlink(imagePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting image:', unlinkErr);
                        } else {
                            console.log('Image deleted successfully');
                        }
                    });
                } else {
                    console.warn('Image file not found');
                }
            });
        }

        // Delete the post from the database
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: 'Error deleting post' });
    }
});


// Login Route for Students
app.post('/api/student/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.user = { email, userType: 'student' }; // Store user info in session
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Sign Up Route for Teachers
// Sign Up Route for Teachers
app.post('/api/teacher/signup', async (req, res) => {
    const { name, email, password } = req.body; // Extract email here

    try {
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new Teacher({
            name,
            email, // Ensure email is being set here
            password: hashedPassword
        });

        await newTeacher.save();
        res.status(201).json({ message: 'Teacher created successfully' });
    } catch (err) {
        console.error('Error creating teacher:', err);
        res.status(500).json({ message: 'Error creating teacher' });
    }
});


// Login Route for Teachers
app.post('/api/teacher/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ name });
        if (!teacher) {
            return res.status(400).json({ message: 'Teacher not found' });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.user = { name, userType: 'teacher' }; // Store teacher info in session
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Check Auth Route
app.get('/api/check-auth', isAuthenticated, (req, res) => {
    res.status(200).json({ user: req.session.user });
});

// Logout Route
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
