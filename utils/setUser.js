"use client";

import { useUserStore } from "@/store/useUserStore";

export const setUser = (user) => useUserStore.getState().setUser(user);