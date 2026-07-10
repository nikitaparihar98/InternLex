import { useState } from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminTopbar from "../components/layout/AdminTopbar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F1EA", position: "relative", overflowX: "hidden" }}>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 md:p-10" style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;