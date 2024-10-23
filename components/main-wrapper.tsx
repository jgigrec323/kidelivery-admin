import React, { ReactNode } from "react";
import Sidebar from "./sidebar";
import TopBar from "./top-bar";

function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen">
      {/* Sidebar Section */}
      <aside className="w-64 flex fixed flex-col bg-neutral-950  h-screen p-4">
        <Sidebar />
      </aside>

      {/* Main Content Section */}
      <section className="flex-1 ml-64 p-4 pt-10">
        <div>{children}</div>
      </section>
    </main>
  );
}

export default MainWrapper;
