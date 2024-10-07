// middleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest,NextResponse } from 'next/server'
 
const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',

})
 
export function middleware(request: NextRequest) {
  //return I18nMiddleware(request)
   // Apply the i18n middleware first
   const i18nResponse = I18nMiddleware(request);
   i18nResponse.headers.set('request-ip', request.ip || 'unknown')
   return i18nResponse
  // Modify request headers
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set('request-ip', request.ip || 'unknown');
  //   // Return the modified response with updated headers
  //   return NextResponse.next({

  //     request: {
  //       headers: requestHeaders,
        
  //     },
  //   });
}
 
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}