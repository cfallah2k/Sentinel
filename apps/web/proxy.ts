import { NextRequest, NextResponse } from 'next/server';
import { ALL_ROLES, canAccessRoute, DEFAULT_ROLE, DEMO_ROLE_COOKIE } from './lib/role-access';

const SESSION_COOKIE = 'sentinel_session';

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/ai-systems',
  '/ai-passports',
  '/applications',
  '/approvals',
  '/audit',
  '/billing',
  '/compliance-admin',
  '/compliance/',
  '/data-classification',
  '/data-flows',
  '/data-sources',
  '/developer-portal',
  '/gateway',
  '/government',
  '/incidents',
  '/integrations-hub',
  '/models',
  '/notifications',
  '/onboarding',
  '/passports',
  '/policies',
  '/providers',
  '/reports',
  '/risk',
  '/search',
  '/settings',
  '/support',
  '/team'
];

const PUBLIC_PATHS = new Set([
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/mfa',
  '/about',
  '/blog',
  '/careers',
  '/compliance',
  '/contact',
  '/developers',
  '/docs',
  '/get-started',
  '/integrations',
  '/legal',
  '/pricing',
  '/privacy',
  '/product',
  '/request-demo',
  '/resources',
  '/security',
  '/solutions',
  '/status',
  '/terms',
  '/trust',
  '/401',
  '/403',
  '/404',
  '/500',
  '/error',
  '/maintenance',
  '/offline',
  '/session-expired',
  '/accept-invitation'
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;

  if (session) {
    const demoRole = request.cookies.get(DEMO_ROLE_COOKIE)?.value;
    const role = demoRole && (ALL_ROLES as readonly string[]).includes(demoRole) ? demoRole : DEFAULT_ROLE;
    if (!canAccessRoute(role, pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = '/403';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const isPublic = PUBLIC_PATHS.has(pathname) || PUBLIC_PATHS.has(`/${pathname.split('/')[1]}`) || pathname === '';
  if (isPublic) return NextResponse.next();

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|css|js|woff2?)$).*)']
};