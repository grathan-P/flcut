"use client";

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
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        FLCut
      </h1>

      <input
        className="border p-2 mt-4 w-full"
        placeholder="Paste URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={createLink}
        className="bg-black text-white px-4 py-2 mt-4"
      >
        Create Link
      </button>

      {result && (
        <p className="mt-4">
          Short URL: {result}
        </p>
      )}
    </main>
  );
}