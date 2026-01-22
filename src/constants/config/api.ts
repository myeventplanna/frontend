import type { Session } from "next-auth"

import type {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig
} from "axios"

export const API_CONFIG = {
	BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	TIMEOUT: 10000,
	RETRY_COUNT: 3,
	RETRY_DELAY: 1000,
	CACHE_TIME: 5 * 60 * 1000 // 5 dakika
} as const

export type ApiConfig = keyof typeof API_CONFIG

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retryCount?: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_retry: any
}

type SessionManagerHelpers = {
	getActiveUserSession: () => Promise<Session | null>
	signOutAndRedirect: () => Promise<void>
}

let sessionManagerHelpers: SessionManagerHelpers | null = null

export const setSessionManagerHelpers = (helpers: SessionManagerHelpers) => {
	sessionManagerHelpers = helpers
}

export const setupInterceptors = (instance: AxiosInstance) => {
	// Request interceptor
	instance.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			if (!sessionManagerHelpers) {
				throw new Error(
					"Auth helpers not initialized. Call setSessionManagerHelpers first."
				)
			}
			const session = await sessionManagerHelpers.getActiveUserSession()
			if (session) {
				config.headers.set("Authorization", `Bearer ${session.accessToken}`)
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	// Response interceptor
	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response
		},
		async (error: AxiosError) => {
			const originalRequest = error.config as CustomAxiosRequestConfig

			if (
				error.response?.status === 401 &&
				originalRequest &&
				typeof window !== "undefined"
			) {
				// Initialize retry count if not set
				if (!originalRequest._retryCount) {
					originalRequest._retryCount = 0
				}

				// Check if we haven't exceeded max retries (2 attempts)
				if (originalRequest._retryCount < 2) {
					originalRequest._retryCount++
				}

				// Implement Refreshing Token
				if (!sessionManagerHelpers) {
					throw new Error(
						"Auth helpers not initialized. Call setSessionManagerHelpers first."
					)
				}

				const session = await sessionManagerHelpers.getActiveUserSession()

				if (session?.expiresIn && Date.now() > session.expiresIn) {
					// If we've exceeded max retries or refresh fails,
					// and session is expired, log out user
					await sessionManagerHelpers.signOutAndRedirect()
					return Promise.reject(
						"Session expired after multiple retry attempts. Please log in again"
					)
				}
			}

			if (
				error.response &&
				error.response?.status >= 500 &&
				!originalRequest._retry
			) {
				originalRequest._retry = true
				try {
					await new Promise((resolve) =>
						setTimeout(resolve, API_CONFIG.RETRY_DELAY)
					)
					return instance(originalRequest)
				} catch (retryError) {
					return Promise.reject(retryError)
				}
			}

			return Promise.reject(error)
		}
	)
}
