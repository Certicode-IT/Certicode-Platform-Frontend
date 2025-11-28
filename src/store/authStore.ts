import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

type AuthState = {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  // LOGIN
  login: async (email, password) => {
    try {
      const res = await axios.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user });
      return true;
    } catch {
      return false;
    }
  },

  // REGISTER
  register: async (name, email, password) => {
    try {
      const res = await axios.post("/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user });
      return true;
    } catch {
      return false;
    }
  },

  // LOGOUT
  logout: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        "/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    localStorage.removeItem("token");
    set({ user: null });
  },

  // FETCH CURRENT USER
  fetchMe: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data.data.user });
    } catch {
      localStorage.removeItem("token");
      set({ user: null });
    }
  },
}));
