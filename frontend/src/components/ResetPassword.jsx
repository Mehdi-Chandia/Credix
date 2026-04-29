
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import API from "../config/api.js"

const ResetPassword = () => {
    const { token } = useParams();
    const [isValidToken, setIsValidToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    console.log(token)

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get(
                    `${API}/api/user/verify-reset-token/${token}`
                );

                if (response.data.message === "Token is valid") {
                    setIsValidToken(true);
                }
            } catch (err) {
                setIsValidToken(false);
                setError(err.response?.data?.message || "Invalid or expired link");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            verifyToken();
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // validate password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const response = await axios.post(
                `${API}/api/user/reset-password/${token}`,
                { password }
            );

            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
                <p className="text-white">Verifying...</p>
            </div>
        );
    }

    if (!isValidToken) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
                <div className="bg-[#1e293b] p-8 rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Link</h2>
                    <p className="text-gray-400">{error}</p>
                    <a href="/forgot-password" className="text-[#ff3c6e] mt-4 inline-block">
                        Request new reset link →
                    </a>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
                <div className="bg-[#1e293b] p-8 rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-green-500 mb-4">Success! ✅</h2>
                    <p className="text-gray-400 mb-4">Your password has been reset successfully.</p>
                    <a href="/login" className="bg-[#ff3c6e] text-white px-6 py-2 rounded hover:scale-105 transition-all duration-200 inline-block">
                        Login Now
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <div className="bg-[#1e293b] p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Create New Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* New Password Field */}
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#ff3c6e] text-white py-2 rounded hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;