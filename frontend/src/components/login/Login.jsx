
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.jsx";
import {toast} from "react-toastify";
import Loader from "../Loader.jsx";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const {user,fetchProfile,isloading}=useAuth();

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit =async (data) => {
        try {
            setLoading(true);
            const res=await fetch("http://localhost:3000/api/user/login",{
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const resData = await res.json()
            if (!res.ok){
                console.log(resData)
                // throw new Error(resData.message ||"Failed to login");
                toast.error(resData.error)
                return;
            }
            console.log(resData);
            const userRole=resData.user.role;

           await fetchProfile()

            setFormData({
                email: "",
                password: ""
            })
            toast.success("logged in successfully");
            if(userRole =="admin"){
                navigate("/adminDashboard");
            }else {
                navigate("/userDashboard");
            }

        }catch(err) {
            toast.error(err.message)
            console.log(err.message);
        }finally {
            setLoading(false);
        }
    };

    if (isloading) {
        return (
            <Loader/>
        );
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <div className="bg-[#1e293b] p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-[#ff3c6e] text-white py-2 rounded hover:scale-105 transition-all duration-200 ${loading ? 'cursor-not-allowed opacity-40' : ''}`}
                    >
                        Login
                    </button>
                   <Link className="right-0 text-blue-400 text-sm" to={"/forgot-password"}>Forgot Password?</Link>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#ff3c6e] hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;