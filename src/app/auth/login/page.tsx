import React, { Suspense } from "react"
import Image from "next/image"

import LoginSectionImage from "@/public/images/login-section-img.jpg"

import LivwellLogo from "@/components/atoms/LivwellLogo"
import LoginForm from "@/components/organisms/LoginForm"

function LoginPage() {
	return (
		<div className="flex h-screen flex-row sm:space-x-4 items-center justify-around">
			<div className="flex flex-col items-center justify-center w-2/5 p-5 sm:p-0 sm:mx-20 space-y-4">
				<LivwellLogo color="primary" href="" />
				<h3 className="text-4xl font-medium">Welcome Admin</h3>
				<Suspense fallback={null}>
					<LoginForm />
				</Suspense>
			</div>
			<div className="w-2/5">
				<div className="rounded-b-[40px] sm:rounded-[40px] h-[400px] sm:h-[660px] sm:my-8 w-full md:w-4/5 relative mx-auto overflow-hidden">
					<Image
						className="object-cover"
						src={LoginSectionImage}
						alt="contact-us-hero"
						fill
					/>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
