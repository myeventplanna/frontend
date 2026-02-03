"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { Info } from "lucide-react"
import { z } from "zod"

import signupSchema from "@/schemas/signup-schema"

import OAuthButtons from "../molecules/OAuthButtons"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "../ui"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { InputPassword } from "../ui/input-password"
import { PhoneInput } from "../ui/phone-input"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "../ui/tooltip"

type SignUpFormFields = z.infer<typeof signupSchema>

export default function SignUpForm() {
	const [countryCode, setCountryCode] = useState("+234")

	const form = useForm<SignUpFormFields>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			countryCode: "+234",
			password: "",
			confirmPassword: ""
		}
	})

	const onSubmitHandler = async (values: SignUpFormFields) => {
		console.log("Form submitted:", values)
		// TODO: Implement sign-up mutation
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmitHandler)}
				className="space-y-4 w-full"
			>
				{/* First Name & Last Name */}
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="firstName">
									First Name <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id="firstName"
										placeholder="Enter your first name"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="lastName">
									Last Name <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id="lastName"
										placeholder="Enter your last name"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Email & Phone Number */}
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="email">
									Email <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id="email"
										type="email"
										placeholder="example@email.com"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="phoneNumber">
									Phone Number <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<PhoneInput
										{...field}
										id="phoneNumber"
										placeholder="812 3456 789"
										countryCode={countryCode}
										onCountryCodeChange={(code) => {
											setCountryCode(code)
											form.setValue("countryCode", code)
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Password & Confirm Password */}
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="password">
									Password <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<InputPassword
										{...field}
										id="password"
										placeholder="Create your password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="confirmPassword">
									Confirm Password <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<InputPassword
										{...field}
										id="confirmPassword"
										placeholder="Confirm your password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Password requirement info */}
				<div className="flex items-start gap-2 text-sm text-muted-foreground">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Info className="h-4 w-4 mt-0.5 cursor-help" />
							</TooltipTrigger>
							<TooltipContent className="max-w-xs">
								<p>
									Password must contain at least one uppercase letter, one
									lowercase letter, one number, and one special character
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<span>Password must meet minimum requirement</span>
				</div>

				{/* OAuth Buttons */}
				<OAuthButtons />

				{/* Submit Button */}
				<Button
					disabled={form.formState.isSubmitting}
					type="submit"
					className="w-full py-6 text-base font-semibold"
					variant="default"
					size="lg"
					isLoading={form.formState.isSubmitting}
				>
					Create account
				</Button>

				{/* Sign in link */}
				<div className="text-center text-sm">
					<span className="text-muted-foreground">
						Already have an account?{" "}
					</span>
					<Link
						href="/auth/login"
						className="text-primary-gradient font-semibold hover:underline"
					>
						Sign in
					</Link>
				</div>
			</form>
		</Form>
	)
}
