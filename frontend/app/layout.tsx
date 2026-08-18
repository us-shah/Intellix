import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Intellix CRM",
  description: "AI Powered CRM",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}