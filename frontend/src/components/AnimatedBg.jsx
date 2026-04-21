

export default function AnimatedBg() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#0b0b0f]">

            {/* Glow blobs */}
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse"></div>

            <div className="absolute bottom-[-120px] left-[-80px] w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>

            {/* Rotating circles */}
            <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] border border-pink-500/20 rounded-full animate-[spin_40s_linear_infinite]"></div>

            <div className="absolute top-[20%] right-[20%] w-[350px] h-[350px] border border-pink-500/10 rounded-full animate-[spin_30s_linear_reverse_infinite]"></div>

            {/* Dot grid */}
            <div className="absolute top-20 right-20 grid grid-cols-8 gap-4 opacity-20">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="w-[3px] h-[3px] bg-pink-500 rounded-full"></div>
                ))}
            </div>

        </div>
    );
}