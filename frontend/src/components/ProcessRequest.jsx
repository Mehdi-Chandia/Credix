import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {toast} from "react-toastify";
import API from "../config/api.js";

const ProcessRequest = () => {
    const {user,isloading}=useAuth();
    const navigateTo=useNavigate();
    const {id}=useParams();
    console.log(id)

    const [reviewData, setReviewData] = useState({
        status:"",
        reviewNote:"",
        expiryDate:"",

    })

    useEffect(() => {
        if (!isloading && user) {
            if (user.role !== "admin") {
                navigateTo("/login");
            }
        }
    }, [user, isloading, navigateTo]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setReviewData({
            ...reviewData,
            [name]: value,
            }
        )
    }

    const submitReview=async ()=>{
        try {
            const response=await fetch(`${API}/api/request/update/${id}`,{
                method: "PUT",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(reviewData)
            })
            const res=await response.json()
            if (!response.ok){
                throw new Error(res.message);
            }

            toast.success("your review has been noted successfully!")
            setReviewData({
                status:"",
                reviewNote:"",
                expiryDate:"",
            })
            navigateTo("/adminDashboard");

        }catch(err){
            console.log(err)
            alert(err.message)
        }
    }


    return (
        <>
            <div className="bg-gradient-to-r from-[#95122C] to-[#100C08] min-h-screen flex justify-center items-center p-4">
                <div className="bg-[#1e293b] w-full max-w-lg rounded-xl p-6 shadow-2xl">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Admin's Review
                    </h2>

                    {/* Status Update Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Update Status
                        </label>
                        <select name={"status"} value={reviewData.status} onChange={handleChange} className="w-full px-4 py-2 bg-[#0f172a] text-white rounded-lg border border-gray-600 focus:border-[#ff3c6e] focus:outline-none">
                            <option value="">Select Status</option>
                            <option value="approved">Approve</option>
                            <option value="rejected">Reject</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    {/* Review Note Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Review Note
                        </label>
                        <textarea value={reviewData.reviewNote} onChange={handleChange} name={"reviewNote"}
                            className="w-full px-4 py-2 bg-[#0f172a] text-white rounded-lg border border-gray-600 focus:border-[#ff3c6e] focus:outline-none resize-none"
                            rows="4"
                            placeholder="Leave your review note here..."
                        />
                    </div>

                    {/* Expiry Date Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            License Expiry Date
                        </label>
                        <input
                            value={reviewData.expiryDate}
                            onChange={handleChange}
                            name="expiryDate"
                            type="date"
                            className="w-full px-4 py-2 bg-[#0f172a] text-white rounded-lg border border-gray-600 focus:border-[#ff3c6e] focus:outline-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={submitReview}
                            type="submit"
                            className="flex-1 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-200"
                        >
                            Submit Review
                        </button>
                        <button
                            type="button"
                            className="flex-1 px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProcessRequest;