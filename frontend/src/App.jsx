import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar.jsx";
import AnimatedBg from "./components/AnimatedBg.jsx";
import HeroSection from "./components/HeroSection.jsx";
import {Route, Routes} from "react-router-dom";
import AdminDashboard from "./components/adminDashboard/AdminDashboard.jsx";
import UserDashboard from "./components/userDashboard/UserDashboard.jsx";
import Signup from "./components/register/Signup.jsx";
import Login from "./components/login/Login.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import CreateRequest from "./components/createRequest/CreateRequest.jsx";
import ReviewRequest from "./components/ReviewRequest.jsx";
import ProcessRequest from "./components/ProcessRequest.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";

function App() {

    return (
        <>
            <div className="min-h-screen relative">
                <AnimatedBg/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Navbar />
                                <HeroSection />
                                <Footer />
                            </>
                        }
                    />
                    <Route path={"/userDashboard"} element={<UserDashboard/>} />
                    <Route path={"/adminDashboard"} element={<AdminDashboard/>} />
                    <Route path={"/signup"} element={<Signup/>} />
                    <Route path={"/login"} element={<Login/>} />
                    <Route path={"/forgot-password"} element={<ForgotPassword/>} />
                    <Route path={"/reset-password/:token"} element={<ResetPassword />} />
                    <Route path={"/createRequest"} element={<CreateRequest/>} />
                    <Route path={"/review-request/:id"} element={<ReviewRequest/>} />
                    <Route path={"/process-request/:id"} element={<ProcessRequest/>} />
                    <Route path={"/contact"} element={<Contact/>} />
                    <Route path={"/about"} element={<About/>}/>
                </Routes>
            </div>
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
    )
}

export default App;