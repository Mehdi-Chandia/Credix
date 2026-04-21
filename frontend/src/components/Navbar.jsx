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
            <nav>
      <div className="text-white flex gap-4 justify-around items-center p-4">
      <div className="flex gap-2">
          {/*<img className="top-6" src={certificate} alt="logo" width={32}/>*/}
          <h2 className="font-bold text-2xl">Credi<span className="text-[#ff3c6e] text-4xl ">X</span></h2>
      </div>
          <ul className="hidden md:flex gap-8 text-sm text-gray-400 font-light">
             <a className="hover:text-blue-400 " href={"/"}> <li>Home</li> </a>
             <a className="hover:text-blue-400" href={"/login"}> <li>Service</li></a>
             <a className="hover:text-blue-400" href={"/about"}> <li>About</li></a>
             <a className="hover:text-blue-400" href={"/contact"}> <li>Contact Us</li></a>
          </ul>
          <div className="flex gap-2">
              <Link to={"/signup"} className="px-4 py-2 bg-blur border border-gray-500 text-gray-300 rounded-full hover:bg-[#ff3c6e] transition-all duration-200">
                  Sign Up
              </Link>

              {user ? (
                  user.role === "admin" ? (
                      <Link to={"/adminDashboard"} className="md:px-6 px-4 py-2 bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
                          Dashboard
                      </Link>
                  ) : (
                      <Link to={"/userDashboard"} className="md:px-6 px-4 py-2 bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
                          Dashboard
                      </Link>
                  )
              ) : (
                  <Link to={"/login"} className="md:px-6 px-4 py-2 bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200">
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
                            <a onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400" href={"/"}> <li>Home</li> </a>
                            <a  onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400" href={"/login"}> <li>Service</li></a>
                            <a onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400" href={"/about"}> <li>About</li></a>
                            <a  onClick={()=> {setIsOpen(!isOpen)}} className="hover:text-blue-400" href={"/contact"}> <li>Contact Us</li></a>
                        </ul>
                    </div>
                )}
            </nav>
        </>
    )
}
export default Navbar;