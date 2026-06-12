'use client'; // Required for click handlers and state

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Link2, FileText, BarChart3, Settings, ChevronDown, CalendarDays, Ticket } from 'lucide-react';

// Define the structure for sidebar menu items
interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Sidebar Menu Items
const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutGrid size={20} /> },
  { name: 'Create Link', href: '/create-link', icon: <Link2 size={20} /> },
  { name: 'My Links', href: '/my-links', icon: <FileText size={20} /> },
  { name: 'Analytics', href: '/analytics', icon: <BarChart3 size={20} /> },
  { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <aside className="w-full max-w-[280px] h-screen bg-[#FDFDFF] border-r border-[#EBEBF2] flex flex-col pt-8 pb-6 px-6 shadow-sm overflow-y-auto">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 mb-12 pl-1.5">
        <div className="text-[#6C47FF]">
          <Link2 className="rotate-[-45deg]" size={28} strokeWidth={2.5} />
        </div>
        <h1 className="text-[26px] font-semibold text-[#110D3B]">FLCut</h1>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-grow space-y-3 mb-10">
        {sidebarItems.map((item) => {
          // Detect active state. We can use `usePathname()` if routes are set up.
          // For this example, we'll use a local state to make it work out-of-the-box.
          const isNavItemActive = pathname === item.href || (activeItem === item.name);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center gap-3.5 h-12 px-4.5 rounded-lg transition-colors group
                ${
                  isNavItemActive
                    ? 'bg-[#F2EFFF] text-[#6C47FF] font-medium'
                    : 'text-[#474D66] hover:bg-[#F2EFFF]/50 hover:text-[#6C47FF]'
                }
              `}
            >
              <div
                className={`transition-colors 
                  ${
                    isNavItemActive ? 'text-[#6C47FF]' : 'text-[#8C92B1] group-hover:text-[#6C47FF]'
                  }`}
              >
                {item.icon}
              </div>
              <span className="text-[15px] font-normal leading-none pt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Promotional Card */}
      <div className="bg-[#F2EFFF] rounded-[20px] p-6 mb-8 mt-auto flex flex-col shadow-sm">
        <h3 className="text-[17px] font-semibold text-[#6C47FF] mb-3">FLCut</h3>
        <p className="text-[15px] text-[#474D66] leading-[1.6] mb-6">
          Smart links for <br /> every FLC event.
        </p>

        {/* Floating Icons illustration using relative positioning */}
        <div className="relative mt-auto w-full h-[130px]">
          {/* Main Calendar Icon */}
          <div className="absolute top-0 right-0 p-3 bg-white rounded-xl shadow-md z-10">
            <CalendarDays size={42} strokeWidth={1} className="text-[#8C92B1]" />
          </div>
          {/* Blue Ticket Icon 1 */}
          <div className="absolute bottom-2 left-0 p-3.5 bg-[#4B84FF] rounded-lg shadow-lg rotate-[-10deg]">
            <Ticket size={24} className="text-white" />
          </div>
          {/* Blue Ticket Icon 2 */}
          <div className="absolute bottom-6 right-[-8px] p-3.5 bg-[#1B56F3] rounded-lg shadow-lg rotate-[8deg]">
            <Ticket size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="flex items-center gap-4 mt-auto border-t border-[#EBEBF2] pt-6 pl-1">
        {/* User Avatar */}
        <div className="w-[52px] h-[52px] rounded-full bg-[#E5E0FF] text-[#6C47FF] flex items-center justify-center font-bold text-2xl">
          A
        </div>
        {/* User Details */}
        <div className="flex flex-col flex-grow leading-tight">
          <span className="font-semibold text-[16px] text-[#110D3B]">Aditya Verma</span>
          <span className="font-normal text-[14px] text-[#8C92B1]">aditya@flc.club</span>
        </div>
        {/* Dropdown Arrow */}
        <button className="p-1.5 text-[#8C92B1] hover:text-[#6C47FF] transition-colors">
          <ChevronDown size={22} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;