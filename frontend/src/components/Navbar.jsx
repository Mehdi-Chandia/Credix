import React, {useState} from "react";
import certificate from "../assets/certification.png";
import menuIcon from "../assets/menu.gif";
import crossIcon from "../assets/cross.gif";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

const Navbar=()=>{
    const {user}=useAuth();

    const [isOpen,setIsOpen]=useState(false);
    return(
        <>
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-gray-800">
                <div className="text-white flex gap-4 justify-around items-center p-4 ">
                    <Link to={"/"} className="flex gap-2">
                        {/*<img className="top-6" src={certificate} alt="logo" width={32}/>*/}
                        <h2 className="font-bold text-2xl">Credi<span className="text-[#ff3c6e] text-4xl ">X</span></h2>
                    </Link>
                    <ul className="hidden md:flex gap-8 text-sm text-gray-400 font-light">
                        <Link className="hover:text-blue-400 nav-link" to={"/"}> <li>Home</li> </Link>
                        <Link className="hover:text-blue-400 nav-link" to={"/login"}> <li>Service</li></Link>
                        <Link className="hover:text-blue-400 nav-link" to={"/about"}> <li>About</li></Link>
                        <Link className="hover:text-blue-400 nav-link" to={"/contact"}> <li>Contact Us</li></Link>
                    </ul>

                    {/* 🔥 ONLY THIS PART CHANGED */}
                    <div className="flex gap-2 items-center">
                        <Link to={"/signup"} className={`${user ?'hidden':''} text-xs md:text-sm px-3 py-1.5 border border-gray-500 text-gray-300 rounded-full hover:bg-[#ff3c6e] transition-all duration-200`}>
                            Sign Up
                        </Link>

                        {user ? (
                            user.role === "admin" ? (
                                <Link to={"/adminDashboard"} className="px-4 py-1.5 text-xs md:text-sm bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link to={"/userDashboard"} className="px-4 py-1.5 text-xs md:text-sm bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
                                    Dashboard
                                </Link>
                            )
                        ) : (
                            <Link to={"/login"} className="px-4 py-1.5 text-xs md:text-sm bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
                                Start for Free
                            </Link>
                        )}
                    </div>

                    <div>
                        {
                            isOpen ? <img onClick={()=> {setIsOpen(!isOpen)}} src={crossIcon} alt="menu" width={29} className="md:hidden invert" /> :
                                <img onClick={()=> {setIsOpen(!isOpen)}} src={menuIcon} alt="cross" width={29} className="md:hidden invert" />
                        }
                    </div>

                </div>
                {isOpen && (
                    <div className="h-56 w-full rounded-md mx-auto bg-[#ff3c6e] p-4">
                        <ul className="md:hidden flex flex-col items-center justify-center gap-8 text-sm text-white ">
                            <Link onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400 " to={"/"}> <li>Home</li> </Link>
                            <Link  onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400 " to={"/login"}> <li>Service</li></Link>
                            <Link onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400 " to={"/about"}> <li>About</li></Link>
                            <Link  onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400 " to={"/contact"}> <li>Contact Us</li></Link>
                        </ul>
                    </div>
                )}
            </nav>
        </>
    )
}
export default Navbar;