"use client";

import Sidebar from "@/components/Sidebar";
import CreateLink from "@/pages/CreateLink";

import { useState } from "react";

export default function Home() {

  return (
    <div className="flex">
      <Sidebar />
      <CreateLink />
    </div>
  );
}