/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // Fetch current user if token exists on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          logout(); // Clear invalid token
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    // The backend uses OAuth2PasswordRequestForm, which expects form data
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await api.post("/auth/login", params);

    const { access_token } = response.data;
    setToken(access_token);
    localStorage.setItem("token", access_token);

    // Fetch user details immediately after login to get the role for redirection
    const userResponse = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    setUser(userResponse.data);
    return userResponse.data;
  };

  const register = async (userData) => {
    // Expected userData: { name, email, password, college, phone }
    const response = await api.post("/auth/register", userData);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
