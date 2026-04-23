import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Normal imports (load instantly)
import Navbar from "./components/Navbar.jsx";
import AnimatedBg from "./components/AnimatedBg.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader.jsx";

// Lazy loaded pages
const AdminDashboard = lazy(() => import("./components/adminDashboard/AdminDashboard.jsx"));
const UserDashboard = lazy(() => import("./components/userDashboard/UserDashboard.jsx"));
const Signup = lazy(() => import("./components/register/Signup.jsx"));
const Login = lazy(() => import("./components/login/Login.jsx"));
const ResetPassword = lazy(() => import("./components/ResetPassword.jsx"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword.jsx"));
const CreateRequest = lazy(() => import("./components/createRequest/CreateRequest.jsx"));
const ReviewRequest = lazy(() => import("./components/ReviewRequest.jsx"));
const ProcessRequest = lazy(() => import("./components/ProcessRequest.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const About = lazy(() => import("./components/About.jsx"));

function App() {
    return (
        <>
            <div className="min-h-screen relative">

                <AnimatedBg />

                <Navbar />

                {/* Lazy loaded routes */}
                <Suspense fallback={
                  <Loader/>
                }>
                    <Routes>
                        <Route
                            path="/"
                            element={<HeroSection />}
                        />

                        <Route path="/userDashboard" element={<UserDashboard />} />
                        <Route path="/adminDashboard" element={<AdminDashboard />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/createRequest" element={<CreateRequest />} />
                        <Route path="/review-request/:id" element={<ReviewRequest />} />
                        <Route path="/process-request/:id" element={<ProcessRequest />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Suspense>

                <Footer />
            </div>

            {/* Toast */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
        </>
    );
}

export default App;