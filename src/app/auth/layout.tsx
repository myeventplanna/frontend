import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: "url('/images/auth-pages-bg.jpg')" }}
		>
			<div className="w-full h-full">{children}</div>
		</div>
	)
}
