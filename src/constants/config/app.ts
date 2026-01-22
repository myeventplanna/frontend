export const APP_CONFIG = {
	API_TIMEOUT: 30000, // 30 seconds
	APP_NAME: "EventPlanna",
	APP_VERSION: "1.0.0",
	DEFAULT_THEME: "light",
	SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
	APP_DESCRIPTION:
		"Next gen event planning application to organize and manage your events seamlessly.",
	APP_KEYWORDS: [
		"nextjs",
		"typescript",
		"tailwind",
		"boilerplate",
		"react"
	] as string[],
	CREATOR: "@humangod",
	TWITTER_HANDLE: "@humangod"
} as const

export type AppConfig = keyof typeof APP_CONFIG

export const CURRENCY_CONFIG = {
	NGN: {
		locale: "en-NG",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	},
	USD: {
		locale: "en-US",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	},
	EUR: {
		locale: "de-DE",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}
} as const

export const DEFAULT_CURRENCY = "USD" as const
export type CurrencyCode = keyof typeof CURRENCY_CONFIG
