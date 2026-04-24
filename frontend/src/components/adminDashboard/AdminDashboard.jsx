import React, { useEffect, useState } from "react";
import approve from "../../assets/approve.gif";
import rejected from "../../assets/rejected.gif";
import clock from "../../assets/clock.gif";
import requests from "../../assets/requests.gif";
import overview from "../../assets/overview.png";
import Arrow from "../../assets/arrow.gif";
import home from "../../assets/home.png";
import profileGif from "../../assets/user.gif";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../Loader.jsx";
import {toast} from "react-toastify";
import API from "../../config/api.js";

const AdminDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('overview');
    const [allRequests, setAllRequests] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user,setUser, isloading } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in and not admin
    useEffect(() => {
        if (!isloading) {
            if (!user) {
                navigate("/login");
            } else if (user.role !== "admin") {
            navigate("/adminDashboard");
        }
    }
}, [user, isloading, navigate]);

    // Fetch all requests
    useEffect(() => {
        const fetchAllRequests = async () => {
            try {
                const response = await fetch(`${API}/api/request/allRequests`, {
                    method: "GET",
                    credentials: "include",
                });
                const res = await response.json();
                if (!response.ok) {
                    throw new Error(res.message);
                }
                console.log(res.Requests)
                setAllRequests(res.Requests);
            } catch (err) {
                console.log(err);
                alert(err.message);
            }
        };
        fetchAllRequests();
    }, []);


    const logOut=async ()=>{
        try {
            const response = await fetch(`${API}/api/user/logout`, {
                method: "GET",
                credentials: "include",
            })

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            setUser(null)
            navigate("/login")
            toast.success("logout successfully")

        }catch(err){
            console.log(err.message);
            alert(err.message);
        }
    }

    const reviewRequest=async (id)=>{
        try {
            const response = await fetch(`${API}/api/request/credential/${id}`, {
                method:"GET",
                credentials: "include",
            })
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            console.log(result);
            navigate(`/review-request/${id}`)

        }catch(err){
            console.log(err);
            alert(err.message);
        }
    }

    const approveCount = allRequests.filter(item => item?.status === "approved");
    const rejectedCount = allRequests.filter(item => item?.status === "rejected");
    const pendingCount = allRequests.filter(item => item?.status === "pending");

    // Get filtered requests based on active menu
    const getFilteredRequests = () => {
        if (activeMenu === 'pending') return pendingCount;
        if (activeMenu === 'rejected') return rejectedCount;
        if (activeMenu === 'approve') return approveCount;
        return allRequests;
    };

    const filteredRequests = getFilteredRequests();

    const menus = [
        { id: 'overview', label: 'OverView', icon: overview },
        { id: 'requests', label: 'All Requests', icon: requests },
        { id: 'pending', label: 'Pending', icon: clock },
        { id: 'rejected', label: 'Rejected', icon: rejected },
        { id: 'approve', label: 'Approved', icon: approve },
    ];

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    if (isloading) {
        return (
            <Loader/>
        );
    }

    if (!user) return null;

    return (
        <div className="text-white  min-h-screen">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-2 left-0 z-50 bg-[#ff3c6e] p-2 rounded-lg"
            >
                {sidebarOpen ? <FiX size={24} /> : <img src={Arrow} alt={"arrow icon"} className="invert" width={25}/>}
            </button>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex">
                {/* Sidebar */}
                <div className={`
                    fixed lg:relative z-50 bg-[#0f172a] min-h-screen w-64 p-6 border-r border-[#ff3c6e]
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <Link to={"/"} className="font-bold text-2xl">Credi<span className="text-[#ff3c6e] text-4xl">X</span></Link>

                    <p className="mt-6 p-2 font-light">Main</p>
                    <div className="flex flex-col gap-6 px-3 py-2">
                        {menus.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setActiveMenu(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`flex gap-3 items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${activeMenu === item.id ? 'bg-gradient-to-r from-green-500/20 to-transparent border-l-4 border-green-500' : 'hover:bg-white/10'}`}
                            >
                                <img src={item.icon} alt={item.label} width={26} className="invert" />
                                <p className="font-light text-sm text-white">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 p-2 font-light">Account</p>
                    <div className="flex flex-col gap-5">
                        <Link to={"/"} className="flex gap-3 items-center mb-4">
                            <img src={home} alt="home" width={20} className="invert" />
                            <p className="font-light text-sm text-gray-400">Home</p>
                        </Link>
                        <button onClick={logOut} className="px-6 py-2 bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
                            LogOut
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6">

                    <div className="ml-8 lg:ml-0">
                        <div className="flex gap-4 items-center">
                            <img src={profileGif} alt="profile" width={30} />
                            <h2 className="font-bold text-xl lg:text-2xl text-gray-400">
                                Good morning, Mr. {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
                            </h2>
                        </div>
                        <div className="flex justify-between max-w-[36%]">
                            <p className="text-gray-400 text-sm font-light">{new Date().toLocaleDateString()}</p>
                            <p className="font-bold text-[#ff3c6e]">Admin</p>
                        </div>
                    </div>

                    {/* OVERVIEW PAGE - Stats Cards + All Requests */}
                    {activeMenu === 'overview' && (
                        <>
                            <div className="flex flex-wrap justify-between gap-6 items-center mt-6 p-4">
                                <div className="bg-[#ff3c6e] p-8 text-center rounded-md hover:scale-105 transition-all duration-200 flex-1 min-w-[150px]">
                                    <h3 className="text-3xl font-bold">{allRequests.length}</h3>
                                    <p className="text-gray-200 text-sm">Total Requests</p>
                                </div>
                                <div className="bg-green-500 p-8 text-center rounded-md hover:scale-105 transition-all duration-200 flex-1 min-w-[150px]">
                                    <h3 className="text-3xl font-bold">{approveCount.length}</h3>
                                    <p className="text-gray-200 text-sm">Total Approved</p>
                                </div>
                                <div className="p-8 bg-yellow-500 text-center rounded-md hover:scale-105 transition-all duration-200 flex-1 min-w-[150px]">
                                    <h3 className="text-3xl font-bold">{pendingCount.length}</h3>
                                    <p className="text-gray-200 text-sm">Total Pending</p>
                                </div>
                                <div className="bg-red-500 p-8 text-center rounded-md hover:scale-105 transition-all duration-200 flex-1 min-w-[150px]">
                                    <h3 className="text-3xl font-bold">{rejectedCount.length}</h3>
                                    <p className="text-gray-200 text-sm">Total Rejected</p>
                                </div>
                            </div>
                            <div className="h-0.5 bg-teal-500 w-full my-4"></div>

                            {/* All Requests List */}
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-sm font-medium text-gray-300">All Requests</p>
                                    <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{allRequests.length} Total</p>
                                </div>
                                {allRequests.length > 0 ? (
                                    allRequests.map((item) => (
                                        <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                            <div>
                                                <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                                <p className="text-xs text-gray-500">Submitted: {formatDate(item.createdAt)}</p>
                                            </div>
                                            <p className={`px-2 py-1 rounded-full text-xs ${
                                                item.status === "approved" ? 'bg-green-300 text-green-700' :
                                                    item.status === "rejected" ? 'bg-red-300 text-red-700' :
                                                        'bg-yellow-300 text-yellow-700'
                                            }`}>
                                                {item.status}
                                            </p>
                                            <button onClick={()=> reviewRequest(item._id)} className="text-sm bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-200">Review</button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No requests found</p>
                                )}
                            </div>
                        </>
                    )}

                    {/* ALL REQUESTS PAGE */}
                    {activeMenu === 'requests' && (
                        <div className="p-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-300">All Requests</p>
                                <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{allRequests.length} Total</p>
                            </div>
                            {allRequests.length > 0 ? (
                                allRequests.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                        <div>
                                            <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                            <p className="text-xs text-gray-500">Submitted: {formatDate(item.createdAt)}</p>
                                        </div>
                                        <p className={`px-2 py-1 rounded-full text-xs ${
                                            item.status === "approved" ? 'bg-green-300 text-green-700' :
                                                item.status === "rejected" ? 'bg-red-300 text-red-700' :
                                                    'bg-yellow-300 text-yellow-700'
                                        }`}>
                                            {item.status}
                                        </p>
                                        <button className="text-sm bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-200">Review</button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No requests found</p>
                            )}
                        </div>
                    )}

                    {/* PENDING PAGE */}
                    {activeMenu === 'pending' && (
                        <div className="p-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-300">Pending Requests</p>
                                <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{pendingCount.length} Pending</p>
                            </div>
                            {pendingCount.length > 0 ? (
                                pendingCount.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                        <div>
                                            <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                            <p className="text-xs text-gray-500">Submitted: {formatDate(item.createdAt)}</p>
                                        </div>
                                        <p className="px-2 py-1 rounded-full text-xs bg-yellow-300 text-yellow-700">
                                            {item.status}
                                        </p>
                                        <button className="text-sm bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-200">Review</button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No pending requests</p>
                            )}
                        </div>
                    )}

                    {/* REJECTED PAGE */}
                    {activeMenu === 'rejected' && (
                        <div className="p-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-300">Rejected Requests</p>
                                <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{rejectedCount.length} Rejected</p>
                            </div>
                            {rejectedCount.length > 0 ? (
                                rejectedCount.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                        <div>
                                            <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                            <p className="text-xs text-gray-500">Submitted: {formatDate(item.createdAt)}</p>
                                        </div>
                                        <p className="px-2 py-1 rounded-full text-xs bg-red-300 text-red-700">
                                            {item.status}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No rejected requests</p>
                            )}
                        </div>
                    )}

                    {/* APPROVED PAGE */}
                    {activeMenu === 'approve' && (
                        <div className="p-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-300">Approved Requests</p>
                                <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{approveCount.length} Approved</p>
                            </div>
                            {approveCount.length > 0 ? (
                                approveCount.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                        <div>
                                            <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                            <p className="text-xs text-gray-500">Submitted: {formatDate(item.createdAt)}</p>
                                        </div>
                                        <button
                                            onClick={() => alert(`Review: ${item.specialization}\nStatus: ${item.status}`)}
                                            className="px-3 py-1 bg-blue-500 rounded-full text-xs hover:bg-blue-600 transition-all duration-200"
                                        >
                                            Review
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No approved requests</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;