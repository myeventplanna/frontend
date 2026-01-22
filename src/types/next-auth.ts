import { DefaultSession, User } from "next-auth"

export interface CustomAuthUser extends User {
	email: string
	fullName: string
	role: "MARKETER" | "DEVELOPER"
}

declare module "next-auth" {
	interface Session {
		accessToken: string
		expiresIn: number
		user: CustomAuthUser & DefaultSession["user"]
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		// accessToken: string
		user: CustomAuthUser
	}
}
