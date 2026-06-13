'use client';

import React from 'react';
import { ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

// --- MOCK DATA ---
const clickHistory = [
  { date: '7 Jun', clicks: 40 },
  { date: '8 Jun', clicks: 105 },
  { date: '9 Jun', clicks: 55 },
  { date: '10 Jun', clicks: 80 },
  { date: '11 Jun', clicks: 75 },
  { date: '12 Jun', clicks: 145 },
  { date: '13 Jun', clicks: 55 },
];

const referrerData = [
  { name: 'Instagram', value: 42, color: '#6366F1' },
  { name: 'WhatsApp', value: 28, color: '#3B82F6' },
  { name: 'Direct', value: 16, color: '#A5B4FC' },
  { name: 'Email', value: 8, color: '#2DD4BF' },
  { name: 'Others', value: 6, color: '#F97316' },
];

const deviceData = [
  { name: 'Mobile', value: 72, color: '#3B82F6' },
  { name: 'Desktop', value: 22, color: '#A78BFA' },
  { name: 'Tablet', value: 6, color: '#93C5FD' },
];

const locations = [
  { country: 'India', code: 'IN', percentage: '71%', flag: '🇮🇳' },
  { country: 'United States', code: 'US', percentage: '12%', flag: '🇺🇸' },
  { country: 'Germany', code: 'DE', percentage: '5%', flag: '🇩🇪' },
  { country: 'Others', code: 'Other', percentage: '12%', flag: '🌐' },
];

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] p-4 md:p-8 text-[#2D3142]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-[#111827] tracking-tight">
            Analytics
          </h1>
          <p className="text-sm md:text-base text-[#6B7280] mt-0.5">
            Detailed insights for your link performance.
          </p>
        </div>
        
        {/* Dropdown Selectors */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
          <button className="flex items-center justify-between gap-4 px-4 py-2 text-sm font-medium text-[#374151] bg-white border border-[#E5E7EB] rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            hackfest26 <ChevronDown size={16} className="text-[#8C92B1]" />
          </button>
          <button className="flex items-center justify-between gap-4 px-4 py-2 text-sm font-medium text-[#374151] bg-white border border-[#E5E7EB] rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            Last 7 days <ChevronDown size={16} className="text-[#8C92B1]" />
          </button>
        </div>
      </div>

      {/* 4-COLUMN METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        
        {/* Total Clicks */}
        <div className="bg-white p-6 rounded-2xl border border-[#EDEEF2] shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
          <span className="text-xs font-semibold text-[#8C92B1]">Total Clicks</span>
          <h2 className="text-3xl font-bold text-[#111827] mt-1.5 mb-2">532</h2>
          <div className="flex items-center gap-1 text-[13px] font-semibold text-[#10B981]">
            <span>↑</span> <span>18.2%</span>
          </div>
        </div>

        {/* Unique Clicks */}
        <div className="bg-white p-6 rounded-2xl border border-[#EDEEF2] shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
          <span className="text-xs font-semibold text-[#8C92B1]">Unique Clicks</span>
          <h2 className="text-3xl font-bold text-[#111827] mt-1.5 mb-2">386</h2>
          <div className="flex items-center gap-1 text-[13px] font-semibold text-[#10B981]">
            <span>↑</span> <span>16.7%</span>
          </div>
        </div>

        {/* Avg. Clicks / Day */}
        <div className="bg-white p-6 rounded-2xl border border-[#EDEEF2] shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
          <span className="text-xs font-semibold text-[#8C92B1]">Avg. Clicks / Day</span>
          <h2 className="text-3xl font-bold text-[#111827] mt-1.5 mb-2">76</h2>
          <div className="flex items-center gap-1 text-[13px] font-semibold text-[#10B981]">
            <span>↑</span> <span>11.4%</span>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="bg-white p-6 rounded-2xl border border-[#EDEEF2] shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
          <span className="text-xs font-semibold text-[#8C92B1]">Bounce Rate</span>
          <h2 className="text-3xl font-bold text-[#111827] mt-1.5 mb-2">22%</h2>
          <div className="flex items-center gap-1 text-[13px] font-semibold text-[#EF4444]">
            <span>↓</span> <span>4.3%</span>
          </div>
        </div>

      </div>

      {/* MIDDLE SECTION: CLICKS OVER TIME & TOP REFERRERS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        
        {/* Clicks Over Time (Area Chart) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#EDEEF2] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
          <h3 className="text-sm font-bold text-[#111827] mb-6">Clicks Over Time</h3>
          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clickHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
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
                  domain={[0, 160]}
                  ticks={[0, 40, 80, 120, 160]}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8C92B1', fontSize: 11 }} 
                  dx={-5}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderRadius: '8px', color: '#fff', border: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#582CD6" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#analyticsGradient)"
                  dot={{ r: 4, stroke: '#582CD6', strokeWidth: 2, fill: '#FFF' }}
                  activeDot={{ r: 6, stroke: '#582CD6', strokeWidth: 2, fill: '#582CD6' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Referrers (Donut Chart) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EDEEF2] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#111827] mb-2">Top Referrers</h3>
          
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <div className="w-[140px] h-[140px] relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={referrerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {referrerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend Layout */}
            <div className="flex flex-col space-y-2.5 w-full max-w-[160px]">
              {referrerData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[#4B5563] font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#111827]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: DEVICES & TOP LOCATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Devices Panel (Donut Chart) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EDEEF2] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#111827] mb-2">Devices</h3>
          
          <div className="flex flex-row items-center justify-around h-full gap-4">
            <div className="w-[140px] h-[140px] relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-col space-y-3 w-full max-w-[140px]">
              {deviceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[#4B5563] font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#111827]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Locations Panel (List + Map Overlay) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#EDEEF2] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
          <h3 className="text-sm font-bold text-[#111827] mb-4">Top Locations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Country List Rows */}
            <div className="space-y-4">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b border-[#F3F4F6] pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-base filter saturate-100 select-none">{loc.flag}</span>
                    <span className="text-[#4B5563] font-medium">{loc.country}</span>
                  </div>
                  <span className="font-bold text-[#111827]">{loc.percentage}</span>
                </div>
              ))}
            </div>

            {/* Simulated Vector World Map Representation */}
            <div className="w-full flex justify-center opacity-85">
              <svg viewBox="0 0 1000 460" className="w-full h-auto fill-gray-200">
                {/* Americas Group */}
                <path d="M150,120 Q190,80 260,110 T300,180 T250,260 T140,200 Z" fill="#E5E7EB"/>
                <path d="M190,260 Q240,290 230,380 T260,450 T220,450 T180,340 Z" fill="#DDD6FE"/>
                {/* Africa */}
                <path d="M460,190 Q540,160 590,210 T580,320 T510,360 T450,250 Z" fill="#E5E7EB"/>
                {/* Eurasia Group (Highlighted Areas match image tinting) */}
                <path d="M420,80 Q550,50 750,70 T880,120 T750,220 T600,170 Z" fill="#E5E7EB"/>
                <path d="M680,160 Q720,180 760,220 T720,270 T660,200 Z" fill="#8B5CF6"/> {/* Highlight: India region */}
                <path d="M780,110 Q840,130 890,160 T850,240 T740,180 Z" fill="#A78BFA"/> {/* Highlight: East Asia */}
                {/* Australia */}
                <path d="M800,320 Q880,330 870,390 T760,380 Z" fill="#E5E7EB"/>
              </svg>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}