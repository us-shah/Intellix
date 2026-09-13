import DashboardLayout from "@/components/layout/DashboardLayout";
import SessionGuard from "@/components/security/SessionGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SessionGuard><DashboardLayout>{children}</DashboardLayout></SessionGuard>;
}
