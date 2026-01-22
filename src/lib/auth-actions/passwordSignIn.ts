"use server"

import { AuthError } from "next-auth"

import { signIn } from "auth"

interface AuthErrorResponse extends AuthError {
	message: string
	code:
		| "invalid_credentials"
		| "auth_error"
		| "server_error"
		| "token_refresh_failed"
}

export async function passwordSignIn(
	email: string,
	password: string
): Promise<AuthErrorResponse | undefined> {
	try {
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false
		})

		// Check if signIn returns any error information
		if (result?.error) {
			return {
				name: "CustomAuthError",
				type: "CredentialsSignin",
				message: result.error,
				code: "auth_error"
			}
		}

		return undefined
	} catch (error) {
		// Determine error type if possible
		const errorMessage =
			error instanceof Error ? error.message : "Authentication failed"
		return {
			name: "CustomAuthError",
			type: "CredentialsSignin",
			message: errorMessage,
			code: "invalid_credentials"
		}
	}
}
