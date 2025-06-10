import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acesso a páginas públicas
        const publicPaths = ['/', '/login', '/register', '/api/auth'];
        const isPublicPath = publicPaths.some(path => 
          req.nextUrl.pathname.startsWith(path)
        );
        
        if (isPublicPath) {
          return true;
        }
        
        // Requerer autenticação para outras páginas
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};