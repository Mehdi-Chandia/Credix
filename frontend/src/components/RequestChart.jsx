import React, { useState, useMemo } from "react";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    AreaChart, Area,
} from "recharts";

const COLORS = {
    approved: "#22c55e",
    pending:  "#eab308",
    rejected: "#ef4444",
};

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-sm shadow-xl">
            {label && <p className="text-gray-400 mb-1 font-medium">{label}</p>}
            {payload.map((entry, i) => (
                <p key={i} style={{ color: entry.color || entry.fill }}>
                    {entry.name}: <span className="font-bold">{entry.value}</span>
                </p>
            ))}
        </div>
    );
};

const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent === 0) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const buildMonthlyData = (credentials) => {
    const map = {};
    credentials.forEach((item) => {
        const d   = new Date(item.createdAt);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (!map[key]) map[key] = { month: key, approved: 0, pending: 0, rejected: 0 };
        map[key][item.status] = (map[key][item.status] || 0) + 1;
    });
    return Object.values(map)
        .sort((a, b) => a.month.localeCompare(b.month))
        .map((d) => ({ ...d, month: d.month.slice(2) })); // "2025-04" → "25-04"
};

const RequestsChart = ({ credentials = [], approve = [], pending = [], rejected = [] }) => {
    const [activeChart, setActiveChart] = useState("pie");

    const total = credentials.length;

    const pieData = [
        { name: "Approved", value: approve.length,  fill: COLORS.approved },
        { name: "Pending",  value: pending.length,  fill: COLORS.pending  },
        { name: "Rejected", value: rejected.length, fill: COLORS.rejected },
    ];

    const barData = [
        { status: "Approved", count: approve.length,  fill: COLORS.approved },
        { status: "Pending",  count: pending.length,  fill: COLORS.pending  },
        { status: "Rejected", count: rejected.length, fill: COLORS.rejected },
    ];

    const monthlyData = useMemo(() => buildMonthlyData(credentials), [credentials]);

    const tabs = [
        { id: "pie",  label: "Donut"    },
        { id: "bar",  label: "Bar"      },
        { id: "area", label: "Timeline" },
    ];

    return (
        <div className="p-4 lg:p-6">

            {/* ── Page title + tab switcher ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Requests Analytics</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Visual breakdown of your credential requests</p>
                </div>
                <div className="flex gap-1 bg-[#1e293b] p-1 rounded-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveChart(tab.id)}
                            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                                activeChart === tab.id
                                    ? "bg-[#ff3c6e] text-white shadow"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Summary cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: "Total",    value: total,            color: "text-white",     bg: "bg-[#1e293b]" },
                    { label: "Approved", value: approve.length,  color: "text-green-400", bg: "bg-green-500/10 border border-green-500/30"  },
                    { label: "Pending",  value: pending.length,  color: "text-yellow-400",bg: "bg-yellow-500/10 border border-yellow-500/30" },
                    { label: "Rejected", value: rejected.length, color: "text-red-400",   bg: "bg-red-500/10 border border-red-500/30"      },
                ].map((card) => (
                    <div key={card.label} className={`${card.bg} rounded-xl p-4 text-center`}>
                        <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{card.label}</p>
                        {total > 0 && (
                            <p className="text-xs text-gray-500 mt-0.5">
                                {card.label === "Total" ? "100" : ((card.value / total) * 100).toFixed(0)}%
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* ── Charts ── */}
            {total === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="w-16 h-16 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-sm">No requests yet — create one to see your analytics!</p>
                </div>
            ) : (
                <div className="bg-[#1e293b] rounded-xl p-4 lg:p-6">

                    {/* DONUT */}
                    {activeChart === "pie" && (
                        <>
                            <p className="text-xs text-gray-400 mb-4">Status distribution</p>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={110}
                                        paddingAngle={3}
                                        dataKey="value"
                                        labelLine={false}
                                        label={renderPieLabel}
                                    >
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.fill} stroke="transparent" />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend formatter={(v) => <span className="text-xs text-gray-300">{v}</span>} />
                                </PieChart>
                            </ResponsiveContainer>
                            <p className="text-center text-xs text-gray-500 mt-2">{total} total requests</p>
                        </>
                    )}

                    {/* BAR */}
                    {activeChart === "bar" && (
                        <>
                            <p className="text-xs text-gray-400 mb-4">Request count by status</p>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={barData} barSize={48} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="status" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                        {barData.map((entry, i) => (
                                            <Cell key={i} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}

                    {/* AREA / TIMELINE */}
                    {activeChart === "area" && (
                        <>
                            <p className="text-xs text-gray-400 mb-4">
                                {monthlyData.length > 1 ? "Monthly request activity" : "Submit more requests across months to see a timeline"}
                            </p>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={monthlyData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="gApproved" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%"  stopColor={COLORS.approved} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={COLORS.approved} stopOpacity={0}   />
                                        </linearGradient>
                                        <linearGradient id="gPending" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%"  stopColor={COLORS.pending} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={COLORS.pending} stopOpacity={0}   />
                                        </linearGradient>
                                        <linearGradient id="gRejected" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%"  stopColor={COLORS.rejected} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={COLORS.rejected} stopOpacity={0}   />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend formatter={(v) => <span className="text-xs text-gray-300 capitalize">{v}</span>} />
                                    <Area type="monotone" dataKey="approved" name="Approved" stroke={COLORS.approved} strokeWidth={2} fill="url(#gApproved)" dot={{ r: 3, fill: COLORS.approved }} />
                                    <Area type="monotone" dataKey="pending"  name="Pending"  stroke={COLORS.pending}  strokeWidth={2} fill="url(#gPending)"  dot={{ r: 3, fill: COLORS.pending  }} />
                                    <Area type="monotone" dataKey="rejected" name="Rejected" stroke={COLORS.rejected} strokeWidth={2} fill="url(#gRejected)" dot={{ r: 3, fill: COLORS.rejected }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </>
                    )}

                </div>
            )}
        </div>
    );
};

export default RequestsChart;