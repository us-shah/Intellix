import SessionGuard from "@/components/security/SessionGuard";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <SessionGuard>{children}</SessionGuard>;
}
