import React from "react"

import SignUpForm from "@/components/organisms/SignUpForm"

export default function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-between px-20">
			{/* Left Side - Marketing Content */}
			<div className="w-1/2 max-w-xl space-y-6">
				<h1 className="text-5xl font-bold text-gray-900 leading-tight">
					Plan events. Stay in control.
				</h1>
				<p className="text-lg text-gray-600 leading-relaxed">
					A simple workspace to organize tasks, track progress, and manage every
					detail of your event from start to finish.
				</p>
				<p className="text-lg text-gray-700">
					Sign up now and get{" "}
					<span className="font-bold text-primary-gradient">
						200 free credits
					</span>{" "}
					to get started.
				</p>
			</div>

			{/* Right Side - Sign Up Form */}
			<div className="w-120">
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<div className="mb-6">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
						<p className="text-gray-600">Create your account to get started.</p>
					</div>
					<SignUpForm />
				</div>
			</div>
		</div>
	)
}
