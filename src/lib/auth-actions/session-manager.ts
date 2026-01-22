import { Session } from "next-auth"
import { signOut as clientSignOut, getSession } from "next-auth/react"

import { isServer } from "@tanstack/react-query"
import { auth, signOut } from "auth"

export const signOutAndRedirect = async () => {
	if (typeof window !== "undefined") {
		// Client-side sign out
		await clientSignOut({ redirect: true, callbackUrl: "/auth/login" })
	} else {
		// Server-side sign out
		await signOut({ redirectTo: "/auth/login" })
	}
}

export const getActiveUserSession = async (): Promise<Session | null> => {
	let session: Session | null = null
	if (isServer) {
		session = await auth()
	} else {
		session = await getSession()
	}

	return session
}
