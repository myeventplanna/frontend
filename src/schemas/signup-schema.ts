import { z } from "zod"

const signupSchema = z
	.object({
		firstName: z
			.string()
			.min(2, "First name must be at least 2 characters")
			.max(50, "First name must be less than 50 characters"),
		lastName: z
			.string()
			.min(2, "Last name must be at least 2 characters")
			.max(50, "Last name must be less than 50 characters"),
		email: z.string().email("Please enter a valid email address"),
		phoneNumber: z
			.string()
			.min(10, "Phone number must be at least 10 digits")
			.max(15, "Phone number must be less than 15 digits")
			.regex(/^[0-9\s()-]+$/, "Please enter a valid phone number"),
		countryCode: z.string().default("+234"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	})

export default signupSchema
