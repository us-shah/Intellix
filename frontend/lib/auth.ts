import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

function getStoredToken() {
  if (typeof window === "undefined") return undefined;
  const sessionToken = sessionStorage.getItem("access_token");
  const cookieToken = Cookies.get("access_token");
  const legacyToken = localStorage.getItem("access_token");
  if (!sessionToken && legacyToken) {
    sessionStorage.setItem("access_token", legacyToken);
    localStorage.removeItem("access_token");
  }
  return sessionToken || cookieToken || legacyToken || undefined;
}

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const url = String(error.config?.url || "");
      if (!url.includes("/auth/login")) {
        clearSession();
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login?reason=session-expired";
        }
      }
    }
    return Promise.reject(error);
  }
);

export function saveSession(token: string, role?: string, user?: unknown, permissions?: string[]) {
  // Browser-session cookie: disappears when the browser session ends.
  // The backend also enforces idle/absolute timeouts in PostgreSQL.
  Cookies.set("access_token", token, {
    sameSite: "lax",
    secure: typeof window !== "undefined" && window.location.protocol === "https:",
    path: "/",
  });
  sessionStorage.setItem("access_token", token);
  localStorage.removeItem("access_token");

  if (role) {
    Cookies.set("user_role", role, {
      sameSite: "lax",
      secure: typeof window !== "undefined" && window.location.protocol === "https:",
      path: "/",
    });
    sessionStorage.setItem("user_role", role);
    localStorage.setItem("user_role", role); // UI preference only; backend never trusts this.
  }


  if (permissions) {
    const encoded = permissions.join(",");
    Cookies.set("user_permissions", encoded, {
      sameSite: "lax",
      secure: typeof window !== "undefined" && window.location.protocol === "https:",
      path: "/",
    });
    sessionStorage.setItem("user_permissions", JSON.stringify(permissions));
  }

  if (user) sessionStorage.setItem("user", JSON.stringify(user));
  localStorage.removeItem("user");
}

export function clearSession() {
  Cookies.remove("access_token", { path: "/" });
  Cookies.remove("user_role", { path: "/" });
  Cookies.remove("user_permissions", { path: "/" });
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_role");
    sessionStorage.removeItem("user_permissions");
    sessionStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_role");
  }
}

export function homeForRole(role?: string) {
  const normalizedRole = String(role || "").trim().toUpperCase();
  switch (normalizedRole) {
    case "STUDENT": return "/portal/student/dashboard";
    case "INSTRUCTOR": return "/portal/instructor/dashboard";
    case "CLIENT": return "/portal/client/dashboard";
    default: return "/dashboard";
  }
}

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", { Email: email.trim(), Password: password });
  return response.data;
}

export async function logout() {
  try { await api.post("/auth/logout"); }
  catch { /* local cleanup still happens */ }
  finally { clearSession(); }
}

export async function logoutAllSessions() {
  try { await api.post("/auth/logout-all"); }
  finally { clearSession(); }
}
