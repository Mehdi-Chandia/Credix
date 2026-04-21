import React, {use} from "react";
import rulesGif from "../assets/rules.gif"
import msgGif from "../assets/msg.gif"
import starGif from "../assets/star.gif"
import clockGif from "../assets/clock.gif"
import {useNavigate} from "react-router-dom";
import {motion} from "motion/react"


const HeroSection=()=>{
    const navigateTo=useNavigate();

    return(
        <>
            <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-10 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                    {/*left section*/}
                    <section className="section1">

                        <motion.div
                            initial={{opacity:0 ,y:100 }} animate={{opacity:1, y:0}}
                            transition={{duration:1 ,delay:0.5, ease:"easeInOut"}}

                            className="inline-flex items-center gap-2 border p-2 border-red-300 rounded-full">
                    <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-95"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                            <span className="text-white font-bold text-sm">Live</span>
                            <p className="text-red-400 text-sm">4-hour Turnaround</p>
                        </motion.div>
                        <div className="mt-4 p-4 text-white max-w-lg">
                            <motion.h1
                                initial={{opacity:0 ,x:50 }} animate={{opacity:1, x:0}}
                                transition={{duration:1 ,delay:1.5, ease:"easeInOut"}}
                                className="font-bold text-4xl sm:text-5xl lg:text-6xl ">Doctor <span className="text-[#ff3c6e]">credentials</span> <span className="text-[#ffffff40]">verified.</span></motion.h1>
                            <motion.p
                                initial={{opacity:0 ,y:50 }} animate={{opacity:1, y:0}}
                                transition={{duration:1 ,delay:2, ease:"easeInOut"}}
                                className="text-sm text-[#ffffff40]">Stop drowning in paperwork. VerifyMD checks every license, board cert, and malpractice
                                record across 300+ databases — automatically, in hours.</motion.p>
                            <motion.div
                                initial={{opacity:0 ,x:50 }} animate={{opacity:1, x:0}}
                                transition={{duration:1 ,delay:1.5, ease:"easeInOut"}}
                                className="mt-6">
                                <button onClick={()=> navigateTo("/createRequest")}  className="md:px-6 px-4 py-2 bg-[#ff3c6e] rounded-full hover:scale-105 transition-all duration-200 ">Start verifying Free </button>
                            </motion.div>

                            {/*circles overlap and text*/}
                            <motion.div
                                initial={{opacity:0 ,x:-100 }} animate={{opacity:1, x:0}}
                                transition={{duration:1 ,delay:2.5, ease:"easeInOut"}}
                                className="flex items-center gap-4 mt-6">

                                {/* Circles */}
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                                        AH
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                                        SK
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                                        MR
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                                        ZA
                                    </div>
                                </div>

                                {/* Text */}
                                <div>
                                    <p className="text-white font-semibold">
                                        2,400+ hospitals
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        trust VerifyMD today
                                    </p>
                                </div>

                            </motion.div>
                        </div>

                    </section>
                    {/*right section*/}
                    <motion.section
                        initial={{opacity:0 ,x:50 }} animate={{opacity:1, x:0}}
                        transition={{duration:1 ,delay:1, ease:"easeInOut"}}
                        className="bg-[#0f0f14] rounded-md flex flex-col">

                        <div className="bg-[#ff3c6e] text-white flex justify-between p-2 rounded-md">
                            <p className="text-sm">Live verification feed</p>
                            <p className="text-xs "> <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span> Live</p>
                        </div>
                        {/*card of users*/}
                        <div>
                            <div className="flex justify-between text-white p-2">
                                <div className="flex flex-col">
                                    <p className="text-sm"> Dr. Daniya Rashi </p>
                                    <p className="text-sm font-extralight text-gray-600"> Cardiology · California</p>
                                </div>
                                <div className="flex flex-wrap gap-2 p-3">
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full">Board ✓</p>
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full"> NPDB ✓</p>
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full"> License ✓</p>
                                </div>
                            </div>
                            <div className="h-px -mx-2 bg-green-900 mx-auto"></div>

                            <div className="flex justify-between text-white p-2">
                                <div className="flex flex-col">
                                    <p className="text-sm"> Dr. Sameer Khan</p>
                                    <p className="text-sm font-extralight text-gray-600">  Neurology · New York</p>
                                </div>
                                <div className="flex flex-wrap gap-2 p-3">
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full">Board ✓</p>
                                    <p className="text-xs p-0.5 text-yellow-200 bg-yellow-900  border border-yellow-200 rounded-full"> DEA ⚠</p>
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full"> License ✓</p>
                                </div>
                            </div>
                            <div className="h-px -mx-2 bg-green-900 mx-auto"></div>

                            <div className="flex justify-between text-white p-2">
                                <div className="flex flex-col">
                                    <p className="text-sm"> Dr. Priya Varma</p>
                                    <p className="text-sm font-extralight text-gray-600">   Oncology · Texas</p>
                                </div>
                                <div className="flex flex-wrap gap-2 p-3">
                                    <p className="text-xs p-0.5 text-gray-500 bg-gray-800  border border-gray-200 rounded-full">checking..</p>

                                </div>
                            </div>
                            <div className="h-px -mx-2 bg-green-900 mx-auto"></div>

                            <div className="flex justify-between text-white p-2">
                                <div className="flex flex-col">
                                    <p className="text-sm"> Dr. Malik Osei</p>
                                    <p className="text-sm font-extralight text-gray-600"> Pediatrics · Florida</p>
                                </div>
                                <div className="flex flex-wrap gap-2 p-3">
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full">Board ✓</p>
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full"> NPDB ✓</p>
                                    <p className="text-xs p-0.5 text-green-200 bg-green-900  border border-green-200 rounded-full"> DEA ✓</p>
                                </div>
                            </div>

                        </div>
                    </motion.section>
                </div>
                <motion.div
                    initial={{opacity:0 ,x:50 }} animate={{opacity:1, x:0}}
                    transition={{duration:1 ,delay:2.5, ease:"easeInOut"}}
                    className="flex flex-wrap rounded-md justify-around text-white w-full bg-[#ff3c6e] mt-6">
                    <div className="flex flex-col items-center justify-center p-6">
                        <p className="text-3xl font-bold">4h</p>
                        <p className="text-xs text-gray-200">Avg. turnaround</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6">
                        <p className="text-3xl font-bold">300+</p>
                        <p className="text-xs text-gray-200">Sources verified</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6">
                        <p className="text-3xl font-bold">99.8%</p>
                        <p className="text-xs text-gray-200">Accuracy rate</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6">
                        <p className="text-3xl font-bold">50K+</p>
                        <p className="text-xs text-gray-200">Docs verified</p>
                    </div>


                </motion.div>
                {/*how it works section*/}
                <div className=" mt-8">
                    <div className="flex items-center gap-2 ">
                        <p className="h-0.5 w-6 bg-[#ff3c6e] "></p>
                        <p className="text-[#5d6365] font-bold text-sm">How it works</p>
                    </div>
                    <div className="flex flex-col sm:flex-row text-white w-full mt-6">
                        <div className="w-full sm:w-1/3 bg-[#0f0f14] p-8 sm:p-14 border-b sm:border-b-0 sm:border-r border-gray-600 rounded-md" >
                            <h2 className="font-bold text-5xl text-[#ff3c6e] opacity-30"> 01</h2>
                            <p className="font-bold">Submit provider details</p>
                            <p className="text-xs text-blue-400"> Upload a CSV, connect your HR system, or enter a single NPI number. Done in under a minute.</p>
                        </div>

                        <div className="w-full sm:w-1/3 bg-[#0f0f14] p-8 sm:p-10 border-b sm:border-b-0 sm:border-r border-gray-600 rounded-md" >
                            <h2 className="font-bold text-5xl text-[#ff3c6e] opacity-30"> 02</h2>
                            <p className="font-bold">We run 300+ checks</p>
                            <p className="text-xs text-blue-400"> Our engine cross-references every state board, the NPDB, DEA registry,
                                OIG exclusions, and more — simultaneously.</p>
                        </div>
                        <div className="w-full sm:w-1/3 bg-[#0f0f14] p-8 sm:p-10 rounded-md" >
                            <h2 className="font-bold text-5xl text-[#ff3c6e] opacity-30"> 03</h2>
                            <p className="font-bold">Get your full report</p>
                            <p className="text-xs text-blue-400">  Receive a clean, audit-ready credentialing report in hours.
                                Share it directly with your credentialing committee.</p>
                        </div>

                    </div>
                    {/*cards grid*/}
                    <div className="mt-6">
                        <h2 className="font-bold text-3xl sm:text-5xl max-w-lg text-white">Everything your
                            <span className="text-[#ff3c6e]"> team actually needs.</span> </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                            <div className="bg-[#1a0d1c] rounded-lg p-8">
                                <img className="invert" src={rulesGif} alt="rulesGif" width={45} />
                                <p className=" font-bold"> Real-time primary source verification</p>
                                <p className="text-sm text-gray-500"> We pull directly from every live government and board database — never from stale third-party lists.</p>
                                <p className="text-[#ff3c6e] font-bold">Most popular</p>
                            </div>

                            <div className="bg-[#141418] rounded-lg p-8">
                                <img className="invert" src={msgGif} alt="msgGif" width={45} />
                                <p className=" font-bold"> Expiry tracking & renewal alerts</p>
                                <p className="text-sm text-gray-500">Auto-alerts 90, 60, and 30 days before any credential expires. Never get blindsided again.</p>
                            </div>

                            <div className="bg-[#141418] rounded-lg p-8">
                                <img className="invert" src={clockGif} alt="clockGif" width={45} />
                                <p className=" font-bold"> Bulk onboarding in minutes</p>
                                <p className="text-sm text-gray-500">Import hundreds of providers at once via CSV or our Epic, Cerner, and Workday integrations.</p>
                            </div>
                            <div className="bg-[#141418] rounded-lg p-8">
                                <img className="invert rounded-full border border-red-600" src={starGif} alt="starGif" width={45} />
                                <p className=" font-bold text-[#ff3c6e]"> HIPAA-compliant & SOC 2 certified</p>
                                <p className="text-sm text-gray-500">End-to-end encryption, zero data sharing, and a full audit trail your compliance team will love.</p>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-[#ff3c6e] flex flex-col sm:flex-row justify-between items-center gap-4 p-6 sm:p-4">
                <div>
                    <h3 className="font-bold text-white text-2xl sm:text-3xl ">Ready to stop doing this manually?</h3>
                    <p className="text-xs text-gray-100">Join 2,400+ hospitals already on VerifyMD. Setup takes 10 minutes.</p>
                </div>
                <div>
                    <button className="md:px-6 px-4 py-2 text-[#ff3c6e] bg-white rounded-full hover:scale-105 transition-all duration-200 ">Start free trial →</button>
                </div>
            </div>
        </>

    )
}
export default HeroSection;