"use client";

import Sidebar from "@/components/Sidebar";
import CreateLink from "@/pages/CreateLink";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  async function createLink() {
    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl: url,
      }),
    });

    const data = await response.json();

    setResult(
      `${window.location.origin}/${data.shortCode}`
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <CreateLink />
    </div>
  );
}