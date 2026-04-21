import React from "react";
import { Outlet } from "react-router";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

export const WebLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopBar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 lg:ml-64 w-full">
          <div className="max-w-7xl mx-auto p-6 md:p-8 lg:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
