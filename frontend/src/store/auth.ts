"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id?: string;
  email: string;
  name?: string;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  profileId: string | null;
  setAuth: (u: User, token: string) => void;
  setProfileId: (id: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      profileId: null,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") localStorage.setItem("cc_token", token);
        set({ user, token });
      },
      setProfileId: (id) => set({ profileId: id }),
      logout: () => {
        if (typeof window !== "undefined") localStorage.removeItem("cc_token");
        set({ user: null, token: null, profileId: null });
      }
    }),
    { name: "cc_auth" }
  )
);
