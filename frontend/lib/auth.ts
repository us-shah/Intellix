import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      Cookies.get("access_token") ||
      localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      const url = String(error.config?.url || "");

      // Do not destroy the session merely because
      // login credentials were rejected.
      if (!url.includes("/auth/login")) {
        clearSession();
      }
    }

    return Promise.reject(error);
  }
);

export function saveSession(
  token: string,
  role?: string,
  user?: unknown
) {
  // Middleware can read this cookie.
  Cookies.set("access_token", token, {
    sameSite: "lax",
    expires: 1,
    secure:
      typeof window !== "undefined" &&
      window.location.protocol === "https:",
  });

  // Also keep it available to client-side API code.
  localStorage.setItem("access_token", token);

  if (role) {
    Cookies.set("user_role", role, {
      sameSite: "lax",
      expires: 1,
    });

    localStorage.setItem("user_role", role);
  }

  if (user) {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }
}

export function clearSession() {
  Cookies.remove("access_token");
  Cookies.remove("user_role");

  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user");
  }
}

export function homeForRole(role?: string) {
  const normalizedRole = String(role || "")
    .trim()
    .toUpperCase();

  switch (normalizedRole) {
    case "STUDENT":
      return "/portal/student/dashboard";

    case "INSTRUCTOR":
      return "/portal/instructor/dashboard";

    case "CLIENT":
      return "/portal/client/dashboard";

    case "SUPER_ADMIN":
    case "ADMIN":
    case "MANAGER":
    case "EMPLOYEE":
    case "SALES":
    case "HR":
    case "FINANCE":
    case "SUPPORT":
      return "/dashboard";

    default:
      return "/dashboard";
  }
}

export async function login(
  email: string,
  password: string
) {
  const response = await api.post("/auth/login", {
    Email: email.trim(),
    Password: password,
  });

  return response.data;
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch {
    // Client session should still be cleared.
  } finally {
    clearSession();
  }
}