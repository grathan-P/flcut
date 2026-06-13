"use client";

import Sidebar from "@/components/Sidebar";
import CreateLink from "@/pages/CreateLink";
import Dashboard from "@/pages/Dashboard";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import LinksList from "@/pages/LinksList";
import { redirect } from "next/navigation";

import { useState } from "react";

export default function Home() {
  redirect("/dashboard");
}