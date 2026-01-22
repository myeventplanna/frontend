import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"

import loginSchema from "@/schemas/login-schema"
import { passwordSignIn } from "@/lib/auth-actions/passwordSignIn"

type PasswordSignInFormFields = z.infer<typeof loginSchema>

function usePasswordSignIn() {
	const router = useRouter()
	const { update } = useSession()

	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get("callbackUrl")
	const mutation = useMutation<void, Error, PasswordSignInFormFields>({
		mutationFn: async (payload: PasswordSignInFormFields) => {
			const response = await passwordSignIn(payload.email, payload.password)

			if (response?.code) {
				const errorMessages = {
					auth_error: "Authentication failed. Please try again.",
					server_error: "Server error. Please try again later.",
					token_refresh_failed: "Session expired. Please sign in again.",
					invalid_credentials: "Invalid email or password"
				}
				throw new Error(
					errorMessages[response.code] ||
						response.message ||
						"Failed to sign in"
				)
			}
		},
		onSuccess: async () => {
			// Update the session on client side before redirecting
			await update()
			toast.success("Signed in successfully")
			if (callbackUrl) {
				router.push(callbackUrl)
			} else {
				router.push("/dashboard/leads")
			}
		},
		onError: (error) => {
			const errorMessage =
				error.message || "Failed to sign in. Please try again."
			toast.error(errorMessage)
		}
	})

	return mutation
}

export default usePasswordSignIn
