'use client';

import React, { useState } from 'react';
import { Link2, Copy, Calendar, Check } from 'lucide-react';

export default function CreateLink() {
  // Form State
  const [alias, setAlias] = useState('');
  const [goLiveAt, setGoLiveAt] = useState("");
const [expiresAt, setExpiresAt] = useState("");
  const [linkType, setLinkType] = useState<'unlimited' | 'capped'>('unlimited');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Copy to Clipboard Action
  const handleCopy = () => {
    const shortLink = result || `flcut.club/${alias || "your-alias"}`;
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  async function createLink() {
    if (!url.trim()) {
  alert("Please enter a URL");
  return;
}
  try {
    setLoading(true);

    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  originalUrl: url,
  customAlias: alias,
  goLiveAt,
  expiresAt,
}),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to create link");
      return;
    }

    setResult(
      `${window.location.origin}/${data.shortCode}`
    );
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 p-4 md:p-8 bg-[#FAFAFC] min-h-screen text-[#2D3142]">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">Create New Link</h1>
        <p className="text-sm md:text-base text-[#6B7280] mt-1">Create a short, memorable link for your event.</p>
      </div>

      {/* Main Responsive Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: The Input Form */}
        <form className="lg:col-span-2 bg-white rounded-xl border border-[#EDEEF2] p-6 md:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]" onSubmit={(e) => e.preventDefault()}>
          
          {/* Destination URL */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-[#374151]">Destination URL</label>
            <div className="relative flex items-center">
              <Link2 className="absolute left-4 text-[#9CA3AF]" size={18} />
              <input
                placeholder="https://example.com/your-link"
                value={url}
        onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Custom Alias */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-[#374151]">
              Custom Alias <span className="text-[#9CA3AF] font-normal">(optional)</span>
            </label>
            <div className="flex rounded-lg border border-[#E5E7EB] overflow-hidden focus-within:ring-2 focus-within:ring-[#6366F1] transition-all">
              <span className="bg-[#F9FAFB] text-[#4B5563] px-4 py-3 text-sm border-r border-[#E5E7EB] font-medium select-none">
                flcut.club/
              </span>
              <input
                type="text"
                placeholder="your-alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full px-4 py-3 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none"
              />
            </div>
            <p className="text-xs text-[#9CA3AF] mt-1">Use letters, numbers and hyphens only.</p>
          </div>

          {/* Dates: Go Live & Expires At Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Go Live At */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-[#374151]">
                Go Live At <span className="text-[#9CA3AF] font-normal">(optional)</span>
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-4 text-[#9CA3AF]" size={18} />
                <input
                  type="datetime-local"
                  value={goLiveAt}
                  onChange={(e) => setGoLiveAt(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-all"
                />
              </div>
            </div>

            {/* Expires At */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-[#374151]">
                Expires At <span className="text-[#9CA3AF] font-normal">(optional)</span>
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-4 text-[#9CA3AF]" size={18} />
                <input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Link Type Radio Options */}
          <div className="flex flex-col space-y-3 pt-2">
            <label className="text-sm font-semibold text-[#374151]">Link Type</label>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              
              {/* Unlimited Radio Option */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="radio"
                    name="linkType"
                    checked={linkType === 'unlimited'}
                    onChange={() => setLinkType('unlimited')}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    linkType === 'unlimited' ? 'border-[#6366F1] bg-white' : 'border-[#D1D5DB] group-hover:border-[#6366F1]'
                  }`}>
                    {linkType === 'unlimited' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#111827]">Unlimited</span>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">No click limit</p>
                </div>
              </label>

              {/* Capped Radio Option */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="radio"
                    name="linkType"
                    checked={linkType === 'capped'}
                    onChange={() => setLinkType('capped')}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    linkType === 'capped' ? 'border-[#6366F1] bg-white' : 'border-[#D1D5DB] group-hover:border-[#6366F1]'
                  }`}>
                    {linkType === 'capped' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#111827]">Capped</span>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">Redirect after a certain number of clicks</p>
                </div>
              </label>

            </div>
          </div>

          {/* Action Submission Button */}
          <div className="pt-4">
            <button
              type="submit"
              onClick={createLink}
              className="w-full bg-[#582CD6] hover:bg-[#471fb6] text-white font-medium py-3.5 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#582CD6] focus:ring-offset-2 text-sm md:text-base"
            >
              {loading ? "Creating..." : "Create Link"}
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: Live Sidebar Preview Display */}
        <div className="bg-[#F8F9FC]/70 rounded-xl border border-[#EDEEF2] p-6 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] h-full">
          <div>
            <h2 className="text-sm font-bold text-[#374151] tracking-wide uppercase">Preview</h2>
          </div>

          {/* Live Short Link Clipboard Box */}
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-[#6B7280]">Short Link</span>
            <div className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-lg p-3.5 shadow-sm">
              <span className="text-sm font-semibold text-[#582CD6] truncate pr-2">
  {result || `flcut.club/${alias || "your-alias"}`}
</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[#9CA3AF] hover:text-[#582CD6] p-1.5 hover:bg-[#F2EFFF] rounded-md transition-all flex-shrink-0"
                title="Copy link to clipboard"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* QR Code Container Display Block */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-semibold text-[#6B7280]">QR Code</span>
            <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] w-max mx-auto shadow-sm">
              {/* Scalable accurate representation mapping the exact pattern weights of image sample */}
              <svg width="140" height="140" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="shape-rendering-crispEdges">
                <path d="M0 0h7v7H0zm22 0h7v7h-7zM0 22h7v7H0z" fill="#111827"/>
                <path d="M2 2h3v3H2zm22 0h3v3h-3zM2 24h3v3H2z" fill="#FFF"/>
                <path d="M3 3h1v1H3zm22 0h1v1h-1zM3 25h1v1H3z" fill="#111827"/>
                <path d="M9 0h1v2H9zm3 0h4v1h-4zm5 0h1v1h-1zm2 0h2v1h-2zm0 2h1v1h-1zm-4 1h1v3h-1zm2 0h1v1h-1zm2 0h1v2h-1zm-9 1h2v1H9zm3 0h1v1h-1zm5 0h1v2h-1zm-7 1h1v1h-1zm2 0h2v1h-2zm-4 2h2v1H9zm5 0h1v2h-1zm1 0h3v1h-3zm3 0h1v1h-1zm-9 1h1v1H9zm2 0h1v2h-1zm5 0h1v1h-1zm2 0h1v1h-1zm-9 1h1v1H9zm5 0h1v1h-1zm3 0h2v1h-2zm4 0h1v3h-1zm1-8h1v3h-1zm0 4h1v2h-1zm-1 1h1v1h-1zm2 1h1v2h-1zm-1 2h1v1h-1zM0 9h1v2H0zm2 0h1v1H2zm3 0h1v3H5zm3 0h1v1H8zm2 0h4v1h-4zm5 0h2v1h-2zm1 2h2v1h-2zm5-2h1v1h-1zm2 0h1v2h-1zm-11 2h1v1h-1zm5 0h2v1h-2zm4 0h2v1h-2zm-15 1h1v1H2zm2 0h3v1H4zm5 0h1v1H9zm2 0h1v2h-1zm2 0h1v1h-1zm8 0h2v1h-2zm-12 2h3v1h-3zm5 0h1v1h-1zm2 0h1v1h-1zm2 0h2v1h-2zm2 0h1v1h-1zm-14 1h1v2H9zm2 0h1v1h-1zm4 0h2v1h-2zm5 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-13 1h2v1h-2zm3 0h2v1h-2zm5 0h1v1h-1zm2 0h1v1h-1zm2 0h2v1h-2z" fill="#111827"/>
              </svg>
            </div>
          </div>

          {/* Bottom Activation Schedule Summary Note */}
          <div className="bg-[#F2EFFF] rounded-xl p-4 border border-[#E0DAFF]">
            <p className="text-xs font-medium text-[#6366F1] text-center leading-relaxed">
  {goLiveAt || expiresAt ? (
    <>
      This link will be active between <br />
      <span className="font-bold text-[#4F46E5]">
        {goLiveAt || "Immediately"}
      </span>
      {" "}and{" "}
      <span className="font-bold text-[#4F46E5]">
        {expiresAt || "Never Expire"}
      </span>
    </>
  ) : (
    <>
      This link will be active immediately
      <br />
      and will never expire
    </>
  )}
</p>
          </div>

        </div>

      </div>
    </div>
  );
}