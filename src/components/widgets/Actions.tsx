"use client"

import Link from "next/link"

import { GitBranch, Rocket } from "lucide-react"

import { Button } from "@/ui"

export function Actions() {
	return (
		<div className="flex items-center justify-center gap-4">
			<Button variant="outline" size="sm" asChild>
				<Link
					href="https://vercel.com/new/clone?repository-url=https://github.com/omergulcicek/nextjs-boilerplate"
					target="_blank"
				>
					<Rocket className="w-4 h-4" />
					Deploy to Vercel
				</Link>
			</Button>
			<Button variant="outline" size="sm" asChild>
				<Link
					href="https://github.com/omergulcicek/nextjs-boilerplate/generate"
					target="_blank"
				>
					<GitBranch className="w-4 h-4" />
					Use template
				</Link>
			</Button>
		</div>
	)
}
