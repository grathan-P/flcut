"use client";

import { useEffect } from "react";
import React, { useState } from 'react';
import { 
  Link2, 
  MousePointerClick, 
  Users, 
  TrendingUp, 
  Moon, 
  Plus, 
  BarChart3, 
  Copy, 
  MoreHorizontal, 
  ArrowUpRight, 
  ChevronDown 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function Dashboard() {

  type LinkData = {
  id: string;
  shortCode: string;
  customAlias: string | null;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
  updatedAt: string;

  expiresAt: string | null;
};

const [range, setRange] = useState("7d");

const [stats, setStats] = useState({
  totalLinks: 0,
  totalClicks: 0,
  activeLinks: 0,
  newLinksThisWeek: 0,
  clickGrowth: 0,
  activePercentage: 0,
  recentLinks: [] as LinkData[],
  chartData: [],
});

useEffect(() => {
  async function loadStats() {
    const res = await fetch(
  `/api/dashboard?range=${range}`
);
    const data = await res.json();

    setStats(data);
  }

  loadStats();
}, [range]);

const rangeLabelMap = {
  "1d": "previous day",
  "7d": "previous week",
  "14d": "previous 2 weeks",
  "30d": "previous month",
  "180d": "previous 6 months",
  "365d": "previous year",
};

  return (
    <div className="min-h-screen bg-[#FAFAFC] p-4 md:p-8 text-[#2D3142]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-[#111827] tracking-tight flex items-center gap-2">
            Welcome back, Aditya! <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-sm md:text-base text-[#6B7280] mt-1">
            Here's what's happening with your links today.
          </p>
        </div>
        
        {/* Create Link Button */}
        <div className="flex items-center gap-4 self-stretch sm:self-auto justify-end">
          
          <button className="flex items-center justify-center gap-2 bg-[#582CD6] hover:bg-[#471fb6] text-white font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
            <Plus size={18} strokeWidth={2.5} />
            Create New Link
          </button>
        </div>
      </div>

      {/* METRIC CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Total Links Card */}
        <div className="bg-white p-5 rounded-xl border border-[#EDEEF2] shadow-[0_2px_6px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#F2EFFF] rounded-xl text-[#582CD6]">
              <Link2 size={22} className="rotate-[-45deg]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8C92B1]">Total Links</span>
              <h2 className="text-2xl font-bold text-[#111827] mt-1">{stats.totalLinks}</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-[#10B981]">
            <span>↑</span> <span>
  {stats.newLinksThisWeek}
  {" "}new this week
</span>
          </div>
        </div>

        {/* Total Clicks Card */}
        <div className="bg-white p-5 rounded-xl border border-[#EDEEF2] shadow-[0_2px_6px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#EFF6FF] rounded-xl text-[#1D4ED8]">
              <MousePointerClick size={22} />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8C92B1]">Total Clicks</span>
              <h2 className="text-2xl font-bold text-[#111827] mt-1">{stats.totalClicks}</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-[#10B981]">
            <span>
  {stats.clickGrowth > 0 ? "↑" : "↓"}
  {" "}
  {Math.abs(stats.clickGrowth)}%
</span>
          </div>
        </div>

        {/* Active Links Card */}
        <div className="bg-white p-5 rounded-xl border border-[#EDEEF2] shadow-[0_2px_6px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FFF7ED] rounded-xl text-[#C2410C]">
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8C92B1]">Active Links</span>
              <h2 className="text-2xl font-bold text-[#111827] mt-1">{stats.activeLinks}</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-[#10B981]">
            <span>↑</span> <span>
  {stats.activePercentage}%
  active
</span>
          </div>
        </div>

      </div>

      {/* LOWER DATA BLOCK: RECENT LINKS & CHART VISUALIZATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COMPONENT: Recent Links Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#EDEEF2] shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-hidden">
          <div className="p-5 md:p-6 flex justify-between items-center border-b border-[#EDEEF2]">
            <h3 className="text-base font-bold text-[#111827]">Recent Links</h3>
            <button className="text-sm font-semibold text-[#582CD6] hover:text-[#471fb6] flex items-center gap-1 transition-colors">
              View all <span className="text-xs">→</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EDEEF2] text-xs font-semibold text-[#8C92B1] uppercase tracking-wider bg-[#FAFAFC]/50">
                  <th className="py-4 px-6">Alias</th>
                  <th className="py-4 px-6">Destination</th>
                  <th className="py-4 px-6">Created</th>
                  <th className="py-4 px-6">Clicks</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEEF2] text-sm text-[#374151]">
                {stats.recentLinks.map((link, idx) => {

  const expired =
    link.expiresAt &&
    new Date(link.expiresAt) < new Date();
    return(
                  <tr key={idx} className="hover:bg-[#FAFAFC]/40 transition-colors">
                    {/* Alias */}
                    <td className="py-4 px-6">
  <a
    href={link.originalUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-[#582CD6] hover:underline"
  >
    {link.customAlias || link.shortCode}
  </a>
</td>
                    {/* Destination */}
                    <td className="py-4 px-6 max-w-[200px] truncate text-[#4B5563]" title={link.originalUrl}>
                      {link.originalUrl}
                    </td>
                    {/* Created */}
                    <td className="py-4 px-6 whitespace-nowrap text-[#6B7280]">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    {/* Clicks */}
                    <td className="py-4 px-6 font-medium text-[#111827]">
                      {link.clickCount}
                    </td>
                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
    !expired
      ? "bg-[#E6F4EA] text-[#137333]"
      : "bg-[#FCE8E6] text-[#C5221F]"
  }`}
>
  {expired ? "Expired" : "Active"}
</span>
                    </td>
                    {/* Actions Panel */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-[#8C92B1] hover:text-[#582CD6] hover:bg-[#F2EFFF] rounded-md transition-all" title="View Analytics">
                          <BarChart3 size={16} />
                        </button>
                        <button
  onClick={() => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${link.shortCode}`
    );
    alert("Link copied!");
  }}
  className="p-1.5 text-[#8C92B1] hover:text-[#582CD6] hover:bg-[#F2EFFF] rounded-md transition-all"
  title="Copy Link"
>
  <Copy size={16} />
</button>
                        <button className="p-1.5 text-[#8C92B1] hover:text-[#111827] hover:bg-gray-100 rounded-md transition-all">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COMPONENT: Clicks Overview Area Chart */}
        <div className="bg-white rounded-xl border border-[#EDEEF2] shadow-[0_2px_8px_rgba(0,0,0,0.01)] p-5 md:p-6 flex flex-col justify-between">
          
          {/* Chart Header block */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-[#111827]">Clicks Overview</h3>
            <select
  value={range}
  onChange={(e) =>
    setRange(e.target.value)
  }
  className="px-3 py-1.5 text-xs font-medium text-[#4B5563] bg-white border border-[#E5E7EB] rounded-lg shadow-sm"
>
  <option value="1d">Last Day</option>
  <option value="7d">Last 7 Days</option>
  <option value="14d">Last 2 Weeks</option>
  <option value="30d">Last Month</option>
  <option value="180d">Last 6 Months</option>
  <option value="365d">Last Year</option>
</select>
          </div>

          {/* Summation Total display */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-[#111827]">{stats.totalClicks.toLocaleString()}</h2>
            <span className="text-xs font-semibold text-[#8C92B1] block mt-0.5">Total Clicks</span>
            <div
  className={`inline-flex items-center gap-1 text-[13px] font-medium mt-2 ${
    stats.clickGrowth >= 0
      ? "text-[#10B981]"
      : "text-[#EF4444]"
  }`}
>
  <span className="text-sm">
    {stats.clickGrowth >= 0 ? "↑" : "↓"}
  </span>

  <span>
  {Math.abs(stats.clickGrowth)}%
  {" "}
  vs
  {" "}
  {rangeLabelMap[
    range as keyof typeof rangeLabelMap
  ]}
</span>
</div>
          </div>

          {/* Recharts Area Frame */}
          <div className="w-full h-[220px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#582CD6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#582CD6" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8C92B1', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8C92B1', fontSize: 11 }} 
                  dx={-5}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    borderRadius: '8px', 
                    color: '#fff', 
                    fontSize: '12px',
                    border: 'none'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#582CD6" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#clickGradient)"
                  dot={{ r: 4, stroke: '#582CD6', strokeWidth: 2, fill: '#FFF' }}
                  activeDot={{ r: 6, stroke: '#582CD6', strokeWidth: 2, fill: '#582CD6' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </div>
  );
}