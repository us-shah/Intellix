"use client";

import { useEffect, useRef } from "react";
import api from "@/lib/api";
import { clearSession } from "@/lib/auth";

const IDLE_MINUTES = Number(process.env.NEXT_PUBLIC_SESSION_IDLE_MINUTES || 30);
const IDLE_MS = IDLE_MINUTES * 60 * 1000;
const TOUCH_INTERVAL_MS = 60 * 1000;

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const lastActivity = useRef(Date.now());
  const activityPending = useRef(true);

  useEffect(() => {
    let cancelled = false;

    const signOut = () => {
      clearSession();
      if (!cancelled) window.location.href = "/login?reason=session-expired";
    };

    const verify = async () => {
      try { await api.get("/auth/session"); }
      catch (e: any) { if (e?.response?.status === 401) signOut(); }
    };

    const recordActivity = () => {
      lastActivity.current = Date.now();
      activityPending.current = true;
    };

    const events: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, recordActivity, { passive: true }));
    void verify();

    const timer = window.setInterval(async () => {
      const idleFor = Date.now() - lastActivity.current;
      if (idleFor >= IDLE_MS) {
        signOut();
        return;
      }
      // Only touch the backend when the human actually interacted with the UI.
      if (activityPending.current) {
        activityPending.current = false;
        await verify();
      }
    }, TOUCH_INTERVAL_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        if (Date.now() - lastActivity.current >= IDLE_MS) signOut();
        else void verify();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      events.forEach((event) => window.removeEventListener(event, recordActivity));
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <>{children}</>;
}
