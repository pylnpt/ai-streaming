import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/api/webhooks',
  '/',
  '/api/uploadthing',
  '/api/userFiltersUpsert',
  '/api/userThresholdSubmit',
  '/api/auth',
  '/search',
];

const isDynamicUserRoute = (pathname: string) => {
  // Check if it's a dynamic user route like /:username
  const segments = pathname.split('/').filter(Boolean);
  return segments.length === 1 && !publicRoutes.includes(`/${segments[0]}`);
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute =
    publicRoutes.some(route => nextUrl.pathname.startsWith(route)) ||
    isDynamicUserRoute(nextUrl.pathname);

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};