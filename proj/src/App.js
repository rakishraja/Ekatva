// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Home from './components/frontend/Home';
// import Navbar from './components/frontend/Navbar';

// import Welcome from './components/frontend/Welcome';
// import SignUpRole from './components/frontend/SignUpRole';
// import LoginRole from './components/frontend/LoginRole';
// import StudentLogin from './components/frontend/StudentLogin';
// import StudentSignUp from './components/frontend/StudentSignUp';
// import TeacherLogin from './components/frontend/TeacherLogin';
// import TeacherSignUp from './components/frontend/TeacherSignUp';
// import TeacherPostPage from './components/frontend/TeacherPostPage';
// import TeacherHome from './components/frontend/TeacherHome';
// import StudentHome from './components/frontend/StudentHome';
// import ChatPage from './components/frontend/ChatPage';
// import RoleSelection from './components/frontend/RoleSelection';
// import TeacherHandler from './components/frontend/TeacherHandler';
// import { AuthContext } from './components/AuthContext';
// import { AuthProvider } from './components/AuthContext';
// function App() {
//     return (
//         <Router>
//             {/* <Navbar /> */}
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/LoginRole" element={<LoginRole />} />
//                 <Route path="/SignUpRole" element={<SignUpRole />} />
//                 <Route path="/StudentSignUp" element={<StudentSignUp />} />
//                 <Route path="/TeacherSignUp" element={<TeacherSignUp />} />
//                 <Route path="/StudentLogin" element={<StudentLogin />} />
//                 <Route path="/TeacherLogin" element={<TeacherLogin />} />
//                 <Route path="/TeacherPostPage" element={<TeacherPostPage />} />
//                 <Route path="/TeacherHome" element={<TeacherHome />} />
//                 <Route path="/StudentHome" element={<StudentHome />} />
//                 <Route path="/ChatPage" element={<ChatPage />} />
//                 <Route path="/RoleSelection" element={<RoleSelection />} />
//                 <Route path="/TeacherHandler" element={<TeacherHandler />} />
//                 <Route path="/" element={<Navigate to="/login" />} />
             
//             </Routes>
//         </Router>
//     );
// }

// export default App;
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/frontend/Home';
import Navbar from './components/frontend/Navbar';
import Welcome from './components/frontend/Welcome';
import SignUpRole from './components/frontend/SignUpRole';
import LoginRole from './components/frontend/LoginRole';
import StudentLogin from './components/frontend/StudentLogin';
import StudentSignUp from './components/frontend/StudentSignUp';
import TeacherLogin from './components/frontend/TeacherLogin';
import TeacherSignUp from './components/frontend/TeacherSignUp';
import TeacherPostPage from './components/frontend/TeacherPostPage';
import TeacherHome from './components/frontend/TeacherHome';
import StudentHome from './components/frontend/StudentHome';
import ChatPage from './components/frontend/ChatPage';
import RoleSelection from './components/frontend/RoleSelection';
import TeacherHandler from './components/frontend/TeacherHandler';
import { AuthProvider, AuthContext } from './components/AuthContext';

// PrivateRoute Component for Protected Routes
function PrivateRoute({ children }) {
    const { authState } = useContext(AuthContext);
    console.log("akjfhkjdfhkjsf", authState, "ppppp ", localStorage.getItem("teacherName"));

    // Check if there is no teacherName in localStorage
    if (!localStorage.getItem("teacherName") && !localStorage.getItem("studentEmail")) {
        // Redirect to RoleSelection if the teacherName is not in localStorage
        return <Navigate to="/RoleSelection" />;
    }

    // If the user is not authenticated, redirect to the login page
    // if (!authState.isAuthenticated) {
    //     return <Navigate to="/RoleSelection" />;
    // }

    // If the user is authenticated and the teacherName exists in localStorage, stay on the same page
    return children;
}


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/LoginRole" element={<LoginRole />} />
                    <Route path="/SignUpRole" element={<SignUpRole />} />
                    <Route path="/StudentSignUp" element={<StudentSignUp />} />
                    <Route path="/TeacherSignUp" element={<TeacherSignUp />} />
                    <Route path="/StudentLogin" element={<StudentLogin />} />
                    <Route path="/TeacherLogin" element={<TeacherLogin />} />
                    <Route path="/RoleSelection" element={<RoleSelection />} />

                    {/* Protected Routes */}
                    <Route
                        path="/TeacherPostPage"
                        element={
                            <PrivateRoute>
                                <TeacherPostPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/TeacherHome"
                        element={
                            <PrivateRoute>
                                <TeacherHome />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/StudentHome"
                        element={
                            <PrivateRoute>
                                <StudentHome />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ChatPage"
                        element={
                            <PrivateRoute>
                                <ChatPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/TeacherHandler"
                        element={
                            <PrivateRoute>
                                <TeacherHandler />
                            </PrivateRoute>
                        }
                    />

                    {/* Default Route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

