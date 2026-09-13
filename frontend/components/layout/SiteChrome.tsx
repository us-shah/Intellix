"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const appPrefixes = ["/dashboard","/portal","/login","/register","/forgot-password","/reset-password"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const privateArea = appPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  if (privateArea) return <>{children}</>;
  return <><Navbar/><main className="min-h-screen bg-[#050816] pt-16 text-slate-100">{children}</main><Footer/></>;
}
