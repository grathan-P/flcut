'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  Plus, 
  Link2, 
  MousePointerClick, 
  Activity, 
  Clock, 
  Copy, 
  ExternalLink, 
  BarChart3, 
  Pencil, 
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Interfaces for link data
interface LinkItem {
  id: string;
  title: string;
  shortUrl: string;
  destinationUrl: string;
  clicks: number;
  clickData: number[]; // mini bar chart values (0 to 5 for scale)
  createdDate: string;
  relativeTime: string;
  status: 'Active' | 'Expired';
  colorTheme: 'purple' | 'green' | 'orange' | 'blue' | 'indigo';
}

const initialLinks: LinkItem[] = [
  {
    id: '1',
    title: 'My Portfolio',
    shortUrl: 'linkshub.in/abc123',
    destinationUrl: 'https://amanverma.dev',
    clicks: 1243,
    clickData: [2, 4, 1, 5, 3, 2, 4],
    createdDate: 'May 20, 2024',
    relativeTime: '2 hours ago',
    status: 'Active',
    colorTheme: 'purple'
  },
  {
    id: '2',
    title: 'Twitter Profile',
    shortUrl: 'linkshub.in/xyz789',
    destinationUrl: 'https://twitter.com/amanverma',
    clicks: 5432,
    clickData: [1, 3, 4, 2, 5, 4, 3],
    status: 'Active',
    createdDate: 'May 18, 2024',
    relativeTime: '2 days ago',
    colorTheme: 'green'
  },
  {
    id: '3',
    title: 'Product Hunt Launch',
    shortUrl: 'linkshub.in/pqr456',
    destinationUrl: 'https://producthunt.com/posts/...',
    clicks: 8921,
    clickData: [4, 2, 5, 3, 1, 4, 5],
    status: 'Active',
    createdDate: 'May 15, 2024',
    relativeTime: '5 days ago',
    colorTheme: 'orange'
  },
  {
    id: '4',
    title: 'Newsletter Signup',
    shortUrl: 'linkshub.in/lmn321',
    destinationUrl: 'https://newsletter.amanverma.dev',
    clicks: 2145,
    clickData: [2, 1, 3, 4, 2, 5, 3],
    status: 'Active',
    createdDate: 'May 10, 2024',
    relativeTime: '10 days ago',
    colorTheme: 'blue'
  },
  {
    id: '5',
    title: 'Discount Offer',
    shortUrl: 'linkshub.in/def654',
    destinationUrl: 'https://shop.com/discount',
    clicks: 987,
    clickData: [1, 2, 1, 3, 2, 4, 5],
    status: 'Expired',
    createdDate: 'Apr 28, 2024',
    relativeTime: '22 days ago',
    colorTheme: 'indigo'
  }
];

export default function LinksList() {
  const [links] = useState<LinkItem[]>(initialLinks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Links');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Color mapper helper for specific themes matching image_cfe8de.jpg
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'purple': return { bg: 'bg-[#EEF2FF]', text: 'text-[#4F46E5]' };
      case 'green': return { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]' };
      case 'orange': return { bg: 'bg-[#FFF3E0]', text: 'text-[#EF6C00]' };
      case 'blue': return { bg: 'bg-[#E3F2FD]', text: 'text-[#1565C0]' };
      default: return { bg: 'bg-[#EDE7F6]', text: 'text-[#651FFF]' };
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFBFC] p-4 md:p-8 font-sans antialiased text-[#334155]">
      
      {/* 1. TOP HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">Your Links</h1>
          <p className="text-sm md:text-base text-[#64748B] mt-1">Manage, share and analyze your short links.</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:flex-initial min-w-[200px] md:w-64">
            <input
              type="text"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-lg pl-3 pr-10 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-sm"
            />
            <Search className="absolute right-3 top-2.5 text-[#94A3B8]" size={16} />
          </div>

          {/* Filter Dropdown */}
          <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-lg text-sm font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors shadow-sm">
            {selectedFilter}
            <ChevronDown size={16} className="text-[#64748B]" />
          </button>

          {/* Create Link CTA */}
          <Link href="/create-link" className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm whitespace-nowrap">
            <Plus size={16} strokeWidth={2.5} />
            Create New Link
          </Link>
        </div>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Links */}
        <div className="bg-white p-5 rounded-2xl border border-[#EDEEF2] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#EEF2FF] rounded-xl text-[#4F46E5]">
              <Link2 size={22} className="rotate-[-45deg]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8C92B1]">Total Links</span>
              <h2 className="text-2xl font-bold text-[#0F172A] mt-1">248</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-[#16A34A]">
            <span>↑</span> <span>18 this month</span>
          </div>
        </div>

        {/* Total Clicks */}
        <div className="bg-white p-5 rounded-2xl border border-[#EDEEF2] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#E8F5E9] rounded-xl text-[#2E7D32]">
              <MousePointerClick size={22} />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8C92B1]">Total Clicks</span>
              <h2 className="text-2xl font-bold text-[#0F172A] mt-1">32,849</h2>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[13px] font-medium text-[#16A34A]">
            <span>↑</span> <span>12.5% vs last 7 days</span>
          </div>
        </div>

        {/* Active Links */}
        <div className="bg-white p-5 rounded-2xl border border-[#EDEEF2] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#E3F2FD] rounded-xl text-[#1565C0]">
              <Activity size={22} />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8C92B1]">Active Links</span>
              <h2 className="text-2xl font-bold text-[#0F172A] mt-1">210</h2>
            </div>
          </div>
          <div className="mt-4 text-[13px] font-medium text-[#2563EB]">
            84.7% of total
          </div>
        </div>

        {/* Expired Links */}
        <div className="bg-white p-5 rounded-2xl border border-[#EDEEF2] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FFF3E0] rounded-xl text-[#EF6C00]">
              <Clock size={22} />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8C92B1]">Expired Links</span>
              <h2 className="text-2xl font-bold text-[#0F172A] mt-1">38</h2>
            </div>
          </div>
          <div className="mt-4 text-[13px] font-medium text-[#D97706]">
            15.3% of total
          </div>
        </div>
      </div>

      {/* 3. LINKS MAIN TABLE BLOCK */}
      <div className="bg-white rounded-2xl border border-[#EDEEF2] shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#EDEEF2] text-xs font-semibold text-[#8C92B1] uppercase tracking-wider bg-[#FAFAFC]/50">
                <th className="py-4 px-5 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5] w-4 h-4 cursor-pointer" />
                </th>
                <th className="py-4 px-5">Link</th>
                <th className="py-4 px-5">Destination</th>
                <th className="py-4 px-5">Clicks</th>
                <th className="py-4 px-5">Created</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEEF2] text-sm text-[#334155]">
              {links.map((link) => {
                const theme = getThemeClasses(link.colorTheme);
                return (
                  <tr key={link.id} className="hover:bg-[#FAFAFC]/60 transition-colors group">
                    {/* Checkbox */}
                    <td className="py-5 px-5 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5] w-4 h-4 cursor-pointer" />
                    </td>
                    
                    {/* Link Metadata */}
                    <td className="py-5 px-5">
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 ${theme.bg} ${theme.text} rounded-xl flex-shrink-0`}>
                          <Link2 size={18} className="rotate-[-45deg]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#0F172A] tracking-tight">{link.title}</span>
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#64748B]">
                            <span className="font-medium">{link.shortUrl}</span>
                            <button 
                              onClick={() => handleCopy(link.id, link.shortUrl)}
                              className="text-[#94A3B8] hover:text-[#4F46E5] p-0.5 rounded transition-all"
                              title="Copy dynamic short code link"
                            >
                              <Copy size={13} className={copiedId === link.id ? "text-green-600" : ""} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Destination Address */}
                    <td className="py-5 px-5 max-w-[220px]">
                      <div className="flex items-center gap-1.5 text-[#475569] font-medium truncate">
                        <span className="truncate hover:underline cursor-pointer">{link.destinationUrl}</span>
                        <ExternalLink size={13} className="text-[#94A3B8] flex-shrink-0" />
                      </div>
                    </td>

                    {/* Sparkline & Total Clicks */}
                    <td className="py-5 px-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F172A] text-sm">{link.clicks.toLocaleString()}</span>
                        {/* Custom SVG Mini Bar Sparkline Chart mirroring image_cfe8de.jpg */}
                        <div className="flex items-end gap-[3px] h-[18px] mt-1.5 w-max">
                          {link.clickData.map((val, idx) => (
                            <div 
                              key={idx} 
                              className="w-[3px] bg-[#4F46E5] rounded-t-sm"
                              style={{ height: `${(val / 5) * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Created Date details */}
                    <td className="py-5 px-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#334155]">{link.createdDate}</span>
                        <span className="text-xs text-[#94A3B8] mt-0.5 font-medium">{link.relativeTime}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        link.status === 'Active' 
                          ? 'bg-[#DCFCE7] text-[#15803D]' 
                          : 'bg-[#FEE2E2] text-[#B91C1C]'
                      }`}>
                        {link.status}
                      </span>
                    </td>

                    {/* Control Actions Panel Container */}
                    <td className="py-5 px-5">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F1F5F9] rounded-lg transition-colors border border-[#E2E8F0] bg-white shadow-sm" title="View Analytics">
                          <BarChart3 size={15} />
                        </button>
                        <button className="p-2 text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F1F5F9] rounded-lg transition-colors border border-[#E2E8F0] bg-white shadow-sm" title="Edit Link">
                          <Pencil size={15} />
                        </button>
                        <button className="p-2 text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F1F5F9] rounded-lg transition-colors border border-[#E2E8F0] bg-white shadow-sm" title="More Actions">
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER PAGINATION LAYOUT PANEL */}
        <div className="p-4 bg-white border-t border-[#EDEEF2] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-[#64748B]">
          <div>
            Showing <span className="font-bold text-[#0F172A]">1</span> to <span className="font-bold text-[#0F172A]">5</span> of <span className="font-bold text-[#0F172A]">248</span> links
          </div>
          
          {/* Pagination Navigation Elements */}
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 border border-[#E2E8F0] rounded-md hover:bg-[#F8FAFC] transition-colors text-[#94A3B8]">
              <ChevronLeft size={14} />
            </button>
            
            <button className="w-7 h-7 bg-[#EEF2FF] text-[#4F46E5] font-bold rounded-md flex items-center justify-center border border-transparent">1</button>
            <button className="w-7 h-7 hover:bg-[#F8FAFC] rounded-md flex items-center justify-center border border-[#E2E8F0] transition-colors">2</button>
            <button className="w-7 h-7 hover:bg-[#F8FAFC] rounded-md flex items-center justify-center border border-[#E2E8F0] transition-colors">3</button>
            <span className="px-1 text-[#94A3B8]">...</span>
            <button className="w-7 h-7 hover:bg-[#F8FAFC] rounded-md flex items-center justify-center border border-[#E2E8F0] transition-colors">50</button>
            
            <button className="p-1.5 border border-[#E2E8F0] rounded-md hover:bg-[#F8FAFC] transition-colors text-[#64748B]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}