"use client"

import { useForm } from "react-hook-form"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import loginSchema from "@/schemas/login-schema"
import usePasswordSignIn from "@/hooks/mutations/use-password-signin"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "../ui"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { InputPassword } from "../ui/input-password"

type LoginFormFields = z.infer<typeof loginSchema> & {
	rememberMe?: boolean
}

function LoginForm() {
	const form = useForm<LoginFormFields>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false
		}
	})

	const mutation = usePasswordSignIn()

	const onSubmitHandler = async (values: LoginFormFields) => {
		mutation.mutateAsync({
			email: values.email,
			password: values.password
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmitHandler)}
				className="space-y-2 w-4/5 py-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel htmlFor="email">Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										{...field}
										id="email"
										placeholder="Enter your email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel htmlFor="password">Password</FormLabel>
								<FormControl>
									<InputPassword
										{...field}
										id="password"
										placeholder="Enter your password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<div className="flex flex-row justify-between items-center">
					<FormField
						control={form.control}
						name="rememberMe"
						render={({ field }) => {
							return (
								<FormItem className="flex items-center justify-center gap-2">
									<FormControl>
										<Checkbox
											id="rememberMe"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="font-semibold mt-0!">
										Remember me
									</FormLabel>
								</FormItem>
							)
						}}
					/>

					<Button asChild variant="link">
						<Link
							href="/auth/forgot-password"
							className="text-brand! text-sm font-semibold"
						>
							Forgot Password
						</Link>
					</Button>
				</div>

				<Button
					disabled={form.formState.isSubmitting || mutation.isPending}
					type="submit"
					className="w-full mt-2 py-6 text-lg font-semibold"
					variant="brand"
					size="lg"
					isLoading={mutation.isPending}
				>
					Log In
				</Button>
			</form>
		</Form>
	)
}

export default LoginForm
