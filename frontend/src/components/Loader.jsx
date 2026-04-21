import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-r from-[#95122C] to-[#100C08] flex justify-center items-center z-50">
            <div className="text-center">
                {/* Pulsing Logo/Circle */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-[#ff3c6e] rounded-full animate-ping opacity-75"></div>
                    <div className="relative flex justify-center items-center w-full h-full bg-[#ff3c6e] rounded-full">
                        <span className="text-white font-bold text-2xl">Credi<span className="text-black text-3xl">X</span></span>
                    </div>
                </div>

                {/* Animated Dots */}
                <div className="flex gap-2 justify-center mb-4">
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>

                <p className="text-gray-300 text-sm">Loading your dashboard...</p>
            </div>
        </div>
    );
};

export default Loader;