import AdminSidebar from "../components/layout/AdminSidebar";
import AdminTopbar from "../components/layout/AdminTopbar";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F1EA" }}>
      <AdminSidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminTopbar />

        <main style={{ padding: "2.5rem", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;