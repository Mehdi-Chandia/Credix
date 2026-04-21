import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import API from "../config/api.js"

const ReviewRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user,isloading } = useAuth();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isloading && user) {
            if (user.role !== "admin") {
                navigate("/login");
            }
        }
    }, [user, isloading, navigate]);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await fetch(`${API}/api/request/credential/${id}`, {
                    method: "GET",
                    credentials: "include",
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                console.log(result)
                setRequest(result.Request);
            } catch (err) {
                console.log(err);
                alert(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#0f172a]">
                <p className="text-[#ff3c6e] text-lg font-bold">Loading...</p>
            </div>
        );
    }

    if (!request) return null;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Request Review</h1>
                    <button
                        onClick={() => navigate("/adminDashboard")}
                        className="px-2 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                    >
                        Back to Dashboard
                    </button>
                </div>

                {/* Request Details */}
                <div className="bg-[#1e293b] rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-[#ff3c6e] mb-4">Request Details</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-400 text-sm">Full Name</p>
                            <p className="font-medium">{request.fullName}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Specialization</p>
                            <p className="font-medium">{request.specialization}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">License Number</p>
                            <p className="font-medium">{request.licenseNumber}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Experience</p>
                            <p className="font-medium">{request.experience} years</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Status</p>
                            <p className={`font-medium ${
                                request.status === "approved" ? "text-green-400" :
                                    request.status === "rejected" ? "text-red-400" : "text-yellow-400"
                            }`}>
                                {request.status}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Submitted On</p>
                            <p className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="bg-[#1e293b] rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-[#ff3c6e] mb-4">Documents</h2>
                    {request.documents && request.documents.length > 0 ? (
                        <div className="space-y-2">
                            {request.documents.map((doc, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-[#0f172a] rounded-lg">
                                    <span className="text-sm">{doc.fileName}</span>
                                    <a
                                        href={doc.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 bg-blue-500 rounded-lg text-sm hover:bg-blue-600"
                                    >
                                        View Document
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No documents uploaded</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate(`/process-request/${id}`)}
                        className="flex-1 px-6 py-3 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition-all duration-200"
                    >
                        ✓ Process Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewRequest;