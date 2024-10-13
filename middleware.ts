// middleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest,NextResponse } from 'next/server'
 
const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',

})
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://darylblog.vercel.app",
 "https://radylb.vercel.app"
];
export function middleware(request: NextRequest) {
  //return I18nMiddleware(request)
   // Apply the i18n middleware first
   const i18nResponse = I18nMiddleware(request);
  //  i18nResponse.headers.set('request-ip', request.ip || 'unknown')
  const origin = request.headers.get("origin")
  if (allowedOrigins.includes(origin as string)) {
    i18nResponse.headers.append("Access-Control-Allow-Origin", origin as string)
  }
  i18nResponse.headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  i18nResponse.headers.append("Access-Control-Allow-Headers", "Content-Type");
   return i18nResponse

}
 
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',"/api/:path*"]
}