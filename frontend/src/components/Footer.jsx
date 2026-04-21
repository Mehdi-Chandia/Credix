import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] border-t border-gray-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h2 className="font-bold text-2xl mb-3 text-white">
                            Credi<span className="text-[#ff3c6e]">X</span>
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Medical Credentialing Platform
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                            © 2026 CrediX. All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-[#ff3c6e] text-sm transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-400 hover:text-[#ff3c6e] text-sm transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="text-gray-400 hover:text-[#ff3c6e] text-sm transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-[#ff3c6e] text-sm transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Connect With Us</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400 text-sm">support@credix.com</li>
                            <li className="text-gray-400 text-sm">+1 (555) 123-4567</li>
                        </ul>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-4">
                            <a
                                href="https://www.linkedin.com/in/muhammad-mehdi-b08a753bb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#ff3c6e] transition-colors duration-200"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="https://github.com/Mehdi-Chandia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#ff3c6e] transition-colors duration-200"
                            >
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;