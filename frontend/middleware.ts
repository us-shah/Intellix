import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

const pathRules: Array<{ prefix: string; permission?: string; ownerOnly?: boolean }> = [
  { prefix: "/dashboard/roles", ownerOnly: true },
  { prefix: "/dashboard/activity-log", permission: "audit.view" },
  { prefix: "/dashboard/settings", permission: "settings.manage" },
  { prefix: "/dashboard/users", permission: "users.view" },
  { prefix: "/dashboard/enterprise", permission: "users.manage" },
  { prefix: "/dashboard/knowledge", permission: "lms.manage" },
  { prefix: "/dashboard/lms", permission: "lms.manage" },
  { prefix: "/dashboard/hr", permission: "hr.view" },
  { prefix: "/dashboard/finance", permission: "finance.view" },
  { prefix: "/dashboard/support", permission: "support.view" },
  { prefix: "/dashboard/project", permission: "projects.view" },
  { prefix: "/dashboard/customers", permission: "crm.view" },
  { prefix: "/dashboard/contacts", permission: "crm.view" },
  { prefix: "/dashboard/leads", permission: "crm.view" },
  { prefix: "/dashboard/deals", permission: "crm.view" },
];

function home(role: string) {
  if (role === "STUDENT") return "/portal/student/dashboard";
  if (role === "INSTRUCTOR") return "/portal/instructor/dashboard";
  if (role === "CLIENT") return "/portal/client/dashboard";
  return "/dashboard";
}

function expiredOrInvalid(token?: string) {
  if (!token) return true;
  try {
    const payload = decodeJwt(token);
    if (payload.type !== "access" || !payload.exp) return true;
    return payload.exp * 1000 <= Date.now();
  } catch { return true; }
}

function loginRedirect(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login?reason=session-expired", request.url));
  response.cookies.delete("access_token");
  response.cookies.delete("user_role");
  response.cookies.delete("user_permissions");
  return response;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = (request.cookies.get("user_role")?.value || "").toUpperCase();
  const permissions = new Set((request.cookies.get("user_permissions")?.value || "").split(",").filter(Boolean));
  const path = request.nextUrl.pathname;
  const isProtected = path.startsWith("/dashboard") || path.startsWith("/portal/student/") || path.startsWith("/portal/client/") || path.startsWith("/portal/instructor/");

  if (isProtected && expiredOrInvalid(token)) return loginRedirect(request);

  if (path.startsWith("/dashboard")) {
    if (["STUDENT", "INSTRUCTOR", "CLIENT"].includes(role)) return NextResponse.redirect(new URL(home(role), request.url));
    const rule = pathRules.find((item) => path.startsWith(item.prefix));
    if (rule && role !== "SUPER_ADMIN") {
      if (rule.ownerOnly) return NextResponse.redirect(new URL("/dashboard?denied=1", request.url));
      if (rule.permission && !permissions.has(rule.permission) && !permissions.has("*")) return NextResponse.redirect(new URL("/dashboard?denied=1", request.url));
    }
  }

  if (path.startsWith("/portal/student/") && role !== "STUDENT") return NextResponse.redirect(new URL(home(role), request.url));
  if (path.startsWith("/portal/instructor/") && role !== "INSTRUCTOR") return NextResponse.redirect(new URL(home(role), request.url));
  if (path.startsWith("/portal/client/") && role !== "CLIENT") return NextResponse.redirect(new URL(home(role), request.url));

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/portal/student/:path*", "/portal/client/:path*", "/portal/instructor/:path*"] };
