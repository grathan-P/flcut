'use client';

import React, { useState } from 'react';
import { Link2, Copy, Calendar, Check } from 'lucide-react';
import QRCode from "qrcode";

export default function CreateLink() {
  // Form State
  const [alias, setAlias] = useState('');
  const [goLiveAt, setGoLiveAt] = useState("");
const [expiresAt, setExpiresAt] = useState("");
  const [linkType, setLinkType] = useState<'unlimited' | 'capped'>('unlimited');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [qrCode, setQrCode] = useState("");

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

    const shortUrl =
  `${window.location.origin}/${data.shortCode}`;

setResult(shortUrl);

const qr = await QRCode.toDataURL(shortUrl);

setQrCode(qr);
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 p-4 md:p-8 text-[#2D3142]">
      {/* Header Section */}

      {/* Main Responsive Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: The Input Form */}
        <form className="lg:col-span-2 bg-white rounded-xl border border-[#EDEEF2] p-6 md:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">Create New Link</h1>
        <p className="text-sm md:text-base text-[#6B7280] mt-1">Create a short, memorable link for your event.</p>
      </div>
          
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
              <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] w-max mx-auto shadow-sm">
  {qrCode ? (
    <img
      src={qrCode}
      alt="QR Code"
      className="w-36 h-36"
    />
  ) : (
    <div className="w-36 h-36 flex items-center justify-center text-gray-400">
      QR Preview
    </div>
  )}
</div>
<a
  href={qrCode}
  download="flcut-qr.png"
  className="text-center text-sm font-medium text-[#582CD6] mt-2 hover:underline block"
>
  Download QR
</a>
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