import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill all fields");
            return;
        }

        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#95122C] to-[#100C08] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
                    <p className="text-gray-300">Have questions? We'd love to hear from you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-[#1e293b] rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-5">Send us a message</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#0f172a] text-white rounded-lg border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#0f172a] text-white rounded-lg border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-2 bg-[#0f172a] text-white rounded-lg border border-gray-600 focus:border-[#ff3c6e] focus:outline-none resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#ff3c6e] text-white py-2 rounded-lg font-semibold hover:bg-[#e0355e] transition-all duration-200"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-[#1e293b] rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-5">Get in touch</h2>

                        <div className="space-y-5">
                            <div>
                                <h3 className="text-[#ff3c6e] font-semibold mb-1">Email</h3>
                                <p className="text-gray-300">support@credix.com</p>
                                <p className="text-gray-400 text-sm mt-1">Response within 24 hours</p>
                            </div>

                            <div>
                                <h3 className="text-[#ff3c6e] font-semibold mb-1">Phone</h3>
                                <p className="text-gray-300">+1 (555) 123-4567</p>
                                <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9AM - 6PM</p>
                            </div>

                            <div>
                                <h3 className="text-[#ff3c6e] font-semibold mb-1">Address</h3>
                                <p className="text-gray-300">123 Medical District</p>
                                <p className="text-gray-300">Lahore, PAK 10001</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;