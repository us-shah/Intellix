import { NextRequest, NextResponse } from "next/server";
export function middleware(request:NextRequest){const token=request.cookies.get("access_token")?.value;const path=request.nextUrl.pathname;if(!token&&(path.startsWith("/dashboard")||path.includes("/portal/student/dashboard")||path.includes("/portal/client/dashboard"))){return NextResponse.redirect(new URL("/login",request.url));}return NextResponse.next()}
export const config={matcher:["/dashboard/:path*","/portal/student/dashboard/:path*","/portal/client/dashboard/:path*"]};
