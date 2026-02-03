"use client"

import * as React from "react"

import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Input } from "./input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./select"

interface Country {
	code: string
	name: string
	dialCode: string
	flag: string
}

const countries: Country[] = [
	{ code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
	{ code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
	{ code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
	{ code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
	{ code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
	{ code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" }
]

export interface PhoneInputProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"onChange"
> {
	value?: string
	onChange?: (value: string) => void
	countryCode?: string
	onCountryCodeChange?: (code: string) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
	(
		{
			className,
			value = "",
			onChange,
			countryCode = "+234",
			onCountryCodeChange,
			...props
		},
		ref
	) => {
		const [selectedCountry, setSelectedCountry] = React.useState(countryCode)

		const handleCountryChange = (newCountryCode: string) => {
			setSelectedCountry(newCountryCode)
			onCountryCodeChange?.(newCountryCode)
		}

		const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(e.target.value)
		}

		return (
			<div className="flex gap-2">
				<Select value={selectedCountry} onValueChange={handleCountryChange}>
					<SelectTrigger className="w-[110px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{countries.map((country) => (
							<SelectItem key={country.code} value={country.dialCode}>
								<span className="flex items-center gap-2">
									<span>{country.flag}</span>
									<span>{country.dialCode}</span>
								</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Input
					ref={ref}
					type="tel"
					value={value}
					onChange={handlePhoneChange}
					className={cn("flex-1", className)}
					{...props}
				/>
			</div>
		)
	}
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
