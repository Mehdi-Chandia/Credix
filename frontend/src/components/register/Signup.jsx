
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import API from "../../config/api.js"

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
const navigateTo = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
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
           const result=await fetch(`${API}/api/user/register`,{
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify(data)
           })
           const resData = await result.json();

           if (!result.ok) {
               throw new Error(resData.message,"Failed to register");
           }
           console.log(resData);
           setFormData({
               username: "",
               email: "",
               password: "",
           })
    toast.success("user successfully registered!");
           navigateTo("/login");

       }catch(err) {
           console.log(err);
           alert(err.message)
       }finally {
           setLoading(false);
       }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <div className="bg-[#1e293b] p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Sign Up
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Username Field */}
                    <div>
                        <input
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                }
                            })}
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

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
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
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
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-blue-400 focus:outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>


                    <button
                        type="submit"
                        className={`w-full bg-[#ff3c6e] text-white py-2 rounded hover:scale-105 transition-all duration-200 ${loading ? 'cursor-not-allowed opacity-40':""}`}
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#ff3c6e] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;