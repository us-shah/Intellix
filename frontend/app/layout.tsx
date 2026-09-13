import "./globals.css";
import { ReactNode } from "react";
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata = {
  title: "Intellix — Intelligent Digital Experiences",
  description: "Software, AI, cloud, analytics and technology education from Intellix.",
};

export default function RootLayout({children}:{children:ReactNode}){
 return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
