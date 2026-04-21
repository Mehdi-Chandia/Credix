import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#95122C] to-[#100C08] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3">About Us</h1>
                    <p className="text-gray-300">Simplifying medical credentialing for healthcare professionals</p>
                </div>

                <div className="bg-[#1e293b] rounded-xl p-8">
                    {/* Mission Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#ff3c6e] mb-3">Our Mission</h2>
                        <p className="text-gray-300 leading-relaxed">
                            To streamline the medical credentialing process, making it faster,
                            more transparent, and hassle-free for healthcare providers and institutions.
                        </p>
                    </div>

                    {/* What We Do */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#ff3c6e] mb-3">What We Do</h2>
                        <p className="text-gray-300 leading-relaxed">
                            CrediX provides a centralized platform for doctors and medical professionals
                            to manage their credentialing requests, track application status, and maintain
                            compliance with insurance providers — all in one place.
                        </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#ff3c6e] mb-3">Key Features</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-green-400">✓</span>
                                <span className="text-gray-300">Easy request submission</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-400">✓</span>
                                <span className="text-gray-300">Real-time status tracking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-400">✓</span>
                                <span className="text-gray-300">Secure document upload</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-400">✓</span>
                                <span className="text-gray-300">Admin review system</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center pt-4">
                        <Link
                            to="/signup"
                            className="inline-block px-6 py-2 bg-[#ff3c6e] text-white rounded-lg font-semibold hover:bg-[#e0355e] transition-all duration-200"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;