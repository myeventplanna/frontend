import { NextResponse, type NextRequest } from "next/server"

import { auth } from "auth"

import { createRouteMatcher } from "@/lib/utils"

const protectedRoutes = ["/dashboard", "/dashboard/(.*)"]

const isProtectedRoute = createRouteMatcher(protectedRoutes)

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname === "/auth/login") {
		const session = await auth()
		if (session) {
			return NextResponse.redirect(new URL("/", request.url))
		}
	}

	// Check if the path matches any protected route
	if (isProtectedRoute(pathname)) {
		const session = await auth()

		// If no session exists, redirect to sign-in page
		if (!session) {
			const signInUrl = new URL("/auth/login", request.url)
			signInUrl.searchParams.set("redirect", pathname)
			return NextResponse.redirect(signInUrl)
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		// Match root path
		"/",
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)"
	]
}
