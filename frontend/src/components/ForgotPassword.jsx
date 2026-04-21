
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import API from "../config/api.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await axios.post(
                `${API}/api/user/forgot-password`,
                { email }
            );

            setMessage(response.data.message || "Reset link sent to your email");
            setEmail("");

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <div className="bg-[#1e293b] p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Forgot Password
                </h2>

                <p className="text-gray-400 text-center mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {message && (
                        <p className="text-green-500 text-sm">{message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff3c6e] text-white py-2 rounded hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-[#ff3c6e] hover:underline text-sm">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;