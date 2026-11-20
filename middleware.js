import { NextResponse } from "next/server";
import { ADMIN_COOKIE, CLIENT_COOKIE, decrypt } from "@/lib/jwt";

// Primera barrera (rápida). Las Server Actions y páginas vuelven a comprobar la sesión.
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = await decrypt(req.cookies.get(ADMIN_COOKIE)?.value);
    if (session?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (pathname.startsWith("/pedido")) {
    const session = await decrypt(req.cookies.get(CLIENT_COOKIE)?.value);
    if (session?.role !== "client") {
      return NextResponse.redirect(new URL("/?login=1", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/pedido/:path*"],
};
