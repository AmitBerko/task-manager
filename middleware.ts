import { getToken } from 'next-auth/jwt'
import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
	const unAuthenticatedOnly = ['/login', '/register']
	const protectedRoutes = ['/tasks']

	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
	const currentPath = request.nextUrl.pathname

	if (currentPath === '/') {
		return NextResponse.redirect(new URL(token ? '/tasks' : '/login', request.url))
	}

	if (!token && protectedRoutes.some((path) => currentPath.startsWith(path))) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (token && unAuthenticatedOnly.some((path) => currentPath.startsWith(path))) {
		return NextResponse.redirect(new URL('/tasks', request.url))
	}

	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: ['/((?!_next|api/auth|favicon.ico).*)'],
}
