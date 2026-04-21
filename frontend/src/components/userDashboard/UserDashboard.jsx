import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import overview from "../../assets/overview.png";
import home from "../../assets/home.png";
import Arrow from "../../assets/arrow.gif";
import reports from "../../assets/reports.png";
import clock from "../../assets/clock.gif";
import requests from "../../assets/credentials.png";
import profileGif from "../../assets/user.gif";
import Loader from "../Loader.jsx";
import {toast} from "react-toastify";

const UserDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('overview');
    const [credentials, setCredentials] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, isloading,fetchProfile } = useAuth();

    const navigate = useNavigate();

    const getDaysSinceLastRequest = () => {
        if (credentials.length === 0) return "0";
        const latest = credentials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        const days = Math.floor((new Date() - new Date(latest.createdAt)) / (1000 * 60 * 60 * 24));
        return days;
    };


    const getLastRequestDate = () => {
        if (credentials.length === 0) return "No requests";
        const latest = credentials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        return new Date(latest.createdAt).toLocaleDateString();
    };

    useEffect(() => {
        if (!isloading && user) {
            if (user.role !== "user") {
                navigate("/login");
            }
        }
    }, [user, isloading, navigate]);

    useEffect(() => {
        const fetchMyRequests = async () => {
            if (!user) return;
            try {
                const response = await fetch("http://localhost:3000/api/request/myRequests", {
                    method: "GET",
                    credentials: "include",
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                setCredentials(result.Reqs || []);
                console.log(result.Reqs);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchMyRequests();
    }, [user]);


    const logOut=async ()=>{
        try {
            const response = await fetch("http://localhost:3000/api/user/logout", {
                method: "GET",
                credentials: "include",
            })

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            await fetchProfile()
            toast.success("logout successfully")
            navigate("/login")
        }catch(err){
            console.log(err.message);
            alert(err.message);
        }
    }

    const approve = credentials.filter(item => item?.status === "approved");
    const rejected = credentials.filter(item => item?.status === "rejected");
    const pending = credentials.filter(item => item?.status === "pending");

    const menus = [
        { id: 'overview', label: 'OverView', icon: overview },
        { id: 'credentials', label: 'Credentials', icon: requests },
        { id: 'renewals', label: 'Renewals', icon: clock },
        { id: 'reports', label: 'Reports', icon: reports },
    ];

    if (isloading) {
        return (
          <Loader/>
        );
    }

    if (!user) return null;

    return (
        <div className="text-white bg-[#0f172a] min-h-screen">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-2 left-0 z-50 bg-[#ff3c6e] p-2 rounded-lg"
            >
                {sidebarOpen ? <FiX size={24} /> :<img src={Arrow} alt={"arrow icon"} className="invert" width={25}/>}
            </button>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex">
                <div className={`
                    fixed lg:relative z-50 bg-[#0f172a] min-h-screen w-64 p-6 border-r border-green-200
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <h2 className="font-bold text-2xl">Credi<span className="text-[#ff3c6e] text-4xl">X</span></h2>

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
                        <button onClick={() => navigate("/createRequest")} className="px-6 py-2 bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
                            Create Request
                        </button>

                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6">
                    {/* Header */}
                    <div className="ml-8 lg:ml-0">
                        <div className="flex gap-4 items-center">
                            <img src={profileGif} alt="profile" width={30} />
                            <h2 className="font-bold text-xl lg:text-2xl text-gray-400">
                                Good morning, {user?.username || user?.name}
                            </h2>
                        </div>
                        <p className="text-gray-400 text-sm font-light mt-1">{new Date().toLocaleDateString()}</p>
                    </div>

                    {/* OVERVIEW VIEW */}
                    {activeMenu === 'overview' && (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 lg:p-8">
                                <div className="text-center bg-[#1e293b] p-4 rounded-lg">
                                    <p className="text-xs font-light text-gray-400">Credentials</p>
                                    <p className="font-bold text-2xl lg:text-3xl">{credentials.length}</p>
                                    <p className="text-xs font-light text-green-400">All requests</p>
                                </div>
                                <div className="text-center bg-[#1e293b] p-4 rounded-lg">
                                    <p className="text-xs font-light text-gray-400">Pending</p>
                                    <p className="font-bold text-2xl lg:text-3xl">{pending.length}</p>
                                    <p className="text-xs font-light text-yellow-400">Within 60 days</p>
                                </div>
                                <div className="text-center bg-[#1e293b] p-4 rounded-lg">
                                    <p className="text-xs font-light text-gray-400">Last request</p>
                                    <p className="font-bold text-2xl lg:text-3xl">{getDaysSinceLastRequest()}d</p>
                                    <p className="text-xs font-light text-gray-400">{getLastRequestDate()}</p>
                                </div>
                                <div className="text-center bg-[#1e293b] p-4 rounded-lg">
                                    <p className="text-xs font-light text-gray-400">Approved</p>
                                    <p className="font-bold text-2xl lg:text-3xl">{approve.length}</p>
                                    <p className="text-xs font-light text-blue-400">Download all</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-sm font-medium text-gray-300">My credentials</p>
                                        <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{credentials.length} Total</p>
                                    </div>
                                    {credentials.length > 0 ? (
                                        credentials.map((item) => (
                                            <div key={item._id} className="flex gap-3 justify-between items-center p-3 border-b border-gray-700">
                                                <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                                <p className={`px-2 py-1 rounded-full text-xs ${item.status === "approved" ? 'bg-green-300 text-green-900' : 'bg-yellow-300 text-yellow-900'}`}>
                                                    {item.status}
                                                </p>
                                                <p className="text-sm text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">No credentials found</p>
                                    )}
                                </div>
                                <div className="border-l border-gray-700 p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-sm font-medium text-gray-300">Approved Credentials</p>
                                        <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{approve.length}total</p>
                                    </div>
                                    {approve.length > 0 ?(
                                        approve.map((item) => (
                                            <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                                <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                                <p className="px-2 py-1 rounded-full text-xs bg-yellow-300 text-yellow-900">{new Date(item.createdAt).toLocaleString()}</p>
                                            </div>
                                        ))
                                    ):(<p className="text-xs text-gray-400">No approved Credentials yet to show</p>)}
                                </div>
                            </div>
                        </>
                    )}

                    {/* CREDENTIALS VIEW - Only credentials list */}
                    {activeMenu === 'credentials' && (
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-300">My credentials</p>
                                <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{credentials.length} Total</p>
                            </div>
                            {credentials.length > 0 ? (
                                credentials.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                        <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                        <p className={`px-2 py-1 rounded-full text-xs ${item.status === "approved" ? 'bg-green-300 text-green-700' : 'bg-yellow-300 text-yellow-700'}`}>
                                            {item.status}
                                        </p>
                                        <p className="text-sm text-gray-400">Exp: Mar 2027</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No credentials found</p>
                            )}
                        </div>
                    )}

                    {/* RENEWALS VIEW - Only approved requests with expiry */}
                    {activeMenu === 'renewals' && (
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-300">License Expiry Dates</p>
                                <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{approve.length} Approved</p>
                            </div>
                            {approve.length > 0 ? (
                                approve.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center p-3 border-b border-gray-700">
                                        <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                        <p className="text-sm text-gray-400">
                                            Expiry: {item.licenseExpiryDate || "Not added yet"}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No approved requests yet</p>
                            )}
                        </div>
                    )}

                    {/* REPORTS VIEW - Only approved requests with review notes */}
                    {activeMenu === 'reports' && (
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-gray-300">Review Notes</p>
                                <p className="px-2 py-1 rounded-full text-xs text-blue-700 bg-blue-300">{approve.length} Approved</p>
                            </div>
                            {approve.length > 0 ? (
                                approve.map((item) => (
                                    <div key={item._id} className="flex flex-col gap-2 p-3 border-b border-gray-700">
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-light text-gray-300">{item.specialization}</p>
                                            <p className={`px-2 py-1 rounded-full text-xs bg-green-300 text-green-700`}>
                                                {item.status}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Note: {item.reviewNote || "No review note added yet"}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No approved requests with notes yet</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;