import { format as dateFnsFormat, setDefaultOptions } from "date-fns"
import { enUS } from "date-fns/locale"

import {
	ACCENTS_REGEX,
	CARD_TYPE_REGEX,
	CURRENCY_CONFIG,
	DEFAULT_CURRENCY,
	DIGITS_ONLY_REGEX,
	EDGE_DASHES_REGEX,
	INVALID_CHARS_REGEX,
	MULTIPLE_DASHES_REGEX,
	WHITESPACE_REGEX,
	type CardType,
	type CurrencyCode
} from "@/constants"

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export const slugify = (text: string) => {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(ACCENTS_REGEX, "")
		.replace(WHITESPACE_REGEX, "-")
		.replace(INVALID_CHARS_REGEX, "")
		.replace(MULTIPLE_DASHES_REGEX, "-")
		.replace(EDGE_DASHES_REGEX, "")
}

export const formatDate = (date: Date, format = "d MMMM yyyy") => {
	setDefaultOptions({ locale: enUS })
	return dateFnsFormat(date, format)
}

export const formatCurrency = (
	amount: number,
	currency: CurrencyCode = DEFAULT_CURRENCY
) => {
	const config = CURRENCY_CONFIG[currency]

	return new Intl.NumberFormat(config.locale, {
		style: "currency",
		currency: currency,
		minimumFractionDigits: config.minimumFractionDigits,
		maximumFractionDigits: config.maximumFractionDigits
	}).format(amount)
}

export function getCardType(cardNumber: string): CardType | null {
	const cleanNumber = cardNumber.replace(DIGITS_ONLY_REGEX, "")

	for (const [type, regex] of Object.entries(CARD_TYPE_REGEX)) {
		if (regex.test(cleanNumber)) {
			return type as CardType
		}
	}

	return null
}

export function createRouteMatcher(patterns: string[]) {
	const regexes = patterns.map((pattern) => {
		const regexPattern = pattern
			.replace(/\//g, "\\/")
			.replace(/:\w+/g, "([^\\/]+)")
		return new RegExp(`^${regexPattern}$`)
	})

	return (path: string): boolean => {
		return regexes.some((regex) => regex.test(path))
	}
}
