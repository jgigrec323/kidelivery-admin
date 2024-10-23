import React, { ReactNode } from "react";
import Sidebar from "./sidebar";

function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen">
      {/* Sidebar Section */}
      <aside className="w-64 flex flex-col bg-neutral-950  h-screen p-4">
        <Sidebar />
      </aside>

      {/* Main Content Section */}
      <section className="flex-1  p-4">{children}</section>
    </main>
  );
}

export default MainWrapper;
