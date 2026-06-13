"use client";

import Sidebar from "@/components/Sidebar";
import CreateLink from "@/pages/CreateLink";
import Dashboard from "@/pages/Dashboard";

import { useState } from "react";

export default function Home() {

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Dashboard />
        <CreateLink/>
      </div>
      
    </div>
  );
}