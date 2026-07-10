import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);
      
      // Enforce authorization
      if (user.role !== "admin") {
        logout(); // Destroy the token immediately
        throw new Error("Access denied. Admin only.");
      }

      toast.success("Successfully logged in!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error object:", err.response?.data);
      let errorMsg = "Invalid email or password.";
      if (err.response?.data?.detail) {
        if (typeof err.response.data.detail === "string") {
          errorMsg = err.response.data.detail;
        } else {
          errorMsg = JSON.stringify(err.response.data.detail);
        }
      } else if (err.message) {
        if (err.message === "Network Error") {
          errorMsg = "Network Error: Could not connect to the backend server. Please check your internet, verify that your ad-blocker or browser shields aren't blocking the api, or check server status.";
        } else {
          errorMsg = err.message;
        }
      }
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={{ backgroundColor: "#F5F1EA", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "440px", padding: "0 1.5rem" }}>
        
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD5C5", padding: "3rem 2.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.25rem", fontWeight: 600, color: "#111111", margin: 0 }}>
              Admin Access
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280", marginTop: "0.5rem" }}>
              Secure portal for InternLex administrators.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@internlex.com" 
                required
                style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#111111", outline: "none", backgroundColor: "#FFFFFF" }}
                onFocus={(e) => e.target.style.borderColor = "#B8871B"}
                onBlur={(e) => e.target.style.borderColor = "#DDD5C5"}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", color: "#333333", textTransform: "uppercase" }}>
                  Password
                </label>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                style={{ width: "100%", border: "1px solid #DDD5C5", padding: "0.75rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#111111", outline: "none", backgroundColor: "#FFFFFF" }}
                onFocus={(e) => e.target.style.borderColor = "#B8871B"}
                onBlur={(e) => e.target.style.borderColor = "#DDD5C5"}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              style={{ width: "100%", backgroundColor: isLoading ? "#555" : "#111111", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, padding: "0.85rem", border: "none", cursor: isLoading ? "not-allowed" : "pointer", marginTop: "1rem", transition: "background-color 0.2s" }}
              onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = "#B8871B" }}
              onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = "#111111" }}
            >
              {isLoading ? "Authenticating..." : "Login to Admin"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Login;
